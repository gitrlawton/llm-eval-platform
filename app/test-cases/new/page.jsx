"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
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
import { useExperiments, TestCase } from "../../contexts/ExperimentContext";

export default function NewTestCase() {
  const router = useRouter();
  const { addTestCase } = useExperiments();
  const [userMessage, setUserMessage] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [graderType, setGraderType] = useState("exact");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestCase = {
      id: Date.now().toString(),
      userMessage,
      expectedOutput,
      graderType,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString().split("T")[0],
    };
    addTestCase(newTestCase);
    router.push("/test-cases");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Create New Test Case</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="user-message">User Message</Label>
            <Textarea
              id="user-message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Enter the user message"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="expected-output">Expected Output</Label>
            <Textarea
              id="expected-output"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              placeholder="Enter the expected output"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="grader-type">Grader Type</Label>
            <Select
              value={graderType}
              onValueChange={(value) => setGraderType(value)}
            >
              <SelectTrigger id="grader-type" className="mt-1">
                <SelectValue placeholder="Select a grader type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exact">Exact Match</SelectItem>
                <SelectItem value="llm">LLM Match</SelectItem>
                <SelectItem value="partial">Partial Match</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/test-cases")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Test Case</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
