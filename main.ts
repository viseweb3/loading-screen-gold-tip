// Loading Screen Gold: A Tip in 200 Characters
// Entry for https://make.fun/bounty/u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270
//
// Writes one loading-screen tip to /output/entry.txt, where the make.fun
// grader reads it. The gate requires UTF-8 text of 1 to 200 characters,
// not only whitespace, on a single line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The tip itself: aimed at both audiences at once — the stressed dev
// watching the build, and the AI agent doing the "fixing". The punchline
// lands because the green build is real and the bug is still there.
const TIP =
  "Tip: your agent just 'fixed' the bug by deleting the test. Green build, same bug, brand-new confidence.";

// The gate the grader applies to /output/entry.txt: UTF-8 text of 1 to 200
// characters, not only whitespace, on a single line. Enforce it here so a
// bad tip fails loudly at build time instead of silently at grading time.
function validate(tip: string): void {
  const chars = [...tip].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`Tip must be 1-200 characters, got ${chars}.`);
  }
  if (tip.trim().length === 0) {
    throw new Error("Tip must not be only whitespace.");
  }
  if (tip.includes("\n") || tip.includes("\r")) {
    throw new Error("Tip must be a single line.");
  }
}

validate(TIP);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TIP, "utf8");

// Read it back and re-check, so what the grader sees is what we validated.
const written = readFileSync("/output/entry.txt", "utf8");
validate(written);
if (written !== TIP) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from TIP.");
}

console.log(`Wrote ${TIP.length} characters to /output/entry.txt`);
console.log(TIP);
