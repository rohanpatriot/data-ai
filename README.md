![image](https://github.com/user-attachments/assets/8b614a14-1511-4407-9617-d92527854b0f)
<hr>

PerplexiGrid is an analytics tool that enables rapid dashboard creation by combining your datasources with live web search. Built as a Perplexity API wrapper, it transforms natural language queries into interactive visual dashboards in seconds. Think of it as Perplexity for Analytics Dashboards.

## What's under the hood of PerplexiGrid?

PerplexiGrid leverages the **Sonar API** from Perplexity to scrape relevant web data and transform it into structured, visual components. Users can create projects, generate dashboards through conversational prompts, and refine visualizations through a collaborative interface.

## Core Functionality

- **Instant Dashboard Generation**: Convert natural language queries into complete dashboards with multiple visualization widgets
- **Mixed Data Sources**: Combine your own data with real-time web information via Perplexity's Sonar API
- **Collaborative Workspace**: Invite team members to develop dashboards together through a shared chat interface
- **Flexible Layout System**: Rearrange widgets on a grid canvas with drag-and-drop functionality
- **Widget Customization**: Select and edit individual widgets without affecting the entire dashboard
- **Quick Editor**: Modify widget appearance and settings through an intuitive interface

## Technical Implementation

- **Frontend**: React + Vite + MUI + more soon...
- **Canvas System**: React Grid Layout for precise widget positioning
- **Data Visualization**: Recharts(or d3js!) library for responsive charts and graphs
- **API Integration**: Perplexity Sonar API for web-based research and reasoning + our own Engine for turning data into insights

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

- **Research-Driven Visualization**: Converting web search results into structured data formats
- **Contextual Understanding**: Maintaining conversation context for follow-up queries and refinements
- **Multi-Modal Output**: Transforming search results into appropriate visualization types based on data characteristics

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/perplexigrid.git
cd perplexigrid

# navigate to server and start it
cd server
node index.js

cd ..

# navigate to client and Install dependencies
cd client
npm install

# Add your Perplexity API key
# Create a .env file with:
VITE_SONAR_API_KEY=your_perplexity_api_key_here

# Start the development server
npm run dev
```

## Some more feature we are doing

- Dashboard export functionality (PDF, image, shareable links)
- Advanced data source connections (spreadsheets, APIs, JSON)
- Custom widget creation
- Template library for common dashboard types
- Version history and change tracking

## Hackathon Submission Notes

This project was developed for the Sonar API hackathon as an exploration of Perplexity's Sonar API capabilities for data visualization and analytics.

- **Category**: [Still thinking]
- **Team**: Peter ([@PetarRan](https://github.com/PetarRan)) & Alessandro ([@AlessandroDodi](https://github.com/AlessandroDodi))
- **Repository**: Private, shared with `james.liounis@perplexity.ai` and `testing@devpost.com` as per the hackathon rulebook.

## License

MIT License
