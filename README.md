![image](https://github.com/user-attachments/assets/8b614a14-1511-4407-9617-d92527854b0f)

[![Go to Website](https://img.shields.io/badge/Go_to_Website-%238200FF?style=for-the-badge&labelColor=212529)](https://perplexigrid.framer.website/)

PerplexiGrid is an analytics tool that enables rapid dashboard creation by combining your datasources with live web search. Built as a Perplexity API wrapper, it transforms natural language queries into interactive visual dashboards in seconds. Think of it as Perplexity for Analytics Dashboards.

## What's under the hood of PerplexiGrid?

PerplexiGrid leverages the **Sonar API** from Perplexity to scrape relevant web data and transform it into structured, valuable insights. Users can create projects, generate dashboards through conversational prompts, and refine visualizations through a collaborative interface.

## Core Functionality & Features

### 🤖 AI-Powered Dashboard Generation

- Natural language to dashboard conversion
- Intelligent widget type selection
- Automatic data validation and cleaning

### 🎨 Advanced Customization

- 3-tier customization system (Basic/Moderate/Advanced)
- Multiple theme presets with live preview
- Drag-and-drop grid layout system

### 👥 Collaboration Features [ Coming soon ]

- Real-time multi-user editing
- Project sharing and permissions
- Chat-based dashboard refinement

### 📤 Export & Sharing

- PDF export with custom layouts
- High-quality image generation
- Shareable dashboard links
- Version history tracking (Coming soon)

## Technical Implementation

- **Data Visualization**: Apache **ECharts**
- **Frontend**: **React + Vite + Material-UI**
- **Backend**: **Supabase + Express.js**

## Tech Stack

**Frontend:**

- React 19 + TypeScript
- Vite (build tool)
- Material-UI (MUI)
- ECharts + echarts-for-react (data visualization)
- React Grid Layout (dashboard layout)
- Motion (animations)
- React Router DOM

**Backend & Database:**

- Supabase (PostgreSQL database + authentication)
- Express.js (minimal API server)
- Perplexity Sonar API integration

**Additional Libraries:**

- html2canvas + jsPDF (export functionality)
- echarts-wordcloud (word cloud widgets)

## Supported Visualizations (25+ Widget Types)

### Charts & Analytics

- **Basic Charts**: Line, Bar, Pie, Area, Scatter Plot
- **Advanced Charts**: Box Plot, Histogram, Heat Map, Bubble Chart, Treemap
- **Specialized**: Word Cloud, Timeline, Plot Chart

### Metrics & KPIs

- **Performance Metrics**: KPI Cards, Stats Cards, Progress Bars
- **Gauges**: Gauge Charts for performance indicators

### Data Display

- **Tables**: Interactive data tables
- **Text Widgets**: Rich text, small text displays
- **Media**: Image widgets, interactive maps

## Usage Flow

1. Create a new project
2. Type a natural language query like "Create a dashboard analyzing renewable energy adoption rates in Europe"
3. Review the auto-generated dashboard with multiple widgets
4. Rearrange widgets by dragging them across the grid
5. Select any widget to customize or refine through follow-up prompts
6. Invite collaborators to enhance the dashboard through chat
7. Type some more
8. Have a quick coffee break
9. Iterate

## Sonar API Integration

PerplexiGrid uses Perplexity's Sonar API in several key ways:

- [ Description coming soon! ]

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Perplexity API key
- Supabase account

### Environment Setup

1. **Clone and install:**

```bash
git clone https://github.com/PetarRan/perplexigrid.git
cd perplexigrid

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install

# Create a .env file in the server directory and add your Supabase and Perplexity API keys
touch .env
# Add your Supabase and Perplexity API keys to the .env file
echo "SUPABASE_URL=your_supabase_url" >> .env
echo "SUPABASE_KEY=your_supabase_key" >> .env
echo "PERPLEXITY_API_KEY=your_perplexity_api_key" >> .env
```

2. **Start the development server:**

```bash
# Start the client
cd client && npm run dev
# Start the server
cd ../server && npm start
```

3. **Open the app:**
   Open your browser and navigate to `localhost:5173` to access PerplexiGrid.

## 🏆 Hackathon Submission

**Perplexity Sonar API Hackathon 2025**

- **Category**: Best Deep Research Project && Most Fun / Creative Project
- **Innovation**: First AI-powered dashboard generator using Sonar API
- **Team**: Peter ([@PetarRan](https://github.com/PetarRan)) & Alessandro ([@AlessandroDodi](https://github.com/AlessandroDodi))
- **Demo**: [We are live!!! Try it out.](https://perplexigrid.framer.website/)
- **Submission**: Private repository shared with hackathon organizers (`james.liounis@perplexity.ai`, `vikvang`, `pplx-judges` and `testing@devpost.com`)

### What Makes PerplexiGrid Special

- **Novel Use Case**: First implementation of Sonar API for dashboard generation
- **Technical Innovation**: AI-driven widget selection and data validation
- **User Experience**: Natural language interface for complex data visualization
- **Scalability**: Modular widget system supporting 25+ visualization types

## License

MIT License
