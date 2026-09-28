import React from "react";
import { ToolItem } from "@/data/tools";

interface ToolJsonLdProps {
  tool: ToolItem;
  url: string;
}

export function ToolJsonLd({ tool, url }: ToolJsonLdProps) {
  // WebApplication schema
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": url,
    "description": tool.metaDescription,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "ratingCount": tool.reviewsCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // FAQ schema if FAQs present
  const faqSchema =
    tool.faqs && tool.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": tool.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ToolGen.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tool.category.toUpperCase(),
        "item": `https://ToolGen.app/category/${tool.category}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": url
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

