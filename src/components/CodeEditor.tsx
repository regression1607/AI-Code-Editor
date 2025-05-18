import React from "react";
import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  // Monaco editor expects language id, map python to 'python'
  const monacoLang = language === "typescript" ? "typescript" : language === "python" ? "python" : "javascript";

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={monacoLang}
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  );
}
