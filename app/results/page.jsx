"use client";

import { useState, useMemo } from "react";
import Layout from "../components/layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import { useExperiments } from "../contexts/ExperimentContext";

export default function ResultsAnalysis() {
  const { experiments } = useExperiments();
  const [selectedResults, setSelectedResults] = useState([]);

  const results = useMemo(() => {
    return experiments
      .filter((exp) => exp.runs.length > 0)
      .map((exp) => {
        const latestRun = exp.runs[exp.runs.length - 1];
        return {
          id: exp.id,
          name: exp.name,
          model: exp.model,
          accuracy: latestRun.aggregateScore,
          responseTime: Math.random() * 5, // Random response time between 0 and 5 seconds
        };
      });
  }, [experiments]);

  const toggleAllResults = (checked) => {
    if (checked) {
      setSelectedResults(results.map((result) => result.id));
    } else {
      setSelectedResults([]);
    }
  };

  const filteredResults = results.filter((result) =>
    selectedResults.includes(result.id)
  );

  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Results Analysis
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Compare performance across different experiments and models.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <Checkbox
                        checked={selectedResults.length === results.length}
                        onCheckedChange={(checked) => toggleAllResults(checked)}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Experiment Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Accuracy
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Avg. Response Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        <Checkbox
                          checked={selectedResults.includes(result.id)}
                          onCheckedChange={() => toggleResult(result.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {result.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.model}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {(result.accuracy * 100).toFixed(2)}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.responseTime.toFixed(2)}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Performance Comparison
        </h2>
        <div className="mt-4" style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={filteredResults}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="accuracy"
                fill="#8884d8"
                name="Accuracy"
              />
              <Bar
                yAxisId="right"
                dataKey="responseTime"
                fill="#82ca9d"
                name="Response Time (s)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
