
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { topic, context, preference } = req.body;
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) {
        console.error("API Key missing");
        return res.status(500).json({ message: 'Server configuration error' });
    }

    // Construct prompt based on preference
    let promptInstructions = "";
    if (preference === 'visual') {
        promptInstructions = "Suggest the best YouTube video topic or animation to search for. Focus on visual explanations.";
    } else if (preference === 'reading') {
        promptInstructions = "Suggest a specific sub-topic or article title to read about. Focus on comprehensive text resources.";
    } else if (preference === 'example') {
        promptInstructions = "Suggest a practical real-world example or coding problem to practice. Focus on application.";
    } else {
        promptInstructions = "Suggest the best general resource topic.";
    }

    const prompt = `
    You are an expert tutor for CSIT (Computer Science) students.
    Task: Recommend a specific study resource for the topic "${topic}" in the context of "${context}".
    ${promptInstructions}
    
    Return strict JSON with two fields:
    1. "suggestion": A short, specific search query or title (max 10 words).
    2. "reason": A one-sentence explanation of why this fits the "${preference}" learning style.
    3. "link": A YouTube search URL (https://www.youtube.com/results?search_query=...) or Google search URL for the suggestion.

    JSON Response:
  `;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 150,
                        return_full_text: false,
                        temperature: 0.7,
                        stop: ["}"] // Stop explicitly at end of JSON
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HF Error:", errorText);
            throw new Error(`HF API responded with ${response.status}`);
        }

        const result = await response.json();
        let generatedText = result[0]?.generated_text || "";

        // Attempt to close JSON if cut off
        if (!generatedText.trim().endsWith("}")) {
            generatedText += "}";
        }

        // Clean up markdown code blocks if present
        generatedText = generatedText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Specific fix for potential trailing commas or bad format
        try {
            const parsed = JSON.parse(generatedText);
            return res.status(200).json(parsed);
        } catch (e) {
            console.error("JSON Parse Error on:", generatedText);
            // Fallback if JSON generation fails (common with smaller models)
            return res.status(200).json({
                suggestion: `${topic} Tutorial`,
                reason: `Based on your request for ${topic}, this is a recommended search.`,
                link: `https://www.google.com/search?q=${encodeURIComponent(topic + " tutorial")}`
            });
        }

    } catch (error) {
        console.error("Recommendation Error:", error);
        return res.status(500).json({ message: 'Failed to generate recommendation' });
    }
}
