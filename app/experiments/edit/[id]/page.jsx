"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useExperiments,
  Experiment,
  TestCase,
} from "../../../contexts/ExperimentContext";
import { PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const availableTestCases = [
  {
    id: "1",
    userMessage: "What is the capital of France?",
    expectedOutput: "The capital of France is Paris.",
    graderType: "exact",
  },
  {
    id: "2",
    userMessage: "Explain quantum computing",
    expectedOutput: "Quantum computing uses quantum-mechanical phenomena...",
    graderType: "llm",
  },
  {
    id: "3",
    userMessage: "List three primary colors",
    expectedOutput: "The three primary colors are red, blue, and yellow.",
    graderType: "partial",
  },
];

export default function EditExperiment({ params }) {
  const router = useRouter();
  const { experiments, updateExperiment } = useExperiments();
  const [experiment, setExperiment] = useState(null);
  const [isAddingTest, setIsAddingTest] = useState(false);

  useEffect(() => {
    const foundExperiment = experiments.find((exp) => exp.id === params.id);
    if (foundExperiment) {
      setExperiment(foundExperiment);
    } else {
      // Handle case where experiment is not found
      router.push("/");
    }
  }, [params.id, experiments, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (experiment) {
      updateExperiment(experiment.id, experiment);
      router.push("/");
    }
  };

  const handleAddTest = (testCase) => {
    if (experiment) {
      setExperiment({
        ...experiment,
        testCases: [...experiment.testCases, testCase],
      });
    }
    setIsAddingTest(false);
  };

  const handleRemoveTest = (testId) => {
    if (experiment) {
      setExperiment({
        ...experiment,
        testCases: experiment.testCases.filter((tc) => tc.id !== testId),
      });
    }
  };

  if (!experiment) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Experiment</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="experiment-name">Experiment Name</Label>
            <Input
              id="experiment-name"
              value={experiment.name}
              onChange={(e) =>
                setExperiment({ ...experiment, name: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={experiment.description}
              onChange={(e) =>
                setExperiment({ ...experiment, description: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Select
              value={experiment.model}
              onValueChange={(value) =>
                setExperiment({ ...experiment, model: value })
              }
            >
              <SelectTrigger id="model" className="mt-1">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              value={experiment.systemPrompt}
              onChange={(e) =>
                setExperiment({ ...experiment, systemPrompt: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label>Test Cases</Label>
            <div className="mt-1 space-y-2">
              {experiment.testCases.map((testCase) => (
                <div
                  key={testCase.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  <span>{testCase.userMessage}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTest(testCase.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Dialog open={isAddingTest} onOpenChange={setIsAddingTest}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add a Test
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select a Test Case</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {availableTestCases
                      .filter(
                        (tc) =>
                          !experiment.testCases.some(
                            (existingTc) => existingTc.id === tc.id
                          )
                      )
                      .map((testCase) => (
                        <Button
                          key={testCase.id}
                          variant="outline"
                          onClick={() => handleAddTest(testCase)}
                          className="justify-start"
                        >
                          {testCase.userMessage}
                        </Button>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Update Experiment</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
