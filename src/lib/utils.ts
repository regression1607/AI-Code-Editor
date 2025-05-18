const STORAGE_KEY = "interactive-code-editor-files";

export function saveFiles(files: { [filename: string]: string }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}

export function loadFiles(): { [filename: string]: string } {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
