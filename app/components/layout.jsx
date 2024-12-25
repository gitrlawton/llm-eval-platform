import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Beaker,
  FileText,
  BarChart2,
  Menu,
  SplitSquareVertical,
} from "lucide-react";

const navItems = [
  { name: "Experiments", href: "/", icon: Beaker },
  { name: "Test Cases", href: "/test-cases", icon: FileText },
  { name: "Results", href: "/results", icon: BarChart2 },
  { name: "Multi-LLM", href: "/multi-llm", icon: SplitSquareVertical },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 min-h-screen flex-shrink-0 ${sidebarOpen ? "" : "hidden"} md:block`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">LLM Experiment Platform</h1>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                pathname === item.href ? "bg-gray-200" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {navItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h1>
            <div>{/* Add user menu or other top-right components here */}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
