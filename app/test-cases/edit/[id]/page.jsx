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
import { useExperiments, TestCase } from "../../../contexts/ExperimentContext";

export default function EditTestCase({ params }) {
  const router = useRouter();
  const { testCases, updateTestCase } = useExperiments();
  const [testCase, setTestCase] = useState(null);

  useEffect(() => {
    const foundTestCase = testCases.find((tc) => tc.id === params.id);
    if (foundTestCase) {
      setTestCase(foundTestCase);
    } else {
      router.push("/test-cases");
    }
  }, [params.id, testCases, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testCase) {
      updateTestCase(testCase.id, testCase);
      router.push("/test-cases");
    }
  };

  if (!testCase) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Test Case</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="user-message">User Message</Label>
            <Textarea
              id="user-message"
              value={testCase.userMessage}
              onChange={(e) =>
                setTestCase({ ...testCase, userMessage: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="expected-output">Expected Output</Label>
            <Textarea
              id="expected-output"
              value={testCase.expectedOutput}
              onChange={(e) =>
                setTestCase({ ...testCase, expectedOutput: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="grader-type">Grader Type</Label>
            <Select
              value={testCase.graderType}
              onValueChange={(value) =>
                setTestCase({ ...testCase, graderType: value })
              }
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
              value={testCase.tags.join(", ")}
              onChange={(e) =>
                setTestCase({
                  ...testCase,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
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
            <Button type="submit">Update Test Case</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
