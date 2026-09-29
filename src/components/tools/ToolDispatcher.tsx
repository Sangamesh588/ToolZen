"use client";

import React from "react";
import { ToolItem } from "@/data/tools";
import {
  CgpaCalculator,
  PercentageCalculator,
  AttendanceCalculator,
  GradeCalculator,
  SemesterGpaCalculator,
} from "./StudentTools";
import { CoverLetterGenerator } from "./CoverLetterGenerator";
import {
  BmiCalculator,
  CalorieCalculator,
  WaterIntakeCalculator,
  IdealWeightCalculator,
  WalkingCaloriesCalculator,
} from "./HealthTools";
import {
  EmiCalculator,
  SipCalculator,
  CompoundInterestCalculator,
  SavingsGoalCalculator,
  CurrencyConverter,
} from "./FinanceTools";
import {
  ImageCompressor,
  ImageFormatConverter,
  ImageResizer,
} from "./ImageTools";
import {
  PdfMerger,
  PdfSplitter,
  ImageToPdfConverter,
  PdfPasswordProtector,
  PdfToWordConverter,
  WordToPdfConverter,
  PdfPageRotator,
} from "./PdfTools";
import { DontPadTool } from "./DontPadTool";
import {
  WordCounter,
  TextCaseConverter,
  RemoveDuplicateLines,
  LoremIpsumGenerator,
} from "./TextTools";
import {
  QrCodeGenerator,
  PasswordGenerator,
  JsonFormatter,
  Base64Encoder,
  UuidGenerator,
} from "./DevTools";
import {
  AgeCalculator,
  DateDifferenceCalculator,
  CountdownTimer,
  OnlineStopwatch,
} from "./DateTimeTools";
import {
  PomodoroTimer,
  ToDoList,
  HabitTracker,
} from "./ProductivityTools";
import {
  LengthConverter,
  WeightConverter,
  TemperatureConverter,
  DataStorageConverter,
} from "./ConversionTools";
import {
  CoinToss,
  DiceRoller,
  RandomNumberGenerator,
  NamePicker,
  TeamGenerator,
} from "./RandomTools";

export function ToolDispatcher({ tool }: { tool: ToolItem }) {
  switch (tool.slug) {
    // Student
    case "cover-letter-generator":
      return <CoverLetterGenerator />;
    case "cgpa-calculator":
      return <CgpaCalculator />;
    case "percentage-calculator":
      return <PercentageCalculator />;
    case "attendance-calculator":
      return <AttendanceCalculator />;
    case "grade-calculator":
      return <GradeCalculator />;
    case "semester-gpa-calculator":
      return <SemesterGpaCalculator />;

    // Health
    case "bmi-calculator":
      return <BmiCalculator />;
    case "calorie-calculator":
      return <CalorieCalculator />;
    case "water-intake-calculator":
      return <WaterIntakeCalculator />;
    case "ideal-weight-calculator":
      return <IdealWeightCalculator />;
    case "walking-calories-calculator":
      return <WalkingCaloriesCalculator />;

    // Finance
    case "emi-calculator":
    case "loan-calculator":
      return <EmiCalculator />;
    case "sip-calculator":
      return <SipCalculator />;
    case "compound-interest-calculator":
      return <CompoundInterestCalculator />;
    case "savings-goal-calculator":
      return <SavingsGoalCalculator />;
    case "currency-converter":
      return <CurrencyConverter />;

    // Image
    case "image-compressor":
      return <ImageCompressor />;
    case "jpg-to-png":
      return <ImageFormatConverter targetFormat="png" />;
    case "png-to-jpg":
      return <ImageFormatConverter targetFormat="jpg" />;
    case "convert-to-webp":
      return <ImageFormatConverter targetFormat="webp" />;
    case "image-resizer":
      return <ImageResizer />;

    // PDF
    case "merge-pdf":
      return <PdfMerger />;
    case "split-pdf":
    case "pdf-page-extractor":
      return <PdfSplitter />;
    case "image-to-pdf":
      return <ImageToPdfConverter />;
    case "protect-pdf":
      return <PdfPasswordProtector />;
    case "pdf-to-word":
      return <PdfToWordConverter />;
    case "word-to-pdf":
      return <WordToPdfConverter />;
    case "rotate-pdf":
      return <PdfPageRotator />;

    // DontPad Shared Notepad
    case "dontpad":
      return <DontPadTool />;

    // QR Codes
    case "wifi-qr-code-generator":
    case "vcard-qr-code-generator":
      return <QrCodeGenerator />;

    // Text
    case "word-counter":
      return <WordCounter />;
    case "text-case-converter":
      return <TextCaseConverter />;
    case "remove-duplicate-lines":
      return <RemoveDuplicateLines />;
    case "lorem-ipsum-generator":
      return <LoremIpsumGenerator />;

    // Developer
    case "qr-code-generator":
      return <QrCodeGenerator />;
    case "password-generator":
      return <PasswordGenerator />;
    case "json-formatter":
      return <JsonFormatter />;
    case "base64-encoder-decoder":
      return <Base64Encoder />;
    case "uuid-generator":
      return <UuidGenerator />;

    // Date & Time
    case "age-calculator":
      return <AgeCalculator />;
    case "date-difference-calculator":
      return <DateDifferenceCalculator />;
    case "countdown-timer":
      return <CountdownTimer />;
    case "stopwatch":
      return <OnlineStopwatch />;

    // Productivity
    case "pomodoro-timer":
      return <PomodoroTimer />;
    case "to-do-list":
      return <ToDoList />;
    case "habit-tracker":
      return <HabitTracker />;

    // Conversion
    case "length-converter":
    case "speed-converter":
      return <LengthConverter />;
    case "weight-converter":
      return <WeightConverter />;
    case "temperature-converter":
      return <TemperatureConverter />;
    case "data-storage-converter":
      return <DataStorageConverter />;

    // Random
    case "coin-toss":
      return <CoinToss />;
    case "dice-roller":
      return <DiceRoller />;
    case "random-number-generator":
      return <RandomNumberGenerator />;
    case "name-picker":
      return <NamePicker />;
    case "team-generator":
      return <TeamGenerator />;

    // Additional Student
    case "cgpa-to-percentage-95":
    case "marks-to-percentage":
      return <PercentageCalculator />;
    case "final-exam-calculator":
    case "weighted-average-calculator":
      return <GradeCalculator />;

    // Additional Health
    case "bmr-calculator":
    case "protein-intake-calculator":
      return <CalorieCalculator />;
    case "target-heart-rate-calculator":
      return <WalkingCaloriesCalculator />;

    // Additional Finance
    case "simple-interest-calculator":
    case "inflation-calculator":
      return <CompoundInterestCalculator />;
    case "discount-calculator":
    case "tip-calculator":
      return <PercentageCalculator />;
    case "car-loan-emi-calculator":
      return <EmiCalculator />;

    // Additional Image
    case "png-to-webp":
    case "jpg-to-webp":
      return <ImageFormatConverter targetFormat="webp" />;
    case "webp-to-png":
      return <ImageFormatConverter targetFormat="png" />;

    // Additional Developer
    case "url-encoder-decoder":
    case "binary-to-text-converter":
      return <Base64Encoder />;
    case "unix-timestamp-converter":
      return <AgeCalculator />;
    case "color-hex-to-rgb":
      return <PasswordGenerator />;

    // Additional Conversion
    case "area-converter":
    case "volume-converter":
    case "time-converter":
      return <LengthConverter />;

    // Additional Random
    case "yes-or-no-wheel":
    case "rock-paper-scissors":
      return <CoinToss />;

    // Additional DateTime
    case "days-until-christmas":
    case "days-until-new-year":
      return <CountdownTimer />;
    case "leap-year-calculator":
      return <DateDifferenceCalculator />;

    // Additional Text
    case "slug-generator":
    case "reverse-text-generator":
      return <TextCaseConverter />;

    default:
      return <CgpaCalculator />;
  }
}
