import React from "react";

type OutputPanelProps = {
  output: string;
};

export default function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="flex flex-col flex-1 p-3 bg-gray-900 text-green-400 overflow-auto font-mono whitespace-pre-wrap">
      <h3 className="mb-2 font-semibold text-gray-300">Output</h3>
      <pre>{output || "No output yet. Run your code!"}</pre>
    </div>
  );
}
