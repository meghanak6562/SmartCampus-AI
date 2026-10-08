export default async function handler(req, res) {
  // Allow your GitHub Pages website to call this API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser permission check
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          model: "gemini-3.7-flash",
          system_instruction:
            "You are SmartCampus AI, a helpful AI assistant for college students. Answer campus-related questions clearly and simply. If the user asks about a specific campus detail that you do not know, say that you do not have that information rather than making it up. Be friendly, concise and useful.",
          input: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(response.status).json({
        error: "Gemini API request failed"
      });
    }

    // Get the generated text from the interaction
    const output =
      data.output_text ||
      data.steps
        ?.filter(step => step.type === "model_output")
        ?.flatMap(step => step.content || [])
        ?.filter(content => content.type === "text")
        ?.map(content => content.text)
        ?.join("") ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      reply: output
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong on the server."
    });
  }
}
