// Helper function to format date
export function formatContentfulDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to extract text from rich text fields
export function extractTextFromRichText(richText: unknown): string {
  if (!richText || typeof richText !== "object" || !("content" in richText))
    return "";

  const content = (richText as { content: unknown[] }).content;
  if (!Array.isArray(content)) return "";

  return content
    .map((node: unknown) => {
      if (typeof node === "object" && node !== null && "nodeType" in node) {
        const nodeObj = node as { nodeType: string; content?: unknown[] };
        if (
          nodeObj.nodeType === "paragraph" &&
          Array.isArray(nodeObj.content)
        ) {
          return nodeObj.content
            .map((textNode: unknown) => {
              if (
                typeof textNode === "object" &&
                textNode !== null &&
                "value" in textNode
              ) {
                return (textNode as { value: string }).value || "";
              }
              return "";
            })
            .join("");
        }
      }
      return "";
    })
    .join(" ")
    .trim();
}
