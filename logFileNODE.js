// # Level - 1 (BASH): Find the largest log file in computer (x.log) and truncate it to 100 lines.

const fs = require("fs");
const path = require("path");

const logFileName = "x.log";

// Get a list of all log files in the current directory and its subdirectories
function getLogFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let logFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      logFiles = logFiles.concat(getLogFiles(filePath));
    } else if (file.name === logFileName) {
      logFiles.push(filePath);
    }
  });

  return logFiles;
}

// Find the largest log file
function findLargestLogFile(logFiles) {
  let largestSize = 0;
  let largestLogFile = "";

  logFiles.forEach((logFile) => {
    const stats = fs.statSync(logFile);
    if (stats.size > largestSize) {
      largestSize = stats.size;
      largestLogFile = logFile;
    }
  });

  return largestLogFile;
}

// Truncate the given file to 100 lines
function truncateFileTo100Lines(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const truncatedContent = lines.slice(-100).join("\n");
  fs.writeFileSync(filePath, truncatedContent);
}

// Main function
function main() {
  const currentDir = process.cwd();
  const logFiles = getLogFiles(currentDir);

  if (logFiles.length === 0) {
    console.log("No matching log files found.");
    return;
  }

  const largestLogFile = findLargestLogFile(logFiles);

  if (largestLogFile) {
    truncateFileTo100Lines(largestLogFile);
    console.log(`Truncated ${largestLogFile} to 100 lines.`);
  } else {
    console.log("No log files found.");
  }
}

main();
