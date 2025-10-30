import { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";
import ToggleTheme from "./components/ToggleTheme";

export default function App() {
  const [jsonData, setJsonData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [searchPath, setSearchPath] = useState("");

  const handleJsonChange = (data) => setJsonData(data);

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">JSON Tree Visualizer</h1>
        <ToggleTheme theme={theme} setTheme={setTheme} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <JsonInput onJsonChange={handleJsonChange} />
        <div>
          <SearchBar searchPath={searchPath} setSearchPath={setSearchPath} />
          <TreeVisualizer jsonData={jsonData} searchPath={searchPath} />
        </div>
      </div>
    </div>
  );
}
