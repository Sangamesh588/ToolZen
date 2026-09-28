import { MORE_TOOLS } from "./moreTools";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategorySlug;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  icon: string;
  isPopular?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  instructions: string[];
  faqs: ToolFAQ[];
  formula?: string;
  features?: string[];
}

export type ToolCategorySlug =
  | "student"
  | "health"
  | "finance"
  | "image"
  | "pdf"
  | "text"
  | "developer"
  | "productivity"
  | "conversion"
  | "datetime"
  | "random";

export interface CategoryInfo {
  slug: ToolCategorySlug;
  name: string;
  description: string;
  icon: string;
  badgeColor: string;
  count?: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "pdf",
    name: "PDF Tools",
    description: "Merge, split, image to PDF, convert, protect, and rotate documents securely on your device.",
    icon: "FileText",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/50",
  },
  {
    slug: "student",
    name: "Student Tools",
    description: "Calculate GPA, attendance, grades, and marks percentage with accuracy.",
    icon: "GraduationCap",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
  },
  {
    slug: "health",
    name: "Health & Fitness",
    description: "Track BMI, calorie burn, daily water intake, and ideal body weight metrics.",
    icon: "HeartPulse",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
  },
  {
    slug: "finance",
    name: "Finance Tools",
    description: "Plan loans, SIP wealth growth, compound interest, salary, and savings goals.",
    icon: "BadgeDollarSign",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
  },
  {
    slug: "image",
    name: "Image Tools",
    description: "Compress, resize, convert to WebP/JPG/PNG right in your browser with zero upload lag.",
    icon: "Image",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
  },
  {
    slug: "text",
    name: "Text Tools",
    description: "Word count, case converters, duplicate removers, and text diff utilities.",
    icon: "AlignLeft",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    description: "QR generators, JSON formatters, base64 encoders, UUIDs, and hash generators.",
    icon: "Code2",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/50",
  },
  {
    slug: "productivity",
    name: "Productivity Tools",
    description: "Pomodoro timers, daily planners, habit trackers, and meeting note generators.",
    icon: "CheckSquare",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900/50",
  },
  {
    slug: "conversion",
    name: "Unit Converters",
    description: "Instant unit conversion for length, weight, temperature, speed, area, and storage.",
    icon: "ArrowLeftRight",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50",
  },
  {
    slug: "datetime",
    name: "Date & Time",
    description: "Calculate age, days difference, time zone conversions, and live countdowns.",
    icon: "Clock",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/50",
  },
  {
    slug: "random",
    name: "Random Tools",
    description: "Flip a coin, roll dice, pick names, draw raffles, and generate teams randomly.",
    icon: "Dices",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-900/50",
  },
];

export const TOOLS: ToolItem[] = [
  // 1. STUDENT TOOLS
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "student",
    shortDescription: "Calculate cumulative grade point average (CGPA) with semester credit weightage.",
    metaTitle: "CGPA Calculator Online - Fast & Accurate Cumulative GPA Calculation",
    metaDescription: "Free online CGPA Calculator. Calculate cumulative grade point average across all semesters with credit hours. Instant percentage conversion and GPA scale support.",
    keywords: ["cgpa calculator", "how to calculate cgpa", "cgpa to percentage", "semester gpa", "grade calculator"],
    icon: "GraduationCap",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 18450,
    instructions: [
      "Enter the number of semesters or courses.",
      "Input GPA and Credit Hours for each semester.",
      "View your weighted Cumulative GPA instantly.",
      "Get corresponding percentage and academic standing estimation."
    ],
    faqs: [
      {
        question: "How is CGPA calculated?",
        answer: "CGPA is calculated by dividing the total credit points earned across all semesters by the sum of total credits enrolled: CGPA = Total Grade Points / Total Credits."
      },
      {
        question: "How do I convert CGPA to percentage?",
        answer: "Most university standards multiply CGPA by 9.5 (Percentage = CGPA × 9.5), though some institutions multiply by 10. Our calculator displays both."
      }
    ],
    formula: "CGPA = (Σ (Semester GPA × Semester Credits)) / (Σ Semester Credits)",
    features: ["Add/Remove semesters dynamically", "Supports 4.0, 5.0, and 10.0 scale", "Instant percentage conversion", "Print & Export Report"]
  },
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "student",
    shortDescription: "Quickly solve percentage of a number, percentage increase/decrease, and ratios.",
    metaTitle: "Percentage Calculator - 3-in-1 Online Percentage Solver",
    metaDescription: "Instant online percentage calculator. Find X% of Y, calculate percentage change, discount percentage, and compare ratios with step-by-step breakdown.",
    keywords: ["percentage calculator", "find percentage", "percentage increase calculator", "percentage of number"],
    icon: "Percent",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 34120,
    instructions: [
      "Choose which calculation mode you need: X% of Y, What % is X of Y, or % Increase/Decrease.",
      "Input your numbers in the designated fields.",
      "Instant result with detailed calculation steps shown automatically."
    ],
    faqs: [
      {
        question: "How to calculate what percent of X is Y?",
        answer: "Divide Y by X, then multiply by 100. Formula: (Y / X) × 100%."
      },
      {
        question: "How to calculate percentage change?",
        answer: "Subtract initial value from final value, divide by initial value, then multiply by 100: ((Final - Initial) / Initial) × 100%."
      }
    ],
    formula: "P% of X = (P / 100) × X"
  },
  {
    id: "attendance-calculator",
    slug: "attendance-calculator",
    name: "Attendance Calculator",
    category: "student",
    shortDescription: "Check how many lectures you can bunk or need to attend to meet minimum attendance.",
    metaTitle: "Attendance Calculator - Bunk & Target Attendance Planner",
    metaDescription: "Calculate attendance percentage accurately. Find out exactly how many lectures you can safely skip or must attend to reach 75% or 80% criteria.",
    keywords: ["attendance calculator", "how many classes can i bunk", "college attendance percentage", "75 attendance criteria"],
    icon: "CalendarCheck",
    isPopular: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 14200,
    instructions: [
      "Enter total number of classes conducted so far.",
      "Enter number of classes you actually attended.",
      "Set your university target attendance percentage (default 75%).",
      "Get actionable advice on safe skips or required future attendances."
    ],
    faqs: [
      {
        question: "How does the attendance target calculate bunk limits?",
        answer: "If your current attendance is higher than required, the calculator solves how many consecutive absences will keep you above the target percentage threshold."
      }
    ],
    formula: "Attendance % = (Classes Attended / Total Classes) × 100"
  },
  {
    id: "grade-calculator",
    slug: "grade-calculator",
    name: "Grade Calculator",
    category: "student",
    shortDescription: "Calculate weighted course grades and what you need on final exams to get an A.",
    metaTitle: "Weighted Grade Calculator - Final Exam Score Needed",
    metaDescription: "Calculate your overall weighted grade for school or college. Find what score you need on your final exam to achieve your desired target letter grade.",
    keywords: ["grade calculator", "weighted grade calculator", "final grade calculator", "what do i need on final"],
    icon: "Award",
    rating: 4.8,
    reviewsCount: 9800,
    instructions: [
      "Enter assignments, quizzes, homework, and midterms with their scores and weights.",
      "Optionally enter your target final grade (e.g. 90% for A).",
      "Discover your current standing and required final exam score."
    ],
    faqs: [
      {
        question: "How do weighted grades work?",
        answer: "Each category (e.g., Homework 20%, Midterm 30%, Final 50%) contributes proportionally to your overall 100% course grade."
      }
    ]
  },
  {
    id: "semester-gpa-calculator",
    slug: "semester-gpa-calculator",
    name: "Semester GPA Calculator",
    category: "student",
    shortDescription: "Calculate your semester grade point average (SGPA) by subject credits and grades.",
    metaTitle: "Semester GPA Calculator (SGPA) - Course Grade Average",
    metaDescription: "Calculate SGPA easily. Add subjects with course credit units and letter grades to find your term GPA.",
    keywords: ["sgpa calculator", "semester gpa", "calculate sgpa", "college gpa calculator"],
    icon: "BookOpenCheck",
    rating: 4.8,
    reviewsCount: 11200,
    instructions: [
      "Add your course subjects for this semester.",
      "Select credit units and awarded letter grades.",
      "Instant SGPA generated with total grade points summary."
    ],
    faqs: [
      {
        question: "What is SGPA?",
        answer: "SGPA stands for Semester Grade Point Average, representing your academic performance over an individual semester."
      }
    ]
  },

  // 2. HEALTH & FITNESS TOOLS
  {
    id: "bmi-calculator",
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "health",
    shortDescription: "Calculate Body Mass Index (BMI) for adults with health category gauges and recommendations.",
    metaTitle: "BMI Calculator - Body Mass Index & Healthy Weight Chart",
    metaDescription: "Free online BMI Calculator. Calculate your Body Mass Index using Metric (cm/kg) or Imperial (feet/inches/lbs). See your ideal weight range according to WHO guidelines.",
    keywords: ["bmi calculator", "body mass index", "ideal weight bmi", "bmi formula", "am i overweight"],
    icon: "Activity",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 52100,
    instructions: [
      "Select unit system: Metric (cm, kg) or Imperial (ft/in, lbs).",
      "Enter your gender, age, height, and current weight.",
      "Click calculate to see your BMI score, WHO category (Underweight, Normal, Overweight, Obese), and ideal weight range."
    ],
    faqs: [
      {
        question: "What is considered a healthy BMI?",
        answer: "A healthy BMI for adults generally falls between 18.5 and 24.9 according to the World Health Organization (WHO)."
      },
      {
        question: "What is the formula for BMI?",
        answer: "Metric formula: BMI = weight (kg) / [height (m)]². Imperial formula: BMI = [weight (lbs) / height (inches)²] × 703."
      }
    ],
    formula: "BMI = weight (kg) / (height (m))²"
  },
  {
    id: "calorie-calculator",
    slug: "calorie-calculator",
    name: "Calorie & TDEE Calculator",
    category: "health",
    shortDescription: "Calculate your daily calories (BMR & TDEE) for weight loss, maintenance, or muscle gain.",
    metaTitle: "Calorie Calculator - TDEE & Daily Caloric Needs for Weight Loss",
    metaDescription: "Accurately calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Find custom calorie deficits for safe fat loss or surplus for bulking.",
    keywords: ["calorie calculator", "tdee calculator", "bmr calculator", "calories for weight loss", "macro calculator"],
    icon: "Flame",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 29800,
    instructions: [
      "Select your gender, age, height, and weight.",
      "Select your activity level from sedentary to very active.",
      "See maintenance calories, mild weight loss (-250 cal), and active fat loss (-500 cal)."
    ],
    faqs: [
      {
        question: "What is TDEE?",
        answer: "TDEE is Total Daily Energy Expenditure, the total number of calories you burn daily including physical activity and basic bodily processes."
      }
    ],
    formula: "Mifflin-St Jeor Equation: BMR = 10W + 6.25H - 5A (+5 for men, -161 for women)"
  },
  {
    id: "water-intake-calculator",
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    category: "health",
    shortDescription: "Determine daily water consumption needed based on body mass and daily workout minutes.",
    metaTitle: "Daily Water Intake Calculator - Hydration Recommendation",
    metaDescription: "Calculate how many liters or glasses of water you need to drink every day based on body weight, daily workout intensity, and climate.",
    keywords: ["water intake calculator", "daily water requirement", "how much water should i drink"],
    icon: "Droplets",
    rating: 4.8,
    reviewsCount: 8400,
    instructions: [
      "Enter body weight in kg or lbs.",
      "Specify daily workout duration in minutes.",
      "View recommended daily water target in liters and glasses (250ml)."
    ],
    faqs: [
      {
        question: "Why does exercise increase water needs?",
        answer: "Sweat loss during physical activity depletes fluids that must be replenished to prevent dehydration and fatigue."
      }
    ]
  },
  {
    id: "ideal-weight-calculator",
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    category: "health",
    shortDescription: "Compare your ideal body weight according to Devine, Robinson, and Miller medical formulas.",
    metaTitle: "Ideal Body Weight Calculator (IBW) - Multi-Formula Comparison",
    metaDescription: "Calculate ideal body weight (IBW) using top clinical standards: Devine formula, Robinson formula, Miller formula, and healthy BMI standards.",
    keywords: ["ideal weight calculator", "ibw formula", "devine formula", "healthy weight for height"],
    icon: "Scale",
    rating: 4.8,
    reviewsCount: 16500,
    instructions: [
      "Input your gender and height.",
      "View side-by-side results from leading medical formulas."
    ],
    faqs: [
      {
        question: "What is the Devine Formula for ideal weight?",
        answer: "For men: 50.0 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet."
      }
    ]
  },
  {
    id: "walking-calories-calculator",
    slug: "walking-calories-calculator",
    name: "Walking Calories Burned",
    category: "health",
    shortDescription: "Calculate calories burned walking by speed, body weight, and duration or step count.",
    metaTitle: "Walking Calories Burned Calculator - Steps & Distance Burn",
    metaDescription: "Find out how many calories you burn walking based on your body weight, pace (brisk or casual), and distance or duration.",
    keywords: ["walking calories calculator", "calories burned walking 10000 steps", "walking pace calorie burn"],
    icon: "Footprints",
    rating: 4.7,
    reviewsCount: 7900,
    instructions: [
      "Enter your weight and walking duration in minutes.",
      "Select your pace (casual 2.5 mph, moderate 3.0 mph, brisk 3.5+ mph).",
      "Instant calories burned and equivalent food comparisons."
    ],
    faqs: [
      {
        question: "How many calories does 10,000 steps burn?",
        answer: "On average, walking 10,000 steps burns approximately 300 to 500 calories depending on body weight and pace."
      }
    ]
  },

  // 3. FINANCE TOOLS
  {
    id: "emi-calculator",
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "finance",
    shortDescription: "Calculate Equated Monthly Installment (EMI) for home loans, car loans, and personal loans.",
    metaTitle: "EMI Calculator Online - Home Loan, Car Loan & Personal Loan EMI",
    metaDescription: "Calculate loan EMI, total interest payable, and complete repayment amortization schedule. Interactive slider controls with principal vs interest breakdown chart.",
    keywords: ["emi calculator", "loan emi calculator", "home loan emi", "car loan calculator", "monthly installment"],
    icon: "Landmark",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 41800,
    instructions: [
      "Enter loan principal amount (e.g., $100,000).",
      "Enter annual interest rate percentage (e.g., 7.5%).",
      "Select loan tenure in years or months.",
      "See monthly EMI, total interest, total amount payable, and year-by-year schedule."
    ],
    faqs: [
      {
        question: "What is the formula to calculate EMI?",
        answer: "EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is Principal, R is monthly interest rate, and N is number of monthly installments."
      },
      {
        question: "Can I prepay to reduce EMI?",
        answer: "Yes, prepaying principal lowers the remaining balance, thereby reducing either the future monthly EMI or the overall loan tenure."
      }
    ],
    formula: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]"
  },
  {
    id: "sip-calculator",
    slug: "sip-calculator",
    name: "SIP Calculator",
    category: "finance",
    shortDescription: "Calculate wealth accumulated through Systematic Investment Plans (SIP) in mutual funds.",
    metaTitle: "SIP Calculator Online - Systematic Investment Plan Wealth Growth",
    metaDescription: "Calculate returns on mutual fund SIP investments. Estimate total investment, wealth gained, and future maturity corpus with compound interest projections.",
    keywords: ["sip calculator", "systematic investment plan", "mutual fund calculator", "sip return calculator", "wealth builder"],
    icon: "TrendingUp",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 38200,
    instructions: [
      "Enter your planned monthly investment amount.",
      "Set your expected annual return rate (%) e.g., 12%.",
      "Choose investment duration in years.",
      "View invested amount vs estimated wealth gain side-by-side."
    ],
    faqs: [
      {
        question: "What is SIP?",
        answer: "A Systematic Investment Plan allows you to invest a fixed amount regularly into mutual funds or index funds, leveraging rupee-cost averaging and compounding."
      }
    ],
    formula: "M = P × [((1 + i)^n - 1) / i] × (1 + i)"
  },
  {
    id: "compound-interest-calculator",
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "finance",
    shortDescription: "Calculate compound growth on deposits with annual, monthly, or daily compounding intervals.",
    metaTitle: "Compound Interest Calculator - Future Value & Growth Chart",
    metaDescription: "See the power of compound interest. Calculate future value of your savings with recurring deposits and customizable compounding frequencies.",
    keywords: ["compound interest calculator", "compound interest formula", "future value calculator", "investment growth"],
    icon: "PiggyBank",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 27400,
    instructions: [
      "Input initial principal balance.",
      "Set annual interest rate (%) and compounding frequency (daily, monthly, yearly).",
      "Enter number of years to visualize interest earned and total balance."
    ],
    faqs: [
      {
        question: "What is the compound interest formula?",
        answer: "A = P(1 + r/n)^(nt), where A is final balance, P is initial deposit, r is annual rate, n is compounding frequency, and t is time in years."
      }
    ],
    formula: "A = P (1 + r/n)^(nt)"
  },
  {
    id: "loan-calculator",
    slug: "loan-calculator",
    name: "Loan Payoff Calculator",
    category: "finance",
    shortDescription: "Calculate monthly payments and see total interest cost across the loan lifetime.",
    metaTitle: "Loan Calculator - Payments, Total Interest & Amortization",
    metaDescription: "Free online loan payment calculator. Calculate amortization schedule, payoff dates, and compare interest rates across various loan amounts.",
    keywords: ["loan calculator", "amortization calculator", "personal loan calculator", "interest rate calculator"],
    icon: "Receipt",
    rating: 4.8,
    reviewsCount: 19100,
    instructions: [
      "Enter loan amount and interest rate.",
      "Choose payoff duration in months or years.",
      "View full amortization schedule breakdown."
    ],
    faqs: [
      {
        question: "How does loan term affect total interest?",
        answer: "Longer loan terms decrease monthly payments but increase total interest paid over the life of the loan."
      }
    ]
  },
  {
    id: "savings-goal-calculator",
    slug: "savings-goal-calculator",
    name: "Savings Goal Calculator",
    category: "finance",
    shortDescription: "Calculate how much you need to save every month to reach your financial target.",
    metaTitle: "Savings Goal Calculator - Plan Monthly Savings Target",
    metaDescription: "Calculate exact monthly contributions required to reach your target savings amount by your desired deadline, taking interest returns into account.",
    keywords: ["savings goal calculator", "how much to save", "target savings planner"],
    icon: "Target",
    rating: 4.8,
    reviewsCount: 13500,
    instructions: [
      "Enter target savings amount (e.g. $50,000 for house down payment).",
      "Enter current savings and deadline in months or years.",
      "Get exact required monthly deposit."
    ],
    faqs: [
      {
        question: "How do I reach my savings goal faster?",
        answer: "Increase your monthly savings rate, earn interest in a high-yield savings account, or cut non-essential recurring expenses."
      }
    ]
  },
  {
    id: "currency-converter",
    slug: "currency-converter",
    name: "Currency Converter",
    category: "finance",
    shortDescription: "Convert between major global currencies with instant calculation.",
    metaTitle: "Currency Converter - USD, EUR, GBP, INR, JPY Exchange",
    metaDescription: "Fast, accurate foreign exchange currency converter. Convert between US Dollar, Euro, British Pound, Indian Rupee, Japanese Yen, Canadian Dollar, and more.",
    keywords: ["currency converter", "forex calculator", "usd to eur", "usd to inr", "exchange rate calculator"],
    icon: "Coins",
    rating: 4.8,
    reviewsCount: 31000,
    instructions: [
      "Enter amount to convert.",
      "Choose source currency and target currency.",
      "Instant conversion with live inverse rate."
    ],
    faqs: [
      {
        question: "What currencies are supported?",
        answer: "All major world currencies including USD, EUR, GBP, INR, JPY, CAD, AUD, CHF, CNY, SGD, and more."
      }
    ]
  },

  // 4. IMAGE TOOLS
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image",
    shortDescription: "Compress JPG, PNG, and WebP images client-side without quality loss or server uploads.",
    metaTitle: "Free Image Compressor Online - Reduce File Size in Browser",
    metaDescription: "Compress images online for free. Reduce JPG, PNG, and WebP image file sizes up to 90% right inside your browser. 100% private, zero uploads to external servers.",
    keywords: ["image compressor", "compress image online", "reduce photo kb", "compress png", "compress jpeg"],
    icon: "Minimize2",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 46200,
    instructions: [
      "Upload or drag & drop your image file.",
      "Adjust the compression quality slider (1% to 100%).",
      "Preview original size vs compressed size in real time.",
      "Click Download Compressed Image."
    ],
    faqs: [
      {
        question: "Is it safe to compress private photos here?",
        answer: "Yes! All image processing happens 100% locally in your web browser using HTML5 Canvas. Your photos never leave your device."
      },
      {
        question: "How much file size reduction can I expect?",
        answer: "Typical reductions range from 60% to 90% without visible degradation in visual clarity."
      }
    ],
    features: ["Zero server uploads (100% private)", "Quality slider with real-time size preview", "Instant download", "Supports JPG, PNG, WebP"]
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    category: "image",
    shortDescription: "Convert JPG/JPEG images into high-quality lossless PNG format in seconds.",
    metaTitle: "JPG to PNG Converter - Free Online Image Converter",
    metaDescription: "Convert JPG files to PNG format instantly in your browser. Preserve high image quality with zero server uploads.",
    keywords: ["jpg to png", "convert jpg to png", "jpeg to png online", "free png converter"],
    icon: "Repeat",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 22100,
    instructions: [
      "Select your JPG file.",
      "Instant client-side canvas rendering converts it to PNG.",
      "Click Download PNG."
    ],
    faqs: [
      {
        question: "Why convert JPG to PNG?",
        answer: "PNG supports lossless compression and crisp line reproduction, ideal for text, illustrations, logos, and screenshots."
      }
    ]
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    category: "image",
    shortDescription: "Convert PNG images to compact JPG format with customizable background color.",
    metaTitle: "PNG to JPG Converter Online - Fast & Free",
    metaDescription: "Convert PNG images to JPG format online. Great for significantly reducing photo file sizes for website uploads.",
    keywords: ["png to jpg", "convert png to jpg", "png to jpeg converter"],
    icon: "FileImage",
    rating: 4.8,
    reviewsCount: 18900,
    instructions: [
      "Select your PNG file.",
      "Adjust output quality if desired.",
      "Download high-efficiency JPG image."
    ],
    faqs: [
      {
        question: "What happens to transparent PNG areas when converted to JPG?",
        answer: "Because JPG does not support transparency, transparent areas are smoothly filled with a clean white background."
      }
    ]
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Image Resizer",
    category: "image",
    shortDescription: "Resize image dimensions (width & height) in pixels or percentage with aspect ratio lock.",
    metaTitle: "Image Resizer Online - Change Photo Dimensions Free",
    metaDescription: "Resize images to exact dimensions in pixels or percentages. Maintain aspect ratio lock and download resized pictures instantly.",
    keywords: ["image resizer", "resize image online", "change image resolution", "photo dimension changer"],
    icon: "Maximize2",
    rating: 4.8,
    reviewsCount: 25400,
    instructions: [
      "Upload your image.",
      "Enter target width or height in pixels.",
      "Check 'Keep Aspect Ratio' to prevent distortion.",
      "Download resized image instantly."
    ],
    faqs: [
      {
        question: "Does resizing images reduce quality?",
        answer: "Downscaling images retains sharpness while reducing file size. Upscaling beyond original dimensions may appear soft."
      }
    ]
  },
  {
    id: "convert-to-webp",
    slug: "convert-to-webp",
    name: "Convert to WebP",
    category: "image",
    shortDescription: "Convert images to Google Next-Gen WebP format for ultra-fast website loading.",
    metaTitle: "Convert to WebP Online - Next-Gen Web Image Converter",
    metaDescription: "Convert JPG and PNG to Google WebP format. Improve Google PageSpeed scores with smaller next-generation web images.",
    keywords: ["convert to webp", "jpg to webp", "png to webp", "next gen image converter"],
    icon: "Zap",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 17200,
    instructions: [
      "Upload any JPG or PNG image.",
      "Select desired WebP compression ratio.",
      "Download ultra-fast WebP image."
    ],
    faqs: [
      {
        question: "What is WebP?",
        answer: "WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images, saving 25-34% file size."
      }
    ]
  },

  // 5. PDF TOOLS
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDF",
    category: "pdf",
    shortDescription: "Combine multiple PDF documents into a single organized PDF file right in your browser.",
    metaTitle: "Merge PDF Online - Combine Multiple PDF Files Free",
    metaDescription: "Easily merge multiple PDF files into one document. 100% client-side privacy, reorder pages, and download combined PDF instantly.",
    keywords: ["merge pdf", "combine pdf files", "pdf merger online", "join pdf documents"],
    icon: "Combine",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 38900,
    instructions: [
      "Select or drag & drop two or more PDF files.",
      "Verify the order of documents.",
      "Click 'Merge PDFs' to combine them into a single file.",
      "Download your merged PDF immediately."
    ],
    faqs: [
      {
        question: "Are my PDF documents uploaded to a cloud server?",
        answer: "No! All PDF merging operations run client-side using JavaScript (pdf-lib) directly inside your web browser. Your sensitive files never leave your machine."
      },
      {
        question: "Is there a limit on how many files I can merge?",
        answer: "You can merge dozens of files easily as memory allows on your device."
      }
    ],
    features: ["100% Client-side privacy", "Reorder files before merge", "Zero watermarks", "Completely free"]
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    category: "pdf",
    shortDescription: "Extract specific page ranges or split a PDF into separate individual pages.",
    metaTitle: "Split PDF Online - Extract Pages from PDF Document",
    metaDescription: "Split PDF files into individual pages or extract custom page ranges (e.g., 1-5, 8). Fast, secure, and private browser-based PDF splitting.",
    keywords: ["split pdf", "extract pdf pages", "separate pdf pages", "split pdf online free"],
    icon: "Scissors",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 24100,
    instructions: [
      "Upload your PDF document.",
      "Specify which pages to extract (e.g. 1-3, 5).",
      "Generate and download the new split PDF document."
    ],
    faqs: [
      {
        question: "Can I extract non-consecutive pages?",
        answer: "Yes! You can specify ranges and single pages such as '1-3, 5, 8-10'."
      }
    ]
  },
  {
    id: "pdf-page-extractor",
    slug: "pdf-page-extractor",
    name: "PDF Page Extractor",
    category: "pdf",
    shortDescription: "Select and pull out individual single pages from large PDF documents.",
    metaTitle: "PDF Page Extractor - Extract Single or Multiple Pages",
    metaDescription: "Extract selected pages from any PDF file. Fast client-side extractor tool with zero privacy risks.",
    keywords: ["pdf page extractor", "extract pages from pdf", "save single pdf page"],
    icon: "FileSpreadsheet",
    rating: 4.8,
    reviewsCount: 12400,
    instructions: [
      "Upload your PDF file.",
      "Enter the target page numbers to extract.",
      "Download a fresh PDF containing only the selected pages."
    ],
    faqs: [
      {
        question: "Does this affect the original file?",
        answer: "No, your original PDF remains untouched on your computer."
      }
    ]
  },

  // 6. TEXT TOOLS
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word & Character Counter",
    category: "text",
    shortDescription: "Count words, characters (with & without spaces), sentences, paragraphs, and reading time.",
    metaTitle: "Word Counter Online - Character, Sentence & Reading Time Counter",
    metaDescription: "Free online word counter and character counter. Real-time stats on word count, character count, estimated reading & speaking time, and keyword frequency.",
    keywords: ["word counter", "character counter", "count words online", "letter counter", "reading time calculator"],
    icon: "Hash",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 44200,
    instructions: [
      "Type or paste your text into the text area.",
      "Live counter immediately updates words, characters, sentences, and paragraphs.",
      "Check estimated reading time and speaking duration."
    ],
    faqs: [
      {
        question: "How is reading time calculated?",
        answer: "Standard adult reading speed is estimated at 200 words per minute (WPM), and speaking speed at 130 WPM."
      }
    ],
    features: ["Real-time instant counting", "Reading & speaking time estimates", "Keyword density analyzer", "Clean one-click copy"]
  },
  {
    id: "text-case-converter",
    slug: "text-case-converter",
    name: "Text Case Converter",
    category: "text",
    shortDescription: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    metaTitle: "Text Case Converter - UPPERCASE, lowercase, Title Case & camelCase",
    metaDescription: "Convert text case online. Switch between Title Case, UPPERCASE, lowercase, Sentence case, camelCase, snake_case, and kebab-case with one click.",
    keywords: ["text case converter", "uppercase to lowercase", "title case converter", "camelcase converter", "snake case"],
    icon: "Type",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 31200,
    instructions: [
      "Paste your text into the input box.",
      "Click any case button (e.g. UPPERCASE, Title Case, camelCase).",
      "Click 'Copy' to copy converted text to clipboard."
    ],
    faqs: [
      {
        question: "What is Title Case?",
        answer: "Title Case capitalizes the first letter of each major word while keeping minor words (like 'a', 'in', 'the') in lowercase."
      }
    ]
  },
  {
    id: "remove-duplicate-lines",
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    category: "text",
    shortDescription: "Deduplicate lists and text files, trim whitespace, and sort alphabetically.",
    metaTitle: "Remove Duplicate Lines - Online List Deduplicator",
    metaDescription: "Quickly remove duplicate lines from lists and data. Options for case-sensitive deduplication, whitespace trimming, and alphabetical sorting.",
    keywords: ["remove duplicate lines", "deduplicate list", "unique lines finder", "sort lines alphabetically"],
    icon: "ListFilter",
    rating: 4.8,
    reviewsCount: 15600,
    instructions: [
      "Paste your list or multi-line text into the box.",
      "Choose options: Case sensitive, trim whitespace, or sort results.",
      "Click 'Remove Duplicates' and copy your clean list."
    ],
    faqs: [
      {
        question: "Can I remove duplicates regardless of uppercase/lowercase?",
        answer: "Yes, toggle the 'Case Sensitive' checkbox to treat 'Apple' and 'apple' as identical."
      }
    ]
  },
  {
    id: "lorem-ipsum-generator",
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "text",
    shortDescription: "Generate dummy placeholder text in paragraphs, sentences, or words for designs.",
    metaTitle: "Lorem Ipsum Generator - Dummy Text Generator Online",
    metaDescription: "Generate standard Lorem Ipsum placeholder text for website mockups, layouts, and typography testing. Customize number of paragraphs, sentences, or words.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text", "filler text"],
    icon: "FileCode",
    rating: 4.8,
    reviewsCount: 18900,
    instructions: [
      "Select whether to generate paragraphs, sentences, or words.",
      "Enter the desired quantity.",
      "Click generate and copy the formatted placeholder text."
    ],
    faqs: [
      {
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is standard placeholder text derived from Cicero's 45 BC philosophical treatise 'De finibus bonorum et malorum'."
      }
    ]
  },

  // 7. DEVELOPER TOOLS
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "developer",
    shortDescription: "Generate custom QR codes for websites, WiFi networks, phone numbers, and plain text.",
    metaTitle: "Free QR Code Generator - Custom Colors & High Resolution PNG",
    metaDescription: "Create free custom QR codes online for URLs, plain text, email, and WiFi passwords. Download high-resolution PNG image with customizable colors.",
    keywords: ["qr code generator", "free qr code", "make qr code online", "qr code for website", "wifi qr code"],
    icon: "QrCode",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 51200,
    instructions: [
      "Enter your URL, WiFi details, or text into the input field.",
      "Customize foreground and background colors.",
      "Preview the QR code live.",
      "Download high-res PNG image."
    ],
    faqs: [
      {
        question: "Do generated QR codes expire?",
        answer: "No! Static QR codes generated here directly encode your text or URL and never expire."
      },
      {
        question: "Can these QR codes be printed on business cards or flyers?",
        answer: "Yes! High-resolution PNG format ensures crisp scanning at all print sizes."
      }
    ],
    features: ["Instant preview", "Custom foreground & background colors", "High-res PNG download", "100% Free forever"]
  },
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Password Generator",
    category: "developer",
    shortDescription: "Generate cryptographically secure passwords with strength meter and custom rule sets.",
    metaTitle: "Secure Password Generator - Strong Random Passwords Online",
    metaDescription: "Generate ultra-secure, cryptographically random passwords. Customize length (up to 64 chars), include symbols, numbers, and check password strength meter.",
    keywords: ["password generator", "strong password generator", "random password generator", "secure password maker"],
    icon: "KeyRound",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 39400,
    instructions: [
      "Set desired password length (e.g. 16 characters).",
      "Toggle character options: uppercase, lowercase, numbers, symbols.",
      "Check password strength meter.",
      "Copy your secure password with one click."
    ],
    faqs: [
      {
        question: "Is this password generator secure?",
        answer: "Yes, it uses the browser's native window.crypto.getRandomValues API, providing cryptographically strong pseudo-random numbers."
      }
    ]
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "developer",
    shortDescription: "Beautify, format, validate, and minify JSON data with instant syntax error highlighting.",
    metaTitle: "JSON Formatter & Validator - Prettify & Minify JSON Online",
    metaDescription: "Format, validate, prettify, and minify JSON strings online. Real-time syntax validation, collapsible viewer, and instant clipboard copy.",
    keywords: ["json formatter", "json validator", "prettify json", "json beautifier", "minify json"],
    icon: "Braces",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 36700,
    instructions: [
      "Paste your raw JSON into the editor.",
      "Click 'Prettify' to format with 2-space indentation or 'Minify' to compress into one line.",
      "Syntax errors are highlighted with exact line details."
    ],
    faqs: [
      {
        question: "Can it fix trailing commas in JSON?",
        answer: "Standard JSON does not allow trailing commas; our validator will point out the exact line and character where standard compliance fails."
      }
    ]
  },
  {
    id: "base64-encoder-decoder",
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder / Decoder",
    category: "developer",
    shortDescription: "Encode text strings to Base64 format and decode Base64 data back to plain text.",
    metaTitle: "Base64 Encode & Decode - Online Base64 Converter",
    metaDescription: "Fast online Base64 encoder and decoder. Convert strings to Base64 and decode Base64 text back into UTF-8 human-readable text.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "base64 decode online"],
    icon: "Binary",
    rating: 4.8,
    reviewsCount: 23100,
    instructions: [
      "Choose 'Encode' to convert plain text into Base64, or 'Decode' to convert Base64 into readable text.",
      "Paste your input and view the result in real time."
    ],
    faqs: [
      {
        question: "What is Base64 encoding used for?",
        answer: "Base64 represents binary data in an ASCII string format, commonly used for email attachments, data URLs, and API tokens."
      }
    ]
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID / GUID Generator",
    category: "developer",
    shortDescription: "Generate random Version-4 UUIDs / GUIDs individually or in batches with uppercase toggles.",
    metaTitle: "UUID Generator - Online Version 4 GUID Generator",
    metaDescription: "Generate Version 4 UUIDs (Universally Unique Identifiers) instantly. Generate single or bulk batches of up to 50 UUIDs with custom formatting.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random uuid online"],
    icon: "Fingerprint",
    rating: 4.8,
    reviewsCount: 16800,
    instructions: [
      "Select how many UUIDs you need (1 to 50).",
      "Choose uppercase or lowercase formatting.",
      "Click 'Generate UUIDs' and copy to clipboard."
    ],
    faqs: [
      {
        question: "What is a Version 4 UUID?",
        answer: "A Version 4 UUID is a 128-bit number generated using cryptographically strong random values, with a collision probability practically equal to zero."
      }
    ]
  },

  // 8. DATE & TIME TOOLS
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age Calculator",
    category: "datetime",
    shortDescription: "Calculate exact age in years, months, days, hours, total days lived, and next birthday countdown.",
    metaTitle: "Age Calculator Online - Exact Age in Years, Months, Days & Minutes",
    metaDescription: "Calculate your exact age from date of birth. See total days lived, hours, minutes, day of the week you were born, and live countdown to your next birthday.",
    keywords: ["age calculator", "how old am i", "calculate age from dob", "exact age calculator", "birthday countdown"],
    icon: "Calendar",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 48900,
    instructions: [
      "Select your Date of Birth.",
      "Optionally select a reference 'Age at date of' (defaults to today).",
      "View detailed age breakdown: years, months, days, total weeks, hours, and next birthday countdown."
    ],
    faqs: [
      {
        question: "How does the age calculator handle leap years?",
        answer: "The calculator accurately accounts for 366-day leap years across your lifetime to give 100% exact day counts."
      }
    ]
  },
  {
    id: "date-difference-calculator",
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    category: "datetime",
    shortDescription: "Calculate exact days, weeks, months, and business days between any two dates.",
    metaTitle: "Date Difference Calculator - Days Between Two Dates",
    metaDescription: "Calculate days between two dates. Get total days, weeks, months, business days (excluding weekends), and percentage of year passed.",
    keywords: ["date difference calculator", "days between dates", "how many days between", "business days calculator"],
    icon: "CalendarDays",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 26500,
    instructions: [
      "Pick start date and end date.",
      "See total days, calendar breakdown, and working days count."
    ],
    faqs: [
      {
        question: "Can it exclude weekends?",
        answer: "Yes, the working/business days count automatically excludes Saturdays and Sundays."
      }
    ]
  },
  {
    id: "countdown-timer",
    slug: "countdown-timer",
    name: "Countdown Timer",
    category: "datetime",
    shortDescription: "Set a live countdown timer to any upcoming event, holiday, birthday, or deadline.",
    metaTitle: "Online Countdown Timer - Live Days, Hours, Minutes, Seconds",
    metaDescription: "Create a live countdown timer to any future date and time. Watch days, hours, minutes, and seconds tick down with celebratory confetti when finished.",
    keywords: ["countdown timer", "live countdown", "event countdown", "days countdown online"],
    icon: "Hourglass",
    rating: 4.8,
    reviewsCount: 19800,
    instructions: [
      "Select the event title, date, and time.",
      "Watch the live countdown tick in real time.",
      "Share or keep full screen."
    ],
    faqs: [
      {
        question: "Does the countdown work if I reload the page?",
        answer: "Yes, your event target is saved in local storage so it persists across refreshes."
      }
    ]
  },
  {
    id: "stopwatch",
    slug: "stopwatch",
    name: "Online Stopwatch",
    category: "datetime",
    shortDescription: "Precise millisecond stopwatch with lap timer, splits, and exportable records.",
    metaTitle: "Online Stopwatch with Laps - Millisecond Precision",
    metaDescription: "Simple, accurate online stopwatch with lap recording. Record lap times, split times, and track fastest/slowest laps.",
    keywords: ["stopwatch online", "lap timer", "timer with milliseconds", "free stopwatch"],
    icon: "Timer",
    rating: 4.8,
    reviewsCount: 17400,
    instructions: [
      "Press Start (or spacebar) to begin timing.",
      "Press Lap to record split times.",
      "Press Stop and Reset when finished."
    ],
    faqs: [
      {
        question: "Can I use keyboard shortcuts?",
        answer: "Yes, you can use Space to Start/Stop and L to record a lap."
      }
    ]
  },

  // 9. PRODUCTIVITY TOOLS
  {
    id: "pomodoro-timer",
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    category: "productivity",
    shortDescription: "Boost study and work focus with 25-minute Pomodoro sessions and customizable breaks.",
    metaTitle: "Pomodoro Timer Online - Focus & Study Timer",
    metaDescription: "Free online Pomodoro timer for studying and productivity. 25-minute work intervals, 5-minute short breaks, 15-minute long breaks, and audio chime alert.",
    keywords: ["pomodoro timer", "pomodoro technique", "study timer online", "focus timer", "productivity timer"],
    icon: "AlarmClock",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 39100,
    instructions: [
      "Click Start to initiate your 25-minute focus session.",
      "Work without distractions until the audio chime sounds.",
      "Take a 5-minute break.",
      "After 4 Pomodoros, enjoy an extended 15-minute long break."
    ],
    faqs: [
      {
        question: "What is the Pomodoro Technique?",
        answer: "Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique breaks work into intervals, traditionally 25 minutes in length, separated by short breaks."
      }
    ],
    features: ["Audio chime alerts", "Customizable interval lengths", "Session counter", "Desktop notifications"]
  },
  {
    id: "to-do-list",
    slug: "to-do-list",
    name: "To-Do List & Task Manager",
    category: "productivity",
    shortDescription: "Clean minimalist task manager with priority tags, completion tracking, and local storage.",
    metaTitle: "To-Do List Online - Free Task Manager with Local Storage",
    metaDescription: "Organize daily tasks with our lightweight To-Do List. Add priority badges (High, Medium, Low), mark tasks complete, and keep data stored safely in your browser.",
    keywords: ["to do list online", "task manager", "checklist online", "daily planner checklist"],
    icon: "CheckCircle2",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 32400,
    instructions: [
      "Type a task title and pick priority (High, Medium, Low).",
      "Click Add or press Enter.",
      "Check off completed tasks, filter by status, or clear completed items."
    ],
    faqs: [
      {
        question: "Do my tasks stay saved when I close the browser?",
        answer: "Yes, tasks are automatically persisted into your browser's localStorage."
      }
    ]
  },
  {
    id: "habit-tracker",
    slug: "habit-tracker",
    name: "7-Day Habit Tracker",
    category: "productivity",
    shortDescription: "Track daily habits and maintain consistency streaks over a 7-day rolling window.",
    metaTitle: "Habit Tracker Online - 7-Day Consistency & Streak Builder",
    metaDescription: "Build good habits and break bad ones. Track your daily routine with a visual 7-day consistency grid and streak counter.",
    keywords: ["habit tracker", "daily habit builder", "habit tracker online", "streak tracker"],
    icon: "CalendarRange",
    rating: 4.8,
    reviewsCount: 14700,
    instructions: [
      "Add habits you want to form (e.g., Read 20 mins, Workout, Meditate).",
      "Click daily checkboxes as you complete each routine.",
      "Monitor your streak counter and percentage consistency."
    ],
    faqs: [
      {
        question: "How long does it take to form a habit?",
        answer: "Research indicates that on average it takes 21 to 66 days of consistent practice for a new behavior to become automatic."
      }
    ]
  },

  // 10. CONVERSION TOOLS
  {
    id: "length-converter",
    slug: "length-converter",
    name: "Length Converter",
    category: "conversion",
    shortDescription: "Convert between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches.",
    metaTitle: "Length Converter - Meters, Feet, Inches, Miles, Kilometers",
    metaDescription: "Instant length and distance unit converter. Convert between meters, feet, inches, centimeters, kilometers, miles, and yards with exact precision.",
    keywords: ["length converter", "meters to feet", "inches to cm", "miles to km", "distance converter"],
    icon: "Ruler",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 37800,
    instructions: [
      "Enter a value in any unit.",
      "Select source unit and destination unit.",
      "View instant conversion and complete multi-unit comparison table."
    ],
    faqs: [
      {
        question: "How many feet are in a meter?",
        answer: "1 meter is approximately equal to 3.28084 feet."
      },
      {
        question: "How many centimeters are in an inch?",
        answer: "1 inch is exactly equal to 2.54 centimeters."
      }
    ]
  },
  {
    id: "weight-converter",
    slug: "weight-converter",
    name: "Weight & Mass Converter",
    category: "conversion",
    shortDescription: "Convert kilograms, pounds, ounces, grams, stones, and metric tons instantly.",
    metaTitle: "Weight Converter - Kilograms, Pounds, Ounces, Grams",
    metaDescription: "Accurate online weight converter. Convert kilograms to pounds (kg to lbs), grams to ounces, metric tons to pounds, and stones with live conversion table.",
    keywords: ["weight converter", "kg to lbs", "pounds to kilograms", "grams to ounces", "mass converter"],
    icon: "Weight",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 35100,
    instructions: [
      "Enter numeric weight value.",
      "Choose from Kilograms, Pounds, Grams, Ounces, or Stones.",
      "Instant conversion results displayed across all units."
    ],
    faqs: [
      {
        question: "How many pounds in a kilogram?",
        answer: "1 kilogram is approximately equal to 2.20462 pounds."
      }
    ]
  },
  {
    id: "temperature-converter",
    slug: "temperature-converter",
    name: "Temperature Converter",
    category: "conversion",
    shortDescription: "Convert temperatures between Celsius, Fahrenheit, and Kelvin with formulas.",
    metaTitle: "Temperature Converter - Celsius, Fahrenheit & Kelvin",
    metaDescription: "Convert temperature units between Celsius (°C), Fahrenheit (°F), and Kelvin (K). Shows step-by-step mathematical conversion formulas.",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin to celsius"],
    icon: "Thermometer",
    rating: 4.8,
    reviewsCount: 28900,
    instructions: [
      "Enter temperature value.",
      "Select starting scale (°C, °F, or K).",
      "Instant calculation of all other temperature scales with step-by-step formulas."
    ],
    faqs: [
      {
        question: "What is the formula for Celsius to Fahrenheit?",
        answer: "°F = (°C × 9/5) + 32. For Fahrenheit to Celsius: °C = (°F - 32) × 5/9."
      }
    ]
  },
  {
    id: "data-storage-converter",
    slug: "data-storage-converter",
    name: "Data Storage Converter",
    category: "conversion",
    shortDescription: "Convert digital data storage units between Bytes, KB, MB, GB, TB, and PB.",
    metaTitle: "Data Storage Converter - Bytes, KB, MB, GB, TB, PB",
    metaDescription: "Convert file sizes and digital data storage units. Supports both decimal (1000) and binary (1024 / KiB / GiB) storage standards.",
    keywords: ["data storage converter", "mb to gb", "gb to tb", "bytes to megabytes", "file size converter"],
    icon: "HardDrive",
    rating: 4.8,
    reviewsCount: 16900,
    instructions: [
      "Enter data quantity.",
      "Select units (Bytes, KB, MB, GB, TB, PB).",
      "Toggle between decimal (1000) and binary (1024) standard."
    ],
    faqs: [
      {
        question: "Why do hard drives show less space than advertised?",
        answer: "Storage manufacturers use the decimal system (1 GB = 1,000,000,000 bytes), while operating systems use binary Gibibytes (1 GiB = 1,073,741,824 bytes)."
      }
    ]
  },
  {
    id: "speed-converter",
    slug: "speed-converter",
    name: "Speed Converter",
    category: "conversion",
    shortDescription: "Convert speed units between km/h, mph, m/s, knots, and ft/s.",
    metaTitle: "Speed Converter - km/h, mph, knots, m/s",
    metaDescription: "Convert speed between kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and nautical knots.",
    keywords: ["speed converter", "kmh to mph", "mph to kmh", "knots to mph"],
    icon: "Gauge",
    rating: 4.7,
    reviewsCount: 12100,
    instructions: [
      "Enter speed value.",
      "Select input and output speed units."
    ],
    faqs: [
      {
        question: "What is 1 knot in mph?",
        answer: "1 knot equals 1 nautical mile per hour, which is approximately 1.15078 mph or 1.852 km/h."
      }
    ]
  },

  // 11. RANDOM TOOLS
  {
    id: "coin-toss",
    slug: "coin-toss",
    name: "Coin Toss / Flip a Coin",
    category: "random",
    shortDescription: "Flip a virtual coin with 3D animation, sound effect, and flip tally tracker.",
    metaTitle: "Coin Toss Online - Flip a Coin Heads or Tails 3D",
    metaDescription: "Flip a coin online. Realistic animated coin toss with Heads or Tails outcome, streak counter, and percentage probability tracker.",
    keywords: ["coin toss", "flip a coin", "heads or tails", "virtual coin flip", "coin flip simulator"],
    icon: "CircleDot",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 42300,
    instructions: [
      "Click the 'Flip Coin' button.",
      "Watch the coin spin in 3D.",
      "See the outcome (Heads or Tails) and cumulative statistics."
    ],
    faqs: [
      {
        question: "Is the virtual coin toss 50/50 fair?",
        answer: "Yes, it uses cryptographic random numbers guaranteeing a statistically balanced 50% probability for both Heads and Tails."
      }
    ]
  },
  {
    id: "dice-roller",
    slug: "dice-roller",
    name: "Dice Roller",
    category: "random",
    shortDescription: "Roll 1 to 6 virtual dice (D6, D20) with rolling animations and sum total calculation.",
    metaTitle: "Dice Roller Online - Roll 1-6 Dice (D6, D20) Free",
    metaDescription: "Roll virtual dice online. Choose from 1 to 6 standard 6-sided dice or 20-sided D20 dice for tabletop games, board games, and decision making.",
    keywords: ["dice roller", "roll a die", "virtual dice", "roll dice online", "d6 roller", "d20 roller"],
    icon: "Dices",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 26800,
    instructions: [
      "Choose number of dice (1 to 6) or die type.",
      "Click 'Roll Dice' to trigger animation.",
      "View individual dice values and sum total."
    ],
    faqs: [
      {
        question: "Can I use this for Dungeons & Dragons?",
        answer: "Yes, both standard D6 and polyhedral D20 options are supported."
      }
    ]
  },
  {
    id: "random-number-generator",
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "random",
    shortDescription: "Generate random numbers between any minimum and maximum values with duplicate controls.",
    metaTitle: "Random Number Generator (RNG) - Min & Max Range",
    metaDescription: "Generate true random numbers online. Set custom min and max bounds, choose quantity to generate, and toggle unique numbers or duplicates allowed.",
    keywords: ["random number generator", "rng online", "pick a number between", "randomizer"],
    icon: "Shuffle",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 39500,
    instructions: [
      "Enter minimum and maximum values (e.g. 1 to 100).",
      "Specify how many numbers to generate.",
      "Toggle 'Allow Duplicates' or 'Unique Numbers Only'.",
      "Click Generate."
    ],
    faqs: [
      {
        question: "How are the numbers generated?",
        answer: "We use browser crypto.getRandomValues for unbiased, uniform cryptographic random distribution."
      }
    ]
  },
  {
    id: "name-picker",
    slug: "name-picker",
    name: "Random Name Picker & Raffle Wheel",
    category: "random",
    shortDescription: "Pick random winners from a list of names for giveaways, contests, and classroom drawings.",
    metaTitle: "Random Name Picker - Winner Drawing & Raffle Picker",
    metaDescription: "Pick random names and winners for giveaways and raffles. Paste names, shuffle, and draw with celebratory confetti animation!",
    keywords: ["random name picker", "raffle winner picker", "draw a name", "giveaway picker"],
    icon: "Sparkles",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 29400,
    instructions: [
      "Paste your list of names (one per line).",
      "Click 'Draw Winner'.",
      "Enjoy the celebratory confetti and winner announcement."
    ],
    faqs: [
      {
        question: "Can I remove the winning name after drawing?",
        answer: "Yes, you can click 'Remove Winner from List' after each draw to prevent repeat selections."
      }
    ]
  },
  {
    id: "team-generator",
    slug: "team-generator",
    name: "Random Team Generator",
    category: "random",
    shortDescription: "Split a group of people into balanced random teams for sports, games, and workshops.",
    metaTitle: "Random Team Generator - Split Group into Balanced Teams",
    metaDescription: "Easily divide players or colleagues into random balanced teams. Enter names, select number of teams or group size, and generate instantly.",
    keywords: ["team generator", "random team maker", "group generator", "split into teams"],
    icon: "Users",
    rating: 4.8,
    reviewsCount: 15300,
    instructions: [
      "Enter player or participant names (one per line).",
      "Select desired number of teams.",
      "Click 'Generate Teams' for balanced, randomized rosters."
    ],
    faqs: [
      {
        question: "What happens if names don't divide evenly?",
        answer: "The generator distributes extra members evenly across the teams so no team has more than a 1-member variance."
      }
    ]
  },
  ...MORE_TOOLS
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategorySlug): ToolItem[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolItem[] {
  return TOOLS.filter((t) => t.isPopular);
}

export function getRelatedTools(currentToolSlug: string, limit: number = 4): ToolItem[] {
  const current = getToolBySlug(currentToolSlug);
  if (!current) return TOOLS.slice(0, limit);
  const sameCategory = TOOLS.filter((t) => t.category === current.category && t.slug !== currentToolSlug);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const otherPopular = TOOLS.filter((t) => t.category !== current.category && t.slug !== currentToolSlug);
  return [...sameCategory, ...otherPopular].slice(0, limit);
}
