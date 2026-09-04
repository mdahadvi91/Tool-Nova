import React from 'react';
import { ToolDefinition } from '../../registry/types';
import { QrBarcodeStudio } from '../../tools/qr/QrBarcodeStudio';
import { VisitingCardBuilder } from '../../tools/card/VisitingCardBuilder';
import { ImageEditorStudio } from '../../tools/image/ImageEditorStudio';
import { UniversalImageConverter } from '../../tools/image/UniversalImageConverter';
import { PdfToolkit } from '../../tools/pdf/PdfToolkit';
import { LoanEmiCalculator } from '../../tools/finance/LoanEmiCalculator';
import { UaeToolsStudio } from '../../tools/uae/UaeToolsStudio';
import { JsonStudio } from '../../tools/dev/JsonStudio';
import { SecurityHashStudio } from '../../tools/security/SecurityHashStudio';
import { RegexStudio } from '../../tools/regex/RegexStudio';
import { ColorStudio } from '../../tools/color/ColorStudio';
import { TextMetricsStudio } from '../../tools/text/TextMetricsStudio';
import { UnitConverterStudio } from '../../tools/unit/UnitConverterStudio';
import { DocConverterStudio } from '../../tools/doc/DocConverterStudio';
import { FileUtilitiesStudio } from '../../tools/file/FileUtilitiesStudio';
import { VideoToolsStudio } from '../../tools/video/VideoToolsStudio';
import { AudioToolsStudio } from '../../tools/audio/AudioToolsStudio';
import { DocumentScannerStudio } from '../../tools/ocr/DocumentScannerStudio';
import { TextReadabilityStudio } from '../../tools/ai/TextReadabilityStudio';
import { PromptEngineeringStudio } from '../../tools/ai/PromptEngineeringStudio';
import { BusinessCalculatorStudio } from '../../tools/business/BusinessCalculatorStudio';
import { HealthFitnessStudio } from '../../tools/health/HealthFitnessStudio';
import { DateTimeStudio } from '../../tools/datetime/DateTimeStudio';
import { CurrencyMoneyStudio } from '../../tools/currency/CurrencyMoneyStudio';
import { WebCodeStudio } from '../../tools/web/WebCodeStudio';
import { SeoSerpStudio } from '../../tools/seo/SeoSerpStudio';
import { CssGradientStudio } from '../../tools/css/CssGradientStudio';
import { MathStudyStudio } from '../../tools/education/MathStudyStudio';

interface ToolRendererProps {
  tool: ToolDefinition;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool }) => {
  switch (tool.id) {
    // 01 QR & Barcode
    case 'qr-barcode-studio':
      return <QrBarcodeStudio initialMode="qr" />;
    case 'photo-qr-badge':
      return <QrBarcodeStudio initialMode="photo-badge" />;
    case 'wifi-qr-gen':
    case 'vcard-qr-gen':
    case 'barcode-gen':
    case 'bulk-qr-gen':
      return <QrBarcodeStudio initialMode="qr" />;

    // 02 Business Card
    case 'visiting-card-builder':
    case 'digital-card-gen':
    case 'card-mockup-preview':
      return <VisitingCardBuilder />;

    // 03 & 04 Image Tools
    case 'image-editor-studio':
    case 'image-cropper':
    case 'image-resizer':
    case 'image-watermarker':
    case 'photo-filters':
      return <ImageEditorStudio />;

    case 'universal-image-converter':
    case 'jpg-to-png':
    case 'png-to-jpg':
    case 'webp-converter':
    case 'image-to-base64':
    case 'image-to-pdf':
      return <UniversalImageConverter />;

    // 05 PDF Tools
    case 'pdf-toolkit':
    case 'merge-pdf':
    case 'split-pdf':
    case 'pdf-watermarker':
    case 'pdf-page-numberer':
    case 'images-to-pdf':
      return <PdfToolkit />;

    // 06 Document Converter
    case 'doc-converter-studio':
    case 'markdown-to-html':
    case 'html-to-markdown':
    case 'text-cleaner':
    case 'rtf-extractor':
      return <DocConverterStudio />;

    // 07 File Utilities
    case 'file-utilities-studio':
    case 'file-checksum-calc':
    case 'file-magic-bytes':
    case 'zip-creator':
    case 'mime-type-checker':
      return <FileUtilitiesStudio />;

    // 08 Video Tools
    case 'video-tools-studio':
    case 'video-frame-grabber':
    case 'video-metadata-inspector':
    case 'video-aspect-calculator':
      return <VideoToolsStudio />;

    // 09 Audio Tools
    case 'audio-tools-studio':
    case 'audio-tone-generator':
    case 'binaural-beats-gen':
    case 'audio-metadata-reader':
      return <AudioToolsStudio />;

    // 10 OCR & Scanner
    case 'document-scanner-studio':
    case 'document-scanner-prep':
    case 'receipt-enhancer':
    case 'ocr-text-extractor':
      return <DocumentScannerStudio />;

    // 11 Text & Writing
    case 'text-metrics-analyzer':
    case 'case-converter':
    case 'text-diff-checker':
    case 'duplicate-line-remover':
    case 'slug-generator':
      return <TextMetricsStudio />;

    // 12 AI Text Readability
    case 'text-readability-studio':
    case 'readability-score-calc':
    case 'text-summarizer-rule':
    case 'text-tone-analyzer':
      return <TextReadabilityStudio />;

    // 13 AI Prompt Engineering
    case 'prompt-engineering-studio':
    case 'prompt-builder-studio':
    case 'token-estimator':
    case 'system-prompt-architect':
      return <PromptEngineeringStudio />;

    // 14 Financial Calculators
    case 'loan-emi-calculator':
    case 'compound-interest-sim':
    case 'sip-investment-calc':
    case 'inflation-calculator':
      return <LoanEmiCalculator />;

    // 15 Business Calculators
    case 'business-calculator-studio':
    case 'margin-markup-calc':
    case 'break-even-calculator':
    case 'cac-ltv-calculator':
      return <BusinessCalculatorStudio />;

    // 16 Health & Fitness
    case 'health-fitness-studio':
    case 'bmi-calculator':
    case 'bmr-tdee-calculator':
    case 'target-heart-rate-calc':
    case 'water-intake-calc':
      return <HealthFitnessStudio />;

    // 17 Date & Time
    case 'date-time-studio':
    case 'age-calculator-exact':
    case 'working-days-calculator':
    case 'world-timezone-converter':
    case 'unix-timestamp-converter':
      return <DateTimeStudio />;

    // 18 Unit Converter
    case 'universal-unit-converter':
    case 'digital-storage-converter':
    case 'temperature-converter':
    case 'weight-converter':
      return <UnitConverterStudio />;

    // 19 Currency & Money
    case 'currency-money-studio':
    case 'currency-converter-studio':
    case 'tip-and-split-calculator':
    case 'cash-denomination-counter':
      return <CurrencyMoneyStudio />;

    // 20 Developer JSON
    case 'json-studio':
    case 'json-validator':
    case 'json-to-csv':
    case 'json-minifier':
      return <JsonStudio />;

    // 21 Encoding & Hash Security
    case 'security-hash-studio':
    case 'base64-studio':
    case 'password-generator':
    case 'uuid-v4-generator':
      return <SecurityHashStudio />;

    // 22 Web Code
    case 'web-code-studio':
    case 'html-formatter-minifier':
    case 'css-minifier-tool':
    case 'svg-viewer-cleaner':
      return <WebCodeStudio />;

    // 23 Regex
    case 'regex-studio':
    case 'regex-cheatsheet-tool':
    case 'string-escape-tool':
      return <RegexStudio />;

    // 24 SEO Tools
    case 'seo-serp-studio':
    case 'serp-meta-previewer':
    case 'open-graph-card-gen':
    case 'keyword-density-analyzer':
    case 'robots-txt-builder':
      return <SeoSerpStudio />;

    // 26 & 29 Color & Design
    case 'color-studio':
    case 'wcag-contrast-checker':
    case 'color-palette-generator':
    case 'css-gradient-builder':
    case 'css-gradient-studio':
      return <CssGradientStudio />;

    // 30 & 32 Education & Study
    case 'math-study-studio':
    case 'gpa-calculator':
    case 'citation-generator-helper':
    case 'pomodoro-study-timer':
      return <MathStudyStudio />;

    // 33 UAE Tools
    case 'uae-gratuity-calculator':
      return <UaeToolsStudio defaultTab="gratuity" />;
    case 'uae-vat-calculator':
      return <UaeToolsStudio defaultTab="vat" />;
    case 'emirates-id-validator':
      return <UaeToolsStudio defaultTab="emirates-id" />;

    // Default Fallback
    default:
      return (
        <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-3">
          <p className="text-base font-bold text-white">{tool.name}</p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">{tool.shortDescription}</p>
        </div>
      );
  }
};
