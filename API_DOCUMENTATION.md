# API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Base URLs](#base-urls)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [API Endpoints](#api-endpoints)
  - [Projects API](#projects-api)
  - [Data Sources API](#data-sources-api)
  - [Widgets API](#widgets-api)
  - [Messages API](#messages-api)
  - [Project Shares API](#project-shares-api)
  - [AI Dashboard Generator (Edge Function)](#ai-dashboard-generator-edge-function)
- [Data Models](#data-models)
- [Automatic Documentation Tools](#automatic-documentation-tools)

---

## Overview

This API provides endpoints for managing analytics dashboards with AI-powered generation capabilities. The API is built on Supabase and uses PostgreSQL for data persistence with Row Level Security (RLS) enabled.

**Current Version:** 1.0.0

---

## Authentication

All API requests require authentication using Supabase Auth.

### Authentication Methods

**Email/Password Authentication** (Default)

```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123'
});

// Sign out
const { error } = await supabase.auth.signOut();
```

### Authentication Headers

All requests to the Edge Functions require the following headers:

```
Authorization: Bearer <SUPABASE_ANON_KEY>
Content-Type: application/json
```

### Getting the Current User

```javascript
const { data: { user }, error } = await supabase.auth.getUser();
```

---

## Base URLs

**Client API (Supabase):**
- Production: `https://<your-project-ref>.supabase.co`
- Local Development: `http://localhost:54321`

**Edge Functions:**
- Production: `https://<your-project-ref>.supabase.co/functions/v1`
- Local Development: `http://localhost:54321/functions/v1`

---

## Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "error": {
    "message": "Description of what went wrong",
    "code": "ERROR_CODE",
    "details": "Additional context (optional)"
  }
}
```

### Common HTTP Status Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 500 | Internal Server Error |

### Common Error Codes

| Error Code | Description |
|-----------|-------------|
| `PGRST116` | No rows returned (Supabase) |
| `23505` | Unique constraint violation |
| `23503` | Foreign key constraint violation |
| `42501` | Insufficient RLS privileges |

### Error Handling Example

```javascript
try {
  const project = await ProjectsAPI.create(name, description);
} catch (error) {
  if (error.code === '23505') {
    console.error('Project with this name already exists');
  } else if (error.code === '42501') {
    console.error('Permission denied');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

---

## Rate Limiting

Supabase implements rate limiting at the project level. Typical limits:

- **Anonymous requests:** 100 requests per hour
- **Authenticated requests:** 1000 requests per hour
- **Edge Functions:** 500 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

---

## API Endpoints

## Projects API

Manage analytics projects and dashboards.

### Get All Projects

Retrieve all projects for the authenticated user.

**Method:** `ProjectsAPI.getAll()`

**Request:**
```javascript
const projects = await ProjectsAPI.getAll();
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Q4 Sales Dashboard",
    "description": "Sales analytics for Q4 2024",
    "sources_number": 5,
    "widgets_number": 12,
    "created_at": "2024-01-15T10:30:00Z",
    "theme": "default",
    "shared_with": ["user2@example.com"]
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Database error

---

### Create Project

Create a new project.

**Method:** `ProjectsAPI.create(name, description)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Project name (defaults to "Untitled Project" if empty) |
| description | string | No | Project description |

**Request:**
```javascript
const project = await ProjectsAPI.create(
  "Q4 Sales Dashboard",
  "Sales analytics for Q4 2024"
);
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Q4 Sales Dashboard",
  "description": "Sales analytics for Q4 2024",
  "sources_number": 0,
  "widgets_number": 0,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `201 Created` - Project created successfully
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated

---

### Update Project

Update project name and description.

**Method:** `ProjectsAPI.update(id, name, description)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Project UUID |
| name | string | Yes | New project name |
| description | string | No | New project description |

**Request:**
```javascript
const project = await ProjectsAPI.update(
  "550e8400-e29b-41d4-a716-446655440000",
  "Q1 Sales Dashboard",
  "Updated description"
);
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Q1 Sales Dashboard",
  "description": "Updated description",
  "sources_number": 5,
  "widgets_number": 12,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200 OK` - Updated successfully
- `404 Not Found` - Project not found
- `403 Forbidden` - Not project owner

---

### Update Project Theme

Update the project's visual theme.

**Method:** `ProjectsAPI.updateTheme(id, theme)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Project UUID |
| theme | string | Yes | Theme identifier (e.g., "dark", "light", "custom") |

**Request:**
```javascript
const project = await ProjectsAPI.updateTheme(
  "550e8400-e29b-41d4-a716-446655440000",
  "dark"
);
```

**Status Codes:**
- `200 OK` - Theme updated
- `404 Not Found` - Project not found

---

### Delete Project

Delete a project and all associated data.

**Method:** `ProjectsAPI.delete(id)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Project UUID |

**Request:**
```javascript
await ProjectsAPI.delete("550e8400-e29b-41d4-a716-446655440000");
```

**Response:**
```
void (no response body)
```

**Status Codes:**
- `204 No Content` - Deleted successfully
- `404 Not Found` - Project not found
- `403 Forbidden` - Not project owner

---

### Update Data Sources Count

Manually update the count of data sources.

**Method:** `ProjectsAPI.updateDataSourcesCount(id, count)`

**Request:**
```javascript
await ProjectsAPI.updateDataSourcesCount(
  "550e8400-e29b-41d4-a716-446655440000",
  10
);
```

---

### Increment/Decrement Counters

Automatically increment or decrement widget/data source counts.

**Methods:**
- `ProjectsAPI.incrementDataSourcesCount(id)`
- `ProjectsAPI.incrementWidgetsCount(id)`
- `ProjectsAPI.decrementDataSourcesCount(id)`
- `ProjectsAPI.decrementWidgetsCount(id)`

**Request:**
```javascript
await ProjectsAPI.incrementWidgetsCount("550e8400-e29b-41d4-a716-446655440000");
```

---

### Get Shared With

Get list of users a project is shared with.

**Method:** `ProjectsAPI.getSharedWith(id)`

**Response:**
```json
["user1@example.com", "user2@example.com"]
```

---

### Update Shared With

Update project sharing settings.

**Method:** `ProjectsAPI.updateSharedWith(id, shared_with)`

**Request:**
```javascript
await ProjectsAPI.updateSharedWith(
  "550e8400-e29b-41d4-a716-446655440000",
  ["user1@example.com", "user3@example.com"]
);
```

---

## Data Sources API

Manage data sources (files and URLs) for projects.

### Get All Data Sources

Retrieve all data sources for a project.

**Method:** `DataSourcesAPI.getAll(projectId)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project UUID |

**Request:**
```javascript
const dataSources = await DataSourcesAPI.getAll("550e8400-e29b-41d4-a716-446655440000");
```

**Response:**
```json
[
  {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "created_at": "2024-01-15T10:35:00Z",
    "name": "Sales Data Q4.csv",
    "path": "user-id/1705319700_sales.csv",
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "is_link": false,
    "added_by_ai": false
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440002",
    "created_at": "2024-01-15T10:40:00Z",
    "name": "Industry Report",
    "path": "https://example.com/report.pdf",
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "is_link": true,
    "added_by_ai": true
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - No access to project

---

### Create File Data Source

Upload a file as a data source.

**Method:** `DataSourcesAPI.createFile({ file, name?, projectId })`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | File object to upload |
| name | string | No | Display name (defaults to filename) |
| projectId | string | Yes | Project UUID |

**Request:**
```javascript
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

await DataSourcesAPI.createFile({
  file: file,
  name: "Q4 Sales Data",
  projectId: "550e8400-e29b-41d4-a716-446655440000"
});
```

**Status Codes:**
- `201 Created` - File uploaded successfully
- `400 Bad Request` - Invalid file
- `401 Unauthorized` - Not authenticated
- `413 Payload Too Large` - File exceeds size limit

---

### Create Link Data Source

Add an external URL as a data source.

**Method:** `DataSourcesAPI.createLink({ url, name, projectId })`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | External URL |
| name | string | Yes | Display name |
| projectId | string | Yes | Project UUID |

**Request:**
```javascript
await DataSourcesAPI.createLink({
  url: "https://example.com/data.csv",
  name: "External Sales Data",
  projectId: "550e8400-e29b-41d4-a716-446655440000"
});
```

**Status Codes:**
- `201 Created` - Link added successfully
- `400 Bad Request` - Invalid URL

---

### Update Data Source Name

Update the display name of a data source.

**Method:** `DataSourcesAPI.updateName(id, name)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Data source UUID |
| name | string | Yes | New display name |

**Request:**
```javascript
await DataSourcesAPI.updateName(
  "650e8400-e29b-41d4-a716-446655440001",
  "Updated Sales Data"
);
```

---

### Delete Data Source

Delete a data source.

**Method:** `DataSourcesAPI.delete(id)`

**Request:**
```javascript
await DataSourcesAPI.delete("650e8400-e29b-41d4-a716-446655440001");
```

**Status Codes:**
- `204 No Content` - Deleted successfully
- `404 Not Found` - Data source not found

---

## Widgets API

Manage dashboard widgets and visualizations.

### Get All Widgets

Retrieve all widgets for a project, ordered by position.

**Method:** `WidgetsAPI.getAll(projectId)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project UUID |

**Request:**
```javascript
const widgets = await WidgetsAPI.getAll("550e8400-e29b-41d4-a716-446655440000");
```

**Response:**
```json
[
  {
    "id": "750e8400-e29b-41d4-a716-446655440003",
    "created_at": "2024-01-15T11:00:00Z",
    "name": "Sales by Region",
    "data": {
      "title": "Sales by Region",
      "categories": ["North", "South", "East", "West"],
      "series": [
        {
          "name": "Q4 2024",
          "data": [120, 95, 140, 110]
        }
      ]
    },
    "widget_type": "BarChart",
    "customization_type": 0,
    "position": 0,
    "project_id": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `401 Unauthorized` - Not authenticated

---

### Get Widget by ID

Retrieve a specific widget.

**Method:** `WidgetsAPI.getById(widgetId)`

**Request:**
```javascript
const widget = await WidgetsAPI.getById("750e8400-e29b-41d4-a716-446655440003");
```

---

### Create Widget

Create a new widget.

**Method:** `WidgetsAPI.create(widget)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Widget display name |
| data | JSON | Yes | Widget-specific data structure |
| widget_type | string | Yes | Widget type (e.g., "BarChart", "KPI") |
| customization_type | number | Yes | Customization level |
| position | number | Yes | Display order position |
| project_id | string | Yes | Project UUID |

**Request:**
```javascript
const widget = await WidgetsAPI.create({
  name: "Revenue KPI",
  data: {
    title: "Total Revenue",
    value: 1250000,
    trend: 15.5
  },
  widget_type: "KPI",
  customization_type: 0,
  position: 0,
  project_id: "550e8400-e29b-41d4-a716-446655440000"
});
```

**Response:**
```json
{
  "id": "750e8400-e29b-41d4-a716-446655440004",
  "created_at": "2024-01-15T11:05:00Z",
  "name": "Revenue KPI",
  "data": {
    "title": "Total Revenue",
    "value": 1250000,
    "trend": 15.5
  },
  "widget_type": "KPI",
  "customization_type": 0,
  "position": 0,
  "project_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Status Codes:**
- `201 Created` - Widget created
- `400 Bad Request` - Invalid widget data

---

### Update Widget

Update widget properties.

**Method:** `WidgetsAPI.update(widgetId, updates)`

**Request:**
```javascript
const updated = await WidgetsAPI.update(
  "750e8400-e29b-41d4-a716-446655440004",
  {
    name: "Updated Revenue KPI",
    data: {
      title: "Total Revenue",
      value: 1300000,
      trend: 18.2
    }
  }
);
```

---

### Delete Widget

Delete a widget.

**Method:** `WidgetsAPI.delete(widgetId)`

**Request:**
```javascript
await WidgetsAPI.delete("750e8400-e29b-41d4-a716-446655440004");
```

---

### Update Widget Positions

Batch update widget positions (for drag-and-drop reordering).

**Method:** `WidgetsAPI.updatePositions(updates)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| updates | Array | Yes | Array of { id, position } objects |

**Request:**
```javascript
await WidgetsAPI.updatePositions([
  { id: "widget-1", position: 0 },
  { id: "widget-2", position: 1 },
  { id: "widget-3", position: 2 }
]);
```

**Note:** This method uses a PostgreSQL stored procedure `update_widget_positions`.

---

### Duplicate Widget

Create a copy of an existing widget.

**Method:** `WidgetsAPI.duplicate(widgetId)`

**Request:**
```javascript
const duplicated = await WidgetsAPI.duplicate("750e8400-e29b-41d4-a716-446655440004");
```

**Response:**
The duplicated widget with a new ID and name suffixed with " (Copy)".

---

## Messages API

Manage chat messages and conversation history.

### Get All Messages

Retrieve all messages for a project, ordered chronologically.

**Method:** `MessageAPI.getAll(projectId)`

**Request:**
```javascript
const messages = await MessageAPI.getAll("550e8400-e29b-41d4-a716-446655440000");
```

**Response:**
```json
[
  {
    "id": "850e8400-e29b-41d4-a716-446655440005",
    "message": "Show me sales trends for Q4",
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T12:00:00Z",
    "from_user": true
  },
  {
    "id": "850e8400-e29b-41d4-a716-446655440006",
    "message": "I've generated a dashboard showing Q4 sales trends by region and product category.",
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T12:00:05Z",
    "from_user": false
  }
]
```

---

### Get Message by ID

Retrieve a specific message.

**Method:** `MessageAPI.getById(messageId)`

---

### Create Message

Create a new message.

**Method:** `MessageAPI.create(message)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | Message content |
| project_id | string | Yes | Project UUID |
| from_user | boolean | Yes | True if from user, false if AI response |

**Request:**
```javascript
const message = await MessageAPI.create({
  message: "Show me customer distribution",
  project_id: "550e8400-e29b-41d4-a716-446655440000",
  from_user: true
});
```

---

### Update Message

Update an existing message.

**Method:** `MessageAPI.update(messageId, updates)`

---

### Delete Message

Delete a message.

**Method:** `MessageAPI.delete(messageId)`

---

### Get Messages by Conversation

Retrieve messages for a specific conversation.

**Method:** `MessageAPI.getByConversation(conversationId)`

---

## Project Shares API

Manage shareable links for projects.

### Create Share Link

Generate a shareable link for a project.

**Method:** `ProjectSharesAPI.create(projectId)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | Project UUID |

**Request:**
```javascript
const shareToken = await ProjectSharesAPI.create("550e8400-e29b-41d4-a716-446655440000");
```

**Response:**
```json
"a1b2c3d4e5f6"
```

**Note:** If a share already exists, returns the existing token.

**Share URL Format:**
```
https://your-app.com/share/{shareToken}
```

---

### Get Project from Share Token

Retrieve project ID from a share token.

**Method:** `ProjectSharesAPI.getProjectIdFromToken(token)`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| token | string | Yes | Share token |

**Request:**
```javascript
const projectId = await ProjectSharesAPI.getProjectIdFromToken("a1b2c3d4e5f6");
```

**Response:**
```json
"550e8400-e29b-41d4-a716-446655440000"
```

**Status Codes:**
- `200 OK` - Valid token
- `404 Not Found` - Invalid or expired token

---

### Revoke Share Link

Revoke a project's share link.

**Method:** `ProjectSharesAPI.revoke(projectId)`

**Request:**
```javascript
await ProjectSharesAPI.revoke("550e8400-e29b-41d4-a716-446655440000");
```

**Status Codes:**
- `204 No Content` - Share revoked
- `404 Not Found` - No share exists

---

## AI Dashboard Generator (Edge Function)

Generate or modify dashboards using natural language with AI assistance.

### Endpoint

```
POST /functions/v1/call-perplexity
```

### Authentication

```
Authorization: Bearer <SUPABASE_ANON_KEY>
Content-Type: application/json
```

### Request Body

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| mode | string | Yes | Generation mode: "f1", "l1", "r1", or "r2" |
| query | string | Yes | Natural language prompt |
| chatHistory | array | No | Previous conversation history |
| structuredDataSource | object | No | User-uploaded data sources |
| previousWidgetsJSON | array | No | Existing widgets (for regeneration) |
| focusedWidgetsData | array | No | Specific widgets to modify (mode "r2") |

### Generation Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `f1` | Full generation with web data | Initial dashboard creation with external data |
| `l1` | Lightweight generation | Local-only generation without web fetching |
| `r1` | Regenerate entire dashboard | Modify dashboard based on follow-up prompt |
| `r2` | Modify specific widgets | Targeted widget updates |

### Request Example - Full Generation (f1)

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
      query: "Create a sales dashboard showing revenue trends by region for Q4 2024",
      structuredDataSource: {
        "sales.csv": {
          columns: ["region", "revenue", "date"],
          rows: [
            { region: "North", revenue: 120000, date: "2024-10-01" },
            { region: "South", revenue: 95000, date: "2024-10-01" }
          ]
        }
      }
    })
  }
);

const result = await response.json();
```

### Response

```json
{
  "widgets": [
    {
      "type": "BarChart",
      "data": {
        "title": "Revenue by Region Q4 2024",
        "categories": ["North", "South", "East", "West"],
        "series": [
          {
            "name": "Revenue",
            "data": [120000, 95000, 140000, 110000]
          }
        ]
      }
    },
    {
      "type": "KPI",
      "data": {
        "title": "Total Revenue",
        "value": 465000,
        "trend": 15.3
      }
    }
  ],
  "message": "Created a dashboard showing Q4 2024 revenue trends across all regions with a total revenue KPI.",
  "sources": [
    "https://example.com/market-data",
    "https://example.com/industry-report"
  ]
}
```

### Request Example - Regenerate Dashboard (r1)

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
      mode: "r1",
      query: "Add a pie chart showing product category breakdown",
      chatHistory: [
        { role: "user", content: "Create a sales dashboard" },
        { role: "assistant", content: "Created dashboard with revenue trends" }
      ],
      previousWidgetsJSON: [
        {
          type: "BarChart",
          data: { /* existing widget data */ }
        }
      ],
      structuredDataSource: { /* data sources */ }
    })
  }
);
```

### Request Example - Modify Specific Widgets (r2)

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
      mode: "r2",
      query: "Change the bar chart to show data as percentages",
      focusedWidgetsData: [
        {
          id: "widget-123",
          type: "BarChart",
          data: { /* current data */ }
        }
      ],
      previousWidgetsJSON: [ /* all widgets */ ],
      chatHistory: [ /* conversation history */ ]
    })
  }
);
```

### Supported Widget Types

| Widget Type | Description | Data Schema |
|------------|-------------|-------------|
| **LineChart** | Time-series line chart | `{ xAxis: string[], series: [{ name, data }] }` |
| **BarChart** | Categorical bar chart | `{ title, categories: string[], series: [{ name, data }] }` |
| **PieChart** | Pie/donut chart | `{ title, labels: string[], values: number[] }` |
| **AreaChart** | Area chart with fill | `{ title, xAxis: string[], series: [{ name, data }] }` |
| **PlotChart** | X-Y plot | `{ title, x: number[], y: number[] }` |
| **Histogram** | Distribution histogram | `{ title, bins: number[], counts: number[] }` |
| **ScatterPlot** | Scatter plot | `{ title, points: [{ x, y }] }` |
| **BoxPlot** | Box and whisker | `{ title, categories: string[], values: number[][] }` |
| **HeatMap** | 2D heatmap | `{ title, xLabels, yLabels, data: number[][] }` |
| **WordCloud** | Word cloud | `{ title, words: [{ text, value }] }` |
| **BubbleChart** | Bubble chart | `{ title, bubbles: [{ x, y, r }] }` |
| **Treemap** | Hierarchical treemap | `{ title, value, children: [{ name, value }] }` |
| **KPI** | Single metric | `{ title, value, trend? }` |
| **StatsCard** | Stat card with icon | `{ title, value, icon? }` |
| **Progress** | Progress indicator | `{ title, value, label? }` |
| **Table** | Data table | `{ title, columns: string[], rows: object[] }` |
| **Text** | Text content | `{ title, content }` |
| **SmallText** | Compact text | `{ title, content }` |
| **Image** | Image display | `{ title, src, alt? }` |
| **Timeline** | Event timeline | `{ title, events: [{ date, label }] }` |

### Status Codes

- `200 OK` - Dashboard generated successfully
- `400 Bad Request` - Invalid mode or missing required fields
- `401 Unauthorized` - Invalid API key
- `500 Internal Server Error` - AI service error

### Error Response

```json
{
  "error": "Invalid mode"
}
```

### Rate Limits

- 500 requests per minute
- Average response time: 2-5 seconds

---

## Data Models

### Project

```typescript
interface Project {
  id: string;                    // UUID
  name: string;                  // Project name
  description?: string;          // Optional description
  sources_number: number;        // Count of data sources
  widgets_number: number;        // Count of widgets
  created_at: string;            // ISO 8601 timestamp
  theme: string;                 // Theme identifier
  shared_with?: string[];        // Array of email addresses
}
```

### Data Source

```typescript
interface DataSource {
  id: string;                    // UUID
  created_at: string;            // ISO 8601 timestamp
  name: string;                  // Display name
  path: string;                  // Storage path or URL
  project_id: string;            // Parent project UUID
  is_link: boolean;              // True if external URL
  added_by_ai: boolean;          // True if added by AI
}
```

### Widget

```typescript
interface Widget {
  id: string;                    // UUID
  created_at: string;            // ISO 8601 timestamp
  name: string;                  // Display name
  data: JSON;                    // Widget-specific data
  widget_type: string;           // Widget type identifier
  customization_type: number;    // Customization level
  position: number;              // Display order
  project_id: string;            // Parent project UUID
}
```

### Message

```typescript
interface Message {
  id: string;                    // UUID
  message: string;               // Message content
  project_id: string;            // Parent project UUID
  created_at: string;            // ISO 8601 timestamp
  from_user: boolean;            // True if from user
}
```

### Dashboard Request

```typescript
interface DashboardRequestPayload {
  mode: "f1" | "l1" | "r1" | "r2";    // Generation mode
  query: string;                       // Natural language prompt
  chatHistory?: unknown;               // Conversation history
  structuredDataSource?: unknown;      // Data sources
  previousWidgetsJSON?: unknown;       // Existing widgets
  focusedWidgetsData?: unknown;        // Widgets to modify
}
```

---

## Automatic Documentation Tools

### Recommended Tools

#### 1. **Supabase Auto-Generated API Docs**
Supabase automatically generates OpenAPI-compliant documentation for your database API.

**Access:**
- Navigate to your Supabase Dashboard
- Go to API section → API Docs
- Auto-generated documentation based on your schema

**Features:**
- Interactive API explorer
- Automatic schema synchronization
- Code examples in multiple languages
- Authentication examples

---

#### 2. **TypeDoc** (For TypeScript Projects)
Generate documentation from TypeScript code and JSDoc comments.

**Installation:**
```bash
npm install --save-dev typedoc
```

**Configuration** (`typedoc.json`):
```json
{
  "entryPoints": ["./src"],
  "out": "./docs",
  "exclude": ["**/node_modules/**"],
  "theme": "default"
}
```

**Generate:**
```bash
npx typedoc
```

**Website:** https://typedoc.org/

---

#### 3. **Swagger/OpenAPI** (For Edge Functions)
Document REST APIs with OpenAPI specification.

**Installation:**
```bash
npm install swagger-jsdoc swagger-ui-express
```

**Example OpenAPI Spec:**
```yaml
openapi: 3.0.0
info:
  title: Dashboard API
  version: 1.0.0
paths:
  /call-perplexity:
    post:
      summary: Generate dashboard with AI
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DashboardRequest'
```

**Website:** https://swagger.io/

---

#### 4. **Docusaurus** (Documentation Website)
Create a full documentation website with versioning and search.

**Installation:**
```bash
npx create-docusaurus@latest docs classic
```

**Features:**
- Markdown-based documentation
- Built-in search
- Version management
- Custom React components
- Dark mode support

**Website:** https://docusaurus.io/

---

#### 5. **Postman** (API Testing & Documentation)
Create interactive API documentation with Postman Collections.

**Setup:**
1. Import OpenAPI spec or manually create collections
2. Add examples for each endpoint
3. Publish documentation publicly or privately

**Features:**
- Auto-generate code snippets
- Mock servers
- Automated testing
- Team collaboration

**Website:** https://www.postman.com/

---

#### 6. **Redoc** (OpenAPI Documentation Renderer)
Beautiful, responsive API documentation from OpenAPI specs.

**Installation:**
```bash
npm install redoc
```

**Usage:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>API Documentation</title>
  </head>
  <body>
    <redoc spec-url="./openapi.yaml"></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
  </body>
</html>
```

**Website:** https://redocly.com/redoc

---

#### 7. **Stoplight Studio** (API Design & Documentation)
Visual API designer with automatic documentation generation.

**Features:**
- Visual OpenAPI editor
- Mock servers
- API testing
- Style guides
- Hosted documentation

**Website:** https://stoplight.io/

---

### Documentation Workflow Recommendations

#### For This Project:

1. **Use Supabase Auto-Docs** for database API reference
2. **Add JSDoc comments** to TypeScript files
3. **Generate with TypeDoc** for code documentation
4. **Create OpenAPI spec** for Edge Functions
5. **Build docs site with Docusaurus** for public documentation
6. **Use Postman** for API testing and team sharing

#### Implementation Steps:

**Step 1: Add JSDoc Comments**
```typescript
/**
 * Creates a new project for the authenticated user
 * @param name - Project name (defaults to "Untitled Project")
 * @param description - Optional project description
 * @returns Promise resolving to the created Project
 * @throws {Error} If user is not authenticated
 * @example
 * ```typescript
 * const project = await ProjectsAPI.create("My Dashboard", "Q4 Analysis");
 * ```
 */
async create(name: string, description: string): Promise<Project>
```

**Step 2: Generate TypeDoc**
```bash
npm install --save-dev typedoc
npx typedoc --out ./docs/api ./src
```

**Step 3: Create OpenAPI Spec** (`openapi.yaml`)
```yaml
openapi: 3.0.0
info:
  title: Dashboard API
  version: 1.0.0
servers:
  - url: https://your-project.supabase.co/functions/v1
paths:
  /call-perplexity:
    post:
      summary: Generate AI-powered dashboard
      # ... (spec details)
```

**Step 4: Set Up Docusaurus**
```bash
npx create-docusaurus@latest docs classic
cd docs
npm start
```

**Step 5: Automate Documentation Updates**
Add to `package.json`:
```json
{
  "scripts": {
    "docs:generate": "typedoc",
    "docs:serve": "cd docs && npm start",
    "docs:build": "cd docs && npm build"
  }
}
```

---

### Maintenance Best Practices

1. **Version your API** - Use semantic versioning
2. **Document breaking changes** - Maintain a CHANGELOG.md
3. **Include migration guides** - Help users upgrade
4. **Provide code examples** - Real-world usage patterns
5. **Keep docs in sync** - Automate with CI/CD
6. **Test your examples** - Ensure code samples work
7. **Add search functionality** - Help users find information
8. **Monitor API usage** - Track which endpoints are used most

---

## Additional Resources

- **Supabase Documentation:** https://supabase.com/docs
- **Supabase JavaScript Client:** https://supabase.com/docs/reference/javascript
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **OpenAPI Specification:** https://spec.openapis.org/oas/latest.html

---

**Last Updated:** 2024-01-15
**API Version:** 1.0.0
**Documentation Version:** 1.0.0
