import { getAllTexts } from "./contentful-queries";
import { TextProvider } from "./text-context";
import { Text } from "./contentful-types";

export async function TextProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  let texts: Text[] = [];
  let error = null;

  try {
    texts = await getAllTexts();
  } catch (err) {
    console.error("Failed to fetch texts from Contentful:", err);
    error = err instanceof Error ? err.message : "Failed to fetch texts";
  }

  return (
    <TextProvider texts={texts} error={error}>
      {children}
    </TextProvider>
  );
}
