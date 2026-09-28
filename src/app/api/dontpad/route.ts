import { NextRequest, NextResponse } from "next/server";

// Global in-memory cache for shared pad documents across sessions
const globalPads = globalThis as unknown as {
  __TOOLGEN_DONTPAD_STORE__?: Map<string, { content: string; updatedAt: number }>;
};

if (!globalPads.__TOOLGEN_DONTPAD_STORE__) {
  globalPads.__TOOLGEN_DONTPAD_STORE__ = new Map<string, { content: string; updatedAt: number }>();
  // Seed default welcome pad
  globalPads.__TOOLGEN_DONTPAD_STORE__.set("welcome", {
    content: `# Welcome to ToolGen DontPad!\n\nThis is your real-time shared notepad.\n\n📌 How it works:\n1. Choose or enter any custom code above (e.g. "meeting-notes", "homework-cs101", "my-todo").\n2. Share the code or the link with anyone.\n3. Anyone entering that exact code can instantly view and collaborate on the text!\n\n⚡ Features:\n- Instant auto-save and synchronization\n- Word, character, and line counters\n- Download as .txt or .md\n- Zero account or login needed`,
    updatedAt: Date.now(),
  });
}

const store = globalPads.__TOOLGEN_DONTPAD_STORE__;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = (searchParams.get("code") || "welcome").trim().toLowerCase();

  const entry = store.get(code);
  return NextResponse.json({
    code,
    content: entry ? entry.content : "",
    updatedAt: entry ? entry.updatedAt : Date.now(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = (body.code || "").trim().toLowerCase();
    const content = typeof body.content === "string" ? body.content : "";

    if (!code) {
      return NextResponse.json({ error: "Pad code is required" }, { status: 400 });
    }

    store.set(code, {
      content,
      updatedAt: Date.now(),
    });

    return NextResponse.json({ success: true, code, updatedAt: Date.now() });
  } catch (err) {
    console.error("DontPad API Error:", err);
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
