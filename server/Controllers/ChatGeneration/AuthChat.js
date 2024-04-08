const { Groq } = require("groq-sdk");
require('dotenv')


const groq = new Groq({
    apiKey: process.env.groqapi
});

// Function to generate an estate plan based on user input
async function generateEstatePlan(assetData, userResponse) {
    try {

        let assetInfo = "";
        for (const category in assetData) {
            assetInfo += `${category.toUpperCase()}:\n`;
            if (Array.isArray(assetData[category])) {
                assetData[category].forEach(item => {
                    const { Name, Assignment, Value, OptString } = item;
                    assetInfo += `- Name: ${Name}\n`;
                    assetInfo += `  Assignment: ${Assignment}\n`;
                    assetInfo += `  Value: ${Value}\n`;
                    assetInfo += `  OptString: ${OptString}\n`;
                });
            } else {
                assetInfo += '- No items found\n';
            }
            assetInfo += '\n'; 
        }

        // Concatenate questions and user response
        const questionConcat = "Questions:\n0) What are your assets?\n1) Who do you want to inherit your assets?\n2) Do you have preferences for your end-of-life care?\n3) Who do you trust to make decisions on your behalf?";
        const answerConcat = `Answers:\n0) ${assetInfo}\n${userResponse}`;

        // Create a completion request to the Groq API
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert estate planning attorney. Your task is to draft a professional estate plan that will be submitted to the state:" },
                { role: "assistant", content: questionConcat },
                { role: "user", content: answerConcat }
            ],
            model: "mixtral-8x7b-32768",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
            stream: false
        });

        // Extract and return the generated estate plan from the completion
        const estatePlan = completion.choices[0]?.message?.content || "";
        return estatePlan;
    } catch (error) {
        console.error("Error generating estate plan:", error);
        throw error; // Propagate the error to the caller
    }
}

const apiCompletion = async (req, res) => {
    try {
        const { asset, message } = req.body;

        const estatePlan = await generateEstatePlan(asset, message);

        console.log("Generated Estate Plan:", estatePlan);

        return res.status(200).json({ status: true, estatePlan });
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ status: false, error: "Internal server error" });
    }
};

module.exports = { apiCompletion };
