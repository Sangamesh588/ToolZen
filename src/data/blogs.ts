export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-calculate-and-improve-your-cgpa",
    title: "How to Calculate and Boost Your CGPA: The Ultimate College Guide",
    description: "Learn how Cumulative Grade Point Average (CGPA) is calculated, how to convert it to a percentage, and actionable strategies to graduate with top honors.",
    category: "Student Tips",
    readTime: "5 min read",
    publishedAt: "2026-09-15",
    author: {
      name: "Dr. Evelyn Reed",
      role: "Academic Advisor",
    },
    keywords: ["calculate cgpa", "cgpa improvement tips", "gpa to percentage formula"],
    content: `
# How to Calculate and Boost Your CGPA: The Ultimate College Guide

Your Cumulative Grade Point Average (CGPA) is more than just a number on your transcript—it determines eligibility for scholarships, competitive internships, graduate school admissions, and corporate job placements.

## 1. What is CGPA and How is it Calculated?

Unlike a Semester GPA (SGPA) which reflects your grades in a single term, your **CGPA** is the weighted average of all grade points accumulated across every semester you've enrolled in.

### The Weighted CGPA Formula
$$\\text{CGPA} = \\frac{\\sum (\\text{Grade Point} \\times \\text{Credit Hours})}{\\sum \\text{Total Credit Hours}}$$

Because high-credit courses (e.g. 4 credits) carry twice the mathematical weight of 2-credit electives, earning an 'A' in a high-credit subject has a far greater positive impact on your cumulative score!

## 2. Converting CGPA to Percentage
Different universities use varying conversion benchmarks:
* **CBSE & AICTE Standard:** $\\text{Percentage} = \\text{CGPA} \\times 9.5$
* **Standard 10-Point Scale:** $\\text{Percentage} = \\text{CGPA} \\times 10$
* **US 4.0 GPA Scale:** A 3.8+ GPA corresponds approximately to a 90%+ letter grade 'A'.

## 3. Top 4 Actionable Strategies to Boost Your CGPA
1. **Prioritize High-Credit Courses:** Dedicate your prime study hours to the subjects carrying 3 to 4 credits.
2. **Never Miss Easy Quiz and Assignment Marks:** Continuous internal assessments often account for 30–50% of your grade. Consistent submission is the easiest way to secure grade cushions.
3. **Use the Attendance Rule Strategically:** Use our **Attendance Calculator** to track your 75% or 80% mandatory criteria so you don't face penalties or debarment.
4. **Calculate Target Exam Grades Early:** Knowing exactly what score you need on your final exam eliminates stress and clarifies your study plan.
    `
  },
  {
    slug: "sip-vs-lumpsum-wealth-creation-guide",
    title: "SIP vs Lump Sum: Which Investment Strategy Builds Greater Wealth?",
    description: "A comprehensive financial analysis of Systematic Investment Plans (SIP) versus Lump Sum investments, with compound interest projections and risk analysis.",
    category: "Finance & Wealth",
    readTime: "6 min read",
    publishedAt: "2026-09-20",
    author: {
      name: "Marcus Vance",
      role: "Chartered Financial Analyst",
    },
    keywords: ["sip vs lump sum", "compound interest investing", "mutual funds wealth guide"],
    content: `
# SIP vs Lump Sum: Which Investment Strategy Builds Greater Wealth?

When investing in mutual funds or index funds, one of the most common dilemmas is whether to deposit a single lump sum or automate monthly investments through a **Systematic Investment Plan (SIP)**.

## 1. The Magic of Rupee-Cost / Dollar-Cost Averaging
The most powerful advantage of an SIP is that you do not need to time the market. 
* When stock markets dip, your fixed monthly installment buys **more units**.
* When stock markets rise, your fixed installment buys fewer units at higher value.
* Over a 5-to-15 year horizon, your average purchase price per unit is significantly lower than buying at a market peak.

## 2. Compounding Power Over Time
Consider an investor who deposits \$500 per month into an index fund averaging a 12% annual return:
* **After 10 Years:** Total invested = \$60,000 | Estimated Corpus = **\$116,000**
* **After 20 Years:** Total invested = \$120,000 | Estimated Corpus = **\$499,500**
* **After 30 Years:** Total invested = \$180,000 | Estimated Corpus = **\$1,765,000!**

Notice how the interest earned in the final decade eclipses all your original principal deposits combined! Try our interactive **SIP Calculator** to model your exact monthly target.
    `
  },
  {
    slug: "why-webp-images-boost-google-seo-rankings",
    title: "Why WebP Images Dramatically Boost Google Core Web Vitals & SEO",
    description: "Discover how converting your website images to WebP and compressing them reduces Largest Contentful Paint (LCP) and ranks your site higher on Google.",
    category: "SEO & Performance",
    readTime: "4 min read",
    publishedAt: "2026-09-24",
    author: {
      name: "Sophia Lin",
      role: "SEO & Web Performance Architect",
    },
    keywords: ["webp image format", "google core web vitals", "image compression seo"],
    content: `
# Why WebP Images Dramatically Boost Google Core Web Vitals & SEO

Page speed is an explicit Google ranking factor. Uncompressed images and outdated JPEG formats are the #1 culprit behind slow page loads and poor **Largest Contentful Paint (LCP)** scores.

## What is Google's WebP Format?
Created by Google, **WebP** is an image format that provides superior lossless and lossy compression for pictures on the web:
* WebP lossless images are **26% smaller** than equivalent PNGs.
* WebP lossy images are **25–34% smaller** than comparable JPEGs at equivalent SSIM quality index.
* WebP supports transparent alpha channels just like PNG, but with a fraction of the file size.

## Practical Steps to Optimize Images Today
1. Run large hero banners and screenshots through our browser-based **Image Compressor**.
2. Convert assets to WebP using our **Convert to WebP** tool.
3. Keep individual web photos under 100 KB whenever possible to ensure instant sub-second rendering.
    `
  },
  {
    slug: "science-of-pomodoro-technique-for-focus",
    title: "The Science of the Pomodoro Technique: Beating Procrastination in 25 Minutes",
    description: "Explore the psychological research behind the Pomodoro Technique, attention spans, and how structured breaks prevent mental burnout.",
    category: "Productivity",
    readTime: "4 min read",
    publishedAt: "2026-09-27",
    author: {
      name: "Alex Thorne",
      role: "Behavioral Psychologist",
    },
    keywords: ["pomodoro technique", "beat procrastination", "focus timer productivity"],
    content: `
# The Science of the Pomodoro Technique: Beating Procrastination in 25 Minutes

Procrastination is rarely a sign of laziness; it is an emotional regulation issue caused by the brain perceiving large, amorphous tasks as intimidating threats.

## The 25-Minute Psychological Sweet Spot
The core genius of Francesco Cirillo's **Pomodoro Technique** is lowering the psychological barrier of entry:
* Anyone can commit to working for just **25 minutes**.
* The defined boundary creates healthy urgency through Parkinson's Law (work expands to fill the time allotted).
* When the 25 minutes expire, your brain receives a dopamine reward in the form of a mandatory 5-minute break.

## Tips for High-Performance Pomodoros
* **One Single Goal per Pomodoro:** Do not multitask. If a distraction arises, jot it down in your **To-Do List** and return immediately to the task at hand.
* **Step Away from Screens During Breaks:** Stretch, drink a glass of water, or take deep breaths to let your prefrontal cortex truly recover.
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
