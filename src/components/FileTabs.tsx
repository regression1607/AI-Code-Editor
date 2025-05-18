import React from "react";
import { X } from "lucide-react";

type FileTabsProps = {
  openFiles: string[];
  activeFile: string;
  onTabClick: (filename: string) => void;
  onCloseTab: (filename: string) => void;
};

export default function FileTabs({
  openFiles,
  activeFile,
  onTabClick,
  onCloseTab,
}: FileTabsProps) {
  return (
    <div className="flex border-b border-gray-700 bg-gray-800 select-none">
      {openFiles.map((filename) => (
        <div
          key={filename}
          onClick={() => onTabClick(filename)}
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 border-b-2 ${
            activeFile === filename
              ? "border-blue-500 text-white"
              : "border-transparent text-gray-400 hover:text-white hover:border-gray-600"
          }`}
        >
          <span className="truncate max-w-xs">{filename}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(filename);
            }}
            title="Close tab"
            className="hover:text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      {openFiles.length === 0 && (
        <div className="px-4 py-2 text-gray-500">No open files</div>
      )}
    </div>
  );
}
