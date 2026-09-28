"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Copy, Check, Download, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

// 1. ADVANCED MULTI-VARIETY QR CODE STUDIO
type QrType = "url" | "wifi" | "vcard" | "email" | "sms" | "phone" | "text";

export function QrCodeGenerator() {
  const [qrType, setQrType] = useState<QrType>("url");

  // Specific state for each variety
  const [url, setUrl] = useState("https://toolgen.app");
  const [plainText, setPlainText] = useState("Welcome to ToolGen!");

  // WiFi
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiAuth, setWifiAuth] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  // vCard
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardCompany, setVcardCompany] = useState("");
  const [vcardTitle, setVcardTitle] = useState("");

  // Email
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // SMS
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  // Phone Call
  const [callPhone, setCallPhone] = useState("");

  // Styling & Options
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState<number>(360);
  const [qrDataUrl, setQrDataUrl] = useState("");

  // Compute final payload string depending on variety
  const getPayload = () => {
    switch (qrType) {
      case "url":
        return url.trim();
      case "wifi":
        return `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiPass};H:${wifiHidden ? "true" : "false"};;`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nORG:${vcardCompany}\nTITLE:${vcardTitle}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "sms":
        return `smsto:${smsPhone}:${smsMessage}`;
      case "phone":
        return `tel:${callPhone.trim()}`;
      case "text":
      default:
        return plainText;
    }
  };

  const payload = getPayload();

  useEffect(() => {
    let isCancelled = false;
    if (!payload.trim()) return;

    QRCode.toDataURL(
      payload,
      {
        width: qrSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      (err, generatedUrl) => {
        if (!err && generatedUrl && !isCancelled) {
          setQrDataUrl(generatedUrl);
        }
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [payload, fgColor, bgColor, qrSize]);

  return (
    <div className="space-y-6">
      {/* Variety Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-neutral-800">
        {[
          { id: "url" as const, label: "🌐 Website URL" },
          { id: "wifi" as const, label: "📶 WiFi Network" },
          { id: "vcard" as const, label: "👤 Contact Card (vCard)" },
          { id: "email" as const, label: "✉️ Email Message" },
          { id: "sms" as const, label: "💬 SMS Message" },
          { id: "phone" as const, label: "📞 Phone Call" },
          { id: "text" as const, label: "📝 Plain Text" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setQrType(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              qrType === tab.id
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {qrType === "url" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Target Website URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">Users will be directed automatically when scanning with their camera.</p>
            </div>
          )}

          {qrType === "wifi" && (
            <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  WiFi Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Home_Network_5G"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  WiFi Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="Enter WiFi security password"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Security Encryption
                  </label>
                  <select
                    value={wifiAuth}
                    onChange={(e) => setWifiAuth(e.target.value as "WPA" | "WEP" | "nopass")}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-xs font-semibold"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP (Legacy)</option>
                    <option value="nopass">None (Open Network)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="hiddenNet"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-500"
                  />
                  <label htmlFor="hiddenNet" className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                    Hidden SSID Network
                  </label>
                </div>
              </div>
            </div>
          )}

          {qrType === "vcard" && (
            <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={vcardName}
                    onChange={(e) => setVcardName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Organization / Company</label>
                  <input
                    type="text"
                    value={vcardCompany}
                    onChange={(e) => setVcardCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Job Title / Designation</label>
                <input
                  type="text"
                  value={vcardTitle}
                  onChange={(e) => setVcardTitle(e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>
          )}

          {qrType === "email" && (
            <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Send Email To</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Inquiry / Partnership"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Pre-filled Body</label>
                <textarea
                  rows={3}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Hello, I would like to get in touch..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>
          )}

          {qrType === "sms" && (
            <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Recipient Phone Number</label>
                <input
                  type="tel"
                  value={smsPhone}
                  onChange={(e) => setSmsPhone(e.target.value)}
                  placeholder="+1 (555) 987-6543"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Default Message</label>
                <textarea
                  rows={3}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="Hi, checking in..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>
          )}

          {qrType === "phone" && (
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Direct Call Phone Number
              </label>
              <input
                type="tel"
                value={callPhone}
                onChange={(e) => setCallPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <p className="text-[11px] text-slate-400">Scanning this immediately launches the user&apos;s phone dialer.</p>
            </div>
          )}

          {qrType === "text" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Plain Text or Crypto Address
              </label>
              <textarea
                rows={4}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter text, crypto address, promo code..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          )}

          {/* Color & Size Customization */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                QR Color (Dark)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-neutral-700"
                />
                <span className="font-mono text-xs text-slate-600 dark:text-neutral-400">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Background (Light)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-neutral-700"
                />
                <span className="font-mono text-xs text-slate-600 dark:text-neutral-400">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Export Resolution
              </label>
              <select
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold"
              >
                <option value={240}>Standard (240px)</option>
                <option value={360}>High-Res (360px)</option>
                <option value={512}>Ultra-HD (512px)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center space-y-4 shadow-xl shadow-sky-500/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live QR Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-neutral-800 text-sky-600 dark:text-sky-400 font-bold uppercase">
              {qrType}
            </span>
          </div>

          {qrDataUrl ? (
            <div className="inline-block p-4 rounded-2xl bg-white border border-slate-100 dark:border-neutral-800 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR Code Preview" className="w-56 h-56 mx-auto object-contain" />
            </div>
          ) : (
            <div className="w-56 h-56 mx-auto rounded-2xl border-2 border-dashed border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-400 text-xs">
              Enter details to render QR
            </div>
          )}

          {qrDataUrl && (
            <div className="pt-2 space-y-2">
              <a
                href={qrDataUrl}
                download={`toolgen-qr-${qrType}.png`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                Download High-Res PNG
              </a>
              <p className="text-[11px] text-slate-400">100% compliant with iOS and Android camera scanners</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper to generate password
function createRandomPassword(length: number, upper: boolean, lower: boolean, num: boolean, sym: boolean): string {
  let charset = "";
  if (upper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) charset += "abcdefghijklmnopqrstuvwxyz";
  if (num) charset += "0123456789";
  if (sym) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (!charset) return "Select at least one option";

  let res = "";
  const arr = new Uint32Array(length);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) {
      res += charset[arr[i] % charset.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      res += charset[Math.floor(Math.random() * charset.length)];
    }
  }
  return res;
}

// 2. PASSWORD GENERATOR
export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const password = React.useMemo(() => {
    return createRandomPassword(length, uppercase, lowercase, numbers, symbols);
  }, [length, uppercase, lowercase, numbers, symbols, seed]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (uppercase && lowercase) score += 1;
    if (numbers) score += 1;
    if (symbols) score += 1;
    if (score <= 2) return { text: "Weak", color: "bg-rose-500" };
    if (score <= 4) return { text: "Strong", color: "bg-amber-500" };
    return { text: "Very Strong", color: "bg-emerald-500" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      {/* Password display bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="font-mono text-lg sm:text-2xl font-bold tracking-wider text-slate-900 dark:text-slate-100 overflow-x-auto whitespace-nowrap">
          {password}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Generate New Password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={copy}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Strength indicator */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-500">
          <span>Security Strength</span>
          <span className="font-bold">{strength.text}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full ${strength.color} transition-all duration-300`}
            style={{ width: `${(length / 32) * 100}%` }}
          />
        </div>
      </div>

      {/* Length Slider & Options */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <span>Password Length</span>
            <span className="font-mono text-blue-600 font-bold">{length} characters</span>
          </div>
          <input
            type="range"
            min="6"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="font-medium">ABC Uppercase</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="font-medium">abc Lowercase</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="font-medium">123 Numbers</span>
          </label>
          <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="font-medium">!@# Symbols</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// 3. JSON FORMATTER & VALIDATOR
export function JsonFormatter() {
  const [input, setInput] = useState(`{"site":"ToolGen","features":["fast","seo","free"],"scale":100}`);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const prettify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={prettify}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
          >
            Prettify JSON (2 spaces)
          </button>
          <button
            onClick={minify}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs"
          >
            Minify JSON
          </button>
        </div>
        <button
          onClick={copy}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <textarea
        rows={12}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          try {
            JSON.parse(e.target.value);
            setError(null);
          } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
          }
        }}
        className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-sm leading-relaxed"
      />

      {error ? (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Invalid JSON: {error}</span>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Valid JSON syntax</span>
        </div>
      )}
    </div>
  );
}

// 4. BASE64 ENCODER / DECODER
export function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello ToolGen!");
  const [copied, setCopied] = useState(false);

  const output = React.useMemo(() => {
    try {
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)));
      } else {
        return decodeURIComponent(escape(atob(input)));
      }
    } catch {
      return "Error: Invalid input for decoding.";
    }
  }, [input, mode]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            mode === "encode" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            mode === "decode" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          Decode Base64
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Input ({mode === "encode" ? "Plain Text" : "Base64"})
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Output ({mode === "encode" ? "Base64" : "Plain Text"})
            </label>
            <button
              onClick={copy}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            rows={8}
            readOnly
            value={output}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}

function makeUuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 5. UUID GENERATOR
export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const uuids = React.useMemo(() => {
    return Array.from({ length: count }, () => {
      const id = makeUuidV4();
      return uppercase ? id.toUpperCase() : id.toLowerCase();
    });
  }, [count, uppercase, seed]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold uppercase text-slate-500">Count:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="w-16 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer ml-3">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-blue-600"
            />
            Uppercase
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Generate
          </button>
          <button
            onClick={copyAll}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy All"}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-sm">
        {uuids.map((id, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
          >
            <span className="text-slate-800 dark:text-slate-200">{id}</span>
            <button
              onClick={() => navigator.clipboard.writeText(id)}
              className="p-1 text-slate-400 hover:text-blue-600"
              title="Copy UUID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

