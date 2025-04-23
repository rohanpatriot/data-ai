# 🧠 PerplexiGrid

**PerplexiGrid** is an interactive AI research canvas powered by Perplexity’s Sonar API. Inspired by tools like Miro and Notion, PerplexiGrid combines free-form visual creativity with real-time AI chat and data visualization capabilities. Users can click anywhere on the canvas to spawn contextual AI-powered chat inputs that generate insightful, dynamic visual elements — bar charts, tables, summaries, and more — all tied to live queries and citations using Perplexity's cutting-edge reasoning API.

## 🚀 Features

- ⚡️ **Grid-based whiteboard canvas**  
  - Interactable grid that supports zooming, panning, and snapping for intuitive visual layout design.
- 💬 **Click-to-chat AI interface**  
  - Spawn a chat input by clicking anywhere on the canvas. Supports natural language prompts like:  
    “Show a bar chart of Bitcoin transactions over the past 3 months by week.”
- 📊 **Dynamic visualizations**  
  - Charts and visual components are generated in-place and anchored to user-selected positions. Currently using mock data, later upgraded via Perplexity Sonar.
- 🪄 **Drag, resize, move**  
  - Miro-style UX for manipulating components. Prevents overlapping and aligns them to a defined grid system.
- 🗺 **Composable dashboards**  
  - Build dashboards by arranging multiple generated elements and saving layout state.
- ⌨️ **Keyboard interaction & UX polish**  
  - ESC to dismiss, clicking outside closes modals, intelligent anchor positioning, and cursor improvements for a smooth experience.

## 🧠 How Sonar API Is Used

PerplexiGrid integrates with **Perplexity’s Sonar Reasoning API** to allow:
- Natural language questions answered in real-time
- AI-generated insights for data summarization and exploratory visualizations
- Potential for follow-up interactions (planned using Sonar Reasoning Pro)

The user provides a prompt through a chat bubble, which is sent to Sonar. The response is parsed for type (e.g. visualization, summary, link), and rendered into a corresponding UI component.

In the production version, we’ll use the following Sonar endpoints:
- `sonar.research.query()` — to handle custom data retrieval or explanation
- `sonar.reasoning()` — for follow-up chains, context-aware enhancements

## 🛠️ Tech Stack

- **Frontend:** React + Vite + TailwindCSS
- **Canvas Layer:** `react-grid-layout` + `react-resizable` for grid anchoring and UI precision
- **Visualization:** `Recharts` for data-driven visual components (charts, tables, etc.)
- **State Management:** Zustand (lightweight, scalable)
- **API Layer:** Axios + Perplexity Sonar API (via secure API key)

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/perplexigrid.git
   cd perplexigrid
   ```
2. Install dependenices
    ```bash
    npm install
    ```
3. Add your .env: (STILL NOT IMPLEMENTED)
    ```bash
    VITE_SONAR_API_KEY=your_perplexity_api_key_here
    ```
4. Start the dev server and have fun :)
    ```bash
    npm run dev
    ```

    ## 🧪 Usage Guide

- Click anywhere on the whiteboard → a chat bubble appears.
- Type a natural query, like:
  > "Give me a pie chart of top 5 most spoken languages in 2023"
- Hit Enter → a new visualization is generated right where you clicked.
- Resize, drag, or delete as needed.
- ESC or outside-click closes the current bubble.

## 🎯 Future Roadmap

- [ ] Full Sonar API integration with live internet results
- [ ] Save/load dashboards via Supabase or Firebase
- [ ] Shareable links for collaborative mode
- [ ] Component palette for different types: charts, text, citations, code, etc.
- [ ] Export as PDF or image for reports
- [ ] Connect to a Datasource

## 🧑‍⚖️ Hackathon Submission Notes

- Project Category: **Still thinking tbh**
- Sonar Features Used:
  - Sonar Reasoning
  - Sonar Deep Research (planned for next iteration)
- Dev Stack: React (Vite) + Tailwind + Recharts + Zustand + Perplexity API
- Submission includes:
  - Demo video [Soon to come :)]
  - Private repo shared with:  
    `james.liounis@perplexity.ai` and `testing@devpost.com`

## 💡 Inspiration

The idea came from imagining a “Perplexity meets Miro” product, a canvas for thinkers and professionals to organize thoughts, generate insights, and build dashboards or knowledge maps, all powered by real-time research and AI reasoning.

## 🙌 Contributors

- **Petar [@yourhandle]** – Developer, Designer, Prompt Magician  
- Powered by [Perplexity AI](https://www.perplexity.ai)

## 📄 License

MIT License