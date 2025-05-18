import React from "react";
import { Plus, File, Trash2 } from "lucide-react";

type FileExplorerProps = {
  files: { [filename: string]: string };
  activeFile: string;
  onFileClick: (filename: string) => void;
  onCreateFile: () => void;
  setFiles: React.Dispatch<React.SetStateAction<{ [filename: string]: string }>>;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
  setOpenFiles: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileExplorer({
  files,
  activeFile,
  onFileClick,
  onCreateFile,
  setFiles,
  setActiveFile,
  setOpenFiles,
}: FileExplorerProps) {
  // Delete file with confirmation
  const handleDelete = (filename: string) => {
    if (confirm(`Delete file "${filename}"?`)) {
      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[filename];
        return newFiles;
      });
      setOpenFiles((prev) => prev.filter((f) => f !== filename));
      if (activeFile === filename) setActiveFile("");
    }
  };

  return (
    <div className="flex flex-col flex-grow p-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Files</h2>
        <button
          onClick={onCreateFile}
          title="Create new file"
          className="p-1 rounded hover:bg-gray-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="overflow-auto flex-grow">
        {Object.keys(files).map((filename) => (
          <li
            key={filename}
            onClick={() => onFileClick(filename)}
            className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${
              activeFile === filename ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <File size={16} />
              <span>{filename}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(filename);
              }}
              title="Delete file"
              className="p-1 rounded hover:bg-red-700 transition"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {Object.keys(files).length === 0 && (
          <li className="text-gray-400 text-center mt-5">No files</li>
        )}
      </ul>
    </div>
  );
}
