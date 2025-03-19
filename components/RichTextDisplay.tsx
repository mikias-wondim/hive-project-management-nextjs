import React from "react";

interface RichTextDisplayProps {
  text: string;
  size: "sm" | "md" | "lg";
}

export default function RichTextDisplay({ text, size }: RichTextDisplayProps) {
  return (
    <div
      className={`prose prose-${size} mt-2 pt-4 border-t border-0.5 border-gray-200 dark:border-gray-800 rounded-sm`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
