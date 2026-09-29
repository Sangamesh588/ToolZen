"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  GraduationCap,
  Briefcase,
  Rocket,
  RefreshCw,
} from "lucide-react";

type LetterType = "fresher" | "internship" | "experienced";

export function CoverLetterGenerator() {
  const [letterType, setLetterType] = useState<LetterType>("fresher");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type") as LetterType;
      if (t === "fresher" || t === "internship" || t === "experienced") {
        setLetterType(t);
      }
    } catch {}
  }, []);
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [city, setCity] = useState("Bangalore, India");
  const [companyName, setCompanyName] = useState("Google");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [hiringManager, setHiringManager] = useState("Hiring Manager");
  const [collegeDegree, setCollegeDegree] = useState("B.Tech in Computer Science");
  const [skills, setSkills] = useState("React, TypeScript, Next.js, Node.js, Problem Solving");
  const [keyProject, setKeyProject] = useState("Full-stack E-commerce platform with real-time analytics");
  const [whyCompany, setWhyCompany] = useState("your culture of relentless innovation and impactful products");
  const [copied, setCopied] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const generateLetter = () => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const greeting = hiringManager ? `Dear ${hiringManager},` : "Dear Hiring Team,";

    if (letterType === "fresher") {
      setGeneratedLetter(
`${fullName}
${email} | ${phone} | ${city}
LinkedIn / Portfolio

${today}

${hiringManager || "Hiring Team"}
${companyName}

${greeting}

I am writing to express my strong enthusiasm for the ${jobTitle} position at ${companyName}. As a recent graduate with a ${collegeDegree}, I have developed a solid foundation in core computer science principles and modern development practices, and I am eager to contribute my skills to your esteemed engineering team.

During my academic journey, I maintained a disciplined focus on hands-on practical implementation. I have developed strong proficiency in ${skills}. One of my notable accomplishments was designing and developing a ${keyProject}, where I solved complex architectural challenges, wrote clean modular code, and gained deep experience across the complete software development lifecycle.

What particularly attracts me to ${companyName} is ${whyCompany}. As a proactive fresher, I bring a fast-learning mindset, a strong work ethic, and an eagerness to take on challenging problems under mentorship while contributing meaningful value from day one.

I would welcome the opportunity to discuss how my academic background, technical skills, and drive align with the goals of ${companyName}. Thank you for your time and consideration.

Sincerely,

${fullName}`.trim()
      );
    } else if (letterType === "internship") {
      setGeneratedLetter(
`${fullName}
${email} | ${phone} | ${city}
GitHub / Portfolio

${today}

${hiringManager || "Campus Recruitment Team"}
${companyName}

${greeting}

I am writing to enthusiastically apply for the ${jobTitle} Internship opportunity at ${companyName}. Currently pursuing my ${collegeDegree}, I have actively honed practical technical capabilities in ${skills} and am thrilled by the prospect of learning alongside your world-class team.

Throughout my coursework and personal projects, I have consistently applied theoretical knowledge to real-world software solutions. Notably, in my project involving ${keyProject}, I demonstrated the ability to rapidly master new technologies, collaborate effectively, and deliver reliable solutions under tight timelines.

I have closely followed the work of ${companyName} and am deeply inspired by ${whyCompany}. An internship at ${companyName} represents the ideal environment for me to immerse myself in high-standard engineering workflows, contribute meaningfully to active initiatives, and grow into an exceptional software professional.

I am available for the upcoming internship term and am excited about the chance to contribute to your team. Thank you for reviewing my application.

Warm regards,

${fullName}`.trim()
      );
    } else {
      setGeneratedLetter(
`${fullName}
${email} | ${phone} | ${city}

${today}

${hiringManager || "Hiring Manager"}
${companyName}

${greeting}

I am writing to express my eager interest in the ${jobTitle} role at ${companyName}. With a dedicated background in technology and demonstrated capability in ${skills}, I am excited about the opportunity to bring my problem-solving mindset and technical execution to your team.

Throughout my experience, I have consistently delivered robust solutions that move business metrics. A highlight includes spearheading ${keyProject}, which required cross-functional collaboration, thoughtful technical design, and rigorous adherence to best engineering practices.

I hold great admiration for ${companyName}, especially ${whyCompany}. I am confident that my technical proficiency in ${skills}, combined with my commitment to excellence and team success, will allow me to make an immediate positive impact on your roadmap.

I look forward to the possibility of discussing my background in greater detail. Thank you for your time, consideration, and review.

Sincerely,

${fullName}`.trim()
      );
    }
  };

  useEffect(() => {
    generateLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterType, fullName, email, phone, city, companyName, jobTitle, hiringManager, collegeDegree, skills, keyProject, whyCompany]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([generatedLetter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}_Cover_Letter_${companyName}.txt`;
    a.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${fullName} - Cover Letter for ${companyName}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #111; max-width: 700px; margin: auto; }
            pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
          </style>
        </head>
        <body>
          <pre>${generatedLetter}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-blue-50/80 border border-blue-200">
        <button
          onClick={() => setLetterType("fresher")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            letterType === "fresher"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Fresher Cover Letter</span>
        </button>
        <button
          onClick={() => setLetterType("internship")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            letterType === "internship"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>Internship Cover Letter</span>
        </button>
        <button
          onClick={() => setLetterType("experienced")}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            letterType === "experienced"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Professional / Experienced</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-white border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Your Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Your Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">City, Country</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Company / Organization</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Microsoft"
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Position</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Degree / College (For Freshers/Interns)</label>
            <input
              type="text"
              value={collegeDegree}
              onChange={(e) => setCollegeDegree(e.target.value)}
              placeholder="e.g. B.Tech in CSE / MCA"
              className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Key Skills &amp; Strengths</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Python, SQL, Communication"
              className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Highlight Project or Coursework</label>
            <textarea
              rows={2}
              value={keyProject}
              onChange={(e) => setKeyProject(e.target.value)}
              placeholder="e.g. AI-powered Attendance tracker with 98% accuracy"
              className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Why this company? (Short phrase)</label>
            <input
              type="text"
              value={whyCompany}
              onChange={(e) => setWhyCompany(e.target.value)}
              placeholder="e.g. your groundbreaking AI research and culture"
              className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs text-slate-900 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={generateLetter}
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 border border-blue-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Content</span>
          </button>
        </div>

        {/* Live Editable Preview (Right) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-blue-200 shadow-sm">
            <span className="text-xs font-bold text-slate-700">
              Formatted Preview &amp; Document Output
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handleDownloadTxt}
                className="p-1.5 rounded-xl border border-blue-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                title="Download .txt"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-xl border border-blue-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-blue-200 shadow-md shadow-blue-500/5">
            <textarea
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              rows={18}
              className="w-full text-slate-900 bg-transparent text-xs sm:text-sm font-sans leading-relaxed outline-none resize-y"
              placeholder="Your cover letter will appear here..."
            />
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            💡 Tip: Click anywhere inside the letter preview to customize wording before copying or printing!
          </p>
        </div>
      </div>
    </div>
  );
}
