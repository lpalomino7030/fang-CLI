import { join, resolve, extname } from "node:path";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import type { Middleware } from "../types/types.js";
import type { Context } from "../core/context.js";

/**
 * A minimal lookup for common web files.
 * Since we are going zero-deps, we focus on the essential web assets.
 */
const MIME_MAP: Record<string, string> = {
  // Web Essentials
  ".html": "text/html; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".mjs":  "text/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",

  // Images
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif":  "image/gif",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",

  // Fonts
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".ttf":   "font/ttf",
  ".otf":   "font/otf",
  ".eot":   "application/vnd.ms-fontobject",

  // Video & Audio
  ".mp4":  "video/mp4",
  ".webm": "video/webm",
  ".ogg":  "video/ogg",
  ".mp3":  "audio/mpeg",
  ".wav":  "audio/wav",

  // Documents
  ".pdf":  "application/pdf",
  ".txt":  "text/plain; charset=utf-8",
  ".xml":  "application/xml; charset=utf-8",
  ".csv":  "text/csv; charset=utf-8",

  // Archives
  ".zip":  "application/zip",
  ".rar":  "application/x-rar-compressed",
  ".7z":   "application/x-7z-compressed",
  ".tar":  "application/x-tar",
};

/**
 * Serves static files from a specific directory.
 * @param rootDir - The directory where files are located (e.g., 'public').
 * @param prefix - The URL prefix to intercept (e.g., '/static').
 */

export const serveStatic = (
  rootDir: string,
  prefix: string,
  onError: (ctx: Context) => void,
): Middleware => {
  const root = resolve(rootDir);

  return async (ctx, next) => {
    const { req, res } = ctx;
    const url = req.url;

    // Check prefix and method path
    if (!url || !url.startsWith(prefix) || req.method !== "GET") {
      return await next();
    }

    const safePath = join(root, url!.slice(prefix.length));

    // Ensure the resulting path is still inside the root directory
    if (!safePath.startsWith(root)) {
      return onError(ctx);
    }

    try {
      const fileStat = await stat(safePath);

      if (fileStat.isFile()) {
        const ext = extname(safePath).toLowerCase();
        const contentType = MIME_MAP[ext] || "application/octet-stream";

        // Set headers (cache-control is 1 day)
        res.writeHead(200, {
          "Content-Type": contentType,
          "Content-Length": fileStat.size,
          "Last-Modified": fileStat.mtime.toUTCString(),
          "cache-control": "public, max-age=86400",
          "X-Content-Type-Options": "nosniff"
        });
        const stream = createReadStream(safePath);
        stream.pipe(res);
        return;
      }
    } catch (error) {
      return await next();
    }
    await next();
  };
};
