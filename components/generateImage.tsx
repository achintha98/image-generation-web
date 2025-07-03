"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Sparkles } from "lucide-react";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();

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
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-end pt-4">
          <div className="flex items-center gap-2 w-full max-w-xl">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2"
            />
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !selectedModel}
              variant={"outline"}
              className="relative z-20 cursor-pointer"
            >
              Generate Image <Sparkles size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImage;
