"use client";

import React, { useState } from "react";
import Layout from "./components/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Play,
  Copy,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useExperiments } from "./contexts/ExperimentContext";

export default function ExperimentsDashboard() {
  const { experiments, updateExperiment, deleteExperiment, runExperiment } =
    useExperiments();
  const [expandedExperiment, setExpandedExperiment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [experimentToDelete, setExperimentToDelete] = useState(null);
  const router = useRouter();

  const handleRunExperiment = (id) => {
    updateExperiment(id, { status: "Running" });
    toast({
      title: "Experiment Started",
      description: `Experiment ${id} is now running.`,
    });
    runExperiment(id).then(() => {
      toast({
        title: "Experiment Completed",
        description: `Experiment ${id} has finished running.`,
      });
    });
  };

  const cloneExperiment = (experiment) => {
    const newExperiment = {
      ...experiment,
      id: Date.now().toString(),
      name: `${experiment.name} (Clone)`,
      runs: [],
      status: "Draft",
    };
    addExperiment(newExperiment);
    toast({
      title: "Experiment Cloned",
      description: `A new experiment "${newExperiment.name}" has been created.`,
    });
  };

  const editExperiment = (id) => {
    router.push(`/experiments/edit/${id}`);
  };

  const openDeleteDialog = (id) => {
    setExperimentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteExperiment = () => {
    if (experimentToDelete) {
      deleteExperiment(experimentToDelete);
      toast({
        title: "Experiment Deleted",
        description: `Experiment ${experimentToDelete} has been deleted.`,
      });
      setDeleteDialogOpen(false);
      setExperimentToDelete(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedExperiment((prevId) => (prevId === id ? null : id));
  };

  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Experiments</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all experiments in your account including their details
            and run results.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/experiments/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Experiment
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-indigo-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-5 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Test Cases
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Run
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Aggregate Score
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {experiments.map((experiment) => (
                    <React.Fragment key={experiment.id}>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {experiment.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {experiment.model}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {experiment.testCases.length}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {experiment.runs.length > 0
                            ? experiment.runs[experiment.runs.length - 1].date
                            : "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {experiment.runs.length > 0
                            ? `${(experiment.runs[experiment.runs.length - 1].aggregateScore * 100).toFixed(2)}%`
                            : "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              experiment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : experiment.status === "Running"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {experiment.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex justify-end space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleRunExperiment(experiment.id)
                                    }
                                    disabled={experiment.status === "Running"}
                                  >
                                    <Play className="h-5 w-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Run Experiment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => cloneExperiment(experiment)}
                                  >
                                    <Copy className="h-5 w-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Clone Experiment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      editExperiment(experiment.id)
                                    }
                                  >
                                    <Edit className="h-5 w-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Experiment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      openDeleteDialog(experiment.id)
                                    }
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete Experiment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleExpand(experiment.id)}
                                  >
                                    {expandedExperiment === experiment.id ? (
                                      <ChevronUp className="h-5 w-5" />
                                    ) : (
                                      <ChevronDown className="h-5 w-5" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {expandedExperiment === experiment.id
                                      ? "Collapse"
                                      : "Expand"}{" "}
                                    Details
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
                      </tr>
                      {expandedExperiment === experiment.id && (
                        <tr>
                          <td colSpan={7} className="px-3 py-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="text-lg font-semibold mb-2">
                                Experiment Details
                              </h3>
                              <p>
                                <strong>Description:</strong>{" "}
                                {experiment.description}
                              </p>
                              <p>
                                <strong>System Prompt:</strong>{" "}
                                {experiment.systemPrompt}
                              </p>
                              <h4 className="text-md font-semibold mt-4 mb-2">
                                Test Cases:
                              </h4>
                              <ul className="list-disc pl-5">
                                {experiment.testCases.map((testCase) => (
                                  <li key={testCase.id}>
                                    <p>
                                      <strong>User Message:</strong>{" "}
                                      {testCase.userMessage}
                                    </p>
                                    <p>
                                      <strong>Expected Output:</strong>{" "}
                                      {testCase.expectedOutput}
                                    </p>
                                    <p>
                                      <strong>Grader Type:</strong>{" "}
                                      {testCase.graderType}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                              {experiment.runs.length > 0 && (
                                <>
                                  <h4 className="text-md font-semibold mt-4 mb-2">
                                    Latest Run Results:
                                  </h4>
                                  <ul className="list-disc pl-5">
                                    {experiment.runs[
                                      experiment.runs.length - 1
                                    ].results.map((result) => (
                                      <li key={result.testCaseId}>
                                        <p>
                                          <strong>Test Case:</strong>{" "}
                                          {
                                            experiment.testCases.find(
                                              (tc) =>
                                                tc.id === result.testCaseId
                                            )?.userMessage
                                          }
                                        </p>
                                        <p>
                                          <strong>Score:</strong>{" "}
                                          {(result.score * 100).toFixed(2)}%
                                        </p>
                                        <p>
                                          <strong>Output:</strong>{" "}
                                          {result.output}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this experiment?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              experiment and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteExperiment}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
