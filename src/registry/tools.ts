import { ToolDefinition } from './types';
import { WORKSPACES } from './workspaces';

export const TOOLS: ToolDefinition[] = [
  // 01 QR & Barcode Tools
  {
    id: 'qr-barcode-studio',
    slug: 'qr-barcode-studio',
    name: 'QR & Barcode Studio',
    shortDescription: 'Generate customized high-resolution QR codes and commercial linear barcodes with colors, margins, logos, and error correction.',
    workspaceId: '01-qr-barcode',
    route: '/tool/qr-barcode-studio',
    iconName: 'QrCode',
    category: 'QR Generation',
    tags: ['qr', 'barcode', 'code128', 'ean', 'wifi', 'vcard', 'svg'],
    keywords: ['qr code maker', 'barcode generator', 'custom qr code', 'free qr studio'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['PNG', 'JPG', 'SVG'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['photo-qr-badge', 'wifi-qr-gen', 'visiting-card-builder'],
    seo: {
      title: 'QR & Barcode Studio — Free Online Custom QR & Barcode Generator',
      h1: 'Professional QR Code & Barcode Studio',
      metaDescription: 'Generate custom QR codes with custom foreground/background colors, error correction levels, and barcodes in Code128, EAN-13, and UPC. Download high-res PNG, JPG, or SVG.',
      howItWorks: [
        { step: 1, title: 'Select Code Type', desc: 'Choose between QR Code (URL, Text, WiFi, vCard, Phone) or Linear Barcode (Code128, EAN13).' },
        { step: 2, title: 'Customize Visuals', desc: 'Adjust foreground/background colors, size, quiet zone margins, and error correction level.' },
        { step: 3, title: 'Preview & Export', desc: 'Inspect live rendered code and download in high-resolution PNG, solid JPG, or vector SVG.' }
      ],
      features: ['10+ data payload templates (URL, Text, Wi-Fi, Phone, SMS, WhatsApp, vCard)', 'Full linear barcode support (Code 128, EAN-13, Code 39)', 'Custom color picker with instant real-time canvas rendering', '100% client-side privacy with zero server logging'],
      tips: ['Use High (H) error correction if you plan to print the QR code in outdoor environments.', 'Always maintain high contrast between foreground and background colors for optimal scanner readability.'],
      faqs: [
        { question: 'Do these QR codes ever expire?', answer: 'No! These are standard static QR codes. The encoded data is directly stored in the matrix pattern and works indefinitely without external redirect servers.' },
        { question: 'Can I use the exported barcodes commercially?', answer: 'Yes. Generated standard barcodes adhere to GS1 specifications and can be downloaded as crisp vector SVG or high-res images.' }
      ]
    }
  },
  {
    id: 'photo-qr-badge',
    slug: 'photo-qr-badge',
    name: 'Photo QR Badge Generator',
    shortDescription: 'Overlay your personal profile photo, brand badge, or corporate logo directly onto an error-resilient QR code with custom borders and positioning.',
    workspaceId: '01-qr-barcode',
    route: '/tool/photo-qr-badge',
    iconName: 'Image',
    category: 'Custom Badge',
    tags: ['qr badge', 'photo qr', 'logo qr', 'brand qr'],
    keywords: ['photo qr code', 'qr code with photo', 'logo qr code generator'],
    status: 'active',
    isPopular: true,
    supportedFormats: ['PNG', 'JPG'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['qr-barcode-studio', 'visiting-card-builder'],
    seo: {
      title: 'Photo QR Badge Generator — Add Logo or Photo to QR Codes',
      h1: 'Photo QR Badge Studio',
      metaDescription: 'Create custom branded QR codes with integrated center or corner photo badges, custom border radius, border thickness, and high-contrast styling.',
      howItWorks: [
        { step: 1, title: 'Enter Destination', desc: 'Provide your URL, social handle, or text payload for the QR code.' },
        { step: 2, title: 'Upload Photo or Logo', desc: 'Select any PNG, JPG, or WebP photo or logo to overlay as a badge.' },
        { step: 3, title: 'Style Badge & Download', desc: 'Customize badge shape (circle, rounded square), border width, and export high-res image.' }
      ],
      features: ['Automatic High Error Correction (Q/H) to guarantee scanner reliability', 'Custom badge shape controls (Circle, Square, Rounded)', 'Live real-time composite canvas rendering', 'High-DPI download for print and merchandise'],
      tips: ['Keep badge size between 18% and 26% of the total QR code size so scanning remains lightning fast.', 'Upload a high-resolution logo or square headshot for crisp results.'],
      faqs: [
        { question: 'Will the QR code scan reliably with a photo in the middle?', answer: 'Yes! QR codes feature built-in Reed-Solomon error correction. Level H can recover up to 30% of obstructed data.' }
      ]
    }
  },
  {
    id: 'wifi-qr-gen',
    slug: 'wifi-qr-code-generator',
    name: 'Wi-Fi QR Code Generator',
    shortDescription: 'Generate instant-connect Wi-Fi QR codes for guests and offices without exposing your password in plain text.',
    workspaceId: '01-qr-barcode',
    route: '/tool/wifi-qr-code-generator',
    iconName: 'Wifi',
    category: 'QR Generation',
    tags: ['wifi qr', 'wpa2', 'network connect', 'guest wifi'],
    keywords: ['wifi qr code', 'scan to connect wifi', 'wifi qr code generator'],
    status: 'active',
    supportedFormats: ['PNG', 'SVG'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['qr-barcode-studio', 'vcard-qr-gen'],
    seo: {
      title: 'Wi-Fi QR Code Generator — Instant One-Scan Wi-Fi Access',
      h1: 'Wi-Fi Connection QR Generator',
      metaDescription: 'Generate instant Wi-Fi connect QR codes supporting WPA, WPA2, WPA3, and WEP protocols. Print table cards for restaurants, offices, and homes.',
      howItWorks: [
        { step: 1, title: 'Enter Network Details', desc: 'Type your Wi-Fi SSID name, password, and encryption type (WPA/WPA2/WPA3).' },
        { step: 2, title: 'Select Styling', desc: 'Choose custom brand colors or default high-contrast dark theme.' },
        { step: 3, title: 'Print or Download', desc: 'Export and print for seamless one-tap smartphone connectivity.' }
      ],
      features: ['Supports WPA/WPA2/WPA3, WEP, and Open Networks', 'Hidden SSID support toggle', 'Direct client-side generation without transmitting passwords anywhere'],
      tips: ['Double check uppercase and lowercase characters in your Wi-Fi password before generating.'],
      faqs: [
        { question: 'Does any device scan this?', answer: 'All modern iOS (iPhone Camera) and Android smartphones natively scan Wi-Fi QR codes and prompt to join immediately.' }
      ]
    }
  },
  {
    id: 'vcard-qr-gen',
    slug: 'vcard-qr-generator',
    name: 'vCard Contact QR Maker',
    shortDescription: 'Create digital business card QR codes containing full contact details, phone numbers, email, company, and website.',
    workspaceId: '01-qr-barcode',
    route: '/tool/vcard-qr-generator',
    iconName: 'UserCheck',
    category: 'QR Generation',
    tags: ['vcard', 'contact qr', 'digital card', 'address book'],
    keywords: ['vcard qr code', 'contact qr code generator', 'digital business card qr'],
    status: 'active',
    supportedFormats: ['PNG', 'SVG'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['visiting-card-builder', 'qr-barcode-studio'],
    seo: {
      title: 'vCard QR Code Generator — Scan to Save Contact in Smartphone',
      h1: 'vCard Contact QR Code Maker',
      metaDescription: 'Generate vCard 3.0 compatible QR codes. Anyone scanning can instantly save your contact name, phone, email, and company into their phone address book.',
      howItWorks: [
        { step: 1, title: 'Fill Information', desc: 'Enter your name, organization, job title, phone numbers, and web links.' },
        { step: 2, title: 'Generate Matrix', desc: 'Preview the formatted standard vCard matrix payload.' },
        { step: 3, title: 'Export', desc: 'Download in high resolution for printing on physical business cards.' }
      ],
      features: ['Standard vCard 3.0 specification compliant', 'Multiple phone and email fields', 'High error correction to ensure easy scanning'],
      tips: ['Keep names and notes concise to keep the QR code matrix density comfortably readable for all cameras.'],
      faqs: [
        { question: 'Will this open contacts on iPhone and Android?', answer: 'Yes! Scanning automatically triggers the native "Add to Contacts" dialog.' }
      ]
    }
  },

  // 02 Visiting Card & Business Card Tools
  {
    id: 'visiting-card-builder',
    slug: 'visiting-card-builder',
    name: 'Visiting Card Builder Studio',
    shortDescription: 'Professional double-sided business card creator with live 3D flip preview, custom logo/photo upload, print-safe margins, and high-resolution export.',
    workspaceId: '02-visiting-card',
    route: '/tool/visiting-card-builder',
    iconName: 'CreditCard',
    category: 'Card Design',
    tags: ['business card', 'visiting card', 'card maker', 'print card', 'pdf export'],
    keywords: ['visiting card builder', 'business card maker', 'free business card generator', 'print business card'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['PNG', 'JPG', 'PDF'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['qr-barcode-studio', 'vcard-qr-gen'],
    seo: {
      title: 'Visiting Card Builder Studio — Create Professional Business Cards',
      h1: 'Professional Visiting Card & Business Card Studio',
      metaDescription: 'Design professional front and back visiting cards with live preview, custom company logos, headshots, print bleed guides, and 300 DPI high-res export.',
      howItWorks: [
        { step: 1, title: 'Enter Card Details', desc: 'Fill in your name, professional title, company name, phone, email, address, and social links.' },
        { step: 2, title: 'Upload Media & Pick Theme', desc: 'Upload your company logo and profile photo, then choose an executive design template.' },
        { step: 3, title: 'Flip & Export', desc: 'Toggle front and back views with bleed margin check, then export in high-res PNG, JPG, or PDF.' }
      ],
      features: ['Standard 3.5" x 2" (1050 x 600 px @ 300 DPI) print-ready canvas', 'Interactive front and back dual-side design', 'Custom logo and headshot badge integration', 'Print bleed safety guidelines overlay'],
      tips: ['Keep critical text inside the safety margin box to prevent accidental trimming when printing at a commercial print shop.'],
      faqs: [
        { question: 'What resolution is the downloaded card?', answer: 'It is exported at high-resolution 300 DPI, making it suitable for professional commercial printing.' },
        { question: 'Are my uploaded logos or photos saved on a server?', answer: 'No! All image rendering and canvas composition occurs 100% locally inside your browser.' }
      ]
    }
  },

  // 03 Image Editing Tools
  {
    id: 'image-editor-studio',
    slug: 'image-editor-studio',
    name: 'Image Editing Studio',
    shortDescription: 'Full-featured canvas photo editor: crop, resize, rotate, flip, adjust brightness/contrast/saturation, apply artistic filters, add watermarks, and preview before/after.',
    workspaceId: '03-image-editing',
    route: '/tool/image-editor-studio',
    iconName: 'Sliders',
    category: 'Transform',
    tags: ['photo editor', 'crop', 'resize', 'filter', 'watermark', 'rotate'],
    keywords: ['online image editor', 'photo editor online', 'free image editor', 'crop photo online'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['JPG', 'PNG', 'WebP'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['universal-image-converter', 'image-watermarker'],
    seo: {
      title: 'Image Editing Studio — Crop, Rotate, Filter & Watermark Online',
      h1: 'Online Image Editing Studio',
      metaDescription: 'Edit photos directly in your browser with instant canvas rendering. Crop with aspect ratio presets, rotate, apply filters, add text watermarks, and export high quality images.',
      howItWorks: [
        { step: 1, title: 'Upload Image', desc: 'Drag and drop or select any image file (PNG, JPG, WebP) from your device.' },
        { step: 2, title: 'Apply Edits & Filters', desc: 'Crop, adjust brightness, contrast, saturation, blur, sepia, or stamp a custom text watermark.' },
        { step: 3, title: 'Compare & Download', desc: 'Use the Before/After split toggle to review changes, then download in your desired format and quality.' }
      ],
      features: ['HTML5 Canvas non-destructive live editing', 'Aspect ratio crop presets (1:1, 4:3, 16:9, Free)', 'Full color grading suite: Brightness, Contrast, Saturation, Sepia, Grayscale, Invert, Blur', 'Custom text watermark overlay with opacity & color controls'],
      tips: ['Use the Before/After button to ensure you haven\'t over-saturated your photo adjustments.'],
      faqs: [
        { question: 'Is there any file size limit?', answer: 'Since all processing runs in your browser using hardware-accelerated Canvas, images up to 25MB are handled smoothly.' }
      ]
    }
  },

  // 04 Image Converter & Encoder
  {
    id: 'universal-image-converter',
    slug: 'universal-image-converter',
    name: 'Universal Image Converter',
    shortDescription: 'Convert images in batches between JPG, PNG, WebP, BMP, Base64 data strings, and multi-image PDF documents with one-click ZIP packaging.',
    workspaceId: '04-image-converter',
    route: '/tool/universal-image-converter',
    iconName: 'RefreshCw',
    category: 'Format Conversion',
    tags: ['converter', 'jpg', 'png', 'webp', 'bmp', 'base64', 'batch'],
    keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp converter', 'image to pdf'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['JPG', 'PNG', 'WebP', 'BMP', 'PDF', 'ZIP'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['image-editor-studio', 'pdf-toolkit'],
    seo: {
      title: 'Universal Image Converter — Fast Batch Image Format Conversion',
      h1: 'Universal Batch Image Converter',
      metaDescription: 'Convert multiple images simultaneously between JPG, PNG, WebP, BMP, and PDF with custom quality settings and ZIP archive downloads.',
      howItWorks: [
        { step: 1, title: 'Upload Multiple Images', desc: 'Drag and drop one or several images to convert in bulk.' },
        { step: 2, title: 'Choose Target Format', desc: 'Select JPG, PNG, WebP, BMP, Base64, or bundle into a single PDF.' },
        { step: 3, title: 'Download Converted Files', desc: 'Download individual files or grab all converted images in a single organized ZIP package.' }
      ],
      features: ['Simultaneous multi-file batch conversion', 'Quality compression control slider (10% to 100%)', 'Instant one-click ZIP download via JSZip', 'Base64 Data URI generator for web developers'],
      tips: ['Converting PNG graphics with transparent backgrounds to WebP preserves transparency while reducing file size by up to 70%.'],
      faqs: [
        { question: 'Can I combine multiple pictures into a single PDF?', answer: 'Yes! Select the "Bundle as PDF" option and all your uploaded photos will be compiled into a multi-page PDF document.' }
      ]
    }
  },

  // 05 PDF Tools
  {
    id: 'pdf-toolkit',
    slug: 'pdf-toolkit',
    name: 'Online PDF Toolkit Studio',
    shortDescription: 'Merge multiple PDF documents into one, split page ranges, insert text watermarks, stamp page numbers, and bundle photos into PDF.',
    workspaceId: '05-pdf-tools',
    route: '/tool/pdf-toolkit',
    iconName: 'FileText',
    category: 'Organize',
    tags: ['pdf merge', 'split pdf', 'watermark pdf', 'page numbers', 'pdf tools'],
    keywords: ['pdf toolkit', 'merge pdf online', 'split pdf free', 'watermark pdf'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['PDF'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['universal-image-converter', 'visiting-card-builder'],
    seo: {
      title: 'PDF Toolkit Studio — Merge, Split, Watermark & Add Page Numbers',
      h1: 'Online PDF Toolkit Studio',
      metaDescription: 'Merge multiple PDF files, extract page ranges, stamp confidential watermarks, and insert professional page numbers locally without uploading documents.',
      howItWorks: [
        { step: 1, title: 'Select Tool Mode', desc: 'Choose between Merge PDFs, Split / Extract Pages, Watermark PDF, or Page Numbering.' },
        { step: 2, title: 'Upload PDF Document(s)', desc: 'Select your PDF files directly from your computer or phone.' },
        { step: 3, title: 'Configure & Process', desc: 'Set your page ranges or watermark text and export your processed PDF instantly.' }
      ],
      features: ['Client-side pdf-lib engine ensuring 100% data confidentiality', 'Multi-document drag-and-drop merging', 'Custom diagonal text watermarking with adjustable opacity', 'Automated bottom-center or bottom-right page numbering'],
      tips: ['For maximum confidentiality, our PDF engine runs completely within your web browser. Your private documents are never sent over the internet.'],
      faqs: [
        { question: 'Is there a limit on how many PDFs I can merge?', answer: 'You can merge dozens of standard PDFs seamlessly, subject only to your device\'s available memory.' }
      ]
    }
  },

  // 14 Financial Calculators
  {
    id: 'loan-emi-calculator',
    slug: 'loan-emi-calculator',
    name: 'Loan & Mortgage EMI Calculator',
    shortDescription: 'Calculate monthly loan EMI payments, total interest payable, and generate a comprehensive amortization schedule with interactive breakdown charts.',
    workspaceId: '14-financial-calc',
    route: '/tool/loan-emi-calculator',
    iconName: 'DollarSign',
    category: 'Loans & EMI',
    tags: ['loan emi', 'mortgage', 'amortization', 'interest rate', 'repayment'],
    keywords: ['loan emi calculator', 'mortgage calculator', 'loan repayment schedule'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['compound-interest-sim', 'uae-gratuity-calculator'],
    seo: {
      title: 'Loan EMI Calculator — Monthly Mortgage & Payment Schedule',
      h1: 'Loan & Mortgage EMI Calculator',
      metaDescription: 'Calculate exact monthly loan repayments, interest vs principal breakdown, and annual amortization schedule for home loans, car loans, and personal loans.',
      howItWorks: [
        { step: 1, title: 'Enter Principal Amount', desc: 'Specify the total borrowed loan amount in your chosen currency.' },
        { step: 2, title: 'Set Rate & Tenure', desc: 'Input the annual interest rate percentage and tenure in years or months.' },
        { step: 3, title: 'View Schedule', desc: 'Instantly view your monthly EMI, total interest, and full repayment schedule.' }
      ],
      features: ['Standard reducing balance amortization formula', 'Visual interest vs principal distribution bar', 'Detailed year-by-year amortization breakdown table'],
      tips: ['Making even small additional prepayments toward your principal significantly reduces total interest paid over the life of the loan.'],
      faqs: [
        { question: 'What formula is used for EMI calculation?', answer: 'We use the standard reducing balance formula: E = P * r * (1+r)^n / ((1+r)^n - 1).' }
      ]
    }
  },

  // 20 Developer JSON & Data Tools
  {
    id: 'json-studio',
    slug: 'json-studio',
    name: 'Developer JSON Studio',
    shortDescription: 'Beautify, format, minify, and validate JSON payloads with precise syntax error highlighting, and convert JSON arrays directly to CSV spreadsheets.',
    workspaceId: '20-developer-json',
    route: '/tool/json-studio',
    iconName: 'Code',
    category: 'Formatting',
    tags: ['json formatter', 'json validator', 'json beautifier', 'json to csv', 'minifier'],
    keywords: ['json formatter', 'json validator', 'json to csv', 'json beautifier'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    supportedFormats: ['JSON', 'CSV'],
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['security-hash-studio', 'regex-studio'],
    seo: {
      title: 'Developer JSON Studio — Format, Validate & Convert to CSV',
      h1: 'Developer JSON Studio',
      metaDescription: 'Format and beautify JSON with 2-space or 4-space indentation, validate syntax errors with line numbers, minify payloads, and export JSON arrays to CSV.',
      howItWorks: [
        { step: 1, title: 'Paste or Upload JSON', desc: 'Paste raw JSON text or drag in a .json file.' },
        { step: 2, title: 'Select Action', desc: 'Choose Beautify (2 or 4 spaces), Minify, Validate, or Convert to CSV.' },
        { step: 3, title: 'Copy or Export', desc: 'Copy formatted results with one click or download clean output files.' }
      ],
      features: ['Syntax error detection with clear problem messages', 'Custom spacing options (2 spaces, 4 spaces, compact)', 'Flattens nested object arrays for CSV export', 'One-click clipboard copy with feedback'],
      tips: ['Trailing commas are the most common cause of invalid JSON syntax! Our validator will highlight exactly where the syntax error occurs.'],
      faqs: [
        { question: 'Is my JSON data kept private?', answer: 'Yes, parsing and validation happen entirely in your browser using native JavaScript JSON engines.' }
      ]
    }
  },

  // 21 Encoding, Hash & Security Utilities
  {
    id: 'security-hash-studio',
    slug: 'security-hash-studio',
    name: 'Encoding, Hash & Security Studio',
    shortDescription: 'Compute SHA-256, SHA-512, SHA-1, and MD5 cryptographic hashes with Web Crypto API, encode/decode Base64 strings, and generate secure passwords.',
    workspaceId: '21-encoding-hash',
    route: '/tool/security-hash-studio',
    iconName: 'Shield',
    category: 'Hashing',
    tags: ['sha256', 'sha512', 'hash', 'base64', 'password generator', 'uuid'],
    keywords: ['sha256 generator', 'hash generator', 'base64 encode decode', 'secure password maker'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['json-studio', 'regex-studio'],
    seo: {
      title: 'Security & Hash Studio — SHA-256, Base64 & Password Generator',
      h1: 'Encoding, Hash & Security Studio',
      metaDescription: 'Generate cryptographic SHA-256 and SHA-512 hashes using hardware-accelerated Web Crypto APIs, encode Base64 strings, and generate high-entropy passwords.',
      howItWorks: [
        { step: 1, title: 'Choose Utility', desc: 'Select Hash Generator, Base64 Studio, Password Generator, or UUID v4 Maker.' },
        { step: 2, title: 'Input Text or Options', desc: 'Type your source text or configure password length and character sets.' },
        { step: 3, title: 'Generate & Copy', desc: 'Compute hashes or tokens and copy them directly to your clipboard.' }
      ],
      features: ['Native browser Web Crypto API (crypto.subtle)', 'Calculates SHA-1, SHA-256, SHA-384, SHA-512, and MD5 hashes', 'Base64 encoder and decoder with UTF-8 support', 'Cryptographically random password generator with entropy indicator'],
      tips: ['For sensitive passwords, always aim for at least 16 characters with mixed symbols and numbers to ensure over 90 bits of entropy.'],
      faqs: [
        { question: 'Are generated passwords sent over the network?', answer: 'Never! Passwords and hashes are generated using window.crypto.getRandomValues locally on your device.' }
      ]
    }
  },

  // 23 Regex & Code Utilities
  {
    id: 'regex-studio',
    slug: 'regex-studio',
    name: 'Interactive Regex Studio',
    shortDescription: 'Test and debug regular expressions in real-time with match highlighting, capture group extraction, replace simulation, and common regex presets.',
    workspaceId: '23-regex-code',
    route: '/tool/regex-studio',
    iconName: 'Brackets',
    category: 'Regex Sandbox',
    tags: ['regex', 'regular expression', 'regex tester', 'pattern match'],
    keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'regex cheatsheet'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['json-studio', 'security-hash-studio'],
    seo: {
      title: 'Interactive Regex Studio — Live Regular Expression Tester',
      h1: 'Interactive Regex Studio',
      metaDescription: 'Debug regular expressions with real-time match highlighting, capture group breakdown, regex flags (g, i, m, s), and verified pattern presets.',
      howItWorks: [
        { step: 1, title: 'Enter Regular Expression', desc: 'Type your regex pattern and select flags (Global, Case-Insensitive, Multiline).' },
        { step: 2, title: 'Provide Test String', desc: 'Paste the target text you want to evaluate against the pattern.' },
        { step: 3, title: 'Inspect Matches', desc: 'Review highlighted matches, character indices, capture groups, or run replacement text.' }
      ],
      features: ['Live regex evaluation with instant syntax error catching', 'Preset library for Email, URL, IPv4, Phone, and Dates', 'Full capture group breakdown table', 'String replacement simulation with $1 capture token support'],
      tips: ['Remember to enable the "g" (global) flag if you want to find all occurrences rather than just stopping at the first match.'],
      faqs: [
        { question: 'Which regex dialect does this tool support?', answer: 'This tool uses ECMAScript (JavaScript) regular expression specifications supported by modern web standards.' }
      ]
    }
  },

  // 26 Color & Design Tools
  {
    id: 'color-studio',
    slug: 'color-studio',
    name: 'Color & Design Studio',
    shortDescription: 'Convert between HEX, RGB, HSL, and CMYK, test WCAG AA/AAA accessibility contrast ratios, generate harmonious palettes, and build CSS gradients.',
    workspaceId: '26-color-design',
    route: '/tool/color-studio',
    iconName: 'Palette',
    category: 'Converters',
    tags: ['color converter', 'wcag contrast', 'palette', 'css gradient', 'design'],
    keywords: ['color picker', 'wcag contrast checker', 'color palette generator', 'hex to rgb'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['visiting-card-builder', 'image-editor-studio'],
    seo: {
      title: 'Color & Design Studio — WCAG Contrast Checker & Palette Studio',
      h1: 'Color & Design Studio',
      metaDescription: 'Verify WCAG AA and AAA color contrast accessibility compliance, convert between HEX, RGB, HSL, and CMYK formats, and generate CSS gradients.',
      howItWorks: [
        { step: 1, title: 'Pick Colors', desc: 'Select or input text foreground and background colors.' },
        { step: 2, title: 'Check Accessibility', desc: 'Instantly view the mathematical contrast ratio and WCAG 2.1 Pass/Fail status.' },
        { step: 3, title: 'Explore Harmonious Schemes', desc: 'Generate complementary, analogous, and monochromatic color palettes or CSS gradients.' }
      ],
      features: ['WCAG 2.1 AA (4.5:1) and AAA (7:1) contrast ratio calculation', 'Simultaneous HEX, RGB, HSL, and CMYK color conversion', 'Harmonious palette generator (Complementary, Analogous, Triadic)', 'Interactive CSS linear gradient builder with copyable code'],
      tips: ['For body text, WCAG AA requires a minimum contrast ratio of 4.5:1. Large text (18pt+) requires 3:1.'],
      faqs: [
        { question: 'What is WCAG contrast compliance?', answer: 'The Web Content Accessibility Guidelines (WCAG) define minimum luminosity contrast ratios to ensure content is readable for users with visual impairments.' }
      ]
    }
  },

  // 33 UAE Tools
  {
    id: 'uae-gratuity-calculator',
    slug: 'uae-gratuity-calculator',
    name: 'UAE End-of-Service Gratuity Calculator',
    shortDescription: 'Official UAE Labor Law End-of-Service Gratuity Calculator compliant with UAE Federal Decree-Law No. 33 of 2021 for limited and unlimited contracts.',
    workspaceId: '33-uae-tools',
    route: '/tool/uae-gratuity-calculator',
    iconName: 'Building2',
    category: 'UAE Legal & Labor',
    tags: ['uae gratuity', 'uae labor law', 'end of service', 'uae severance', 'dubai labor'],
    keywords: ['uae gratuity calculator', 'dubai end of service calculator', 'uae labor law gratuity'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['loan-emi-calculator', 'uae-vat-calculator'],
    seo: {
      title: 'UAE Gratuity Calculator — End of Service Severance Pay Calculation',
      h1: 'Official UAE End-of-Service Gratuity Calculator',
      metaDescription: 'Calculate UAE End-of-Service Gratuity based on the latest UAE Labor Law (Decree-Law No. 33 of 2021). Accurate severance calculation for employees in Dubai and Abu Dhabi.',
      howItWorks: [
        { step: 1, title: 'Enter Basic Monthly Salary', desc: 'Specify your monthly basic wage in AED (excluding housing, transport, or allowances).' },
        { step: 2, title: 'Input Period of Service', desc: 'Enter exact service duration in years, months, and days.' },
        { step: 3, title: 'Select Termination Type', desc: 'Specify whether resignation or termination to view legal gratuity entitlement.' }
      ],
      features: ['Strict adherence to UAE Federal Decree-Law No. 33 of 2021', '21 days basic pay per year for the first 5 years of service', '30 days basic pay per year for each additional year beyond 5 years', 'Caps maximum severance at 2 years total basic salary as mandated by law'],
      tips: ['UAE gratuity is calculated strictly on your Basic Salary, not your Total Gross Package including allowances.'],
      faqs: [
        { question: 'Is an employee entitled to gratuity if they worked less than 1 year?', answer: 'Under UAE Labor Law, employees who have completed less than 1 full year of continuous service are not entitled to end-of-service gratuity.' },
        { question: 'What is the maximum gratuity cap?', answer: 'Article 51 stipulates that the total gratuity amount must not exceed two years\' basic salary.' }
      ]
    }
  },
  {
    id: 'uae-vat-calculator',
    slug: 'uae-vat-calculator',
    name: 'UAE 5% VAT Calculator',
    shortDescription: 'Calculate UAE 5% Value Added Tax for tax-inclusive and tax-exclusive commercial invoices with instant VAT amount separation.',
    workspaceId: '33-uae-tools',
    route: '/tool/uae-vat-calculator',
    iconName: 'Percent',
    category: 'Taxation',
    tags: ['uae vat', '5% vat', 'tax invoice', 'dubai tax', 'vat calculator'],
    keywords: ['uae vat calculator', 'dubai 5% vat', 'calculate vat uae', 'vat inclusive exclusive'],
    status: 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['uae-gratuity-calculator', 'loan-emi-calculator'],
    seo: {
      title: 'UAE 5% VAT Calculator — Tax Inclusive and Exclusive Calculator',
      h1: 'UAE 5% VAT Calculator',
      metaDescription: 'Compute 5% UAE Value Added Tax (VAT) on invoices. Calculate forward (adding VAT) or reverse (extracting VAT from gross amounts) in AED.',
      howItWorks: [
        { step: 1, title: 'Enter Amount (AED)', desc: 'Enter the financial transaction amount in United Arab Emirates Dirhams.' },
        { step: 2, title: 'Choose Calculation Mode', desc: 'Select "Add VAT (Exclusive)" or "Extract VAT (Inclusive)".' },
        { step: 3, title: 'Get Breakdown', desc: 'View net amount, 5% VAT portion, and total payable.' }
      ],
      features: ['Official 5% standard UAE VAT rate', 'Reverse VAT extraction formula: Gross / 1.05', 'Two-decimal monetary currency formatting in AED'],
      tips: ['To extract 5% VAT from a gross total, divide the gross amount by 1.05 to determine the pre-tax base.'],
      faqs: [
        { question: 'What is the standard VAT rate in the United Arab Emirates?', answer: 'The standard VAT rate enacted by the UAE Federal Tax Authority (FTA) is 5%.' }
      ]
    }
  },

  // 11 Text & Writing Tools
  {
    id: 'text-metrics-analyzer',
    slug: 'text-metrics-analyzer',
    name: 'Text Metrics & Word Counter',
    shortDescription: 'Analyze word count, character count (with/without spaces), sentences, paragraphs, reading time, speaking time, and case transformations.',
    workspaceId: '11-text-writing',
    route: '/tool/text-metrics-analyzer',
    iconName: 'Type',
    category: 'Metrics',
    tags: ['word counter', 'character count', 'reading time', 'case converter', 'text metrics'],
    keywords: ['word counter', 'character count online', 'reading time calculator', 'text analyzer'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['json-studio', 'regex-studio'],
    seo: {
      title: 'Text Metrics & Word Counter — Real-Time Character & Reading Time Tool',
      h1: 'Text Metrics & Word Counter Studio',
      metaDescription: 'Count words, characters, sentences, paragraphs, and estimate reading and speaking duration with instant case transformations.',
      howItWorks: [
        { step: 1, title: 'Paste Text', desc: 'Type or paste your manuscript, blog post, or essay into the text box.' },
        { step: 2, title: 'Review Metrics', desc: 'Check words, characters, reading speed, and top keyword frequencies.' },
        { step: 3, title: 'Transform Case', desc: 'Convert string to UPPERCASE, lowercase, Title Case, camelCase, or slug.' }
      ],
      features: ['Live counts for words, characters, sentences, and paragraphs', 'Estimated reading time (based on 200 WPM) and speaking time (130 WPM)', 'One-click case transformations (Title Case, UPPERCASE, lowercase, camelCase, kebab-case)', 'Top keyword density breakdown'],
      tips: ['Standard web reading speeds average roughly 200-250 words per minute.'],
      faqs: [
        { question: 'Are words counted in other languages?', answer: 'Yes! The word separator correctly handles Unicode words, European languages, Arabic, and numbers.' }
      ]
    }
  },

  // 18 Unit & Measurement Converter
  {
    id: 'universal-unit-converter',
    slug: 'universal-unit-converter',
    name: 'Universal Unit & Measurement Converter',
    shortDescription: 'Convert between metric and imperial systems across length, weight/mass, digital storage, temperature, speed, area, and time.',
    workspaceId: '18-unit-converter',
    route: '/tool/universal-unit-converter',
    iconName: 'Scale',
    category: 'Length & Area',
    tags: ['unit converter', 'metric converter', 'length', 'weight', 'temperature', 'storage'],
    keywords: ['unit converter', 'measurement converter', 'meters to feet', 'kg to lbs'],
    status: 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: ['loan-emi-calculator', 'uae-vat-calculator'],
    seo: {
      title: 'Universal Unit & Measurement Converter — Metric & Imperial Conversion',
      h1: 'Universal Unit & Measurement Converter',
      metaDescription: 'Convert measurements between metric and imperial units across Length, Mass, Digital Storage, Temperature, and Speed with exact precision.',
      howItWorks: [
        { step: 1, title: 'Select Dimension Category', desc: 'Choose Length, Weight/Mass, Digital Data, Temperature, or Speed.' },
        { step: 2, title: 'Input Value & Units', desc: 'Enter the quantity and choose source and target units.' },
        { step: 3, title: 'View Converted Result', desc: 'View conversion result with full conversion formula reference.' }
      ],
      features: ['5 major conversion dimensions with 40+ units', 'Instant bidirectional input synchronization', 'Scientific notation support for very large and tiny numbers'],
      tips: ['Bookmark this tool for quick conversions between Celsius and Fahrenheit or Kilograms and Pounds.'],
      faqs: [
        { question: 'How is digital data converted?', answer: 'We follow standard binary prefix (1024 bytes = 1 KB) as well as decimal standards.' }
      ]
    }
  },

  // 06 Document Converter Tools
  {
    id: 'markdown-to-html',
    slug: 'markdown-to-html',
    name: 'Markdown & Document Converter Studio',
    shortDescription: 'Convert between Markdown, HTML, and sanitized plain text with instant live rendering, syntax highlighting, and file download.',
    workspaceId: '06-doc-converter',
    route: '/tool/markdown-to-html',
    iconName: 'FileCode',
    category: 'Markdown',
    tags: ['markdown', 'html', 'converter', 'document'],
    keywords: ['markdown to html', 'html to markdown', 'md converter', 'document converter'],
    status: 'active',
    isPopular: true,
    isFeatured: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Markdown to HTML & Document Converter — Free Online Studio',
      h1: 'Markdown to HTML Converter Studio',
      metaDescription: 'Convert Markdown to HTML with live preview, GitHub-flavored styling, and one-click file download. 100% private in-browser tool.',
      howItWorks: [
        { step: 1, title: 'Input Content', desc: 'Type or paste Markdown or HTML in the left editor pane.' },
        { step: 2, title: 'Choose Mode', desc: 'Select Markdown to HTML or HTML to Markdown.' },
        { step: 3, title: 'Export', desc: 'Copy formatted output or download file.' }
      ],
      features: ['Bidirectional Markdown <-> HTML conversion', 'XSS-sanitized live rendering preview', 'One-click copy and export'],
      tips: ['Supports standard GitHub Flavored Markdown including tables, task lists, and code blocks.'],
      faqs: [
        { question: 'Is my document private?', answer: 'Yes! All parsing runs locally in your browser with zero server transmission.' }
      ]
    }
  },

  // 07 File Utilities
  {
    id: 'file-checksum-calc',
    slug: 'file-checksum-calculator',
    name: 'File Checksum & Magic Bytes Inspector',
    shortDescription: 'Compute SHA-256 and MD5 cryptographic checksums for any local file and inspect real binary magic bytes signatures.',
    workspaceId: '07-file-utilities',
    route: '/tool/file-checksum-calculator',
    iconName: 'Archive',
    category: 'Checksums',
    tags: ['checksum', 'sha256', 'hash', 'magic bytes', 'mime'],
    keywords: ['file checksum calculator', 'file hash', 'sha256 file hash', 'magic bytes'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'File Checksum & Magic Bytes Inspector — Web Crypto Hash Tool',
      h1: 'File Checksum & Magic Byte Studio',
      metaDescription: 'Calculate hardware-accelerated SHA-256 file checksums and verify binary magic bytes signatures locally in your browser.',
      howItWorks: [
        { step: 1, title: 'Select File', desc: 'Drop any file up to 2GB to inspect.' },
        { step: 2, title: 'Compute Checksum', desc: 'Web Crypto API computes exact cryptographic hash.' },
        { step: 3, title: 'Inspect Magic Bytes', desc: 'View initial hex header bytes and verified MIME format.' }
      ],
      features: ['Hardware-accelerated Web Crypto API', 'Magic byte binary header inspection', 'No file uploads required'],
      tips: ['Use SHA-256 checksums to verify downloaded installers against publisher hash signatures.'],
      faqs: [
        { question: 'Does the file upload to a server?', answer: 'No! The file is read chunk-by-chunk in local browser memory.' }
      ]
    }
  },

  // 08 Video Tools
  {
    id: 'video-frame-grabber',
    slug: 'video-frame-grabber',
    name: 'Video Frame Grabber & Aspect Studio',
    shortDescription: 'Extract uncompressed full-resolution still frames from MP4, WebM, and MOV videos with frame-by-frame precision and aspect ratio calculation.',
    workspaceId: '08-video-tools',
    route: '/tool/video-frame-grabber',
    iconName: 'Video',
    category: 'Capture',
    tags: ['video', 'frame grabber', 'aspect ratio', 'video frame'],
    keywords: ['video frame grabber', 'extract frame from video', 'video to image', 'aspect ratio'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Video Frame Grabber & Aspect Studio — High-Res Frame Capture',
      h1: 'Video Frame Grabber & Aspect Studio',
      metaDescription: 'Extract crystal-clear still photos from video files frame-by-frame locally in your browser. Download high-res PNG stills with zero quality loss.',
      howItWorks: [
        { step: 1, title: 'Load Video', desc: 'Select any local video file (MP4, WebM, MOV).' },
        { step: 2, title: 'Seek Timestamp', desc: 'Use slider or frame step buttons (1/30s) to find target frame.' },
        { step: 3, title: 'Capture & Export', desc: 'Grab full-resolution frame and download PNG.' }
      ],
      features: ['Pixel-perfect canvas frame extraction', '1/30th second frame stepping', 'Aspect ratio and dimension inspector'],
      tips: ['Use frame-stepping to capture the exact split second of an action shot without motion blur.'],
      faqs: [
        { question: 'Is video compressed when extracting frames?', answer: 'No! The frame is drawn directly from the HTML5 video element at native pixel dimensions.' }
      ]
    }
  },

  // 09 Audio Tools
  {
    id: 'audio-tone-generator',
    slug: 'audio-tone-generator',
    name: 'Web Audio Synthesizer & Tone Studio',
    shortDescription: 'Generate pure frequency audio tones and calibrated binaural beats (Theta, Alpha, Beta) using the Web Audio API.',
    workspaceId: '09-audio-tools',
    route: '/tool/audio-tone-generator',
    iconName: 'Volume2',
    category: 'Synthesizer',
    tags: ['audio', 'tone generator', 'frequency', 'binaural beats', 'synth'],
    keywords: ['tone generator', 'frequency generator', 'binaural beats generator', 'sound test'],
    status: 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Audio Tone Generator & Binaural Beats — Web Audio API Studio',
      h1: 'Audio Tone Generator & Synthesizer',
      metaDescription: 'Generate precise acoustic frequencies from 20 Hz to 20 kHz with Sine, Square, and Sawtooth waveforms and stereo binaural beats.',
      howItWorks: [
        { step: 1, title: 'Select Frequency', desc: 'Choose target pitch in Hz or pick musical presets.' },
        { step: 2, title: 'Choose Waveform', desc: 'Pick Sine, Square, Sawtooth, or Triangle shape.' },
        { step: 3, title: 'Play Tone', desc: 'Web Audio API synthesizes crystal-clear audio in real time.' }
      ],
      features: ['Pure Web Audio API oscillator synthesis', 'Binaural beats stereo panner engine', 'Musical note presets (A440, Solfeggio)'],
      tips: ['Stereo headphones are required for binaural beats to generate the target brainwave synchronization.'],
      faqs: [
        { question: 'What is a 440 Hz tone?', answer: '440 Hz is the standard orchestral pitch reference for the note A above middle C (A4).' }
      ]
    }
  },

  // 10 OCR & Scanner
  {
    id: 'document-scanner-prep',
    slug: 'document-scanner-prep',
    name: 'Document & Receipt Scanner Studio',
    shortDescription: 'Clean paper camera photos, boost ink contrast, remove background shadows, and export crisp B&W documents or PDF files.',
    workspaceId: '10-ocr-scanner',
    route: '/tool/document-scanner-prep',
    iconName: 'Scan',
    category: 'Scanner',
    tags: ['document scanner', 'receipt scanner', 'contrast boost', 'scan to pdf'],
    keywords: ['document scanner online', 'receipt cleaner', 'scan to pdf', 'photo to document'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Document & Receipt Scanner Studio — Clean & Enhance Scans',
      h1: 'Document & Receipt Scanner Studio',
      metaDescription: 'Turn phone photos of papers and receipts into sharp black & white scanned documents. Export clean PNG or multi-page PDF.',
      howItWorks: [
        { step: 1, title: 'Upload Photo', desc: 'Take or upload a photo of a document, invoice, or receipt.' },
        { step: 2, title: 'Apply Filter', desc: 'Choose Crisp B&W, Paper Boost, or Grayscale with custom threshold.' },
        { step: 3, title: 'Export', desc: 'Download enhanced document image or export as PDF.' }
      ],
      features: ['High-contrast Otsu threshold filter', '90-degree rotation adjustment', 'Direct PDF export using pdf-lib'],
      tips: ['Position documents against a contrasting background under even lighting for best results.'],
      faqs: [
        { question: 'Is OCR performed on a remote server?', answer: 'No! All pixel thresholding and PDF bundling run 100% locally on your device.' }
      ]
    }
  },

  // 12 AI Text Tools
  {
    id: 'readability-score-calc',
    slug: 'readability-score-calculator',
    name: 'Deterministic Text Readability & Linguistic Analyzer',
    shortDescription: 'Evaluate Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, and Coleman-Liau indexes via client-side algorithms.',
    workspaceId: '12-ai-text',
    route: '/tool/readability-score-calculator',
    iconName: 'Sparkles',
    category: 'Readability',
    tags: ['readability', 'flesch kincaid', 'gunning fog', 'linguistics'],
    keywords: ['readability calculator', 'flesch reading ease', 'grade level calculator', 'text readability'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Text Readability Score Calculator — Flesch-Kincaid & Gunning Fog',
      h1: 'Text Readability & Linguistic Analyzer',
      metaDescription: 'Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog index with deterministic linguistic algorithms.',
      howItWorks: [
        { step: 1, title: 'Paste Text', desc: 'Paste article, essay, or copy into the editor.' },
        { step: 2, title: 'Analyze', desc: 'Linguistic algorithm counts syllables, words, and complex sentences.' },
        { step: 3, title: 'Review Grade', desc: 'View Flesch score, school grade level, and reading ease interpretation.' }
      ],
      features: ['Flesch Reading Ease (0-100 scale)', 'Flesch-Kincaid Grade Level', 'Gunning Fog and Coleman-Liau indexes'],
      tips: ['Target a Flesch score of 60-70 for general public website content.'],
      faqs: [
        { question: 'Are AI models used to score readability?', answer: 'No. Readability scoring follows strict, standardized mathematical formulas.' }
      ]
    }
  },

  // 13 AI Prompt Engineering
  {
    id: 'prompt-builder-studio',
    slug: 'prompt-builder-studio',
    name: 'Structured System Prompt Architect & Token Estimator',
    shortDescription: 'Architect modular LLM system instructions with explicit role boundaries, negative constraints, and live token expenditure estimation.',
    workspaceId: '13-ai-prompt',
    route: '/tool/prompt-builder-studio',
    iconName: 'Terminal',
    category: 'Prompt Engineering',
    tags: ['prompt builder', 'system prompt', 'llm', 'token estimator'],
    keywords: ['system prompt generator', 'prompt builder', 'token counter', 'prompt architect'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Structured System Prompt Architect & Token Estimator — LLM Studio',
      h1: 'Structured System Prompt Architect',
      metaDescription: 'Build structured system instructions for AI models with role personas, constraints, context variables, and live token estimates.',
      howItWorks: [
        { step: 1, title: 'Define Persona', desc: 'Set role, tone, and operational boundaries.' },
        { step: 2, title: 'Set Constraints', desc: 'Add strict negative rules and output format requirements.' },
        { step: 3, title: 'Copy Prompt', desc: 'One-click copy the compiled prompt ready for API or playground.' }
      ],
      features: ['Structured role-objective-constraint schema', 'Live BPE token count estimator', 'Context variable parameter injection'],
      tips: ['Explicit negative constraints ("Do not...") significantly reduce hallucination in production LLMs.'],
      faqs: [
        { question: 'How is token count estimated?', answer: 'We use the standard 4-character-per-token English linguistic heuristic.' }
      ]
    }
  },

  // 15 Business Calculators
  {
    id: 'margin-markup-calc',
    slug: 'margin-markup-calculator',
    name: 'Business & Unit Economics Studio',
    shortDescription: 'Calculate gross profit margins, markups, break-even unit sales volume, and customer acquisition cost to LTV ratios.',
    workspaceId: '15-business-calc',
    route: '/tool/margin-markup-calculator',
    iconName: 'TrendingUp',
    category: 'Profitability',
    tags: ['margin calculator', 'markup', 'breakeven', 'cac ltv', 'business'],
    keywords: ['profit margin calculator', 'markup calculator', 'break even calculator', 'cac ltv ratio'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Business Calculators — Profit Margin, Markup & Break-Even Studio',
      h1: 'Business & Unit Economics Studio',
      metaDescription: 'Calculate gross profit margins, cost markups, break-even unit sales, and SaaS LTV:CAC unit economics with financial precision.',
      howItWorks: [
        { step: 1, title: 'Select Tool', desc: 'Choose Margin/Markup, Break-Even, or CAC:LTV ratio.' },
        { step: 2, title: 'Enter Numbers', desc: 'Provide cost of goods, selling price, and fixed expenses.' },
        { step: 3, title: 'Analyze Metrics', desc: 'Inspect profit percentages and sustainable health benchmarks.' }
      ],
      features: ['Instant margin vs markup dual synchronization', 'Break-even unit volume and revenue formula', 'SaaS LTV to CAC health ratio benchmarks'],
      tips: ['Remember: Margin is calculated on selling price, while Markup is calculated on cost price.'],
      faqs: [
        { question: 'What is a good LTV:CAC ratio?', answer: 'A 3:1 (3x) ratio is generally considered the gold standard benchmark for sustainable businesses.' }
      ]
    }
  },

  // 16 Health & Fitness
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'Health & Caloric Fitness Calculator Studio',
    shortDescription: 'Calculate accurate Body Mass Index (BMI), Mifflin-St Jeor Basal Metabolic Rate (BMR), TDEE calories, and hydration intake.',
    workspaceId: '16-health-fitness',
    route: '/tool/bmi-calculator',
    iconName: 'Activity',
    category: 'Body Metrics',
    tags: ['bmi calculator', 'bmr', 'tdee', 'calorie calculator', 'health'],
    keywords: ['bmi calculator', 'bmr calculator', 'tdee calculator', 'daily calories'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'BMI, BMR & TDEE Health Calculator — Metric & Imperial Studio',
      h1: 'Health & Caloric Fitness Calculator Studio',
      metaDescription: 'Calculate accurate BMI with WHO classifications, Mifflin-St Jeor BMR, and total daily energy expenditure (TDEE) calories.',
      howItWorks: [
        { step: 1, title: 'Enter Demographics', desc: 'Select gender, age, height, and weight in metric or imperial.' },
        { step: 2, title: 'Set Activity', desc: 'Choose your weekly exercise level.' },
        { step: 3, title: 'View Metrics', desc: 'Check BMI, maintenance calories (TDEE), and daily water needs.' }
      ],
      features: ['Mifflin-St Jeor energy expenditure formula', 'WHO international BMI classifications', 'Metric and Imperial unit support'],
      tips: ['To lose roughly 1 lb of fat per week, aim for a 500 kcal deficit below your TDEE.'],
      faqs: [
        { question: 'What is BMR vs TDEE?', answer: 'BMR is calories burned at complete rest; TDEE includes movement, digestion, and workouts.' }
      ]
    }
  },

  // 17 Date & Time
  {
    id: 'age-calculator-exact',
    slug: 'age-calculator-exact',
    name: 'Date, Time & Working Days Studio',
    shortDescription: 'Calculate exact chronological age in years, months, and days, count business working days between dates, and convert Unix epoch timestamps.',
    workspaceId: '17-date-time',
    route: '/tool/age-calculator-exact',
    iconName: 'Clock',
    category: 'Calculators',
    tags: ['age calculator', 'business days', 'working days', 'unix timestamp'],
    keywords: ['age calculator', 'working days calculator', 'business days calculator', 'epoch timestamp'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Exact Age, Business Days & Epoch Timestamp Calculator Studio',
      h1: 'Date, Time & Working Days Studio',
      metaDescription: 'Calculate exact age down to the day, calculate business working days excluding weekends, and convert Unix epoch timestamps.',
      howItWorks: [
        { step: 1, title: 'Select Tool', desc: 'Choose Chronological Age, Business Days, or Epoch Timestamp.' },
        { step: 2, title: 'Input Dates', desc: 'Enter birthdate, project timeline range, or epoch number.' },
        { step: 3, title: 'Get Result', desc: 'View precise day counts, next birthday, or converted ISO date.' }
      ],
      features: ['Exact year/month/day calendar calculation', 'Business working day counter excluding Saturdays & Sundays', 'Live global world time clocks'],
      tips: ['The business day counter is essential for calculating contractual deadlines and SLAs.'],
      faqs: [
        { question: 'What is a Unix epoch timestamp?', answer: 'The number of seconds that have elapsed since January 1, 1970 00:00:00 UTC.' }
      ]
    }
  },

  // 19 Currency & Money
  {
    id: 'currency-converter-studio',
    slug: 'currency-converter-studio',
    name: 'Currency, Tip & Cash Denomination Studio',
    shortDescription: 'Currency exchange calculations with reference rates, restaurant tip and bill splitting, and physical cash denomination counting.',
    workspaceId: '19-currency-money',
    route: '/tool/currency-converter-studio',
    iconName: 'Coins',
    category: 'Exchange Rates',
    tags: ['currency converter', 'tip calculator', 'split bill', 'cash counter'],
    keywords: ['currency converter', 'tip calculator', 'split bill calculator', 'cash denomination counter'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Currency Exchange, Tip & Cash Denomination Studio — Free Converter',
      h1: 'Currency, Tip & Cash Denomination Studio',
      metaDescription: 'Convert currencies with transparent reference rates and custom overrides, calculate restaurant tips, split bills, and tally cash register bills.',
      howItWorks: [
        { step: 1, title: 'Choose Mode', desc: 'Select Currency Exchange, Tip & Bill Splitter, or Cash Counter.' },
        { step: 2, title: 'Enter Values', desc: 'Enter money amounts, currencies, gratuity percentages, or bill quantities.' },
        { step: 3, title: 'Get Breakdown', desc: 'View converted amount or per-person bill share.' }
      ],
      features: ['Transparent reference baseline exchange rates with custom rate override', 'Tip percentage presets with per-person breakdown', 'Cash register denomination tally'],
      tips: ['Enter a custom rate override if you have an exact bank or exchange booth rate.'],
      faqs: [
        { question: 'Are exchange rates guaranteed real-time?', answer: 'Rates shown are static reference rates. Use the Custom Rate Override field for exact real-time precision.' }
      ]
    }
  },

  // 22 Web Code Tools
  {
    id: 'html-formatter-minifier',
    slug: 'html-formatter-minifier',
    name: 'Web Code Minifier, Formatter & SVG Studio',
    shortDescription: 'Minify and optimize HTML, CSS, and clean raw SVG markup with live vector rendering and byte savings calculation.',
    workspaceId: '22-web-code',
    route: '/tool/html-formatter-minifier',
    iconName: 'Layers',
    category: 'HTML',
    tags: ['html minifier', 'css minifier', 'svg cleaner', 'web code'],
    keywords: ['html minifier', 'css minifier', 'svg optimizer', 'web code cleaner'],
    status: 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'HTML & CSS Minifier, SVG Cleaner Studio — Web Optimization',
      h1: 'Web Code Minifier & SVG Studio',
      metaDescription: 'Compress HTML, minify CSS stylesheets, and clean redundant SVG vector markup with instant live rendering preview.',
      howItWorks: [
        { step: 1, title: 'Paste Code', desc: 'Paste HTML, CSS, or SVG code into the editor.' },
        { step: 2, title: 'Minify', desc: 'Whitespace, comments, and redundant characters are stripped.' },
        { step: 3, title: 'Export', desc: 'Copy minified code or download optimized asset.' }
      ],
      features: ['Percentage file size savings indicator', 'Live rendered SVG preview', 'Clean copyable code outputs'],
      tips: ['Minifying HTML and CSS reduces network payload and improves Core Web Vitals.'],
      faqs: [
        { question: 'Does minification break code execution?', answer: 'No. Minification strictly removes non-functional whitespace and comments while preserving syntax logic.' }
      ]
    }
  },

  // 24 SEO Tools
  {
    id: 'serp-meta-previewer',
    slug: 'serp-meta-previewer',
    name: 'SEO SERP & OpenGraph Social Preview Studio',
    shortDescription: 'Simulate Google desktop and mobile search engine snippets, preview social media Open Graph cards, and generate clean robots.txt files.',
    workspaceId: '24-seo-tools',
    route: '/tool/serp-meta-previewer',
    iconName: 'Search',
    category: 'SERP Preview',
    tags: ['seo', 'serp preview', 'opengraph', 'robots.txt', 'meta tags'],
    keywords: ['serp preview tool', 'google search simulator', 'open graph preview', 'robots txt generator'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'Google SERP Preview & OpenGraph Social Card Studio — SEO Tools',
      h1: 'SEO SERP & OpenGraph Social Preview Studio',
      metaDescription: 'Preview how your website appears on Google search results and social cards. Monitor title and description character lengths.',
      howItWorks: [
        { step: 1, title: 'Enter Metadata', desc: 'Type your page title, meta description, and URL.' },
        { step: 2, title: 'Review Snippet', desc: 'Check Google desktop/mobile simulation and length warnings.' },
        { step: 3, title: 'Test Social Card', desc: 'Preview Twitter, LinkedIn, and Discord card appearance.' }
      ],
      features: ['Google desktop and mobile simulated snippets', 'Character length meters (60 chars for title, 160 for description)', 'Interactive robots.txt generator'],
      tips: ['Keep page titles under 60 characters to avoid truncation by Google in search results.'],
      faqs: [
        { question: 'Why is meta description length important?', answer: 'Google typically truncates descriptions longer than 155-160 characters on desktop displays.' }
      ]
    }
  },

  // 26 & 29 Color & CSS Design
  {
    id: 'css-gradient-builder',
    slug: 'css-gradient-builder',
    name: 'CSS Visual Effects, Gradient & Glass Studio',
    shortDescription: 'Design multi-stop linear and radial CSS gradients, layered drop shadows, and modern frosted glassmorphism cards with one-click CSS export.',
    workspaceId: '26-color-design',
    route: '/tool/css-gradient-builder',
    iconName: 'Palette',
    category: 'Gradients',
    tags: ['css gradient', 'box shadow', 'glassmorphism', 'css generator'],
    keywords: ['css gradient generator', 'box shadow generator', 'glassmorphism generator', 'css studio'],
    status: 'active',
    isPopular: true,
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'CSS Gradient, Box Shadow & Glassmorphism Studio — CSS Generator',
      h1: 'CSS Visual Effects & Gradient Studio',
      metaDescription: 'Generate beautiful CSS gradients, layered box shadows, and frosted glassmorphism styles with live interactive preview and instant copy.',
      howItWorks: [
        { step: 1, title: 'Choose Effect', desc: 'Select CSS Gradients, Box Shadows, or Glassmorphism.' },
        { step: 2, title: 'Customize Visuals', desc: 'Adjust color stops, angle, blur, and opacity.' },
        { step: 3, title: 'Copy CSS', desc: 'One-click copy the generated CSS rules directly into your stylesheet.' }
      ],
      features: ['Linear, radial, and conic gradient generators', 'Complex layered box shadow controls', 'Modern backdrop-filter glassmorphism generator'],
      tips: ['Combine subtle backdrop-blur with low-opacity white backgrounds for modern UI cards.'],
      faqs: [
        { question: 'Is the generated CSS cross-browser compatible?', answer: 'Yes! Standard vendor-prefixed CSS rules are generated for maximum browser compatibility.' }
      ]
    }
  },

  // 30 Education & Student Tools
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    name: 'STEM Mathematics & Study Flashcards Studio',
    shortDescription: 'Solve quadratic polynomial equations, compute step-by-step fraction reductions, and study with interactive digital flashcards.',
    workspaceId: '30-education-student',
    route: '/tool/gpa-calculator',
    iconName: 'GraduationCap',
    category: 'Grades',
    tags: ['quadratic solver', 'fractions', 'flashcards', 'math study'],
    keywords: ['quadratic equation solver', 'fraction reducer', 'study flashcards', 'math tool'],
    status: 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    seo: {
      title: 'STEM Mathematics & Study Flashcards Studio — Quadratic & Fraction Tool',
      h1: 'STEM Mathematics & Study Flashcards Studio',
      metaDescription: 'Solve quadratic equations with discriminant analysis, simplify fractions with step-by-step reduction, and study flashcards.',
      howItWorks: [
        { step: 1, title: 'Select Tool', desc: 'Choose Quadratic Solver, Fraction Reducer, or Flashcards.' },
        { step: 2, title: 'Input Problem', desc: 'Enter quadratic coefficients (a, b, c) or fraction numbers.' },
        { step: 3, title: 'View Steps', desc: 'Inspect discriminant, roots, or simplified fraction values.' }
      ],
      features: ['Quadratic equation solver with real and complex roots', 'Fraction arithmetic (+, -, *, /) with GCD reduction', 'Interactive click-to-flip study flashcards'],
      tips: ['If the discriminant (b² - 4ac) is negative, the quadratic has two complex conjugate roots.'],
      faqs: [
        { question: 'Can I add my own flashcard questions?', answer: 'Yes, study flashcards run locally in your session.' }
      ]
    }
  }
];

/*
 * Workspaces are the source of truth for the complete public catalog. The
 * original registry contained only the first studio in many workspaces while
 * the workspace definitions already listed the rest of the real utilities.
 * Add those entries here from the existing workspace metadata so every
 * advertised route is discoverable and gets the same production renderer.
 */
const ACRONYMS: Record<string, string> = {
  ai: 'AI',
  ats: 'ATS',
  bmi: 'BMI',
  bmr: 'BMR',
  cac: 'CAC',
  csv: 'CSV',
  css: 'CSS',
  emi: 'EMI',
  gpa: 'GPA',
  html: 'HTML',
  json: 'JSON',
  ocr: 'OCR',
  pdf: 'PDF',
  qr: 'QR',
  roas: 'ROAS',
  seo: 'SEO',
  sip: 'SIP',
  svg: 'SVG',
  tdee: 'TDEE',
  tsv: 'TSV',
  uae: 'UAE',
  url: 'URL',
  utm: 'UTM',
  vat: 'VAT',
  wcag: 'WCAG',
  wifi: 'Wi-Fi',
  zip: 'ZIP',
};

function formatToolName(id: string): string {
  return id
    .split('-')
    .map((word) => ACRONYMS[word] || word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createAliasTool(id: string, workspaceId: string, source?: ToolDefinition): ToolDefinition {
  const workspace = WORKSPACES.find((item) => item.id === workspaceId);
  const name = formatToolName(id);
  const description = `${name} for ${workspace?.name || 'ToolNova'}. Processing runs locally in your browser.`;

  return {
    id,
    slug: id,
    name,
    shortDescription: description,
    workspaceId,
    route: `/tool/${id}`,
    iconName: source?.iconName || workspace?.iconName || 'Sparkles',
    category: source?.category || workspace?.categories[0] || 'Utilities',
    tags: source?.tags || [name.toLowerCase()],
    keywords: source?.keywords || [name.toLowerCase(), 'online utility'],
    status: source?.status || 'active',
    clientOnly: true,
    requiresBackend: false,
    requiresAI: false,
    relatedToolIds: source?.relatedToolIds,
    seo: {
      title: `${name} — ${workspace?.name || 'ToolNova'}`,
      h1: name,
      metaDescription: description,
      howItWorks: [
        { step: 1, title: 'Enter Your Data', desc: 'Provide the values or files needed by this utility.' },
        { step: 2, title: 'Process Locally', desc: 'The calculation or transformation runs directly in your browser.' },
        { step: 3, title: 'Review the Result', desc: 'Inspect the result and export or copy it when supported.' },
      ],
      features: [
        'Runs locally in the browser',
        'No account or server upload required',
        `Focused ${workspace?.name || 'utility'} workflow`,
      ],
      tips: ['Review generated output before using it in production or official documents.'],
      faqs: [
        {
          question: 'Are my inputs uploaded?',
          answer: 'No. This utility processes inputs locally in your browser.',
        },
      ],
    },
  };
}

const registeredToolIds = new Set(TOOLS.map((tool) => tool.id));
for (const workspace of WORKSPACES) {
  const source = TOOLS.find((tool) => tool.workspaceId === workspace.id);
  for (const toolId of workspace.toolIds) {
    if (!registeredToolIds.has(toolId)) {
      TOOLS.push(createAliasTool(toolId, workspace.id, source));
      registeredToolIds.add(toolId);
    }
  }
}

export const TOOL_MAP = new Map<string, ToolDefinition>(
  TOOLS.map(t => [t.id, t])
);

export const TOOL_SLUG_MAP = new Map<string, ToolDefinition>(
  TOOLS.map(t => [t.slug, t])
);
