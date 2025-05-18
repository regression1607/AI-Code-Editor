"use client";

import React, { useEffect, useState, useCallback } from "react";
import FileExplorer from "../components/FileExplorer";
import FileTabs from "../components/FileTabs";
import Toolbar from "../components/Toolbar";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import InputBox from "../components/InputBox";
import { executeCode } from "../lib/executeCode";
import { loadFiles, saveFiles } from "../lib/utils";

type Files = {
  [filename: string]: string;
};

export default function Home() {
  const [files, setFiles] = useState<Files>({});
  const [activeFile, setActiveFile] = useState<string>("");
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");

  // Load files from localStorage on mount
  useEffect(() => {
    const storedFiles = loadFiles();
    if (Object.keys(storedFiles).length === 0) {
      // If no files, create a default one
      const defaultName = "main.js";
      setFiles({ [defaultName]: "console.log('Hello, world!');" });
      setActiveFile(defaultName);
      setOpenFiles([defaultName]);
      setLanguage("javascript");
    } else {
      setFiles(storedFiles);
      const firstFile = Object.keys(storedFiles)[0];
      setActiveFile(firstFile);
      setOpenFiles([firstFile]);
    }
  }, []);

  // Save files to localStorage when files change
  useEffect(() => {
    saveFiles(files);
  }, [files]);

  // Update code content for the active file
  const updateFileContent = (filename: string, content: string) => {
    setFiles((prev) => ({ ...prev, [filename]: content }));
  };

  // Handle opening a file (add to open tabs)
  const openFile = (filename: string) => {
    setActiveFile(filename);
    setOpenFiles((prev) => (prev.includes(filename) ? prev : [...prev, filename]));
  };

  // Handle closing a file tab
  const closeFile = (filename: string) => {
    setOpenFiles((prev) => prev.filter((f) => f !== filename));
    if (activeFile === filename) {
      // Switch active file to last tab or none
      setActiveFile((prev) => {
        const idx = openFiles.indexOf(filename);
        if (openFiles.length === 1) return "";
        if (idx === 0) return openFiles[1];
        return openFiles[idx - 1];
      });
    }
  };

  // Create a new file with a unique name
  const createNewFile = () => {
    let idx = 1;
    let name = `file${idx}.js`;
    while (files[name]) {
      idx++;
      name = `file${idx}.js`;
    }
    setFiles((prev) => ({ ...prev, [name]: "" }));
    openFile(name);
  };

  // Handle code execution
  const handleRun = () => {
    if (!activeFile) {
      setOutput("No file selected");
      return;
    }
    const code = files[activeFile];
    const result = executeCode(code, input, language);
    setOutput(result);
  };

  // Handle language change (set new language and optionally rename file)
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (!activeFile) return;
    // Rename file extension if needed
    const baseName = activeFile.split(".")[0];
    let ext = "js";
    if (newLang === "typescript") ext = "ts";
    else if (newLang === "python") ext = "py";
    const newFileName = `${baseName}.${ext}`;
    if (newFileName !== activeFile) {
      // Rename file
      setFiles((prev) => {
        const newFiles = { ...prev };
        newFiles[newFileName] = newFiles[activeFile];
        delete newFiles[activeFile];
        return newFiles;
      });
      // Update openFiles and activeFile
      setOpenFiles((prev) =>
        prev.map((f) => (f === activeFile ? newFileName : f))
      );
      setActiveFile(newFileName);
    }
  };

  // Handle keyboard shortcut: Ctrl/Cmd + Enter to run
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [files, input, activeFile, language]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="flex h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar File Explorer */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <FileExplorer
          files={files}
          onFileClick={openFile}
          onCreateFile={createNewFile}
          activeFile={activeFile}
          setFiles={setFiles}
          setActiveFile={setActiveFile}
          setOpenFiles={setOpenFiles}
        />
      </aside>

      {/* Main area */}
      <section className="flex flex-col flex-1">
        {/* Tabs + Toolbar */}
        <FileTabs
          openFiles={openFiles}
          activeFile={activeFile}
          onTabClick={setActiveFile}
          onCloseTab={closeFile}
        />
        <Toolbar
          onRun={handleRun}
          language={language}
          onLanguageChange={handleLanguageChange}
        />

        {/* Editor + Input + Output panels */}
        <div className="flex flex-1 overflow-hidden">
          <CodeEditor
            language={language}
            value={files[activeFile] || ""}
            onChange={(val) => updateFileContent(activeFile, val)}
          />

          <div className="flex flex-col w-96 border-l border-gray-700">
            <InputBox value={input} onChange={setInput} />
            <OutputPanel output={output} />
          </div>
        </div>
      </section>
    </main>
  );
}
