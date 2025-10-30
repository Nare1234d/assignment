import { useState } from "react";

export default function JsonInput({ onJsonChange }) {
  const [input, setInput] = useState(""); // <-- starts empty

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(input);
      onJsonChange(parsed);
    } catch {
      alert("Invalid JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    onJsonChange(null);
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm">
      <textarea
        rows={15}
        className="w-full border p-2 rounded-md"
        placeholder="Paste or type your JSON data here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-1 rounded-md"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-400 text-white px-4 py-1 rounded-md"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
