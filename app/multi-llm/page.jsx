"use client";

import { useState } from "react";
import Layout from "../components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const availableModels = [
  { id: "gpt4", name: "GPT-4" },
  { id: "gpt35", name: "GPT-3.5-turbo" },
  { id: "claude", name: "Claude" },
];

export default function MultiLLMInterface() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState({});
  const [selectedModels, setSelectedModels] = useState([]);
  const [isAddingModel, setIsAddingModel] = useState(false);

  const handleAddModel = (modelId) => {
    if (!selectedModels.includes(modelId)) {
      setSelectedModels((prev) => [...prev, modelId]);
    }
    setIsAddingModel(false);
  };

  const handleRemoveModel = (modelId) => {
    setSelectedModels((prev) => prev.filter((id) => id !== modelId));
    setResponses((prev) => {
      const newResponses = { ...prev };
      delete newResponses[modelId];
      return newResponses;
    });
  };

  const handleSubmit = async () => {
    const simulateApiCall = (model) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            `This is a simulated response from ${model} for the prompt: "${prompt}"`
          );
        }, 1000);
      });
    };

    const newResponses = {};
    for (const modelId of selectedModels) {
      const model = availableModels.find((m) => m.id === modelId);
      if (model) {
        newResponses[model.id] = await simulateApiCall(model.name);
      }
    }
    setResponses(newResponses);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Multi-LLM Interface</h1>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleSubmit}
            disabled={selectedModels.length === 0 || prompt.trim() === ""}
          >
            Submit to Selected Models
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedModels.map((modelId) => {
            const model = availableModels.find((m) => m.id === modelId);
            if (!model) return null;
            return (
              <Card key={model.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveModel(model.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={responses[model.id] || ""}
                    readOnly
                    className="min-h-[200px]"
                  />
                </CardContent>
              </Card>
            );
          })}
          <Card className="flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors h-full min-h-[300px]">
            <CardContent>
              <Dialog open={isAddingModel} onOpenChange={setIsAddingModel}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-full w-full flex flex-col items-center justify-center"
                  >
                    <Plus className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Model</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select a Model</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {availableModels
                      .filter((model) => !selectedModels.includes(model.id))
                      .map((model) => (
                        <Button
                          key={model.id}
                          onClick={() => handleAddModel(model.id)}
                          variant="outline"
                          className="justify-start"
                        >
                          {model.name}
                        </Button>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
