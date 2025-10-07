# PerplexiGrid API Setup Guide

This guide will walk you through setting up the complete PerplexiGrid API, including database schema, authentication, edge functions, and environment configuration.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Authentication Setup](#authentication-setup)
5. [Edge Functions Deployment](#edge-functions-deployment)
6. [Storage Setup](#storage-setup)
7. [Testing the API](#testing-the-api)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** ([Download](https://git-scm.com/))

### Required Accounts & Keys
- **Supabase Account** ([Sign up](https://supabase.com/))
  - Project already configured at: `https://fjruutnafngsjfwhzbpl.supabase.co`
- **Perplexity API Key** ([Get API Key](https://docs.perplexity.ai/))

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PetarRan/perplexigrid.git
cd perplexigrid
```

### 2. Configure Environment Variables

The project already has a `.env` file with Supabase credentials. You need to add your Perplexity API key.

**Add to `.env` (project root):**
```bash
# Existing Supabase Configuration
VITE_SUPABASE_URL=https://fjruutnafngsjfwhzbpl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Add this - YOUR PERPLEXITY API KEY
PPLX_API_KEY=your_perplexity_api_key_here
```

**Get your Perplexity API key:**
1. Visit [Perplexity API](https://www.perplexity.ai/settings/api)
2. Sign up or log in
3. Generate an API key
4. Copy and paste it into the `.env` file

### 3. Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Return to root
cd ..
```

---

## Database Setup

Your Supabase database needs the following tables and security policies.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/fjruutnafngsjfwhzbpl)
2. Navigate to **SQL Editor**
3. Run the following migration scripts in order:

### Migration 1: Create Projects Table

```sql
/*
  # Create Projects Table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text, optional)
      - `user_id` (uuid, foreign key to auth.users)
      - `sources_number` (integer, default 0)
      - `widgets_number` (integer, default 0)
      - `theme` (text, default 'default')
      - `shared_with` (text array, optional)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to manage their own projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Untitled Project',
  description text,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sources_number integer DEFAULT 0,
  widgets_number integer DEFAULT 0,
  theme text DEFAULT 'default',
  shared_with text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
```

### Migration 2: Create Data Sources Table

```sql
/*
  # Create Data Sources Table

  1. New Tables
    - `datasources`
      - `id` (uuid, primary key)
      - `name` (text)
      - `path` (text) - file path in storage or external URL
      - `project_id` (uuid, foreign key to projects)
      - `is_link` (boolean) - true if external URL, false if file
      - `added_by_ai` (boolean, default false)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `datasources` table
    - Add policies for project owners to manage data sources
*/

CREATE TABLE IF NOT EXISTS datasources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  path text NOT NULL,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  is_link boolean DEFAULT false,
  added_by_ai boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE datasources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view datasources for own projects"
  ON datasources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = datasources.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create datasources for own projects"
  ON datasources FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = datasources.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update datasources for own projects"
  ON datasources FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = datasources.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = datasources.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete datasources for own projects"
  ON datasources FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = datasources.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_datasources_project_id ON datasources(project_id);
CREATE INDEX IF NOT EXISTS idx_datasources_created_at ON datasources(created_at DESC);
```

### Migration 3: Create Widgets Table

```sql
/*
  # Create Widgets Table

  1. New Tables
    - `widgets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `data` (jsonb) - widget-specific data structure
      - `widget_type` (text) - e.g., 'BarChart', 'KPI', 'Table'
      - `customization_type` (integer, default 0)
      - `position` (integer) - display order
      - `project_id` (uuid, foreign key to projects)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `widgets` table
    - Add policies for project owners to manage widgets

  3. Functions
    - Create function for batch updating widget positions
*/

CREATE TABLE IF NOT EXISTS widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  data jsonb NOT NULL,
  widget_type text NOT NULL,
  customization_type integer DEFAULT 0,
  position integer NOT NULL DEFAULT 0,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view widgets for own projects"
  ON widgets FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = widgets.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create widgets for own projects"
  ON widgets FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = widgets.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update widgets for own projects"
  ON widgets FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = widgets.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = widgets.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete widgets for own projects"
  ON widgets FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = widgets.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_widgets_project_id ON widgets(project_id);
CREATE INDEX IF NOT EXISTS idx_widgets_position ON widgets(position);

-- Function to batch update widget positions
CREATE OR REPLACE FUNCTION update_widget_positions(position_updates jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  update_item jsonb;
BEGIN
  FOR update_item IN SELECT * FROM jsonb_array_elements(position_updates)
  LOOP
    UPDATE widgets
    SET position = (update_item->>'position')::integer
    WHERE id = (update_item->>'id')::uuid;
  END LOOP;
END;
$$;
```

### Migration 4: Create Messages Table

```sql
/*
  # Create Messages Table

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `message` (text)
      - `project_id` (uuid, foreign key to projects)
      - `from_user` (boolean) - true if from user, false if AI response
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `messages` table
    - Add policies for project owners to manage messages
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  from_user boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages for own projects"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = messages.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages for own projects"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = messages.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update messages for own projects"
  ON messages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = messages.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = messages.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages for own projects"
  ON messages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = messages.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_messages_project_id ON messages(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
```

### Migration 5: Create Project Shares Table

```sql
/*
  # Create Project Shares Table

  1. New Tables
    - `project_shares`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects, unique)
      - `share_token` (text, unique) - random token for sharing
      - `permission` (text, default 'view')
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `project_shares` table
    - Add policies for project owners and public read access via token
*/

CREATE TABLE IF NOT EXISTS project_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  share_token text NOT NULL UNIQUE,
  permission text DEFAULT 'view',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project owners can manage shares"
  ON project_shares FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_shares.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_shares.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view shares with valid token"
  ON project_shares FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_project_shares_token ON project_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_project_shares_project_id ON project_shares(project_id);
```

### Option B: Using Supabase CLI (Alternative)

If you prefer using the CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref fjruutnafngsjfwhzbpl

# Apply migrations (if you save the SQL files)
supabase db push
```

---

## Authentication Setup

Authentication is already configured through Supabase Auth. Here's what's enabled:

### Email/Password Authentication

**Already enabled** in your Supabase project. No additional configuration needed.

### Optional: Enable Google OAuth

1. Go to [Supabase Dashboard → Authentication → Providers](https://supabase.com/dashboard/project/fjruutnafngsjfwhzbpl/auth/providers)
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
   - Add authorized redirect URI: `https://fjruutnafngsjfwhzbpl.supabase.co/auth/v1/callback`

### Test Authentication

```javascript
import { supabase } from './supabase-client';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'SecurePassword123!'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'SecurePassword123!'
});
```

---

## Edge Functions Deployment

The `call-perplexity` edge function needs to be deployed to handle AI-powered dashboard generation.

### Deploy the Edge Function

The edge function code is already in your repository at:
- `server/supabase/functions/call-perplexity/index.ts`
- `server/supabase/functions/_shared/perplexityService.ts`
- `server/supabase/functions/_shared/types.ts`

**Deployment steps:**

1. **Set the Perplexity API Key in Supabase:**

   ```bash
   # Using Supabase CLI
   supabase secrets set PPLX_API_KEY=your_perplexity_api_key_here
   ```

   Or via the Dashboard:
   - Go to **Settings → Edge Functions → Secrets**
   - Add secret: `PPLX_API_KEY` with your Perplexity API key

2. **Deploy using the MCP tool** (recommended if available in your environment):

   The function should be deployed using the Supabase deployment tools provided in your development environment.

3. **Or deploy using Supabase CLI:**

   ```bash
   # Deploy the function
   supabase functions deploy call-perplexity

   # Test the function
   curl -i --location --request POST \
     'https://fjruutnafngsjfwhzbpl.supabase.co/functions/v1/call-perplexity' \
     --header 'Authorization: Bearer YOUR_ANON_KEY' \
     --header 'Content-Type: application/json' \
     --data '{"mode":"f1","query":"Create a simple sales dashboard"}'
   ```

### Edge Function Configuration

The function is configured to:
- Accept POST requests
- Handle CORS for browser requests
- Use Perplexity Sonar Pro model
- Support 4 generation modes: f1, l1, r1, r2

**No additional configuration needed** - environment variables are automatically available.

---

## Storage Setup

File uploads require a storage bucket for user files.

### Create Storage Bucket

1. Go to [Supabase Dashboard → Storage](https://supabase.com/dashboard/project/fjruutnafngsjfwhzbpl/storage/buckets)
2. Click **New bucket**
3. Create bucket with:
   - **Name:** `files`
   - **Public:** No (private)
   - **File size limit:** 50 MB (or as needed)
   - **Allowed MIME types:** Leave empty for all types

### Set Storage Policies

Run this SQL in your SQL Editor:

```sql
-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload own files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to view own files
CREATE POLICY "Users can view own files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow authenticated users to delete own files
CREATE POLICY "Users can delete own files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

---

## Testing the API

### 1. Start the Development Server

```bash
# From the client directory
cd client
npm run dev
```

The app will be available at `http://localhost:5173`

### 2. Test the Complete Flow

**Create a Project:**
```javascript
import { API } from './app/api/api';

const project = await API.projects.create(
  "Test Dashboard",
  "Testing the API"
);
console.log('Project created:', project.id);
```

**Upload a Data Source:**
```javascript
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

await API.dataSources.createFile({
  file: file,
  name: "Test Data",
  projectId: project.id
});
```

**Generate a Dashboard with AI:**
```javascript
const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/call-perplexity`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mode: "f1",
      query: "Create a sales dashboard with revenue trends"
    })
  }
);

const result = await response.json();
console.log('Generated widgets:', result.widgets);
```

### 3. Verify Database

Check that data was created:

```sql
-- Check projects
SELECT * FROM projects;

-- Check datasources
SELECT * FROM datasources;

-- Check widgets
SELECT * FROM widgets;

-- Check messages
SELECT * FROM messages;
```

---

## Troubleshooting

### Common Issues

#### 1. "Failed to fetch" or CORS errors

**Problem:** Edge function not deployed or CORS not configured

**Solution:**
- Verify edge function is deployed: Check Supabase Dashboard → Edge Functions
- Ensure CORS headers are present in the function response
- Check browser console for specific CORS error

#### 2. "Insufficient privileges" or RLS errors

**Problem:** Row Level Security policies blocking access

**Solution:**
- Verify user is authenticated: `const { data: { user } } = await supabase.auth.getUser()`
- Check RLS policies in SQL Editor
- Temporarily disable RLS for testing (NOT for production):
  ```sql
  ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
  ```

#### 3. "PPLX_API_KEY not found"

**Problem:** Perplexity API key not set in edge function environment

**Solution:**
```bash
# Set the secret
supabase secrets set PPLX_API_KEY=your_key_here

# Or set via Dashboard → Settings → Edge Functions → Secrets
```

#### 4. File upload fails

**Problem:** Storage bucket not created or policies not set

**Solution:**
- Verify bucket exists: Dashboard → Storage
- Check storage policies are created
- Verify user is authenticated

#### 5. "Invalid JWT" or authentication errors

**Problem:** Anon key incorrect or expired

**Solution:**
- Get fresh anon key from Dashboard → Settings → API
- Update `.env` file with correct key
- Restart development server

### Debug Mode

Enable detailed logging:

```javascript
// In your code
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('User:', (await supabase.auth.getUser()).data.user);

// Check RLS policies
const { data, error } = await supabase
  .from('projects')
  .select('*');
console.log('Projects:', data, 'Error:', error);
```

### Getting Help

- **Supabase Docs:** https://supabase.com/docs
- **Perplexity API Docs:** https://docs.perplexity.ai/
- **GitHub Issues:** https://github.com/PetarRan/perplexigrid/issues
- **Supabase Discord:** https://discord.supabase.com/

---

## Next Steps

After completing setup:

1. **Review the API Documentation** - See `API_DOCUMENTATION.md` for complete endpoint reference
2. **Explore Widget Types** - 25+ visualization types available
3. **Customize Themes** - Modify dashboard themes in the UI
4. **Set Up Deployment** - Deploy to Vercel or your preferred hosting
5. **Monitor Usage** - Check Supabase Dashboard for API usage and performance

---

## Deployment Checklist

Before going to production:

- [ ] All database migrations applied
- [ ] RLS policies tested and verified
- [ ] Storage bucket created with policies
- [ ] Edge function deployed and tested
- [ ] Environment variables set (especially PPLX_API_KEY)
- [ ] Authentication flows tested (signup, login, logout)
- [ ] File upload/download tested
- [ ] AI dashboard generation tested
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Backup strategy in place
- [ ] Monitoring and logging configured

---

**Setup Complete!** 🎉

Your PerplexiGrid API is now ready to use. Visit the [API Documentation](./API_DOCUMENTATION.md) for detailed endpoint information.
