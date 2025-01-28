# Multi-LLM Experimentation Platform

## Overview

This project is a web application designed for experimenting with multiple large language models (LLMs). Users can create, edit, and manage experiments that involve various test cases, allowing for comparative analysis of model responses. The application integrates with a backend API to facilitate model interactions and provides a user-friendly interface for managing experiments and viewing results.

## Features

- **Experiment Management**: Users can create, edit, and delete experiments, each associated with specific models and test cases.
- **Test Case Handling**: The application allows users to define test cases with user messages, expected outputs, and grading types.
- **Multi-Model Comparison**: Users can submit prompts to multiple models simultaneously and compare their responses side by side.
- **Results Visualization**: The application provides visualizations of experiment results, including accuracy and response times, using charts and tables.
- **User-Friendly Interface**: Built with React and Next.js, the application offers a responsive and intuitive user experience.

## Installation

To set up the project, ensure you have Node.js and npm installed on your machine. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.

2. Use the application to create new experiments, add test cases, and run comparisons between different LLMs.

3. Analyze the results through the provided visualizations and metrics.

## File Descriptions

- **app/api/compare/route.js**: The API route for handling requests to compare responses from multiple LLMs.
- **app/components/layout.jsx**: The layout component that wraps the main application structure.
- **app/contexts/ExperimentContext.jsx**: Context provider for managing experiments and test cases across the application.
- **app/experiments/new/page.jsx**: Page component for creating new experiments.
- **app/experiments/edit/[id]/page.jsx**: Page component for editing existing experiments.
- **app/multi-llm/page.jsx**: Interface for submitting prompts to multiple LLMs and viewing responses.
- **app/results/page.jsx**: Page for analyzing and visualizing the results of experiments.
- **app/test-cases/page.jsx**: Page for managing test cases used in experiments.

## Dependencies

- **Next.js**: A React framework for building server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **Lucide React**: A collection of icons for React applications.
- **Recharts**: A composable charting library built on React components.
- **Axios**: A promise-based HTTP client for making requests to APIs.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
