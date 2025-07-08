"use client";

import React, { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Sparkles } from "lucide-react";

interface TModel {
  id: string;
  name: string;
  thumbnail: string;
}

const GenerateImage = () => {
  const scrollRef = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [models, setModels] = useState<TModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();

  // const models = [
  //   { id: "model1", name: "DreamShaper", image: "/models/dreamshaper.jpg" },
  //   {
  //     id: "model2",
  //     name: "RealisticVision",
  //     image: "/models/realisticvision.jpg",
  //   },
  //   { id: "model3", name: "AnimeStyle", image: "/models/anime.jpg" },
  //   { id: "model4", name: "Artistic", image: "/models/artistic.jpg" },
  //   { id: "model5", name: "3D Render", image: "/models/3d.jpg" },
  //   { id: "model6", name: "Cinematic", image: "/models/cinematic.jpg" },
  //   // Add more as needed
  // ];

  const handleGenerate = async () => {
    if (!prompt || !selectedModel) return;

    setIsGenerating(true);
    try {
      const token = await getToken();
      await axios.post(
        `${BACKEND_URL}/ai/generate`,
        {
          prompt,
          modelId: selectedModel,
          num: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Image generation started!");
      setPrompt("");
    } catch (error) {
      console.log(error, "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${BACKEND_URL}/ai/models`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.models?.length) {
          setModels(response.data.models);
          setSelectedModel(response.data.models[0].id);
        } else {
          console.warn("No models received from backend.");
        }
      } catch (error) {
        console.error("Failed to fetch models:", error);
        // Optionally show an error state in UI
      }
    })();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Model Selector */}
      <div className="space-y-3">
        <div className="text-2xl font-semibold">Select Model</div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth scroll-px-4 snap-x snap-mandatory max-w-4xl"
        >
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`flex-shrink-0 w-40 snap-start cursor-pointer rounded-lg p-2 border-2 transition duration-200 ${
                selectedModel === model.id
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <div className="text-sm font-medium text-center">
                {model.name}
              </div>
            </div>
          ))}
        </div>
        <div></div>
        {/* Prompt Input + Button */}
        <div className="flex items-center gap-3 mt-20">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            disabled={isGenerating || !prompt || !selectedModel}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50"
          >
            Generate Image <Sparkles size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default GenerateImage;
