const express = require("express");
const app = express();
const cors = require("cors");
const { systemPrompts } = require("./prompts");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

async function callPerplexityAPI(systemPrompt, messages) {
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${process.env.PPLX_API_KEY}`
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...messages
        ],
        temeperature: 0.2,
        top_p: 0.9,
        frequency_penalty: 1,
        presence_penalty: 0.5,
        stream: false,
        response_format: {
          type: "json_schema",
          json_schema: {
            schema: AnswerFormat.model_json_schema()
          },
      },
      })
    });

    return await response.json();
  } catch (error) {
    throw new Error(`Perplexity API Error: ${error.message}`);
  }
}

// Full prompt endpoint (f1)
app.post("/api/perplexigrid/f1", async (req, res) => {
  try {
    const { query, structuredDataSource } = req.body;
    const formattedPrompt = systemPrompts.f1
      .replace("{{userMessage}}", query || "")
      .replace("{{structuredDataSource}}", JSON.stringify(structuredDataSource || 'NONE', null, 2));

    const data = await callPerplexityAPI(formattedPrompt, [
      {
        role: "user",
        content: query || "Please create a dashboard with XYZ."
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Light prompt endpoint (l1)
app.post("/api/perplexigrid/l1", async (req, res) => {
  try {
    const { query, structuredDataSource } = req.body;
    const formattedPrompt = systemPrompts.l1
      .replace("{{userMessage}}", query || "")
      .replace("{{structuredDataSource}}", JSON.stringify(structuredDataSource || 'NONE', null, 2));

    const data = await callPerplexityAPI(formattedPrompt, [
      {
        role: "user",
        content: query,
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Response 1 endpoint (r1)
app.post("/api/perplexigrid/r1", async (req, res) => {
  try {
    const { query, previousWidgetsJSON, structuredDataSource } = req.body;
    const formattedPrompt = systemPrompts.r1
      .replace("{{previousWidgetsJSON}}", JSON.stringify(previousWidgetsJSON || 'NONE', null, 2))
      .replace("{{structuredDataSource}}", JSON.stringify(structuredDataSource || 'NONE', null, 2))
      .replace("{{userMessage}}", query || "");

    const data = await callPerplexityAPI(formattedPrompt, [
      {
        role: "user",
        content: query // "Please update the dashboard."
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Response 2 endpoint (r2)
app.post("/api/perplexigrid/r2", async (req, res) => {
  try {
    const { query, previousWidgetsJSON, focusedWidgetsData, structuredDataSource } = req.body;
    const formattedPrompt = systemPrompts.r2
      .replace("{{previousWidgetsJSON}}", JSON.stringify(previousWidgetsJSON || 'NONE', null, 2))
      .replace("{{structuredDataSource}}", JSON.stringify(structuredDataSource || 'NONE', null, 2))
      .replace("{{focusedWidgetsData}}", JSON.stringify(focusedWidgetsData || 'NONE', null, 2))
      .replace("{{userMessage}}", query || "");

    const data = await callPerplexityAPI(formattedPrompt, [
      {
        role: "user",
        content: query // "Please update the widget xyz or whatev."
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
