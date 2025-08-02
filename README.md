![image](https://github.com/user-attachments/assets/8b614a14-1511-4407-9617-d92527854b0f)

[![Go to Website](https://img.shields.io/badge/Go_to_Website-%238200FF?style=for-the-badge&labelColor=212529)](https://www.perplexigrid.com/)

![Powered by Perplexity](https://img.shields.io/badge/Powered%20by%20Perplexity%20Sonar%20API-000000?style=for-the-badge&logo=perplexity&logoColor=088F8F)

### Featured on the official [perplexity.ai sonar api cookbook](https://docs.perplexity.ai/cookbook/showcase/perplexigrid)!

**PerplexiGrid** is an analytics tool that enables rapid dashboard creation by combining your datasources with live web search. Built as a Perplexity Sonar API wrapper, it transforms natural language into interactive dashboards, instantly!

> _Think of it as the first Data Visualization Platform built on and FOR Perplexity._

## What's Under the Hood?

PerplexiGrid uses **Sonar API** to fetch relevant web data and convert it into structured insights. Users can:

- Create projects
- Prompt dashboards with natural language
- Refine them through a collaborative interface

## ⚙️ Core Features

### AI-Powered Dashboard Generation
- Convert natural language into dashboards
- Smart widget type selection
- Automatic data validation & cleaning

### Visual & Interactive
- Theme presets with live preview
- Drag-and-drop grid layout

### Collaboration [*Coming Soon*]
- Didn't make it in time for the submission!
- Real-time multi-user editing
- Project sharing & permissions
- Chat-based widget refinement

### Export & Share
- PDF exports with custom layouts
- High-res image generation
- Shareable dashboard links
- Export lone widgets
- Version history [*Coming Soon*]

## 🛠️ Technical Stack

| Layer        | Stack                                                     |
|--------------|-----------------------------------------------------------|
| Frontend     | React + Vite + Material-UI + ECharts                      |
| Backend      | Supabase + Express.js                                     |
| AI Engine    | Perplexity Sonar API                                      |
| Visuals      | Apache ECharts + echarts-for-react + Motion              |
| Auth & DB    | Supabase (PostgreSQL + Auth)                              |

## 📊 Supported Visualizations (25+ Widget Types)

### Charts
- Line, Bar, Pie, Area, Scatter, Bubble
- Histogram, Box Plot, Heatmap, Treemap
- Timeline, Plot, Word Cloud

### Metrics
- KPI Cards, Stat Cards, Gauges, Progress Bars

### Data Display
- Interactive Tables, Rich Text, Maps, Image Widgets

## Usage Flow

1. Create a new project
2. Ask: _“Create a dashboard analyzing renewable energy in Europe”_
3. Let it generate widgets with live data
4. Drag, drop, and rearrange your layout
5. Refine via prompt
6. Have some coffee while it's done
7. Share, style, export — or prompt some more!
8. Repeat!

## 🤖 How We Use the Sonar API

PerplexiGrid turns prompts into dashboards using precise API calls with advanced model parameters:

```ts
{
  temperature: 0.2,
  top_p: 0.9,
  frequency_penalty: 1,
  presence_penalty: 0.5,
  stream: false,
  response_format: {
    type: "json_schema",
    json_schema: {
      schema: AnswerFormat.model_json_schema()
    }
  }
}
```

### Custom Prompts = Structured Output

Our system prompt acts like a contract: it tells the model what to return and how. We’ve essentially instructed it to always produce:
- A valid JSON schema  
- Widget types matched to data types  
- Clean, structured output you can plug directly into ECharts  

This is the core secret sauce. You’re not just “asking questions” — you’re programming through prompting.

### Parameter Control = Precision

You’re leveraging model controls to eliminate noise:
- `temperature: 0.2` gives deterministic, reusable results  
- `frequency_penalty: 1` reduces repetition (like repeating “Bar Chart” 3 times)  
- `search_recency_filter` + `web_search_options` = up-to-date insights

## Sonar API Integration

PerplexiGrid uses Perplexity's Sonar API in several key ways:

- **Full-Featured Dashboard Generation (f1)**: Leverages Sonar-pro's advanced capabilities to create comprehensive dashboards with 25+ widget types, including charts, KPIs, and data tables. This mode supports web data fetching and combines user-provided data with live sources.

```javascript
// Example f1 call
fetch("http://localhost:3000/api/perplexigrid/f1", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "Create a dashboard analyzing global AI investment trends in 2024",
    structuredDataSource: {
      investments: [
        { sector: "AI", amount: 500000000, quarter: "Q1" },
        { sector: "AI", amount: 750000000, quarter: "Q2" },
      ],
    },
  }),
});
```

- **Lightweight Embedded Mode (l1)**: Optimized for embedded systems and real-time applications, this mode generates ECharts-compatible visualizations using only provided data sources, ensuring fast rendering and minimal resource usage.

- **Interactive Dashboard Updates (r1)**: Enables dynamic dashboard modifications through natural language, allowing users to refine and expand existing visualizations while maintaining context from previous interactions.

- **Focused Widget Refinement (r2)**: Provides precise control over individual widgets, supporting targeted updates to specific visualizations while preserving the overall dashboard structure.

### Key Integration Features:

- **Natural Language Processing**: Transforms user queries into structured dashboard specifications  
- **Smart Widget Selection**: Automatically chooses appropriate visualization types based on data characteristics  
- **Data Validation**: Ensures numeric values, dates, and categorical data meet widget-specific requirements  
- **Context Awareness**: Maintains conversation history for coherent dashboard evolution  
- **Real-time Updates**: Supports immediate visualization updates based on user feedback

### API Implementation:

- Uses Sonar Pro model for advanced natural language understanding  
- Supports both static and dynamic data sources  
- Maintains consistent JSON schema across all response types

## 🚀 Quick Start

### Prerequisites

- Node.js 18+  
- Perplexity API key  
- Supabase account (Reach out to us if you wish to recreate our DB)

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
echo "PPLX_API_KEY=your_perplexity_api_key" >> .env
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

- **Category**: Best Finance Project && Most Fun / Creative Project
- **Innovation**: First AI-powered dashboard generator using Sonar API!!!!!
- **Team**: Peter ([@PetarRan](https://github.com/PetarRan)) & Alessandro ([@AlessandroDodi](https://github.com/AlessandroDodi))  
- **Demo**: [We are live!!! Try it out.](https://perplexigrid.framer.website/)  
- **Submission**: Private repository shared with hackathon organizers (`james.liounis@perplexity.ai`, `vikvang`, `pplx-judges`, `testing@devpost.com`)

### What Makes PerplexiGrid Special

- **Novel Use Case**: First implementation of Sonar API for dashboard generation  
- **Technical Innovation**: AI-driven widget selection and data validation  
- **User Experience**: Natural language interface for complex data visualization  
- **Scalability**: Modular widget system supporting 25+ visualization types
