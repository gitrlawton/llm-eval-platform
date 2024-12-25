"use client";

import React, { createContext, useState, useContext } from "react";

const ExperimentContext = createContext(undefined);

export const useExperiments = () => {
  const context = useContext(ExperimentContext);
  if (context === undefined) {
    throw new Error("useExperiments must be used within an ExperimentProvider");
  }
  return context;
};

export const ExperimentProvider = ({ children }) => {
  const [experiments, setExperiments] = useState([]);

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

  return (
    <ExperimentContext.Provider
      value={{ experiments, addExperiment, updateExperiment, deleteExperiment }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
