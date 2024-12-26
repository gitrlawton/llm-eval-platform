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

export const ExperimentProvider = ({ children }) => {
  const [experiments, setExperiments] = useState([]);
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
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
