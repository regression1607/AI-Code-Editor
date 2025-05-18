

import React from "react";

type ToolbarProps = {
  onRun: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
};

export default function Toolbar({ onRun, language, onLanguageChange }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700 select-none">
      <button
        onClick={onRun}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white font-semibold transition"
        title="Run code (Ctrl+Enter)"
      >
        Run
      </button>

      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-700 text-white rounded px-2 py-1 focus:outline-none"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python (no real exec)</option>
      </select>
    </div>
  );
}
