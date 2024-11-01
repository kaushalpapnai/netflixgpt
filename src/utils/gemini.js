import { addMovieName, setError } from "../slices/geminiSlice";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = process.env.REACT_APP_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt, dispatch) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const movieARR = result.response.text().split(",");
        dispatch(addMovieName(movieARR));
    } catch (error) {
        console.error("Error:", error);
        // Handle the error, e.g., display an error message to the user
        dispatch(setError("An error occurred. Please try again later."));
    }
}

export default run;
