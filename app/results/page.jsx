"use client";

import { useState } from "react";
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

const mockResults = [
  {
    id: "1",
    name: "GPT-4 Baseline",
    model: "GPT-4",
    accuracy: 0.85,
    responseTime: 2.3,
  },
  {
    id: "2",
    name: "Claude Comparison",
    model: "Claude",
    accuracy: 0.78,
    responseTime: 1.9,
  },
  {
    id: "3",
    name: "New Prompt Test",
    model: "GPT-4",
    accuracy: 0.82,
    responseTime: 2.1,
  },
];

export default function ResultsAnalysis() {
  const [results, setResults] = useState(mockResults);
  const [selectedResults, setSelectedResults] = useState([]);

  const toggleResult = (id) => {
    setSelectedResults((prev) =>
      prev.includes(id)
        ? prev.filter((resultId) => resultId !== id)
        : [...prev, id]
    );
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
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Show in Chart
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map((result) => (
                    <tr key={result.id}>
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Checkbox
                          checked={selectedResults.includes(result.id)}
                          onCheckedChange={() => toggleResult(result.id)}
                        />
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