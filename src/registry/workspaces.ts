import { WorkspaceDefinition } from './types';

export const WORKSPACES: WorkspaceDefinition[] = [
  {
    id: '01-qr-barcode',
    slug: 'qr-barcode-tools',
    name: 'QR & Barcode Tools',
    shortName: 'QR & Barcode',
    description: 'High-performance generator studio for customized QR codes, Photo Badges, WiFi credentials, vCards, and standard commercial barcodes.',
    iconName: 'QrCode',
    colorAccent: 'from-blue-500 to-cyan-400',
    categories: ['QR Generation', 'Barcode Generation', 'Custom Badge', 'Scanning'],
    toolIds: ['qr-barcode-studio', 'photo-qr-badge', 'wifi-qr-gen', 'vcard-qr-gen', 'barcode-gen', 'bulk-qr-gen'],
    priority: 1,
    status: 'active',
    seo: {
      title: 'QR & Barcode Tools Studio — Free Custom QR & Barcode Generator',
      metaDescription: 'Generate custom QR codes with photo badges, logos, custom colors, Wi-Fi credentials, vCards, and barcodes in PNG, SVG, or JPG format.',
      keywords: ['qr code generator', 'barcode generator', 'photo qr badge', 'wifi qr code', 'vcard qr', 'free qr maker']
    },
    features: ['Real-time canvas rendering', 'Photo badge overlay with custom positions', 'SVG vector and high-res raster export', 'Zero server data retention']
  },
  {
    id: '02-visiting-card',
    slug: 'visiting-card-tools',
    name: 'Visiting Card & Business Card Tools',
    shortName: 'Business Cards',
    description: 'Professional double-sided business card architect with real print-bleed guides, typography styling, custom logos, and vector PDF/PNG exports.',
    iconName: 'CreditCard',
    colorAccent: 'from-amber-500 to-orange-400',
    categories: ['Card Design', 'Corporate Identity', 'Print Export'],
    toolIds: ['visiting-card-builder', 'digital-card-gen', 'card-mockup-preview'],
    priority: 2,
    status: 'active',
    seo: {
      title: 'Visiting Card & Business Card Builder — Professional Card Studio',
      metaDescription: 'Design professional front and back visiting cards with live preview, custom logos, print bleed margins, and 300 DPI high-resolution export.',
      keywords: ['visiting card builder', 'business card generator', 'printable business card', 'corporate identity builder']
    },
    features: ['Front and back flip preview', '300 DPI print-ready export', 'Custom logo and headshot upload', 'Bleed and safety trim margins']
  },
  {
    id: '03-image-editing',
    slug: 'image-editing-tools',
    name: 'Image Editing Tools',
    shortName: 'Image Editor',
    description: 'Full-featured client-side canvas studio for cropping, resizing, color grading, rotating, sharpening, blurring, and watermarking images.',
    iconName: 'Sliders',
    colorAccent: 'from-emerald-500 to-teal-400',
    categories: ['Transform', 'Filters & Adjust', 'Overlays & Watermark'],
    toolIds: ['image-editor-studio', 'image-cropper', 'image-resizer', 'image-watermarker', 'photo-filters'],
    priority: 3,
    status: 'active',
    seo: {
      title: 'Online Image Editing Studio — Crop, Filter, Resize & Watermark',
      metaDescription: 'Edit photos directly in your browser with instant canvas rendering. Crop, rotate, adjust brightness, contrast, blur, and export high quality images.',
      keywords: ['online image editor', 'photo editor', 'crop image online', 'resize photo', 'add watermark']
    },
    features: ['Non-destructive filter adjustments', 'Before / After split screen preview', 'Custom aspect ratio crop presets', '100% private in-browser processing']
  },
  {
    id: '04-image-converter',
    slug: 'image-converter-tools',
    name: 'Image Converter & Encoder',
    shortName: 'Image Converter',
    description: 'Universal converter between JPG, PNG, WebP, BMP, Base64 data strings, and multi-image PDF bundles with batch ZIP packaging.',
    iconName: 'RefreshCw',
    colorAccent: 'from-purple-500 to-indigo-400',
    categories: ['Format Conversion', 'Batch Processing', 'Encoders'],
    toolIds: ['universal-image-converter', 'jpg-to-png', 'png-to-jpg', 'webp-converter', 'image-to-base64', 'image-to-pdf'],
    priority: 4,
    status: 'active',
    seo: {
      title: 'Universal Image Converter & Base64 Encoder — Fast Batch Conversion',
      metaDescription: 'Convert images between JPG, PNG, WebP, BMP, and PDF in bulk. Generate Base64 Data URIs with zero quality loss and one-click ZIP download.',
      keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp to png', 'image to base64', 'bulk image converter']
    },
    features: ['Simultaneous batch conversion', 'ZIP archive export', 'Adjustable compression quality', 'Local memory safety with Blob cleanup']
  },
  {
    id: '05-pdf-tools',
    slug: 'pdf-tools',
    name: 'PDF Tools',
    shortName: 'PDF Toolkit',
    description: 'Essential document operations: merge multiple PDFs, split ranges, extract pages, stamp watermarks, and edit PDF metadata entirely in browser.',
    iconName: 'FileText',
    colorAccent: 'from-red-500 to-rose-400',
    categories: ['Organize', 'Convert', 'Protect & Annotate'],
    toolIds: ['pdf-toolkit', 'merge-pdf', 'split-pdf', 'pdf-watermarker', 'pdf-page-numberer', 'images-to-pdf'],
    priority: 5,
    status: 'active',
    seo: {
      title: 'Online PDF Toolkit — Merge, Split, Watermark & Page Numbering',
      metaDescription: 'Fast, secure PDF toolkit. Merge files, split pages, add confidential watermarks, and insert page numbers locally without uploading to external servers.',
      keywords: ['pdf tools', 'merge pdf', 'split pdf', 'watermark pdf', 'add page numbers pdf', 'secure pdf editor']
    },
    features: ['Client-side pdf-lib engine', 'Zero file uploads required', 'Custom page range extraction', 'Custom watermark opacity & rotation']
  },
  {
    id: '06-doc-converter',
    slug: 'document-converter-tools',
    name: 'Document Converter Tools',
    shortName: 'Doc Converter',
    description: 'Format transformation utilities for plain text, Markdown, HTML, CSV, and structured document formats.',
    iconName: 'FileCode',
    colorAccent: 'from-cyan-500 to-sky-400',
    categories: ['Markdown', 'HTML', 'Plain Text'],
    toolIds: ['markdown-to-html', 'html-to-markdown', 'text-cleaner', 'rtf-extractor'],
    priority: 6,
    status: 'active',
    seo: {
      title: 'Document Converter Tools — Markdown, HTML & Text Transformation',
      metaDescription: 'Convert between Markdown, HTML, and sanitized plain text documents with real-time formatting and syntax preview.',
      keywords: ['markdown to html', 'html to markdown', 'document converter', 'text converter']
    },
    features: ['Live dual-pane editor', 'GitHub Flavored Markdown parsing', 'XSS-sanitized HTML export']
  },
  {
    id: '07-file-utilities',
    slug: 'file-utilities',
    name: 'File Utilities',
    shortName: 'File Utilities',
    description: 'Inspect file byte signatures (Magic Numbers), calculate exact checksums, analyze MIME types, and create or inspect ZIP archives.',
    iconName: 'Archive',
    colorAccent: 'from-yellow-500 to-amber-400',
    categories: ['Inspection', 'Checksums', 'Archives'],
    toolIds: ['file-checksum-calc', 'file-magic-bytes', 'zip-creator', 'mime-type-checker'],
    priority: 7,
    status: 'active',
    seo: {
      title: 'Online File Utilities — Checksums, Magic Bytes & Archive Tools',
      metaDescription: 'Calculate SHA-256 and MD5 checksums for files, verify magic byte file signatures, and pack files into ZIP containers.',
      keywords: ['file checksum calculator', 'file signature viewer', 'mime type checker', 'online zip maker']
    },
    features: ['Web Crypto API hashing', 'Magic byte signature header match', 'Real-time client ZIP packing']
  },
  {
    id: '08-video-tools',
    slug: 'video-tools',
    name: 'Video Tools',
    shortName: 'Video Tools',
    description: 'Video metadata inspector, frame capture tool, aspect ratio calculator, and HTML5 video compatibility tester.',
    iconName: 'Video',
    colorAccent: 'from-pink-500 to-rose-400',
    categories: ['Inspection', 'Capture', 'Calculators'],
    toolIds: ['video-frame-grabber', 'video-metadata-inspector', 'video-aspect-calculator'],
    priority: 8,
    status: 'active',
    seo: {
      title: 'Video Tools Studio — Frame Grabber & Metadata Inspector',
      metaDescription: 'Extract high-resolution image frames from videos, inspect video codecs and duration, and calculate widescreen aspect ratios.',
      keywords: ['video frame grabber', 'extract frame from video', 'video aspect ratio calculator', 'video metadata']
    },
    features: ['HTML5 video canvas frame capture', 'Accurate timestamp positioning', 'Zero video server uploading']
  },
  {
    id: '09-audio-tools',
    slug: 'audio-tools',
    name: 'Audio Tools',
    shortName: 'Audio Tools',
    description: 'Synthesize exact frequency audio tones, generate binaural beats, test stereo balance, and inspect audio file metadata.',
    iconName: 'Volume2',
    colorAccent: 'from-violet-500 to-purple-400',
    categories: ['Synthesizer', 'Testing', 'Metadata'],
    toolIds: ['audio-tone-generator', 'binaural-beats-gen', 'audio-metadata-reader'],
    priority: 9,
    status: 'active',
    seo: {
      title: 'Audio Tools & Tone Generator — Web Audio API Synthesizer',
      metaDescription: 'Generate pure sine, square, and sawtooth audio frequencies, calibrate headphones with stereo testing, and inspect audio file parameters.',
      keywords: ['tone generator', 'frequency generator', 'audio testing', 'sine wave generator', 'audio tools']
    },
    features: ['Web Audio API synthesizer', 'Volume and waveform modulation', 'Stereo panner diagnostics']
  },
  {
    id: '10-ocr-scanner',
    slug: 'ocr-scanner-tools',
    name: 'OCR & Scanner',
    shortName: 'OCR & Scanner',
    description: 'Document scanner simulator with contrast enhancement, perspective correction preview, and text extraction guidance.',
    iconName: 'Scan',
    colorAccent: 'from-emerald-500 to-green-400',
    categories: ['Scanner', 'Document Prep', 'Text Extraction'],
    toolIds: ['document-scanner-prep', 'receipt-enhancer', 'ocr-text-extractor'],
    priority: 10,
    status: 'active',
    seo: {
      title: 'OCR & Document Scanner Tools — Contrast & Text Preparation',
      metaDescription: 'Enhance scanned documents, boost black and white contrast for legibility, and prep invoices or receipts for optical character recognition.',
      keywords: ['document scanner online', 'receipt scanner enhance', 'ocr prep tool', 'scan to black and white']
    },
    features: ['Binarization threshold filter', 'Edge detection preview', 'High-contrast text enhancement']
  },
  {
    id: '11-text-writing',
    slug: 'text-writing-tools',
    name: 'Text & Writing Tools',
    shortName: 'Text & Writing',
    description: 'Comprehensive word & character counter, reading time estimator, multi-case converter, text diff comparison, and duplicate line remover.',
    iconName: 'Type',
    colorAccent: 'from-sky-500 to-blue-400',
    categories: ['Metrics', 'Case Conversion', 'Manipulation'],
    toolIds: ['text-metrics-analyzer', 'case-converter', 'text-diff-checker', 'duplicate-line-remover', 'slug-generator'],
    priority: 11,
    status: 'active',
    seo: {
      title: 'Text & Writing Tools — Word Counter, Case Converter & Text Diff',
      metaDescription: 'Analyze text metrics, count words and characters, estimate reading time, convert string cases, and remove duplicate lines instantly.',
      keywords: ['word counter', 'character count', 'case converter', 'text diff checker', 'remove duplicate lines']
    },
    features: ['Live speaking and reading duration calculation', 'Camel, Pascal, Snake, Kebab and Title case conversions', 'Side-by-side text diff highlight']
  },
  {
    id: '12-ai-text',
    slug: 'ai-text-tools',
    name: 'AI Text Tools',
    shortName: 'AI Text',
    description: 'Deterministic and AI-augmented text summarizers, grammar refinement tools, readability scoring, and tone analyzers.',
    iconName: 'Sparkles',
    colorAccent: 'from-indigo-500 to-cyan-400',
    categories: ['Analysis', 'Readability', 'Refinement'],
    toolIds: ['readability-score-calc', 'text-summarizer-rule', 'text-tone-analyzer'],
    priority: 12,
    status: 'active',
    seo: {
      title: 'AI Text Tools — Flesch Readability, Summary & Text Refiner',
      metaDescription: 'Evaluate Flesch-Kincaid reading ease scores, analyze vocabulary complexity, and summarize articles with structured extractive logic.',
      keywords: ['readability calculator', 'flesch kincaid score', 'text summarizer', 'reading difficulty analyzer']
    },
    features: ['Flesch Reading Ease & Grade Level metrics', 'Sentence complexity breakdown', 'Zero data scraping']
  },
  {
    id: '13-ai-prompt',
    slug: 'ai-prompt-tools',
    name: 'AI Prompt & Productivity',
    shortName: 'Prompt Tools',
    description: 'Structured prompt builder, system message generator, token count estimator, and temperature/top-p parameter playground.',
    iconName: 'Terminal',
    colorAccent: 'from-teal-500 to-emerald-400',
    categories: ['Prompt Engineering', 'Token Estimator', 'System Prompts'],
    toolIds: ['prompt-builder-studio', 'token-estimator', 'system-prompt-architect'],
    priority: 13,
    status: 'active',
    seo: {
      title: 'AI Prompt Engineering Studio — Structured Prompt Builder',
      metaDescription: 'Craft modular system instructions, estimate LLM token expenditures, and build parameterized prompts for ChatGPT, Claude, and Gemini.',
      keywords: ['prompt builder', 'system prompt generator', 'llm token estimator', 'prompt engineering tool']
    },
    features: ['Role-Context-Task-Constraint builder', 'Token estimation heuristic', 'One-click copy to clipboard']
  },
  {
    id: '14-financial-calc',
    slug: 'financial-calculators',
    name: 'Financial Calculators',
    shortName: 'Financial Calc',
    description: 'Loan & mortgage EMI calculators with complete amortization schedules, compound interest growth simulator, and inflation adjustments.',
    iconName: 'DollarSign',
    colorAccent: 'from-emerald-500 to-teal-400',
    categories: ['Loans & EMI', 'Investment', 'Savings'],
    toolIds: ['loan-emi-calculator', 'compound-interest-sim', 'sip-investment-calc', 'inflation-calculator'],
    priority: 14,
    status: 'active',
    seo: {
      title: 'Financial Calculators — Loan EMI, Compound Interest & Investment Growth',
      metaDescription: 'Calculate monthly loan EMI with amortization schedule, simulate compound interest with periodic deposits, and project long-term investment wealth.',
      keywords: ['loan emi calculator', 'mortgage calculator', 'compound interest calculator', 'sip calculator', 'amortization schedule']
    },
    features: ['Full month-by-month payment schedule breakdown', 'Total interest vs principal visualizer', 'Annual and monthly compounding']
  },
  {
    id: '15-business-calc',
    slug: 'business-calculators',
    name: 'Business Calculators',
    shortName: 'Business Calc',
    description: 'Gross margin & markup calculator, break-even unit analysis, Customer Acquisition Cost (CAC) and Lifetime Value (LTV) ratio tools.',
    iconName: 'TrendingUp',
    colorAccent: 'from-blue-500 to-indigo-400',
    categories: ['Profitability', 'Unit Economics', 'Metrics'],
    toolIds: ['margin-markup-calc', 'break-even-calculator', 'cac-ltv-calculator'],
    priority: 15,
    status: 'active',
    seo: {
      title: 'Business Calculators — Profit Margin, Markup & Break-Even Analysis',
      metaDescription: 'Calculate gross profit margins, markups, break-even sales volume, and evaluate SaaS unit economics with precision.',
      keywords: ['profit margin calculator', 'markup calculator', 'break even calculator', 'business metrics tool']
    },
    features: ['Instant margin vs markup dual sync', 'Fixed vs variable cost break-even point', 'Visual metric summary']
  },
  {
    id: '16-health-fitness',
    slug: 'health-fitness-calculators',
    name: 'Health & Fitness Calculators',
    shortName: 'Health & Fitness',
    description: 'Body Mass Index (BMI), Basal Metabolic Rate (BMR with Mifflin-St Jeor), Daily Caloric expenditure (TDEE), and target heart rate zones.',
    iconName: 'Activity',
    colorAccent: 'from-rose-500 to-orange-400',
    categories: ['Body Metrics', 'Energy Expenditure', 'Cardio'],
    toolIds: ['bmi-calculator', 'bmr-tdee-calculator', 'target-heart-rate-calc', 'water-intake-calc'],
    priority: 16,
    status: 'active',
    seo: {
      title: 'Health & Fitness Calculators — BMI, BMR, TDEE & Target Heart Rate',
      metaDescription: 'Accurately compute Body Mass Index, Basal Metabolic Rate, daily energy expenditure (TDEE), and training heart rate zones for workout goals.',
      keywords: ['bmi calculator', 'bmr calculator', 'tdee calculator', 'daily calorie calculator', 'fitness tools']
    },
    features: ['Mifflin-St Jeor and Harris-Benedict formulas', 'WHO BMI category classifications', 'Metric and Imperial unit support']
  },
  {
    id: '17-date-time',
    slug: 'date-time-tools',
    name: 'Date & Time Tools',
    shortName: 'Date & Time',
    description: 'Exact age calculator down to the minute, working business days calculator excluding weekends, and global time zone converter.',
    iconName: 'Clock',
    colorAccent: 'from-cyan-500 to-blue-400',
    categories: ['Calculators', 'Global Time', 'Working Days'],
    toolIds: ['age-calculator-exact', 'working-days-calculator', 'world-timezone-converter', 'unix-timestamp-converter'],
    priority: 17,
    status: 'active',
    seo: {
      title: 'Date & Time Tools — Exact Age, Business Days & Unix Timestamp',
      metaDescription: 'Calculate exact age in years, months, and days, count working business days between dates, and convert between UTC, local time, and Unix epochs.',
      keywords: ['age calculator', 'business days calculator', 'working days calculator', 'unix timestamp converter', 'time zone converter']
    },
    features: ['Leap year accurate calculations', 'Custom weekend selection (Sat-Sun or Fri-Sat)', 'Epoch seconds and milliseconds support']
  },
  {
    id: '18-unit-converter',
    slug: 'unit-measurement-converter',
    name: 'Unit & Measurement Converter',
    shortName: 'Unit Converter',
    description: 'Comprehensive metric and imperial converter across length, weight/mass, digital data, temperature, speed, area, and pressure.',
    iconName: 'Scale',
    colorAccent: 'from-amber-500 to-yellow-400',
    categories: ['Length & Area', 'Weight & Mass', 'Digital Data', 'Temperature'],
    toolIds: ['universal-unit-converter', 'digital-storage-converter', 'temperature-converter', 'weight-converter'],
    priority: 18,
    status: 'active',
    seo: {
      title: 'Universal Unit & Measurement Converter — Length, Mass, Storage & More',
      metaDescription: 'Convert between metric and imperial units: meters to feet, kilograms to pounds, Celsius to Fahrenheit, and bytes to gigabytes instantly.',
      keywords: ['unit converter', 'metric converter', 'length converter', 'weight converter', 'data storage converter']
    },
    features: ['Over 60 supported units', 'High-precision floating point rounding', 'Instant bi-directional conversion']
  },
  {
    id: '19-currency-money',
    slug: 'currency-money-converter',
    name: 'Currency & Money Converter',
    shortName: 'Currency & Money',
    description: 'Multi-currency conversion tool with major world currencies, crypto denomination calculator, and tip/split-bill calculator.',
    iconName: 'Coins',
    colorAccent: 'from-emerald-500 to-green-400',
    categories: ['Exchange Rates', 'Bill Splitting', 'Denominations'],
    toolIds: ['currency-converter-studio', 'tip-and-split-calculator', 'cash-denomination-counter'],
    priority: 19,
    status: 'active',
    seo: {
      title: 'Currency & Money Converter — Exchange Rates & Bill Splitter',
      metaDescription: 'Convert between USD, EUR, GBP, AED, INR, and 30+ currencies with transparent reference rates, and split restaurant bills with custom gratuity.',
      keywords: ['currency converter', 'money converter', 'split bill calculator', 'tip calculator', 'usd to aed']
    },
    features: ['Clear source attribution & last updated date', 'Tip percentage presets with per-person breakdown', 'Cash register denomination tally']
  },
  {
    id: '20-developer-json',
    slug: 'developer-json-tools',
    name: 'Developer JSON & Data Tools',
    shortName: 'JSON & Data',
    description: 'JSON Beautifier, Minifier, strict schema validator with syntax error highlighting, JSON to CSV exporter, and JSON path tester.',
    iconName: 'Code',
    colorAccent: 'from-blue-500 to-cyan-400',
    categories: ['Formatting', 'Validation', 'Data Conversion'],
    toolIds: ['json-studio', 'json-validator', 'json-to-csv', 'json-minifier'],
    priority: 20,
    status: 'active',
    seo: {
      title: 'Developer JSON Studio — Format, Validate & Convert JSON to CSV',
      metaDescription: 'Format and prettify JSON with custom indentation, validate syntax with exact error line pointers, and convert JSON arrays to CSV spreadsheets.',
      keywords: ['json formatter', 'json validator', 'json to csv', 'json beautifier', 'json minifier']
    },
    features: ['Exact line and column syntax error reporting', 'Tabs, 2-space, and 4-space indentation options', 'Nested object flattening for CSV exports']
  },
  {
    id: '21-encoding-hash',
    slug: 'encoding-hash-security-tools',
    name: 'Encoding, Hash & Security Utilities',
    shortName: 'Hash & Security',
    description: 'Cryptographic hash generator (SHA-256, SHA-512, MD5), Base64 file/text encoder, HTML entity encoder, and cryptographically secure password maker.',
    iconName: 'Shield',
    colorAccent: 'from-red-500 to-orange-400',
    categories: ['Hashing', 'Encoders', 'Passwords & UUID'],
    toolIds: ['security-hash-studio', 'base64-studio', 'password-generator', 'uuid-v4-generator'],
    priority: 21,
    status: 'active',
    seo: {
      title: 'Encoding, Hash & Security Utilities — SHA-256, Base64 & Password Studio',
      metaDescription: 'Generate SHA-256 and SHA-512 cryptographic hashes using the Web Crypto API, encode Base64 strings, and generate secure random passwords and UUIDs.',
      keywords: ['sha256 generator', 'hash generator', 'base64 encoder', 'password generator', 'uuid generator']
    },
    features: ['Hardware-accelerated Web Crypto API', 'Password entropy score in bits', 'RFC 4122 compliant UUID v4 generator']
  },
  {
    id: '22-web-code',
    slug: 'web-code-tools',
    name: 'Web Code Tools',
    shortName: 'Web Code',
    description: 'HTML formatter & minifier, CSS minifier, JavaScript beautifier, and SVG code optimizer with live preview.',
    iconName: 'Layers',
    colorAccent: 'from-amber-500 to-orange-400',
    categories: ['HTML', 'CSS', 'JavaScript', 'SVG'],
    toolIds: ['html-formatter-minifier', 'css-minifier-tool', 'svg-viewer-cleaner'],
    priority: 22,
    status: 'active',
    seo: {
      title: 'Web Code Tools — HTML, CSS & SVG Minifier and Formatter',
      metaDescription: 'Beautify or minify HTML, CSS, and clean raw SVG markup with instant render preview and byte savings calculations.',
      keywords: ['html minifier', 'css minifier', 'svg optimizer', 'html formatter', 'web code tools']
    },
    features: ['Percentage file size savings indicator', 'Live rendered SVG preview', 'Syntax safe whitespace stripping']
  },
  {
    id: '23-regex-code',
    slug: 'regex-code-tools',
    name: 'Regex & Code Utilities',
    shortName: 'Regex & Code',
    description: 'Interactive regular expression sandbox with real-time match highlighting, capture group breakdown, replace simulator, and common regex library.',
    iconName: 'Brackets',
    colorAccent: 'from-violet-500 to-indigo-400',
    categories: ['Regex Sandbox', 'Cheat Sheet', 'Replace'],
    toolIds: ['regex-studio', 'regex-cheatsheet-tool', 'string-escape-tool'],
    priority: 23,
    status: 'active',
    seo: {
      title: 'Regex Studio — Interactive Regular Expression Tester with Highlighting',
      metaDescription: 'Test and debug regular expressions with live match highlighting, capture group extraction, replace preview, and verified regex templates.',
      keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'regex cheatsheet']
    },
    features: ['Real-time regex evaluation with flags (g, i, m, s)', 'Group index and character position diagnostics', 'Preset library for emails, URLs, dates, and IPs']
  },
  {
    id: '24-seo-tools',
    slug: 'seo-tools',
    name: 'SEO Tools',
    shortName: 'SEO Tools',
    description: 'Google SERP snippet preview simulator, Open Graph card generator, meta tag validator, robots.txt tester, and keyword density analyzer.',
    iconName: 'Search',
    colorAccent: 'from-blue-500 to-teal-400',
    categories: ['SERP Preview', 'Meta Tags', 'Keyword Analysis'],
    toolIds: ['serp-meta-previewer', 'open-graph-card-gen', 'keyword-density-analyzer', 'robots-txt-builder'],
    priority: 24,
    status: 'active',
    seo: {
      title: 'SEO Tools Studio — Google SERP Preview, Open Graph & Meta Tags',
      metaDescription: 'Simulate Google desktop and mobile search snippets, generate Facebook and Twitter Open Graph tags, and analyze content keyword density.',
      keywords: ['serp preview tool', 'google search simulator', 'open graph generator', 'meta tag generator', 'keyword density tool']
    },
    features: ['Character and pixel length warnings for meta titles & descriptions', 'Social card live preview (Facebook / X / LinkedIn)', 'Clean copyable HTML meta tag output']
  },
  {
    id: '25-url-web',
    slug: 'url-web-tools',
    name: 'URL & Web Tools',
    shortName: 'URL & Web',
    description: 'URL parser and query parameter builder, UTM campaign tag creator, URL encoder/decoder, and domain name extractor.',
    iconName: 'Link',
    colorAccent: 'from-cyan-500 to-blue-400',
    categories: ['URL Parsing', 'UTM Tracking', 'Encoding'],
    toolIds: ['url-parser-builder', 'utm-campaign-builder', 'url-encoder-decoder'],
    priority: 25,
    status: 'active',
    seo: {
      title: 'URL & Web Tools — UTM Campaign Builder & URL Query Parser',
      metaDescription: 'Build tracking UTM links for Google Analytics campaigns, inspect complex URL query parameters, and encode or decode web strings.',
      keywords: ['utm builder', 'campaign url builder', 'url parser', 'url encode decode', 'query parameter editor']
    },
    features: ['Full UTM parameters (source, medium, campaign, term, content)', 'Query string key-value table editor', 'Instant URL syntax validation']
  },
  {
    id: '26-color-design',
    slug: 'color-design-tools',
    name: 'Color & Design Tools',
    shortName: 'Color & Design',
    description: 'HEX, RGB, HSL, and CMYK color converter, WCAG AA/AAA contrast checker, harmonious color palette generator, and CSS gradient maker.',
    iconName: 'Palette',
    colorAccent: 'from-purple-500 to-pink-400',
    categories: ['Converters', 'Accessibility', 'Palettes', 'Gradients'],
    toolIds: ['color-studio', 'wcag-contrast-checker', 'color-palette-generator', 'css-gradient-builder'],
    priority: 26,
    status: 'active',
    seo: {
      title: 'Color & Design Tools — WCAG Contrast Checker & Palette Studio',
      metaDescription: 'Verify WCAG 2.1 AA and AAA color contrast compliance for accessible UI, convert color formats, and generate complementary color schemes.',
      keywords: ['contrast checker', 'wcag contrast ratio', 'color palette generator', 'hex to rgb', 'css gradient generator']
    },
    features: ['WCAG AA and AAA pass/fail rating for normal and large text', 'Harmonious harmony algorithms (Analogous, Triadic, Tetradic)', 'One-click CSS code export']
  },
  {
    id: '27-social-media',
    slug: 'social-media-tools',
    name: 'Social Media Tools',
    shortName: 'Social Media',
    description: 'Bio link page generator, post character counter for X/LinkedIn/Instagram, hashtag generator, and social media image dimensions cheat sheet.',
    iconName: 'Share2',
    colorAccent: 'from-rose-500 to-pink-400',
    categories: ['Character Limits', 'Hashtags', 'Dimensions'],
    toolIds: ['social-character-counter', 'social-dimension-guide', 'hashtag-extractor'],
    priority: 27,
    status: 'active',
    seo: {
      title: 'Social Media Tools — Character Counters & Image Dimension Guide',
      metaDescription: 'Monitor character limits for X, LinkedIn, Instagram, and YouTube titles, and look up up-to-date image dimensions for social platforms.',
      keywords: ['social media character counter', 'twitter character count', 'social media image sizes', 'instagram dimensions']
    },
    features: ['Real-time platform limits for X, LinkedIn, Instagram, TikTok', 'Post preview mockup', 'Hashtag counter']
  },
  {
    id: '28-marketing',
    slug: 'marketing-tools',
    name: 'Marketing Tools',
    shortName: 'Marketing',
    description: 'Email subject line tester with spam word scanner, ROAS (Return on Ad Spend) calculator, and email signature HTML generator.',
    iconName: 'Megaphone',
    colorAccent: 'from-orange-500 to-amber-400',
    categories: ['Email Marketing', 'Advertising', 'Branding'],
    toolIds: ['email-subject-tester', 'roas-calculator', 'email-signature-generator'],
    priority: 28,
    status: 'active',
    seo: {
      title: 'Marketing Tools — Email Subject Line Tester & ROAS Calculator',
      metaDescription: 'Optimize email subject lines, scan for spam trigger keywords, calculate Return on Ad Spend (ROAS), and generate clean HTML email signatures.',
      keywords: ['email subject tester', 'roas calculator', 'email signature generator', 'spam word checker']
    },
    features: ['Trigger word spam filter scoring', 'Ad revenue and profit multiplier metrics', 'Cross-client compatible HTML signature preview']
  },
  {
    id: '29-resume-career',
    slug: 'resume-career-tools',
    name: 'Resume & Career Tools',
    shortName: 'Resume & Career',
    description: 'Action verb finder for resume bullets, ATS resume keyword scanner, hourly-to-salary wage converter, and cover letter outline builder.',
    iconName: 'Briefcase',
    colorAccent: 'from-blue-500 to-indigo-400',
    categories: ['Resume Building', 'Compensation', 'Career Prep'],
    toolIds: ['resume-action-verbs', 'salary-hourly-converter', 'ats-keyword-scanner'],
    priority: 29,
    status: 'active',
    seo: {
      title: 'Resume & Career Tools — Action Verb Finder & Salary Converter',
      metaDescription: 'Supercharge resume bullet points with high-impact power verbs, convert hourly rates to annual salary, and scan resumes for target keywords.',
      keywords: ['resume action verbs', 'salary to hourly converter', 'ats resume scanner', 'career tools']
    },
    features: ['Categorized action verbs by leadership, technical, and analytical skill', 'Standard 40-hour work week salary breakdown', 'Match percentage calculator']
  },
  {
    id: '30-education-student',
    slug: 'education-student-tools',
    name: 'Education & Student Tools',
    shortName: 'Education',
    description: 'GPA calculator with 4.0 scale and weighted credit support, citation generator (APA / MLA format helper), and study timer with Pomodoro.',
    iconName: 'GraduationCap',
    colorAccent: 'from-emerald-500 to-teal-400',
    categories: ['Grades', 'Citations', 'Study Tools'],
    toolIds: ['gpa-calculator', 'citation-generator-helper', 'pomodoro-study-timer'],
    priority: 30,
    status: 'active',
    seo: {
      title: 'Education & Student Tools — GPA Calculator & Citation Helper',
      metaDescription: 'Calculate semester and cumulative GPA with weighted credit hours, format APA and MLA bibliography citations, and track focus with a Pomodoro timer.',
      keywords: ['gpa calculator', 'citation generator', 'apa citation maker', 'pomodoro timer online']
    },
    features: ['Letter grade to 4.0 scale mapping', 'APA 7th edition and MLA 9th edition structure guides', 'Audio alert focus intervals']
  },
  {
    id: '31-productivity',
    slug: 'productivity-tools',
    name: 'Productivity Tools',
    shortName: 'Productivity',
    description: 'Minimalist offline scratchpad notes with instant local storage, Eisenhower decision matrix tool, and checklist organizer.',
    iconName: 'CheckSquare',
    colorAccent: 'from-cyan-500 to-teal-400',
    categories: ['Notes', 'Task Prioritization', 'Time Management'],
    toolIds: ['private-scratchpad', 'eisenhower-matrix-tool', 'quick-checklist-tool'],
    priority: 31,
    status: 'active',
    seo: {
      title: 'Productivity Tools Studio — Private Scratchpad & Eisenhower Matrix',
      metaDescription: 'Organize priorities with the Eisenhower urgent/important decision matrix, write private auto-saving scratchpad notes, and manage quick daily checklists.',
      keywords: ['eisenhower matrix tool', 'online scratchpad', 'private notes online', 'productivity checklist']
    },
    features: ['Automatic browser localStorage sync', 'Drag or assign tasks across 4 urgency quadrants', 'Zero account registration required']
  },
  {
    id: '32-travel-tools',
    slug: 'travel-tools',
    name: 'Travel Tools',
    shortName: 'Travel Tools',
    description: 'Interactive packing checklist generator by trip type, flight duration and jet lag recovery planner, and international plug/voltage guide.',
    iconName: 'Compass',
    colorAccent: 'from-amber-500 to-rose-400',
    categories: ['Checklists', 'Jet Lag', 'Travel Utility'],
    toolIds: ['travel-packing-checklist', 'jet-lag-planner', 'plug-voltage-lookup'],
    priority: 32,
    status: 'active',
    seo: {
      title: 'Travel Tools Studio — Packing List Generator & Jet Lag Planner',
      metaDescription: 'Generate custom travel packing checklists based on destination climate, plan sleep schedules to minimize jet lag across time zones, and look up electrical plug standards.',
      keywords: ['travel packing list generator', 'jet lag planner', 'travel plug adapter guide', 'travel utilities']
    },
    features: ['Custom category filters: business, beach, hiking, winter', 'Circadian shift recommendation schedule', 'Country-by-country socket lookup']
  },
  {
    id: '33-uae-tools',
    slug: 'uae-tools',
    name: 'UAE Tools',
    shortName: 'UAE Tools',
    description: 'Official UAE Labor Law End-of-Service Gratuity Calculator (Federal Decree-Law No. 33), UAE 5% VAT Calculator, and Emirates ID format validator.',
    iconName: 'Building2',
    colorAccent: 'from-emerald-500 to-amber-400',
    categories: ['UAE Legal & Labor', 'Taxation', 'Identity Format'],
    toolIds: ['uae-gratuity-calculator', 'uae-vat-calculator', 'emirates-id-validator'],
    priority: 33,
    status: 'active',
    seo: {
      title: 'UAE Tools Studio — UAE Gratuity Calculator & 5% VAT Tool',
      metaDescription: 'Calculate UAE End-of-Service Gratuity according to the latest UAE Labor Law (Decree-Law 33 of 2021), compute 5% VAT inclusive/exclusive amounts, and validate Emirates ID numbers.',
      keywords: ['uae gratuity calculator', 'uae labor law end of service', 'uae vat calculator 5%', 'emirates id validator', 'uae calculation tools']
    },
    features: ['Official UAE Labor Law calculation rules for limited contracts', '21 days per year (first 5 years) and 30 days per year thereafter', 'Tax invoice 5% VAT breakdown with reverse calculation']
  },
  {
    id: '34-data-spreadsheet',
    slug: 'data-spreadsheet-tools',
    name: 'Data & Spreadsheet Tools',
    shortName: 'Data & Sheets',
    description: 'CSV to JSON and JSON to CSV parser, delimiter cleaner, TSV/CSV viewer with searchable sorting, and column extractor.',
    iconName: 'Table',
    colorAccent: 'from-blue-500 to-sky-400',
    categories: ['CSV Conversion', 'Table Viewer', 'Column Extraction'],
    toolIds: ['csv-to-json-converter', 'csv-table-inspector', 'tsv-csv-converter'],
    priority: 34,
    status: 'active',
    seo: {
      title: 'Data & Spreadsheet Tools — CSV to JSON & Delimited Data Viewer',
      metaDescription: 'Convert CSV spreadsheets to structured JSON data, inspect table headers with sortable columns, and switch delimiters between comma, tab, and semicolon.',
      keywords: ['csv to json', 'csv viewer online', 'tsv to csv converter', 'spreadsheet data tools']
    },
    features: ['Automatic delimiter detection (comma, tab, pipe, semicolon)', 'Dynamic column mapping and header validation', 'Instant tabular preview']
  },
  {
    id: '35-generators-privacy',
    slug: 'generators-privacy-tools',
    name: 'Generators & Privacy Tools',
    shortName: 'Generators & Privacy',
    description: 'Dummy data and placeholder generator, Lorem Ipsum text maker with sentence and paragraph limits, secure random string generator, and privacy audit checklist.',
    iconName: 'Fingerprint',
    colorAccent: 'from-purple-500 to-indigo-400',
    categories: ['Mock Data', 'Text Placeholders', 'Privacy Audits'],
    toolIds: ['lorem-ipsum-studio', 'secure-random-string-gen', 'privacy-policy-checklist'],
    priority: 35,
    status: 'active',
    seo: {
      title: 'Generators & Privacy Tools — Lorem Ipsum, Random Strings & Privacy Checklist',
      metaDescription: 'Generate custom Lorem Ipsum filler paragraphs, cryptographically secure random alphanumeric tokens, and audit website privacy compliance.',
      keywords: ['lorem ipsum generator', 'random string generator', 'privacy audit checklist', 'dummy text maker']
    },
    features: ['Custom paragraph, word, and sentence count control', 'Web Crypto secure byte generation', 'GDPR and ePrivacy website checklist']
  }
];

export const WORKSPACE_MAP = new Map<string, WorkspaceDefinition>(
  WORKSPACES.map(w => [w.id, w])
);

export const WORKSPACE_SLUG_MAP = new Map<string, WorkspaceDefinition>(
  WORKSPACES.map(w => [w.slug, w])
);
