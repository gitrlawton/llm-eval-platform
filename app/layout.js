import { ExperimentProvider } from "./contexts/ExperimentContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ExperimentProvider>{children}</ExperimentProvider>
      </body>
    </html>
  );
}
