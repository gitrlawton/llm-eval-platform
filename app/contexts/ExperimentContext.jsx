"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

const ExperimentContext = createContext(undefined);

export const useExperiments = () => {
  const context = useContext(ExperimentContext);
  if (context === undefined) {
    throw new Error("useExperiments must be used within an ExperimentProvider");
  }
  return context;
};

const mockTestCases = [
  {
    id: "1",
    userMessage: "What is the capital of France?",
    expectedOutput: "The capital of France is Paris.",
    graderType: "exact",
    tags: ["geography", "cities"],
    createdAt: "2023-05-10",
  },
  {
    id: "2",
    userMessage: "Explain quantum computing in simple terms.",
    expectedOutput:
      "Quantum computing uses quantum mechanics principles to process information...",
    graderType: "llm",
    tags: ["science", "technology"],
    createdAt: "2023-05-12",
  },
];

const mockExperiments = [
  {
    id: "1",
    name: "GPT-4 Baseline",
    description: "Baseline experiment with GPT-4",
    model: "gpt-4",
    systemPrompt: "You are a helpful AI assistant.",
    testCases: mockTestCases,
    runs: [
      {
        id: "1",
        date: "2023-05-15",
        results: [
          {
            testCaseId: "1",
            score: 0.95,
            output: "The capital of France is Paris.",
          },
          {
            testCaseId: "2",
            score: 0.85,
            output:
              "Quantum computing uses quantum-mechanical phenomena such as superposition and entanglement to perform calculations.",
          },
        ],
        aggregateScore: 0.9,
      },
    ],
    status: "Completed",
  },
  {
    id: "2",
    name: "Claude Comparison",
    description: "Comparison experiment with Claude",
    model: "claude",
    systemPrompt: "You are Claude, an AI assistant created by Anthropic.",
    testCases: mockTestCases,
    runs: [],
    status: "Draft",
  },
  {
    id: "3",
    name: "GPT-3.5 Turbo Test",
    description: "Testing GPT-3.5 Turbo performance",
    model: "gpt-3.5-turbo",
    systemPrompt: "You are a helpful AI assistant.",
    testCases: mockTestCases,
    runs: [
      {
        id: "3",
        date: "2023-05-20",
        results: [
          {
            testCaseId: "1",
            score: 0.92,
            output: "The capital of France is Paris.",
          },
          {
            testCaseId: "2",
            score: 0.78,
            output:
              "Quantum computing uses quantum-mechanical phenomena such as superposition and entanglement to perform calculations.",
          },
        ],
        aggregateScore: 0.85,
      },
    ],
    status: "Completed",
  },
  {
    id: "4",
    name: "Claude-v1 Evaluation",
    description: "Evaluating Claude-v1 model",
    model: "claude-v1",
    systemPrompt: "You are Claude, an AI assistant created by Anthropic.",
    testCases: mockTestCases,
    runs: [
      {
        id: "4",
        date: "2023-05-22",
        results: [
          {
            testCaseId: "1",
            score: 0.98,
            output: "The capital of France is Paris.",
          },
          {
            testCaseId: "2",
            score: 0.88,
            output:
              "Quantum computing leverages quantum mechanical principles like superposition and entanglement to perform computations.",
          },
        ],
        aggregateScore: 0.93,
      },
    ],
    status: "Completed",
  },
];

export const ExperimentProvider = ({ children }) => {
  const [experiments, setExperiments] = useState(mockExperiments);
  const [testCases, setTestCases] = useState(mockTestCases);

  const addExperiment = (experiment) => {
    setExperiments((prevExperiments) => [...prevExperiments, experiment]);
  };

  const updateExperiment = (id, updatedExperiment) => {
    setExperiments((prevExperiments) =>
      prevExperiments.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperiment } : exp
      )
    );
  };

  const deleteExperiment = (id) => {
    setExperiments((prevExperiments) =>
      prevExperiments.filter((exp) => exp.id !== id)
    );
  };

  const addTestCase = (testCase) => {
    setTestCases((prevTestCases) => [...prevTestCases, testCase]);
  };

  const updateTestCase = (id, updatedTestCase) => {
    setTestCases((prevTestCases) =>
      prevTestCases.map((tc) =>
        tc.id === id ? { ...tc, ...updatedTestCase } : tc
      )
    );
  };

  const deleteTestCase = () => {
    setTestCases((prevTestCases) => prevTestCases.filter((tc) => tc.id !== id));
  };

  const runExperiment = async (id) => {
    // Set experiment status to Running
    setExperiments((prevExperiments) =>
      prevExperiments.map((exp) =>
        exp.id === id ? { ...exp, status: "Running" } : exp
      )
    );

    // Simulate experiment run
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock results
    const experiment = experiments.find((exp) => exp.id === id);
    if (experiment) {
      const newRun = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        results: experiment.testCases.map((tc) => ({
          testCaseId: tc.id,
          score: Math.random(),
          output: `Mock output for test case: ${tc.userMessage}`,
        })),
        aggregateScore: Math.random(),
      };

      // Update experiment with new run and set status to Completed
      setExperiments((prevExperiments) =>
        prevExperiments.map((exp) =>
          exp.id === id
            ? { ...exp, runs: [...exp.runs, newRun], status: "Completed" }
            : exp
        )
      );
    }
  };

  return (
    <ExperimentContext.Provider
      value={{
        experiments,
        testCases,
        addExperiment,
        updateExperiment,
        deleteExperiment,
        addTestCase,
        updateTestCase,
        deleteTestCase,
        runExperiment,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
