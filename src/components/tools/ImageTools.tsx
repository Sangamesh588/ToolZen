"use client";

import React, { useState } from "react";
import { Upload, Download, Image as ImageIcon, CheckCircle2 } from "lucide-react";

// Helper to format file size in KB or MB
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 1. IMAGE COMPRESSOR
export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [compressedUrl, setCompressedUrl] = useState<string>("");
  const [quality, setQuality] = useState<number>(75);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setOriginalUrl(url);
      compressImage(selected, quality);
    }
  };

  const compressImage = (imageFile: File, q: number) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (compressedUrl) URL.revokeObjectURL(compressedUrl);
              const newUrl = URL.createObjectURL(blob);
              setCompressedUrl(newUrl);
              setCompressedSize(blob.size);
              setIsProcessing(false);
            }
          },
          "image/jpeg",
          q / 100
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (file) {
      compressImage(file, newQ);
    }
  };

  const savings = file && compressedSize > 0
    ? Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!file ? (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer transition-colors group">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">
            Choose an image or drop it here
          </span>
          <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP (100% private, no uploads)</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
              <span>Compression Quality</span>
              <span className="font-mono text-blue-600 font-bold">{quality}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Smaller file size</span>
              <span>Higher visual quality</span>
            </div>
          </div>

          {/* Size Comparison & Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Original File</span>
              <div className="text-xl font-bold font-mono text-slate-700 dark:text-neutral-300 mt-1">
                {formatBytes(file.size)}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Compressed File</span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {isProcessing ? "Optimizing..." : formatBytes(compressedSize)}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-600 text-white text-center flex flex-col justify-center shadow-sm">
              <span className="text-xs uppercase text-emerald-100 font-semibold tracking-wider">Total Saved</span>
              <div className="text-2xl font-black mt-0.5">
                {savings}% Smaller
              </div>
            </div>
          </div>

          {/* Download & Reset Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={compressedUrl}
              download={`compressed-${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all text-sm"
            >
              <Download className="w-5 h-5" />
              Download Compressed Image ({formatBytes(compressedSize)})
            </a>
            <button
              onClick={() => {
                setFile(null);
                setOriginalUrl("");
                setCompressedUrl("");
              }}
              className="py-3.5 px-6 rounded-2xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-semibold text-sm transition-colors"
            >
              Choose Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. CONVERT TO WEBP / FORMAT CONVERTER
export function ImageFormatConverter({ targetFormat = "webp" }: { targetFormat?: "webp" | "png" | "jpg" }) {
  const [file, setFile] = useState<File | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [convertedSize, setConvertedSize] = useState<number>(0);

  const mime = targetFormat === "webp" ? "image/webp" : targetFormat === "png" ? "image/png" : "image/jpeg";
  const ext = targetFormat === "webp" ? "webp" : targetFormat === "png" ? "png" : "jpg";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          if (targetFormat === "jpg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setConvertedUrl(URL.createObjectURL(blob));
                setConvertedSize(blob.size);
              }
            },
            mime,
            0.9
          );
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(selected);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer transition-colors group">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-8 h-8" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">
            Select image to convert to {targetFormat.toUpperCase()}
          </span>
          <p className="text-xs text-slate-400 mt-1">Instant in-browser conversion</p>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center space-y-4 shadow-sm">
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              Converted successfully to {targetFormat.toUpperCase()}!
            </div>
            <div className="text-sm text-slate-600 dark:text-neutral-400">
              Document: <strong>{file.name}</strong> • Converted Size: <strong className="font-mono text-sky-600 dark:text-sky-400">{formatBytes(convertedSize)}</strong>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href={convertedUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}.${ext}`}
                className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold flex items-center gap-2 shadow-md shadow-sky-500/25 text-sm"
              >
                <Download className="w-4 h-4" />
                Download {ext.toUpperCase()}
              </a>
              <button
                onClick={() => {
                  setFile(null);
                  setConvertedUrl("");
                }}
                className="py-3 px-5 rounded-xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-sm font-semibold"
              >
                Convert Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. IMAGE RESIZER
export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
          processResize(img, img.width, img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(selected);
    }
  };

  const processResize = (imgObj?: HTMLImageElement, w?: number, h?: number) => {
    const targetW = w || width;
    const targetH = h || height;
    if (!file) return;

    const render = (img: HTMLImageElement) => {
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      canvas.toBlob((blob) => {
        if (blob) setResizedUrl(URL.createObjectURL(blob));
      }, "image/png");
    };

    if (imgObj) {
      render(imgObj);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => render(img);
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && originalWidth > 0) {
      const newH = Math.round((val / originalWidth) * originalHeight);
      setHeight(newH);
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && originalHeight > 0) {
      const newW = Math.round((val / originalHeight) * originalWidth);
      setWidth(newW);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer transition-colors group">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">
            Select image to resize
          </span>
          <p className="text-xs text-slate-400 mt-1">Specify custom width & height dimensions in pixels</p>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Target Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Target Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lockRatio"
              checked={lockRatio}
              onChange={(e) => setLockRatio(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <label htmlFor="lockRatio" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Lock Aspect Ratio (Original: {originalWidth} × {originalHeight}px)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => processResize()}
              className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold flex-1 text-sm shadow-md shadow-sky-500/25 transition-all"
            >
              Apply Resize
            </button>
            {resizedUrl && (
              <a
                href={resizedUrl}
                download={`resized-${width}x${height}-${file.name}`}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 text-sm shadow-md shadow-emerald-600/20"
              >
                <Download className="w-5 h-5" /> Download
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
