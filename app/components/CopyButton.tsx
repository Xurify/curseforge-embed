"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded bg-white/10 text-gray-300 hover:bg-brand/20 hover:text-brand transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
