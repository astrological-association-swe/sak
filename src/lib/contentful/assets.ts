import { getContentfulClient } from ".";
import { ContentfulAsset } from "./contentful-types";

export async function getAsset(assetId: string): Promise<ContentfulAsset> {
  try {
    const client = getContentfulClient();
    const response = await client.getAsset(assetId);
    return {
      sys: response.sys,
      fields: {
        title: response.fields.title || "",
        description: response.fields.description,
        file: {
          url: response.fields.file?.url || "",
          details: response.fields.file?.details || { size: 0 },
          fileName: response.fields.file?.fileName || "",
          contentType: response.fields.file?.contentType || "",
        },
      },
    };
  } catch (error) {
    console.error(`Error fetching asset ${assetId} from Contentful:`, error);
    throw error;
  }
}

// Helper function to get asset URL
export function getAssetUrl(asset: ContentfulAsset): string {
  return `https:${asset.fields.file.url}`;
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  asset: ContentfulAsset,
  options: {
    width?: number;
    height?: number;
    format?: "jpg" | "png" | "webp";
    quality?: number;
    fit?: "pad" | "fill" | "scale" | "crop" | "thumb";
  } = {}
): string {
  const baseUrl = getAssetUrl(asset);
  const params = new URLSearchParams();

  if (options.width) params.append("w", options.width.toString());
  if (options.height) params.append("h", options.height.toString());
  if (options.format) params.append("fm", options.format);
  if (options.quality) params.append("q", options.quality.toString());
  if (options.fit) params.append("fit", options.fit);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
