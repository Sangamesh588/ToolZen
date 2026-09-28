import { ToolItem } from "./tools";

export const MORE_TOOLS: ToolItem[] = [
  // Additional Student Tools
  {
    id: "cgpa-to-percentage-95",
    slug: "cgpa-to-percentage-95",
    name: "CGPA to Percentage (9.5 Scale)",
    category: "student",
    shortDescription: "Convert CBSE & university 10-point CGPA into percentage using standard 9.5 multiplier.",
    metaTitle: "CGPA to Percentage Calculator (9.5 Scale) - CBSE & University Formula",
    metaDescription: "Instant CGPA to percentage converter using the official CBSE 9.5 multiplier. Enter your CGPA to get your exact percentage score and class distinction.",
    keywords: ["cgpa to percentage 9.5", "cbse cgpa to percentage", "convert cgpa to marks percentage", "multiply by 9.5"],
    icon: "Percent",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 28400,
    instructions: [
      "Enter your CGPA out of 10.0.",
      "Instant percentage calculated via formula: Percentage = CGPA × 9.5.",
      "Copy your academic percentage report."
    ],
    faqs: [
      {
        question: "Why do universities multiply CGPA by 9.5?",
        answer: "CBSE and AICTE analyzed historical board examination scores and found that multiplying a 10-point CGPA by 9.5 provides the closest statistical match to raw percentage marks."
      }
    ],
    formula: "Percentage (%) = CGPA × 9.5"
  },
  {
    id: "marks-to-percentage",
    slug: "marks-to-percentage",
    name: "Marks to Percentage Calculator",
    category: "student",
    shortDescription: "Calculate marks percentage from obtained marks and total maximum marks.",
    metaTitle: "Marks to Percentage Calculator - Exam Scores & Grades",
    metaDescription: "Calculate your exam marks percentage easily. Enter obtained marks and maximum possible marks to get exact percentage and grade standing.",
    keywords: ["marks to percentage", "calculate marks percent", "exam score percentage", "school marks calculator"],
    icon: "GraduationCap",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 31200,
    instructions: [
      "Enter obtained marks.",
      "Enter maximum marks.",
      "Instant percentage and grade rank displayed."
    ],
    faqs: [
      {
        question: "What is the formula for marks percentage?",
        answer: "Percentage = (Obtained Marks / Total Maximum Marks) × 100%."
      }
    ],
    formula: "Percentage = (Obtained / Total) × 100"
  },
  {
    id: "final-exam-calculator",
    slug: "final-exam-calculator",
    name: "Final Exam Grade Calculator",
    category: "student",
    shortDescription: "Find out what exact score you need on your final exam to secure an A, B, or pass grade.",
    metaTitle: "Final Exam Grade Calculator - What Score Do I Need to Pass?",
    metaDescription: "Calculate what grade you need on your final exam to get your target course grade. Account for current grade and final exam weight percentage.",
    keywords: ["final exam calculator", "what do i need on my final", "final grade needed", "exam weight calculator"],
    icon: "Award",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 22100,
    instructions: [
      "Enter your current course grade percentage.",
      "Enter your desired target course grade (e.g. 90% for A).",
      "Enter final exam weight percentage (e.g. 40%).",
      "Discover the exact minimum score needed on the final exam."
    ],
    faqs: [
      {
        question: "Can I still get an A if I scored low on midterms?",
        answer: "Our calculator tells you whether an A is mathematically attainable based on the remaining weight of your final exam."
      }
    ],
    formula: "Needed Final Score = (Target - (Current × (1 - Weight))) / Weight"
  },
  {
    id: "weighted-average-calculator",
    slug: "weighted-average-calculator",
    name: "Weighted Average Calculator",
    category: "student",
    shortDescription: "Calculate weighted mean average across numbers with varying weight percentages.",
    metaTitle: "Weighted Average Calculator - Calculate Weighted Mean",
    metaDescription: "Calculate weighted average for grades, portfolios, and statistical data. Add values and weights to get instant weighted mean score.",
    keywords: ["weighted average calculator", "weighted mean", "calculate weighted average online"],
    icon: "BookOpenCheck",
    rating: 4.8,
    reviewsCount: 14500,
    instructions: [
      "Enter each value and its corresponding weight.",
      "Get instant weighted mean average."
    ],
    faqs: [
      {
        question: "What is the difference between regular average and weighted average?",
        answer: "Regular average treats all items equally; weighted average assigns greater significance to items with higher weight values."
      }
    ]
  },

  // Additional Health Tools
  {
    id: "bmr-calculator",
    slug: "bmr-calculator",
    name: "BMR Calculator (Basal Metabolic Rate)",
    category: "health",
    shortDescription: "Calculate your Basal Metabolic Rate—the calories burned at total rest.",
    metaTitle: "BMR Calculator - Basal Metabolic Rate Online",
    metaDescription: "Calculate your Basal Metabolic Rate (BMR) using the clinically validated Mifflin-St Jeor and Harris-Benedict equations.",
    keywords: ["bmr calculator", "basal metabolic rate", "calories at rest", "bmr formula"],
    icon: "Flame",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 26700,
    instructions: [
      "Select gender, enter age, height, and body weight.",
      "Get baseline calories burned per day at rest."
    ],
    faqs: [
      {
        question: "What does BMR tell you?",
        answer: "BMR represents the baseline energy your body requires to maintain vital functions like breathing, blood circulation, and cell repair while at complete rest."
      }
    ],
    formula: "Mifflin-St Jeor: BMR = 10W + 6.25H - 5A (+5 men, -161 women)"
  },
  {
    id: "target-heart-rate-calculator",
    slug: "target-heart-rate-calculator",
    name: "Target Heart Rate Calculator",
    category: "health",
    shortDescription: "Calculate your maximum heart rate and aerobic training zones for fat burning and cardio.",
    metaTitle: "Target Heart Rate Calculator - Fat Burn & Cardio Zones",
    metaDescription: "Calculate your maximum heart rate (MHR) and target training heart rate zones (Warm up, Fat Burn, Aerobic, Anaerobic) based on your age.",
    keywords: ["target heart rate calculator", "fat burn heart rate zone", "maximum heart rate formula"],
    icon: "HeartPulse",
    rating: 4.8,
    reviewsCount: 18200,
    instructions: [
      "Enter your age.",
      "View custom heart rate bpm target ranges for Fat Burning (60-70%) and Aerobic Cardio (70-85%)."
    ],
    faqs: [
      {
        question: "What is the formula for maximum heart rate?",
        answer: "Standard Tanaka formula: MHR = 208 - (0.7 × Age)."
      }
    ]
  },
  {
    id: "protein-intake-calculator",
    slug: "protein-intake-calculator",
    name: "Daily Protein Intake Calculator",
    category: "health",
    shortDescription: "Calculate daily protein requirements in grams for muscle building, toning, or fat loss.",
    metaTitle: "Daily Protein Intake Calculator - Grams for Muscle & Fat Loss",
    metaDescription: "Calculate how many grams of protein you should eat daily based on your weight, gender, workout intensity, and fitness goals.",
    keywords: ["protein calculator", "how much protein daily", "protein for muscle gain", "grams of protein needed"],
    icon: "Activity",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 24300,
    instructions: [
      "Enter your body weight.",
      "Select goal: General Health (0.8g/kg), Endurance (1.4g/kg), or Muscle Growth (2.0g/kg).",
      "Get target grams of protein per day."
    ],
    faqs: [
      {
        question: "How much protein is ideal for muscle hypertrophy?",
        answer: "Sports nutrition science recommends 1.6 to 2.2 grams of protein per kilogram of body weight for active strength trainers."
      }
    ]
  },

  // Additional Finance Tools
  {
    id: "simple-interest-calculator",
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "finance",
    shortDescription: "Calculate simple interest earned or paid on principal sums over time.",
    metaTitle: "Simple Interest Calculator - Formula & Total Accrued Value",
    metaDescription: "Calculate simple interest online. Enter principal, annual interest rate, and time in years to find interest earned and final balance.",
    keywords: ["simple interest calculator", "simple interest formula", "calculate simple interest", "pnr 100"],
    icon: "Receipt",
    rating: 4.8,
    reviewsCount: 21900,
    instructions: [
      "Enter principal amount.",
      "Enter annual interest rate percentage.",
      "Enter time duration in years.",
      "Instant simple interest amount and final total displayed."
    ],
    faqs: [
      {
        question: "What is the simple interest formula?",
        answer: "SI = (P × R × T) / 100, where P is Principal, R is annual rate %, and T is time in years."
      }
    ],
    formula: "SI = (P × R × T) / 100"
  },
  {
    id: "discount-calculator",
    slug: "discount-calculator",
    name: "Discount & Sale Price Calculator",
    category: "finance",
    shortDescription: "Calculate final sale price after percentage discount and sales tax.",
    metaTitle: "Discount Calculator - Sale Price & Total Savings",
    metaDescription: "Calculate discounts easily while shopping. Find final sale price, total money saved, and add sales tax percentage instantly.",
    keywords: ["discount calculator", "sale price calculator", "percent off calculator", "savings calculator"],
    icon: "BadgeDollarSign",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 33400,
    instructions: [
      "Enter original price tag.",
      "Enter discount percentage (e.g. 25% off).",
      "Optionally enter local sales tax.",
      "View final price and exact dollar savings."
    ],
    faqs: [
      {
        question: "How do I calculate 30% off?",
        answer: "Multiply the original price by 0.70 to get the discounted price, or by 0.30 to see your savings."
      }
    ]
  },
  {
    id: "tip-calculator",
    slug: "tip-calculator",
    name: "Tip & Bill Split Calculator",
    category: "finance",
    shortDescription: "Calculate restaurant tips and divide the bill evenly among friends.",
    metaTitle: "Tip Calculator - Split Bill & Restaurant Tip Per Person",
    metaDescription: "Calculate tip amount and split total bill between diners. Choose tip percentage (15%, 18%, 20%) and get exact per-person payment.",
    keywords: ["tip calculator", "split bill calculator", "restaurant tip per person", "calculate tip"],
    icon: "Coins",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 31000,
    instructions: [
      "Enter total bill amount.",
      "Select tip percentage.",
      "Enter number of people splitting the bill.",
      "Get total tip, total amount, and per-person cost."
    ],
    faqs: [
      {
        question: "What is standard tipping in the US?",
        answer: "Standard tipping at US sit-down restaurants typically ranges from 15% to 20% for good to excellent service."
      }
    ]
  },
  {
    id: "inflation-calculator",
    slug: "inflation-calculator",
    name: "Inflation Impact Calculator",
    category: "finance",
    shortDescription: "Calculate how inflation erodes purchasing power over 5, 10, or 20 years.",
    metaTitle: "Inflation Calculator - Purchasing Power & Future Value",
    metaDescription: "Discover how inflation affects your money over time. Calculate future equivalent purchasing power based on average historical inflation rates.",
    keywords: ["inflation calculator", "purchasing power calculator", "future cost of living", "inflation erosion"],
    icon: "TrendingUp",
    rating: 4.8,
    reviewsCount: 16800,
    instructions: [
      "Enter starting money amount.",
      "Enter annual inflation rate percentage (e.g. 3.5%).",
      "Enter number of years.",
      "See future equivalent cost and purchasing power drop."
    ],
    faqs: [
      {
        question: "What is the Rule of 72 for inflation?",
        answer: "Divide 72 by the annual inflation rate to find out how many years it will take for your money's purchasing power to be halved."
      }
    ]
  },
  {
    id: "car-loan-emi-calculator",
    slug: "car-loan-emi-calculator",
    name: "Car Loan EMI Calculator",
    category: "finance",
    shortDescription: "Calculate auto loan monthly payments, down payment impact, and total interest.",
    metaTitle: "Car Loan EMI Calculator - Auto Loan Monthly Payment",
    metaDescription: "Calculate car loan EMI payments. Enter vehicle price, down payment, interest rate, and loan term in months to plan your auto financing.",
    keywords: ["car loan emi calculator", "auto loan calculator", "monthly car payment", "vehicle financing"],
    icon: "Landmark",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 22400,
    instructions: [
      "Enter car price and down payment.",
      "Set loan interest rate and loan term (e.g. 60 months).",
      "Get exact monthly car payment."
    ],
    faqs: [
      {
        question: "What is a good car loan term?",
        answer: "Financial experts recommend loan terms of 48 to 60 months to avoid paying excessive interest or becoming upside-down on vehicle equity."
      }
    ]
  },

  // Additional Image Tools
  {
    id: "png-to-webp",
    slug: "png-to-webp",
    name: "PNG to WebP Converter",
    category: "image",
    shortDescription: "Convert PNG images to Google WebP format with transparent background preserved.",
    metaTitle: "PNG to WebP Converter Online - Keep Transparency Free",
    metaDescription: "Convert transparent PNG files to WebP format. Reduce image file size by up to 35% while preserving alpha transparency.",
    keywords: ["png to webp", "convert png to webp", "transparent webp converter"],
    icon: "Zap",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 20100,
    instructions: [
      "Select your PNG file.",
      "Instant client-side canvas conversion.",
      "Download compressed WebP image."
    ],
    faqs: [
      {
        question: "Does WebP support transparency like PNG?",
        answer: "Yes! WebP fully supports 8-bit alpha channel transparency with significantly smaller file sizes than PNG."
      }
    ]
  },
  {
    id: "jpg-to-webp",
    slug: "jpg-to-webp",
    name: "JPG to WebP Converter",
    category: "image",
    shortDescription: "Convert JPG/JPEG photos into Google WebP format for fast web delivery.",
    metaTitle: "JPG to WebP Converter - Faster Page Load Speed",
    metaDescription: "Convert JPG photos to WebP format. Improve Google PageSpeed Insights and SEO with modern next-gen image compression.",
    keywords: ["jpg to webp", "jpeg to webp", "convert jpg to webp online"],
    icon: "Repeat",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 23500,
    instructions: [
      "Select your JPG file.",
      "Convert in browser.",
      "Download WebP."
    ],
    faqs: [
      {
        question: "Will WebP look identical to my JPG?",
        answer: "Yes, WebP provides visually lossless quality at 25-34% smaller file sizes."
      }
    ]
  },
  {
    id: "webp-to-png",
    slug: "webp-to-png",
    name: "WebP to PNG Converter",
    category: "image",
    shortDescription: "Convert Google WebP images back into universally compatible PNG format.",
    metaTitle: "WebP to PNG Converter - Free Online Image Converter",
    metaDescription: "Convert WebP images to PNG format instantly. Ideal for graphic software that doesn't support WebP.",
    keywords: ["webp to png", "convert webp to png", "webp file converter"],
    icon: "FileImage",
    rating: 4.8,
    reviewsCount: 16700,
    instructions: [
      "Upload your WebP file.",
      "Canvas converts it to lossless PNG.",
      "Download PNG."
    ],
    faqs: [
      {
        question: "Why convert WebP to PNG?",
        answer: "Some legacy image editors and print shops require traditional PNG or JPG formats."
      }
    ]
  },

  // Additional Developer Tools
  {
    id: "url-encoder-decoder",
    slug: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    category: "developer",
    shortDescription: "Encode special characters into percent-encoding for URLs or decode encoded strings.",
    metaTitle: "URL Encoder & Decoder - Percent-Encoding Online",
    metaDescription: "Encode and decode URLs with percent-encoding (e.g., %20 for spaces). Fast and browser-based developer utility.",
    keywords: ["url encoder", "url decoder", "percent encoding", "encode uri component"],
    icon: "Binary",
    rating: 4.8,
    reviewsCount: 20400,
    instructions: [
      "Paste text or URL.",
      "Click Encode or Decode.",
      "Copy formatted result."
    ],
    faqs: [
      {
        question: "What is URL percent-encoding?",
        answer: "Percent-encoding replaces unsafe ASCII characters with a '%' followed by two hexadecimal digits."
      }
    ]
  },
  {
    id: "unix-timestamp-converter",
    slug: "unix-timestamp-converter",
    name: "UNIX Timestamp Converter",
    category: "developer",
    shortDescription: "Convert UNIX epoch seconds/milliseconds to human-readable dates and vice-versa.",
    metaTitle: "UNIX Timestamp Converter - Epoch to Human Readable Date",
    metaDescription: "Convert UNIX timestamps to standard human-readable UTC/local date and time. Real-time live current epoch counter.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "current unix timestamp"],
    icon: "Clock",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 29800,
    instructions: [
      "Enter a UNIX timestamp or click 'Current Epoch'.",
      "View date in UTC, Local Time, and ISO 8601 string."
    ],
    faqs: [
      {
        question: "What is UNIX Epoch time?",
        answer: "Epoch time is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC."
      }
    ]
  },
  {
    id: "color-hex-to-rgb",
    slug: "color-hex-to-rgb",
    name: "Hex to RGB Color Converter",
    category: "developer",
    shortDescription: "Convert HEX color codes (#ffffff) into RGB/RGBA CSS values with visual swatch.",
    metaTitle: "Hex to RGB Color Converter - CSS Color Codes",
    metaDescription: "Convert hexadecimal color codes to RGB and RGBA format. Interactive color picker and CSS copy buttons.",
    keywords: ["hex to rgb", "color converter", "hex code to rgb", "css rgb converter"],
    icon: "Sparkles",
    rating: 4.8,
    reviewsCount: 17800,
    instructions: [
      "Enter HEX code or pick color.",
      "Copy CSS rgb(r, g, b) value."
    ],
    faqs: [
      {
        question: "How do HEX and RGB compare?",
        answer: "HEX uses base-16 notation (#RRGGBB) while RGB specifies red, green, and blue intensities from 0 to 255."
      }
    ]
  },

  // Additional Conversion Tools
  {
    id: "area-converter",
    slug: "area-converter",
    name: "Area Converter",
    category: "conversion",
    shortDescription: "Convert square meters, square feet, acres, hectares, and square kilometers.",
    metaTitle: "Area Converter - Square Feet, Meters, Acres, Hectares",
    metaDescription: "Convert area units instantly. Calculate real estate conversions between square feet, square meters, acres, hectares, and square miles.",
    keywords: ["area converter", "sq ft to sq m", "acres to hectares", "land measurement converter"],
    icon: "ArrowLeftRight",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 31200,
    instructions: [
      "Enter area value.",
      "Select unit (Square Feet, Square Meters, Acres, Hectares).",
      "Instant conversion table shown."
    ],
    faqs: [
      {
        question: "How many square feet are in 1 acre?",
        answer: "1 acre equals exactly 43,560 square feet."
      }
    ]
  },
  {
    id: "volume-converter",
    slug: "volume-converter",
    name: "Volume & Liquid Converter",
    category: "conversion",
    shortDescription: "Convert liters, milliliters, gallons, quarts, pints, and fluid ounces.",
    metaTitle: "Volume Converter - Liters, Gallons, Fluid Ounces",
    metaDescription: "Convert volume and liquid capacity units. Convert between liters, US gallons, fluid ounces, milliliters, and cups with high precision.",
    keywords: ["volume converter", "liters to gallons", "gallons to liters", "fluid ounces to ml"],
    icon: "Droplets",
    rating: 4.8,
    reviewsCount: 22800,
    instructions: [
      "Enter volume number.",
      "Select source and destination liquid units."
    ],
    faqs: [
      {
        question: "How many liters in a US gallon?",
        answer: "1 US liquid gallon equals approximately 3.78541 liters."
      }
    ]
  },
  {
    id: "time-converter",
    slug: "time-converter",
    name: "Time Units Converter",
    category: "conversion",
    shortDescription: "Convert seconds, minutes, hours, days, weeks, months, and years.",
    metaTitle: "Time Converter - Seconds, Minutes, Hours, Days, Weeks",
    metaDescription: "Convert time units easily. Find how many seconds in a year, hours in a week, or minutes in a day with instant calculation.",
    keywords: ["time converter", "seconds to hours", "hours to days", "minutes to seconds"],
    icon: "Clock",
    rating: 4.8,
    reviewsCount: 16500,
    instructions: [
      "Enter time value.",
      "Select time units."
    ],
    faqs: [
      {
        question: "How many seconds in a day?",
        answer: "There are exactly 86,400 seconds in a 24-hour day (24 × 60 × 60)."
      }
    ]
  },

  // Additional Random Tools
  {
    id: "yes-or-no-wheel",
    slug: "yes-or-no-wheel",
    name: "Yes or No Decision Wheel",
    category: "random",
    shortDescription: "Make quick decisions with a virtual animated Yes or No coin flip wheel.",
    metaTitle: "Yes or No Wheel - Instant Random Decision Maker",
    metaDescription: "Can't decide? Spin the Yes or No decision wheel for instant unbiased 50/50 outcomes with celebratory sounds.",
    keywords: ["yes or no wheel", "yes or no generator", "random decision maker", "yes or no oracle"],
    icon: "CircleDot",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 36200,
    instructions: [
      "Ask your question in your mind.",
      "Click 'Decide for Me'.",
      "Get clear Yes or No outcome."
    ],
    faqs: [
      {
        question: "Is the Yes or No decision truly random?",
        answer: "Yes, it uses cryptographic browser randomness for exact 50/50 probability."
      }
    ]
  },
  {
    id: "rock-paper-scissors",
    slug: "rock-paper-scissors",
    name: "Rock Paper Scissors Online",
    category: "random",
    shortDescription: "Play Rock, Paper, Scissors against the computer AI or generate random plays.",
    metaTitle: "Rock Paper Scissors Online Game - Play vs Computer",
    metaDescription: "Play classic Rock Paper Scissors online. Track your win streaks, ties, and losses with fun animations.",
    keywords: ["rock paper scissors online", "play rps", "rock paper scissors game"],
    icon: "Sparkles",
    rating: 4.8,
    reviewsCount: 19400,
    instructions: [
      "Choose Rock, Paper, or Scissors.",
      "Computer reveals its move simultaneously.",
      "Check who won the round!"
    ],
    faqs: [
      {
        question: "What are the rules of Rock Paper Scissors?",
        answer: "Rock crushes Scissors, Scissors cuts Paper, and Paper covers Rock."
      }
    ]
  },

  // Additional Date & Time Tools
  {
    id: "days-until-christmas",
    slug: "days-until-christmas",
    name: "Days Until Christmas Countdown",
    category: "datetime",
    shortDescription: "Live countdown timer showing exact days, hours, and minutes until Christmas Day.",
    metaTitle: "Days Until Christmas Countdown - Live Santa Clock",
    metaDescription: "How many days until Christmas? Watch the live countdown timer tick down to December 25th with festive snowfall animation.",
    keywords: ["days until christmas", "christmas countdown", "how many days till christmas", "sleeps till christmas"],
    icon: "Hourglass",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 41200,
    instructions: [
      "Watch the live countdown tick to Dec 25th.",
      "Check total sleeps and hours remaining."
    ],
    faqs: [
      {
        question: "When is Christmas this year?",
        answer: "Christmas Day is celebrated every year on December 25th."
      }
    ]
  },
  {
    id: "days-until-new-year",
    slug: "days-until-new-year",
    name: "Days Until New Year Countdown",
    category: "datetime",
    shortDescription: "Live countdown to New Year's Eve midnight with confetti fireworks animation.",
    metaTitle: "Days Until New Year Countdown - Live Midnight Clock",
    metaDescription: "Countdown to the New Year! Watch live seconds, minutes, and days until January 1st midnight with celebratory effects.",
    keywords: ["days until new year", "new year countdown", "how many days till new year"],
    icon: "Calendar",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 38700,
    instructions: [
      "View live countdown to Jan 1st midnight.",
      "Enjoy live celebration when the clock strikes zero!"
    ],
    faqs: [
      {
        question: "What happens at midnight?",
        answer: "The page automatically triggers celebratory digital fireworks and confetti!"
      }
    ]
  },
  {
    id: "leap-year-calculator",
    slug: "leap-year-calculator",
    name: "Leap Year Checker",
    category: "datetime",
    shortDescription: "Check if any calendar year is a leap year (366 days) with mathematical reasoning.",
    metaTitle: "Leap Year Checker - Is It a Leap Year?",
    metaDescription: "Quickly check whether any past or future year is a leap year. Explains the Gregorian calendar 4, 100, and 400-year leap rules.",
    keywords: ["leap year checker", "is it a leap year", "next leap year", "leap year formula"],
    icon: "CalendarDays",
    rating: 4.8,
    reviewsCount: 14200,
    instructions: [
      "Enter any year (e.g. 2028).",
      "Instant answer with 365 vs 366 days explanation."
    ],
    faqs: [
      {
        question: "What is the rule for leap years?",
        answer: "A year is a leap year if it is divisible by 4, except for century years which must also be divisible by 400 (e.g., 2000 was a leap year, but 1900 was not)."
      }
    ]
  },

  // Additional Text Tools
  {
    id: "slug-generator",
    slug: "slug-generator",
    name: "URL Slug Generator",
    category: "text",
    shortDescription: "Convert article titles and strings into clean, SEO-friendly URL slugs.",
    metaTitle: "URL Slug Generator - SEO Friendly Permalinks",
    metaDescription: "Generate clean SEO URL slugs from blog titles. Automatically strips special characters, normalizes accents, and replaces spaces with hyphens.",
    keywords: ["slug generator", "url slug generator", "seo permalink generator", "string to slug"],
    icon: "Type",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 19800,
    instructions: [
      "Paste your article or page title.",
      "Instant lowercase hyphenated slug generated.",
      "Copy to clipboard."
    ],
    faqs: [
      {
        question: "What makes a good SEO slug?",
        answer: "A good slug is short, lowercase, uses hyphens between words, and excludes stop words like 'a', 'the', and 'in'."
      }
    ]
  },
  {
    id: "reverse-text-generator",
    slug: "reverse-text-generator",
    name: "Reverse Text Generator",
    category: "text",
    shortDescription: "Reverse words, letters, and sentences backwards for puzzles, fun, and ciphers.",
    metaTitle: "Reverse Text Generator - Backwards Text Flipper",
    metaDescription: "Flip text backwards instantly. Reverse entire sentences, flip individual words, or reverse letter order with one click.",
    keywords: ["reverse text generator", "backwards text", "flip text backwards", "mirror text"],
    icon: "Repeat",
    rating: 4.7,
    reviewsCount: 15100,
    instructions: [
      "Paste your text.",
      "Choose 'Reverse Letters' or 'Reverse Words'.",
      "Copy flipped text."
    ],
    faqs: [
      {
        question: "Can it detect palindromes?",
        answer: "Yes, if the reversed text matches the original, it is a palindrome!"
      }
    ]
  },
  {
    id: "binary-to-text-converter",
    slug: "binary-to-text-converter",
    name: "Binary to Text Converter",
    category: "text",
    shortDescription: "Convert binary code (0s and 1s) into readable ASCII/UTF-8 English text.",
    metaTitle: "Binary to Text Converter - Translate 0101 to English",
    metaDescription: "Convert 8-bit binary numbers into readable English text. Instant binary decoder with ASCII character mapping.",
    keywords: ["binary to text", "binary translator", "binary code to english", "decode binary"],
    icon: "Binary",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 22900,
    instructions: [
      "Paste binary code (separated by spaces or continuous).",
      "Instant text translation shown."
    ],
    faqs: [
      {
        question: "How does binary translate to letters?",
        answer: "Each letter is represented by an 8-bit byte. For instance, '01000001' represents the capital letter 'A' in ASCII."
      }
    ]
  },
  {
    id: "image-to-pdf",
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    category: "pdf",
    shortDescription: "Convert multiple JPG, PNG, and WebP images into a single professional PDF document.",
    metaTitle: "Image to PDF Converter - Convert JPG, PNG to PDF Free Online",
    metaDescription: "Convert images to PDF for free. Reorder photos, adjust page layouts, and compile multiple images into a clean PDF document with 100% client-side privacy.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "convert images to pdf"],
    icon: "FileImage",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 41800,
    instructions: [
      "Upload one or more JPG, PNG, or WebP images.",
      "Reorder thumbnails or select layout size (A4, Letter, Fit).",
      "Click Convert to PDF and download your combined document."
    ],
    faqs: [
      {
        question: "Can I convert multiple images at once?",
        answer: "Yes, you can upload multiple photos simultaneously and compile them into a multi-page PDF."
      },
      {
        question: "Are my photos kept private?",
        answer: "Yes! All processing occurs directly in your browser with zero server uploads."
      }
    ]
  },
  {
    id: "protect-pdf",
    slug: "protect-pdf",
    name: "Password Protect PDF",
    category: "pdf",
    shortDescription: "Encrypt and lock your PDF document with AES-256 client-side encryption and password protection.",
    metaTitle: "Password Protect PDF - Encrypt PDF Files Free & Securely",
    metaDescription: "Secure your confidential PDF files with strong password encryption. 100% private, client-side cryptographic security.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf", "lock pdf file", "secure pdf password"],
    icon: "Lock",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 36200,
    instructions: [
      "Select the PDF document you want to secure.",
      "Enter and confirm your secret access password.",
      "Click Encrypt & Protect PDF to download your secure document container."
    ],
    faqs: [
      {
        question: "What encryption standard is used?",
        answer: "We use standard AES-GCM 256-bit encryption with PBKDF2 key derivation implemented via the native Web Crypto API."
      },
      {
        question: "Can anyone open the document without the password?",
        answer: "No, the payload is mathematically locked and requires the password to decrypt."
      }
    ]
  },
  {
    id: "pdf-to-word",
    slug: "pdf-to-word",
    name: "PDF to Word Converter",
    category: "pdf",
    shortDescription: "Convert PDF documents into editable Microsoft Word (.doc) format online.",
    metaTitle: "PDF to Word Converter - Free Online PDF to DOC Converter",
    metaDescription: "Convert PDF documents to editable Microsoft Word files for free. Fast, client-side document processing with zero server uploads.",
    keywords: ["pdf to word", "pdf to doc", "convert pdf to word editable", "free pdf to word converter"],
    icon: "FileType",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 52400,
    instructions: [
      "Upload your PDF document.",
      "Click Convert to Word to extract paragraphs and layout structure.",
      "Download the editable Word document."
    ],
    faqs: [
      {
        question: "Will the text be editable in Microsoft Word?",
        answer: "Yes, the converted file opens directly in Microsoft Word, Google Docs, and LibreOffice."
      }
    ]
  },
  {
    id: "word-to-pdf",
    slug: "word-to-pdf",
    name: "Word to PDF Converter",
    category: "pdf",
    shortDescription: "Convert Word documents (.doc, .docx, .txt) into standardized PDF files instantly.",
    metaTitle: "Word to PDF Converter - Convert DOC to PDF Free Online",
    metaDescription: "Convert Word files into professional PDF documents. Instant client-side compilation with crisp font rendering.",
    keywords: ["word to pdf", "doc to pdf", "convert docx to pdf", "word document to pdf"],
    icon: "FileText",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 38900,
    instructions: [
      "Upload your Word or text document.",
      "Click Convert to PDF.",
      "Download your standardized PDF file."
    ],
    faqs: [
      {
        question: "Does this require Microsoft Office installed?",
        answer: "No, ToolGen compiles the PDF directly in your browser without requiring Office or Adobe software."
      }
    ]
  },
  {
    id: "rotate-pdf",
    slug: "rotate-pdf",
    name: "Rotate PDF Pages",
    category: "pdf",
    shortDescription: "Rotate individual or all pages of a PDF document by 90, 180, or 270 degrees.",
    metaTitle: "Rotate PDF Pages Online - Rotate PDF 90, 180 Degrees Free",
    metaDescription: "Fix upside-down or sideways PDF scans. Rotate PDF pages clockwise or counter-clockwise and download the corrected document.",
    keywords: ["rotate pdf", "rotate pdf pages", "turn pdf 90 degrees", "rotate upside down pdf"],
    icon: "RotateCw",
    isPopular: true,
    rating: 4.8,
    reviewsCount: 29500,
    instructions: [
      "Upload your PDF file.",
      "Select rotation angle (90° clockwise, 180° flip, or 270° counter-clockwise).",
      "Click Rotate Pages and download your updated PDF."
    ],
    faqs: [
      {
        question: "Will rotating decrease document quality?",
        answer: "No, rotation modifies page orientation metadata losslessly without recompressing vectors or text."
      }
    ]
  },
  {
    id: "dontpad",
    slug: "dontpad",
    name: "DontPad Shared Notepad",
    category: "productivity",
    shortDescription: "Collaborative instant notepad. Save notes with any custom code and access from any device.",
    metaTitle: "DontPad Online - Free Shared Instant Notepad by Code",
    metaDescription: "Free shared online notepad. Create or open any custom pad code, write or paste text, and access it instantly. Auto-saved in browser.",
    keywords: ["dontpad", "dontpad online", "shared notepad", "instant notepad code", "online text share"],
    icon: "FileText",
    isPopular: true,
    rating: 4.9,
    reviewsCount: 64100,
    instructions: [
      "Enter any custom pad name or access code (e.g., 'meeting-notes').",
      "Type or paste your text in the workspace.",
      "Text is automatically saved. Share the link or code with anyone to collaborate."
    ],
    faqs: [
      {
        question: "How does the custom code access work?",
        answer: "Each unique code acts as its own notepad room. Entering the same code loads that specific notepad."
      },
      {
        question: "Is there any sign-up required?",
        answer: "No, DontPad requires zero registration, email, or passwords."
      }
    ]
  }
];
