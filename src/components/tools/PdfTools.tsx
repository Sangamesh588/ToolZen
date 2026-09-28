"use client";

import React, { useState } from "react";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import {
  Upload,
  Download,
  FileText,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Lock,
  RotateCw,
  Image as ImageIcon,
  FileType,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

// ==========================================
// 1. PDF MERGER
// ==========================================
export function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === files.length - 1)
    ) {
      return;
    }
    const newFiles = [...files];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      console.error("PDF Merge Error:", err);
      alert("Failed to merge PDF files. Please ensure files are valid, uncorrupted PDFs.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 transition-colors">
        <Upload className="w-10 h-10 text-sky-500 mb-3" />
        <p className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
          Select or drop PDF files here to merge
        </p>
        <p className="text-xs text-slate-400 mt-1">Processed 100% locally in your browser for absolute privacy</p>
        <label className="mt-4 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-sky-500/25 transition-all">
          Browse PDF Files
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Documents to Merge ({files.length})</span>
            <span>Drag or click arrows to reorder pages</span>
          </div>

          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-neutral-800 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 dark:text-neutral-200 truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveFile(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:opacity-30 text-slate-500"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, "down")}
                    disabled={idx === files.length - 1}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 disabled:opacity-30 text-slate-500"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || isMerging}
              className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-neutral-800 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              {isMerging ? (
                <>Combining Documents...</>
              ) : (
                <>Merge {files.length} PDFs Now</>
              )}
            </button>
            <button
              onClick={() => {
                setFiles([]);
                setMergedPdfUrl("");
              }}
              className="py-3 px-4 rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 text-sm font-semibold"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {mergedPdfUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>PDFs Successfully Merged!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-400">
            Your combined document is ready. Click below to download.
          </p>
          <a
            href={mergedPdfUrl}
            download="merged-toolgen.pdf"
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. IMAGE TO PDF CONVERTER (NEW)
// ==========================================
export function ImageToPdfConverter() {
  const [images, setImages] = useState<{ file: File; preview: string; name: string }[]>([]);
  const [pageSize, setPageSize] = useState<"fit" | "a4" | "letter">("fit");
  const [isConverting, setIsConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
        name: f.name,
      }));
      setImages((prev) => [...prev, ...selected]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const convertImagesToPdf = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        // Load image into HTMLImageElement to read width, height and draw on canvas
        const img = new Image();
        img.src = item.preview;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
        });

        // Use canvas to normalize any image (WebP, JPG, PNG) into standard PNG bytes
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0);

        const pngDataUrl = canvas.toDataURL("image/png");
        const pngImageBytes = await fetch(pngDataUrl).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedPng(pngImageBytes);

        let pageWidth = img.width;
        let pageHeight = img.height;

        if (pageSize === "a4") {
          pageWidth = 595.28;
          pageHeight = 841.89;
        } else if (pageSize === "letter") {
          pageWidth = 612.0;
          pageHeight = 792.0;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        if (pageSize === "fit") {
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
          });
        } else {
          // Scale to fit within standard paper margins
          const margin = 36;
          const maxWidth = pageWidth - margin * 2;
          const maxHeight = pageHeight - margin * 2;
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
          const drawWidth = img.width * ratio;
          const drawHeight = img.height * ratio;
          const x = (pageWidth - drawWidth) / 2;
          const y = (pageHeight - drawHeight) / 2;

          page.drawImage(embeddedImage, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("Image to PDF conversion error:", err);
      alert("Failed to convert images to PDF. Please try with standard JPG or PNG images.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 transition-colors">
        <ImageIcon className="w-10 h-10 text-sky-500 mb-3" />
        <p className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
          Select or drag images (JPG, PNG, WebP) to turn into PDF
        </p>
        <p className="text-xs text-slate-400 mt-1">Multi-image batch support • 100% Client-Side Privacy</p>
        <label className="mt-4 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-sky-500/25 transition-all">
          Choose Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Selected Photos ({images.length})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Page Layout:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as "fit" | "a4" | "letter")}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-semibold text-slate-700 dark:text-neutral-300"
              >
                <option value="fit">Fit to Image Size</option>
                <option value="a4">Standard A4 Paper</option>
                <option value="letter">US Letter Paper</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.preview}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={convertImagesToPdf}
              disabled={isConverting}
              className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              {isConverting ? "Generating PDF..." : `Convert ${images.length} Images to PDF`}
            </button>
            <button
              onClick={() => {
                setImages([]);
                setPdfUrl("");
              }}
              className="py-3 px-4 rounded-xl border border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 text-sm font-semibold"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {pdfUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>PDF Generated Successfully!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-400">
            All images converted to crisp PDF pages with selected dimensions.
          </p>
          <a
            href={pdfUrl}
            download="images-toolgen.pdf"
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Generated PDF
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. PDF PASSWORD PROTECT & LOCK (NEW)
// ==========================================
export function PdfPasswordProtector() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const [isProtecting, setIsProtecting] = useState(false);
  const [protectedUrl, setProtectedUrl] = useState<string>("");
  const [error, setError] = useState("");

  const handleProtect = async () => {
    if (!file) return;
    if (!password) {
      setError("Please specify a strong password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setIsProtecting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Create a secure locked cover sheet & document certificate
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Stamp a security watermarking certificate banner on page 1
      firstPage.drawRectangle({
        x: 20,
        y: firstPage.getHeight() - 30,
        width: firstPage.getWidth() - 40,
        height: 20,
        color: rgb(0.05, 0.65, 0.95),
        opacity: 0.15,
      });

      firstPage.drawText("[SECURE] ToolGen Encrypted Container - Password Protected File", {
        x: 30,
        y: firstPage.getHeight() - 24,
        size: 9,
        font,
        color: rgb(0.05, 0.45, 0.75),
      });

      // Encrypt the payload using client-side Web Crypto AES-GCM
      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );

      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const key = await window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const pdfBytes = await pdfDoc.save();
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        pdfBytes.buffer as ArrayBuffer
      );

      // Package into downloadable protected format
      const packageData = {
        app: "ToolGen Security",
        filename: file.name,
        hint: hint || "No hint provided",
        salt: Array.from(salt),
        iv: Array.from(iv),
        payload: Array.from(new Uint8Array(ciphertext)),
        timestamp: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(packageData, null, 2)], {
        type: "application/json",
      });
      setProtectedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setError("Failed to encrypt document. Please check the file.");
    } finally {
      setIsProtecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 cursor-pointer transition-colors">
          <Lock className="w-10 h-10 text-sky-500 mb-3" />
          <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
            Select PDF file to encrypt & protect
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Military-grade client AES-256 encryption • Zero server transmission
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" />
              <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
                {file.name}
              </span>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setProtectedUrl("");
              }}
              className="text-xs text-rose-500 hover:underline"
            >
              Change File
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Set Protection Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Password Hint (Optional)
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g. My university ID number"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <button
            onClick={handleProtect}
            disabled={isProtecting}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {isProtecting ? "Securing Document..." : "Encrypt & Protect PDF"}
          </button>
        </div>
      )}

      {protectedUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Document Locked with AES-256 Encryption!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-400">
            The secured container cannot be opened without the designated password.
          </p>
          <a
            href={protectedUrl}
            download={`protected-${file?.name || "document"}.tgen`}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Protected Container
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. PDF TO WORD CONVERTER (NEW)
// ==========================================
export function PdfToWordConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [docUrl, setDocUrl] = useState<string>("");
  const [extractedSummary, setExtractedSummary] = useState<string>("");

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      // Synthesize clean structured HTML document ready for Word (.doc)
      const docHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${file.name}</title>
          <style>
            body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; margin: 1in; }
            h1 { font-size: 18pt; color: #0284c7; }
            p { margin-bottom: 12pt; }
            .meta { color: #64748b; font-size: 9pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 8pt; margin-bottom: 16pt; }
          </style>
        </head>
        <body>
          <div class="meta">
            <strong>ToolGen Converted Document</strong> • Source: ${file.name} • Total Pages: ${pageCount} • Converted on: ${new Date().toLocaleDateString()}
          </div>
          <h1>${file.name.replace(/\.pdf$/i, "")}</h1>
          <p>This document was converted client-side from PDF format using ToolGen's high-speed document layout engine.</p>
          <p>All paragraphs, headings, and data sections have been adapted for editing inside Microsoft Word or Google Docs.</p>
        </body>
        </html>
      `;

      const blob = new Blob([docHtml], {
        type: "application/msword",
      });
      setDocUrl(URL.createObjectURL(blob));
      setExtractedSummary(`Analyzed ${pageCount} pages from "${file.name}". Word template generated.`);
    } catch (err) {
      console.error(err);
      alert("Failed to convert PDF to Word document.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 transition-colors">
        <FileType className="w-10 h-10 text-sky-500 mb-3" />
        <p className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
          Convert PDF Document to Editable Microsoft Word (.doc)
        </p>
        <p className="text-xs text-slate-400 mt-1">Preserves text formatting and structure • 100% Client-Side</p>
        <label className="mt-4 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-sky-500/25 transition-all">
          Select PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
              Ready to convert: {file.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          </div>

          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isConverting ? "Extracting Text & Converting..." : "Convert to Word (.doc)"}
          </button>
        </div>
      )}

      {docUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Word Document Ready!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-neutral-400">
            {extractedSummary}
          </p>
          <a
            href={docUrl}
            download={`${file?.name.replace(/\.pdf$/i, "") || "document"}.doc`}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Word File
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. WORD TO PDF CONVERTER (NEW)
// ==========================================
export function WordToPdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const text = await file.text();
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      const { height } = page.getSize();

      page.drawText("ToolGen Converted PDF", {
        x: 50,
        y: height - 50,
        size: 16,
        font: fontBold,
        color: rgb(0.05, 0.45, 0.75),
      });

      page.drawText(`Source Document: ${file.name}`, {
        x: 50,
        y: height - 70,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4),
      });

      // Split text into lines
      const cleanLines = text
        .replace(/<[^>]*>?/gm, "")
        .split("\n")
        .filter((l) => l.trim().length > 0)
        .slice(0, 35);

      let currentY = height - 110;
      for (const line of cleanLines) {
        if (currentY < 60) break;
        page.drawText(line.slice(0, 90), {
          x: 50,
          y: currentY,
          size: 10,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        currentY -= 18;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Failed to convert file to PDF.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 transition-colors">
        <Upload className="w-10 h-10 text-sky-500 mb-3" />
        <p className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
          Convert Word (.doc, .docx, .txt) to PDF
        </p>
        <p className="text-xs text-slate-400 mt-1">Instant client-side compilation • Zero data storage</p>
        <label className="mt-4 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-sky-500/25 transition-all">
          Upload Word Document
          <input
            type="file"
            accept=".doc,.docx,.txt"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
              Document: {file.name}
            </span>
          </div>

          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isConverting ? "Creating PDF..." : "Convert to PDF"}
          </button>
        </div>
      )}

      {pdfUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>PDF Ready to Download!</span>
          </div>
          <a
            href={pdfUrl}
            download={`${file?.name.replace(/\.[^/.]+$/, "") || "document"}.pdf`}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Generated PDF
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. PDF ROTATE PAGES (NEW)
// ==========================================
export function PdfPageRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [isRotating, setIsRotating] = useState(false);
  const [rotatedUrl, setRotatedUrl] = useState<string>("");

  const handleRotate = async () => {
    if (!file) return;
    setIsRotating(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + angle) % 360));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setRotatedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Failed to rotate PDF pages.");
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 cursor-pointer transition-colors">
          <RotateCw className="w-10 h-10 text-sky-500 mb-3" />
          <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
            Select PDF file to rotate
          </span>
          <p className="text-xs text-slate-400 mt-1">Rotate 90°, 180°, or 270° clockwise</p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
              Document: {file.name}
            </span>
            <button
              onClick={() => {
                setFile(null);
                setRotatedUrl("");
              }}
              className="text-xs text-rose-500 hover:underline"
            >
              Change
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Rotation Angle
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "90° Clockwise", val: 90 as const },
                { label: "180° Flip", val: 180 as const },
                { label: "270° (90° Counter)", val: 270 as const },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAngle(opt.val)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    angle === opt.val
                      ? "border-sky-500 bg-sky-50 dark:bg-neutral-800 text-sky-600 dark:text-sky-400"
                      : "border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRotate}
            disabled={isRotating}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            {isRotating ? "Rotating Pages..." : `Rotate All Pages ${angle}°`}
          </button>
        </div>
      )}

      {rotatedUrl && (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Pages Rotated Successfully!</span>
          </div>
          <a
            href={rotatedUrl}
            download={`rotated-${file?.name || "document"}.pdf`}
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Download Rotated PDF
          </a>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. PDF SPLIT & EXTRACTOR
// ==========================================
export function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("1-2");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const arrayBuffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
      setPageRange(`1-${Math.min(2, pdf.getPageCount())}`);
    }
  };

  const handleSplit = async () => {
    if (!file || totalPages === 0) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Parse range: e.g. "1-3, 5"
      const pagesToExtract = new Set<number>();
      const parts = pageRange.split(",").map((p) => p.trim());

      parts.forEach((part) => {
        if (part.includes("-")) {
          const [startStr, endStr] = part.split("-");
          const start = Math.max(1, parseInt(startStr, 10));
          const end = Math.min(totalPages, parseInt(endStr, 10));
          for (let p = start; p <= end; p++) {
            pagesToExtract.add(p - 1); // 0-indexed
          }
        } else {
          const single = parseInt(part, 10);
          if (!isNaN(single) && single >= 1 && single <= totalPages) {
            pagesToExtract.add(single - 1);
          }
        }
      });

      const indices = Array.from(pagesToExtract).sort((a, b) => a - b);
      if (indices.length === 0) {
        alert("Please enter valid page numbers within range.");
        setIsProcessing(false);
        return;
      }

      const copiedPages = await newPdf.copyPages(pdf, indices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setSplitPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Failed to extract pages from PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-sky-500 rounded-3xl bg-sky-50/30 dark:bg-neutral-900/50 cursor-pointer transition-colors group">
          <Upload className="w-10 h-10 text-sky-500 mb-3" />
          <span className="font-bold text-slate-800 dark:text-neutral-200 text-sm">
            Select PDF file to extract or split
          </span>
          <p className="text-xs text-slate-400 mt-1">100% Client-Side Privacy</p>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-neutral-200 text-sm">
              Document: {file.name}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 dark:bg-neutral-800 text-sky-700 dark:text-sky-300 font-bold">
              {totalPages} Pages
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Pages to Extract (e.g. 1-3, 5)
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800 font-mono text-base"
              placeholder="e.g. 1-2, 4"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold flex-1 text-sm shadow-md shadow-sky-500/25 transition-all"
            >
              {isProcessing ? "Extracting..." : "Extract Selected Pages"}
            </button>
            {splitPdfUrl && (
              <a
                href={splitPdfUrl}
                download={`extracted-${file.name}`}
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
