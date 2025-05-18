import React from "react";

type InputBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputBox({ value, onChange }: InputBoxProps) {
  return (
    <div className="flex flex-col border-b border-gray-700 p-3">
      <label htmlFor="inputBox" className="mb-1 font-semibold text-gray-300">
        Custom Input (optional)
      </label>
      <textarea
        id="inputBox"
        rows={5}
        className="w-full bg-gray-800 rounded resize-none p-2 text-white placeholder:text-gray-400"
        placeholder="Type input here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
