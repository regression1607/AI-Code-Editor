// Executes JS/TS code by eval (with input passed as a variable).
// Python option returns a placeholder since no backend.

export function executeCode(code: string, input: string, language: string): string {
    if (language === "python") {
      return "Python execution is not supported in-browser.";
    }
  
    try {
      // Provide 'input' variable globally inside eval scope
      let output = "";
      const consoleLog = console.log;
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };
  
      // eslint-disable-next-line no-new-func
      const func = new Function("input", code);
      func(input);
  
      console.log = consoleLog;
      return output || "No output.";
    } catch (err) {
      return `Error: ${String(err)}`;
    }
  }
  