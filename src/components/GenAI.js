import {  useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvervaultCard} from "./ui/evervault-card";
import { BackgroundGradient } from "./ui/background-gradient";
import ShootingStars from "./ui/shootingstars";
import StarsBackground from "./ui/stars-background";

function GamedevAI() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyACHRZp8xni8_If55wtKfa5_S2fWRfMi2c"
  );
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to the Mystery Game! Choose your subject and difficulty to start. You can select any subject that comes to your mind, yk!" },
  ]);
  const [input, setInput] = useState("");
  const [gameState, setGameState] = useState({ subject: null, difficulty: null });

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat history
    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    setLoading(true);

    // Handle game state and AI response
    if (!gameState.subject || !gameState.difficulty) {
      handleGameSetup(input);
    } else {
      await handleGameInteraction(input);
    }

    setLoading(false);
  };

  // Handle game setup (subject and difficulty selection)
  const handleGameSetup = (userInput) => {
    if (!gameState.subject) {
      setGameState((prevState) => ({ ...prevState, subject: userInput }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Great! Now choose a difficulty: Easy, Medium, or Hard." },
      ]);
    } else if (!gameState.difficulty) {
      setGameState((prevState) => ({ ...prevState, difficulty: userInput }));
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Awesome! Let's start the mystery game. Type 'begin' to start your adventure." },
      ]);
    }
  };

  // Handle game interaction with AI
  const handleGameInteraction = async (userInput) => {
    if (userInput.toLowerCase() === "begin") {
      const initialPrompt = `
        You are a detective solving a mystery related to ${gameState.subject} at a ${gameState.difficulty} level.
        Start the story with an intriguing plot and ask the user how they want to proceed. 
        The mystery should contain puzzles related to ${gameState.subject}, which the user as to solve. 
        The user must use theoretical knowledge related to that subject and may apply some formulas. 
        Set the story in any part of the world. 
        Keep the responses short and precise so that the user doesn't get bored. 
        The user must find the game very interactive.
      `;
      const botResponse = await generateAIResponse(initialPrompt);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    } else {
      const userResponsePrompt = `
        Continue the mystery based on the user's input: "${userInput}". 
        Provide one clue or one challenge at a time and ask questions to engage the user. Let the user know if the user is going in the right path.
      `;
      const botResponse = await generateAIResponse(userResponsePrompt);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    }
  };

  // Generate AI response
  const generateAIResponse = async (prompt) => {
    try {
      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setApiData(text);
      setLoading(false);

      if (result && result.response) {
        const text = await result.response.text();
        return text;
      } else {
        return "Sorry, I couldn't generate a response.";
      }
    } catch (error) {
      console.error("Error generating content:", error);
      return "An error occurred while generating the response.";
    }
  };

  const formatResponse = (text) => {
    // Split the text into paragraphs
    const paragraphs = text.split("\n").filter((para) => para.trim() !== "");
  
    return paragraphs.map((paragraph, index) => {
      // Replace **text** with <strong>text</strong>
      const boldFormatted = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
      // Replace _text_ with <em>text</em>
      const italicFormatted = boldFormatted.replace(/_(.*?)_/g, "<em>$1</em>");
  
      // Check if the paragraph starts with a number (for options)
      const isOption = /^\d+\.\s/.test(paragraph);
      return (
        <p
          key={index}
          className={`mb-2 ${isOption ? "font-semibold" : ""}`}
          dangerouslySetInnerHTML={{ __html: italicFormatted }}
        />
      );
    });
  };
  
  return (
    <div className="flex flex-col gap-5 block items-center justify-center min-h-screen bg-black">
      <ShootingStars />
      <StarsBackground />
      <EvervaultCard text="Do you have the skills to play, Detective?"/>
      <div className="z-10">
        <div className="p-4 chatbox max-h-80 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, index) => (
            <BackgroundGradient className="rounded-[22px] max-w-sm sm:p-10 bg-white"
              key={index}
            >
              {msg.sender === "bot" ? formatResponse(msg.text) : <span>{msg.text}</span>}
            </BackgroundGradient>
          ))}
          {loading && (
            <BackgroundGradient className="rounded-[22px] max-w-sm sm:p-10 bg-white">
              Generating response...
            </BackgroundGradient>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className=""
          />
          <button             
          type="submit"
          disabled={loading}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Send</span>
            </button>
        </form>
      </div>
    </div>
  );
}
export default GamedevAI;