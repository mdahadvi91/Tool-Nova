import { SupportedLocale } from '../registry/types';

export interface TranslationSchema {
  // Navigation & Shell
  brandName: string;
  tagline: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  workspaces: string;
  popularTools: string;
  featuredTools: string;
  allTools: string;
  howItWorks: string;
  usefulContent: string;
  faq: string;
  privacyBadge: string;
  clientSideExecution: string;
  exploreWorkspace: string;
  launchTool: string;
  backToWorkspaces: string;
  clientSidePrivacyNotice: string;
  footerRights: string;
  quickSearch: string;
  filterWorkspaces: string;
  allCategories: string;
  mediaAndDocs: string;
  devEngineering: string;
  financeBusiness: string;
  productivityUtils: string;
  platformStatus: string;
  ready: string;
  popular: string;

  // Actions & Buttons
  tryAgain: string;
  backToTools: string;
  goHome: string;
  browseWorkspaces: string;
  search: string;
  clear: string;
  reset: string;
  copy: string;
  copied: string;
  download: string;
  upload: string;
  dragDrop: string;
  generate: string;
  convert: string;
  calculate: string;
  process: string;
  share: string;
  preview: string;

  // Search Page
  searchPageTitle: string;
  searchPageSubtitle: string;
  searchResultsFor: string;
  noResultsFound: string;
  noResultsHint: string;
  toolsFound: string;
  workspacesFound: string;

  // 404 Page
  notFoundTitle: string;
  notFoundSubtitle: string;
  notFoundDesc: string;

  // Error States
  toolErrorTitle: string;
  toolErrorDesc: string;
  workspaceErrorTitle: string;
  workspaceErrorDesc: string;
  appErrorTitle: string;
  appErrorDesc: string;

  // Legal & Disclaimers
  privacyPolicy: string;
  termsOfService: string;
  cookiePreferences: string;
  disclaimer: string;
  sitemap: string;
  legalNoticeTitle: string;
  informationalNotice: string;
  uaeDisclaimer: string;

  // Features & Workflow
  proTipsTitle: string;
  recommendedWorkflowTitle: string;
  relatedToolsTitle: string;
}

export const TRANSLATIONS: Record<SupportedLocale, TranslationSchema> = {
  en: {
    brandName: 'ToolNova',
    tagline: 'All Your Tools. One Powerful Platform.',
    searchPlaceholder: 'Search 35 workspaces, utilities, and tools (e.g. PDF, QR, EMI, JSON)...',
    searchAriaLabel: 'Search tools and workspaces',
    workspaces: 'Workspaces',
    popularTools: 'Popular Utilities',
    featuredTools: 'Featured Studios',
    allTools: 'All Tools',
    howItWorks: 'How It Works',
    usefulContent: 'Why ToolNova?',
    faq: 'Frequently Asked Questions',
    privacyBadge: '100% Client-Side Execution — Zero File Retention',
    clientSideExecution: 'Client-Side Execution',
    exploreWorkspace: 'Explore Workspace',
    launchTool: 'Launch Studio',
    backToWorkspaces: 'Back to All Workspaces',
    clientSidePrivacyNotice: 'All calculations, document conversions, and image operations are executed directly inside your web browser. No private data or files are ever transmitted to remote servers.',
    footerRights: 'All rights reserved. Designed for privacy, performance, and accessibility.',
    quickSearch: 'Quick search tools...',
    filterWorkspaces: 'Filter 35 workspaces...',
    allCategories: 'All',
    mediaAndDocs: 'Media & Documents',
    devEngineering: 'Developer & Engineering',
    financeBusiness: 'Finance & Business',
    productivityUtils: 'Productivity & Utilities',
    platformStatus: 'All 35 Workspaces Operational',
    ready: 'Ready',
    popular: 'Popular',

    tryAgain: 'Try Again',
    backToTools: 'Back to Tools',
    goHome: 'Platform Home',
    browseWorkspaces: 'Browse Workspaces',
    search: 'Search',
    clear: 'Clear',
    reset: 'Reset',
    copy: 'Copy',
    copied: 'Copied!',
    download: 'Download',
    upload: 'Upload File',
    dragDrop: 'Drag and drop or click to upload',
    generate: 'Generate',
    convert: 'Convert',
    calculate: 'Calculate',
    process: 'Process',
    share: 'Share',
    preview: 'Preview',

    searchPageTitle: 'Search Platform Directory',
    searchPageSubtitle: 'Instantly find any studio, calculator, converter, or workspace among our 35 dedicated collections.',
    searchResultsFor: 'Search results for "{query}"',
    noResultsFound: 'No tools or workspaces matched your search',
    noResultsHint: 'Try searching by acronym (e.g. PDF, OCR, EMI, QR), general category, or keyword.',
    toolsFound: 'Tools & Studios Found',
    workspacesFound: 'Workspaces Found',

    notFoundTitle: 'Page Not Found',
    notFoundSubtitle: 'The requested page or tool route does not exist.',
    notFoundDesc: 'The studio URL may have moved or been updated. You can search the directory or return to the platform homepage.',

    toolErrorTitle: 'Something went wrong while loading this tool',
    toolErrorDesc: 'The studio encountered an unexpected runtime error. Your local environment and platform layout remain safe.',
    workspaceErrorTitle: 'Workspace Render Error',
    workspaceErrorDesc: 'We encountered an issue rendering this workspace collection. Please try reloading or return to the platform directory.',
    appErrorTitle: 'Application Encountered an Error',
    appErrorDesc: 'An unexpected component failure occurred. You can safely return to the home screen or refresh the page.',

    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePreferences: 'Cookie Preferences',
    disclaimer: 'Disclaimer',
    sitemap: 'HTML Sitemap',
    legalNoticeTitle: 'Informational Use Notice',
    informationalNotice: 'This platform provides client-side computational estimates for informational purposes. Results do not constitute certified legal, financial, or tax advisory opinions.',
    uaeDisclaimer: 'Calculations are estimates based on UAE Federal Decree-Law No. 33 of 2021 and standard tax guidelines. For official dispute adjudications, consult MOHRE or certified legal counsel.',

    proTipsTitle: 'Pro Tips for Best Results',
    recommendedWorkflowTitle: 'Recommended Workflow & Usage',
    relatedToolsTitle: 'Related Tools in This Workspace'
  },

  bn: {
    brandName: 'টুলনোভা',
    tagline: 'অল ইওর টুলস। ওয়ান পাওয়ারফুল প্ল্যাটফর্ম।',
    searchPlaceholder: '৩৫টি ওয়ার্কস্পেস এবং টুলস খুঁজুন (যেমন PDF, QR, ক্যালকুলেটর, JSON)...',
    searchAriaLabel: 'টুলস ও ওয়ার্কস্পেস অনুসন্ধান করুন',
    workspaces: 'ওয়ার্কস্পেসসমূহ',
    popularTools: 'জনপ্রিয় টুলস',
    featuredTools: 'বিশেষ স্টুডিও',
    allTools: 'সকল টুলস',
    howItWorks: 'কীভাবে কাজ করে',
    usefulContent: 'কেন টুলনোভা?',
    faq: 'সাধারণ প্রশ্নাবলী',
    privacyBadge: '১০০% ব্রাউজার ভিত্তিক প্রক্রিয়াকরণ — কোনো ফাইল সংরক্ষণ হয় না',
    clientSideExecution: 'সম্পূর্ণ ক্লায়েন্ট-সাইড এক্সিকিউশন',
    exploreWorkspace: 'ওয়ার্কস্পেস দেখুন',
    launchTool: 'স্টুডিও চালু করুন',
    backToWorkspaces: 'সকল ওয়ার্কস্পেসে ফিরে যান',
    clientSidePrivacyNotice: 'সমস্ত প্রক্রিয়াকরণ সম্পূর্ণ আপনার ব্রাউজারে সম্পাদিত হয়। আপনার কোনো নথি বা সংবেদনশীল ডেটা সার্ভারে আপলোড হয় না।',
    footerRights: 'সর্বস্বত্ব সংরক্ষিত। গোপনীয়তা, কর্মক্ষমতা ও সুরক্ষার জন্য নির্মিত।',
    quickSearch: 'দ্রুত অনুসন্ধান...',
    filterWorkspaces: '৩৫টি ওয়ার্কস্পেস ফিল্টার করুন...',
    allCategories: 'সকল',
    mediaAndDocs: 'মিডিয়া ও ডকুমেন্টস',
    devEngineering: 'ডেভেলপার ও ইঞ্জিনিয়ারিং',
    financeBusiness: 'ফাইন্যান্স ও বিজনেস',
    productivityUtils: 'উৎপাদনশীলতা ও উপযোগিতা',
    platformStatus: 'সকল ৩৫টি ওয়ার্কস্পেস সক্রিয়',
    ready: 'প্রস্তুত',
    popular: 'জনপ্রিয়',

    tryAgain: 'আবার চেষ্টা করুন',
    backToTools: 'টুলসে ফিরে যান',
    goHome: 'মূল পাতা',
    browseWorkspaces: 'ওয়ার্কস্পেসসমূহ দেখুন',
    search: 'অনুসন্ধান',
    clear: 'মুছুন',
    reset: 'রিসেট',
    copy: 'কপি',
    copied: 'কপি হয়েছে!',
    download: 'ডাউনলোড',
    upload: 'ফাইল আপলোড',
    dragDrop: 'ড্র্যাগ করুন অথবা ক্লিক করে ফাইল নির্বাচন করুন',
    generate: 'তৈরি করুন',
    convert: 'রূপান্তর করুন',
    calculate: 'হিসাব করুন',
    process: 'প্রক্রিয়াকরণ',
    share: 'শেয়ার',
    preview: 'প্রিভিউ',

    searchPageTitle: 'প্ল্যাটফর্ম ডিরেক্টরি খুঁজুন',
    searchPageSubtitle: 'আমাদের ৩৫টি বিশেষ ওয়ার্কস্পেসের মধ্যে যেকোনো টুল, ক্যালকুলেটর বা স্টুডিও মুহূর্তেই খুঁজুন।',
    searchResultsFor: '"{query}" এর অনুসন্ধান ফলাফল',
    noResultsFound: 'কোনো টুল বা ওয়ার্কস্পেস খুঁজে পাওয়া যায়নি',
    noResultsHint: 'সাধারণ শব্দ (যেমন PDF, QR, EMI, Image) দিয়ে পুনরায় চেষ্টা করুন।',
    toolsFound: 'পাওয়া টুলসসমূহ',
    workspacesFound: 'পাওয়া ওয়ার্কস্পেসসমূহ',

    notFoundTitle: 'পৃষ্ঠাটি পাওয়া যায়নি',
    notFoundSubtitle: 'অনুরোধকৃত টুল বা পৃষ্ঠাটি বিদ্যমান নেই।',
    notFoundDesc: 'লিংকটি সরানো হয়ে থাকতে পারে। আপনি ডিরেক্টরিতে অনুসন্ধান করতে পারেন বা মূল পাতায় ফিরে যেতে পারেন।',

    toolErrorTitle: 'এই টুলটি লোড করতে সমস্যা হয়েছে',
    toolErrorDesc: 'টুলটিতে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আপনার স্থানীয় ডেটা ও নিরাপত্তা অক্ষুণ্ণ রয়েছে।',
    workspaceErrorTitle: 'ওয়ার্কস্পেস লোডিং ত্রুটি',
    workspaceErrorDesc: 'এই ওয়ার্কস্পেসটি রেন্ডার করতে সমস্যা হয়েছে। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।',
    appErrorTitle: 'অ্যাপ্লিকেশনে ত্রুটি ঘটেছে',
    appErrorDesc: 'একটি অপ্রত্যাশিত ত্রুটি দেখা দিয়েছে। আপনি নিরাপদে হোম পেজে ফিরে যেতে পারেন।',

    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'সেবার শর্তাবলী',
    cookiePreferences: 'কুকি সেটিংস',
    disclaimer: 'দাবিত্যাগ',
    sitemap: 'সাইটম্যাপ',
    legalNoticeTitle: 'তথ্যগত ব্যবহারের বিজ্ঞপ্তি',
    informationalNotice: 'এই প্ল্যাটফর্মটি শুধুমাত্র তথ্যগত উদ্দেশ্যে গণনা প্রদান করে। এটি কোনো আইনগত বা আর্থিক পরামর্শ নয়।',
    uaeDisclaimer: 'গণনাগুলো সংযুক্ত আরব আমিরাতের শ্রম আইন অনুযায়ী আনুমানিক হিসাব। অফিসিয়াল নিষ্পত্তির জন্য শ্রম মন্ত্রণালয় বা আইনি পরামর্শকের সাথে যোগাযোগ করুন।',

    proTipsTitle: 'সেরা ফলাফলের জন্য বিশেষ পরামর্শ',
    recommendedWorkflowTitle: 'প্রস্তাবিত কাজের প্রক্রিয়া',
    relatedToolsTitle: 'এই ওয়ার্কস্পেসের অন্যান্য টুলস'
  },

  ar: {
    brandName: 'تول نوفا',
    tagline: 'جميع أدواتك. في منصة واحدة قوية.',
    searchPlaceholder: 'ابحث في 35 مساحة عمل وأداة (مثل PDF، QR، وحسابات القروض)...',
    searchAriaLabel: 'البحث في الأدوات ومساحات العمل',
    workspaces: 'مساحات العمل',
    popularTools: 'الأدوات الشائعة',
    featuredTools: 'استوديوهات مميزة',
    allTools: 'جميع الأدوات',
    howItWorks: 'كيف يعمل',
    usefulContent: 'لماذا تول نوفا؟',
    faq: 'الأسئلة الشائعة',
    privacyBadge: 'تنفيذ كامل 100% داخل المتصفح — خصوصية مطلقة',
    clientSideExecution: 'معالجة محلية داخل المتصفح',
    exploreWorkspace: 'استعراض مساحة العمل',
    launchTool: 'تشغيل الأداة',
    backToWorkspaces: 'العودة لجميع مساحات العمل',
    clientSidePrivacyNotice: 'تتم جميع العمليات الحسابية والتحويلات محلياً داخل متصفحك مباشرة بدون إرسال ملفاتك أو بياناتك إلى خوادم خارجية.',
    footerRights: 'جميع الحقوق محفوظة. صُمم للأداء العالي والخصوصية وسهولة الاستخدام.',
    quickSearch: 'بحث سريع...',
    filterWorkspaces: 'تصفية 35 مساحة عمل...',
    allCategories: 'الكل',
    mediaAndDocs: 'الوسائط والمستندات',
    devEngineering: 'المطورين والهندسة',
    financeBusiness: 'المالية والأعمال',
    productivityUtils: 'الإنتاجية والأدوات',
    platformStatus: 'جميع مساحات العمل الـ 35 تعمل بنشاط',
    ready: 'جاهز',
    popular: 'شائع',

    tryAgain: 'إعادة المحاولة',
    backToTools: 'العودة للأدوات',
    goHome: 'الصفحة الرئيسية',
    browseWorkspaces: 'تصفح مساحات العمل',
    search: 'بحث',
    clear: 'مسح',
    reset: 'إعادة ضبط',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    download: 'تحميل',
    upload: 'رفع ملف',
    dragDrop: 'اسحب وأفلت الملف هنا أو انقر للاختيار',
    generate: 'توليد',
    convert: 'تحويل',
    calculate: 'حساب',
    process: 'معالجة',
    share: 'مشاركة',
    preview: 'معاينة',

    searchPageTitle: 'البحث في دليل المنصة',
    searchPageSubtitle: 'اعثر على أي أداة أو استوديو أو حاسبة ضمن مجموعاتنا الـ 35 على الفور.',
    searchResultsFor: 'نتائج البحث عن "{query}"',
    noResultsFound: 'لم يتم العثور على أدوات تطابق بحثك',
    noResultsHint: 'جرب البحث باختصارات شائعة مثل PDF أو QR أو VAT أو بكلمات مفتاحية عامة.',
    toolsFound: 'الأدوات التي تم العثور عليها',
    workspacesFound: 'مساحات العمل التي تم العثور عليها',

    notFoundTitle: 'الصفحة غير موجودة',
    notFoundSubtitle: 'الرابط المطلوب غير متوفر أو تم نقله.',
    notFoundDesc: 'قد يكون تم تعديل مسار الأداة. يمكنك البحث في الدليل أو العودة للصفحة الرئيسية.',

    toolErrorTitle: 'حدث خطأ أثناء تحميل هذه الأداة',
    toolErrorDesc: 'حدث خطأ غير متوقع في الأداة. بيئتك المحلية وتصفحك آمنان تماماً.',
    workspaceErrorTitle: 'خطأ في عرض مساحة العمل',
    workspaceErrorDesc: 'حدث خطأ أثناء عرض مساحة العمل. يُرجى إعادة المحاولة.',
    appErrorTitle: 'حدث خطأ غير متوقع',
    appErrorDesc: 'واجه التطبيق مشكلة تقنية غير متوقعة. يمكنك العودة للصفحة الرئيسية بأمان.',

    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    cookiePreferences: 'تفضيلات ملفات تعريف الارتباط',
    disclaimer: 'إخلاء المسؤولية',
    sitemap: 'خريطة الموقع',
    legalNoticeTitle: 'إشعار الاستخدام المعلوماتي',
    informationalNotice: 'تقدم هذه المنصة تقديرات حسابية لأغراض إرشادية وتثقيفية فقط ولا تشكل استشارة قانونية أو مالية معتمدة.',
    uaeDisclaimer: 'الحسابات هي تقديرات استرشادية تستند للمرسوم بقانون اتحادي رقم 33 لسنة 2021 في دولة الإمارات. للفتاوى الرسمية، راجع وزارة الموارد البشرية والتوطين.',

    proTipsTitle: 'نصائح مهنية لأفضل النتائج',
    recommendedWorkflowTitle: 'خطوات العمل الموصى بها',
    relatedToolsTitle: 'أدوات ذات صلة في هذه المساحة'
  },

  hi: {
    brandName: 'टूलनोवा',
    tagline: 'ऑल योर टूल्स। वन पावरफुल प्लेटफॉर्म।',
    searchPlaceholder: '35 वर्कस्पेस और टूल्स खोजें (उदा. PDF, QR, EMI, JSON)...',
    searchAriaLabel: 'टूल्स और वर्कस्पेस खोजें',
    workspaces: 'वर्कस्पेस',
    popularTools: 'लोकप्रिय टूल्स',
    featuredTools: 'विशेष स्टूडियो',
    allTools: 'सभी टूल्स',
    howItWorks: 'यह कैसे काम करता है',
    usefulContent: 'टूलनोवा क्यों चुनें?',
    faq: 'अक्सर पूछे जाने वाले सवाल',
    privacyBadge: '100% ब्राउज़र गोपनीयता — कोई डेटा सर्वर पर नहीं भेजा जाता',
    clientSideExecution: 'क्लाइंट-साइड निष्पादन',
    exploreWorkspace: 'वर्कस्पेस देखें',
    launchTool: 'टूल शुरू करें',
    backToWorkspaces: 'सभी वर्कस्पेस पर वापस जाएं',
    clientSidePrivacyNotice: 'सभी गणनाएं और फाइल रूपांतरण सीधे आपके वेब ब्राउज़र में होते हैं। आपकी निजी फाइलें कभी किसी सर्वर पर अपलोड नहीं की जाती हैं।',
    footerRights: 'सर्वाधिकार सुरक्षित। गोपनीयता, गति और विश्वसनीयता के लिए निर्मित।',
    quickSearch: 'त्वरित खोज...',
    filterWorkspaces: '35 वर्कस्पेस फिल्टर करें...',
    allCategories: 'सभी',
    mediaAndDocs: 'मीडिया और दस्तावेज़',
    devEngineering: 'डेवलपर और इंजीनियरिंग',
    financeBusiness: 'फाइनेंस और बिज़नेस',
    productivityUtils: 'उत्पादकता और उपयोगिता',
    platformStatus: 'सभी 35 वर्कस्पेस सक्रिय हैं',
    ready: 'तैयार',
    popular: 'लोकप्रिय',

    tryAgain: 'पुनः प्रयास करें',
    backToTools: 'टूल्स पर वापस जाएं',
    goHome: 'प्लेटफ़ॉर्म होम',
    browseWorkspaces: 'वर्कस्पेस ब्राउज़ करें',
    search: 'खोजें',
    clear: 'साफ़ करें',
    reset: 'रीसेट',
    copy: 'कॉपी',
    copied: 'कॉपी किया गया!',
    download: 'डाउनलोड',
    upload: 'फ़ाइल अपलोड',
    dragDrop: 'फ़ाइल खींचें और छोड़ें या चुनने के लिए क्लिक करें',
    generate: 'उत्पन्न करें',
    convert: 'बदलें',
    calculate: 'गणना करें',
    process: 'प्रक्रिया',
    share: 'साझा करें',
    preview: 'पूर्वावलोकन',

    searchPageTitle: 'प्लेटफ़ॉर्म डायरेक्टरी खोजें',
    searchPageSubtitle: 'हमारे 35 विशेष संग्रहों में से किसी भी टूल, कैलकुलेटर या स्टूडियो को तुरंत खोजें।',
    searchResultsFor: '"{query}" के लिए परिणाम',
    noResultsFound: 'आपकी खोज से मेल खाने वाला कोई टूल नहीं मिला',
    noResultsHint: 'कृपया सामान्य कीवर्ड जैसे PDF, QR, EMI, या Image से खोजें।',
    toolsFound: 'मिले टूल्स',
    workspacesFound: 'मिले वर्कस्पेस',

    notFoundTitle: 'पृष्ठ नहीं मिला',
    notFoundSubtitle: 'अनुरोधित टूल या पृष्ठ उपलब्ध नहीं है।',
    notFoundDesc: 'यूआरएल बदल दिया गया हो सकता है। आप डायरेक्टरी में खोज सकते हैं या होम पर लौट सकते हैं।',

    toolErrorTitle: 'इस टूल को लोड करने में समस्या आई',
    toolErrorDesc: 'टूल में अनपेक्षित त्रुटि हुई। आपका स्थानीय वातावरण सुरक्षित है।',
    workspaceErrorTitle: 'वर्कस्पेस लोड त्रुटि',
    workspaceErrorDesc: 'इस संग्रह को रेंडर करने में समस्या आई। कृपया पुनः प्रयास करें।',
    appErrorTitle: 'एप्लिकेशन में त्रुटि हुई',
    appErrorDesc: 'एक अनपेक्षित त्रुटि हुई है। आप सुरक्षित रूप से होमपेज पर लौट सकते हैं।',

    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    cookiePreferences: 'कुकी प्राथमिकताएं',
    disclaimer: 'अस्वीकरण',
    sitemap: 'साइटमैप',
    legalNoticeTitle: 'सूचनात्मक उपयोग सूचना',
    informationalNotice: 'यह प्लेटफ़ॉर्म केवल सूचनात्मक संदर्भ के लिए गणना अनुमान प्रदान करता है।',
    uaeDisclaimer: 'गणनाएं यूएई संघीय श्रम कानून पर आधारित अनुमान हैं। आधिकारिक फैसलों के लिए श्रम मंत्रालय से संपर्क करें।',

    proTipsTitle: 'सर्वोत्तम परिणामों के लिए सुझाव',
    recommendedWorkflowTitle: 'अनुशंसित कार्यप्रणाली',
    relatedToolsTitle: 'इस वर्कस्पेस के संबंधित टूल्स'
  },

  ur: {
    brandName: 'ٹول نووا',
    tagline: 'آپ کے تمام ٹولز۔ ایک طاقتور پلیٹ فارم۔',
    searchPlaceholder: '35 ورک اسپیسز اور ٹولز تلاش کریں (مثلاً PDF، QR، قرض کا حساب)...',
    searchAriaLabel: 'ٹولز اور ورک اسپیسز تلاش کریں',
    workspaces: 'ورک اسپیسز',
    popularTools: 'مقبول ٹولز',
    featuredTools: 'خاص اسٹوڈیوز',
    allTools: 'تمام ٹولز',
    howItWorks: 'یہ کیسے کام کرتا ہے',
    usefulContent: 'ٹول نووا کیوں منتخب کریں؟',
    faq: 'اکثر پوچھے گئے سوالات',
    privacyBadge: '100% براؤزر پرائیویسی — کوئی فائل محفوظ نہیں کی جاتی',
    clientSideExecution: 'براؤزر میں براہ راست پروسیسنگ',
    exploreWorkspace: 'ورک اسپیس کھولیں',
    launchTool: 'ٹول شروع کریں',
    backToWorkspaces: 'تمام ورک اسپیسز پر واپس جائیں',
    clientSidePrivacyNotice: 'تمام حسابی کام اور فائل تبدیلیاں براہ راست آپ کے براؤزر میں ہوتی ہیں۔ آپ کا کوئی ڈیٹا سرور پر نہیں بھیجا جاتا۔',
    footerRights: 'جملہ حقوق محفوظ ہیں۔ رازداری اور کارکردگی کے لیے تیار کردہ۔',
    quickSearch: 'فوری تلاش...',
    filterWorkspaces: '35 ورک اسپیسز فلٹر کریں...',
    allCategories: 'تمام',
    mediaAndDocs: 'میڈیا اور دستاویزات',
    devEngineering: 'ڈویلپر اور انجینئرنگ',
    financeBusiness: 'فنانس اور بزنس',
    productivityUtils: 'پیداواری صلاحیت اور یوٹیلٹیز',
    platformStatus: 'تمام 35 ورک اسپیسز فعال ہیں',
    ready: 'تیار',
    popular: 'مقبول',

    tryAgain: 'دوبارہ کوشش کریں',
    backToTools: 'ٹولز پر واپس جائیں',
    goHome: 'ہوم پیج',
    browseWorkspaces: 'ورک اسپیسز دیکھیں',
    search: 'تلاش کریں',
    clear: 'صاف کریں',
    reset: 'دوبارہ ترتیب دیں',
    copy: 'کاپی کریں',
    copied: 'کاپی ہو گیا!',
    download: 'ڈاؤن لوڈ کریں',
    upload: 'فائل اپ لوڈ کریں',
    dragDrop: 'فائل ڈریگ کریں یا منتخب کرنے کے لیے کلک کریں',
    generate: 'بنائیں',
    convert: 'تبدیل کریں',
    calculate: 'حساب لگائیں',
    process: 'عمل کریں',
    share: 'شیئر کریں',
    preview: 'پیش نظارہ',

    searchPageTitle: 'پلیٹ فارم ڈائرکٹری تلاش کریں',
    searchPageSubtitle: 'ہماری 35 ورک اسپیسز میں سے کسی بھی ٹول یا کیلکولیٹر کو فوراً تلاش کریں۔',
    searchResultsFor: '"{query}" کے نتائج',
    noResultsFound: 'کوئی مماثل ٹول نہیں ملا',
    noResultsHint: 'عام الفاظ جیسے PDF، QR، یا کیلکولیٹر سے دوبارہ تلاش کریں۔',
    toolsFound: 'ملنے والے ٹولز',
    workspacesFound: 'ملنے والی ورک اسپیسز',

    notFoundTitle: 'صفحہ دستیاب نہیں ہے',
    notFoundSubtitle: 'مطلوبہ ٹول یا صفحہ موجود نہیں ہے۔',
    notFoundDesc: 'لنک تبدیل ہو چکا ہو گا۔ آپ ڈائرکٹری تلاش کر سکتے ہیں یا ہوم پیج پر جا سکتے ہیں۔',

    toolErrorTitle: 'ٹول لوڈ کرنے میں مسئلہ پیش آیا',
    toolErrorDesc: 'ٹول میں غیر متوقع خرابی ہوئی ہے۔ آپ کا مقامی ڈیٹا محفوظ ہے۔',
    workspaceErrorTitle: 'ورک اسپیس لوڈنگ میں خرابی',
    workspaceErrorDesc: 'اس ورک اسپیس کو ظاہر کرنے میں مسئلہ پیش آیا۔ دوبارہ کوشش کریں۔',
    appErrorTitle: 'ایپلی کیشن میں خرابی پیش آئی',
    appErrorDesc: 'ایک غیر متوقع مسئلہ پیش آیا ہے۔ آپ ہوم پیج پر واپس جا سکتے ہیں۔',

    privacyPolicy: 'پرائیویسی پالیسی',
    termsOfService: 'سروس کی شرائط',
    cookiePreferences: 'کوکیز کی ترجیحات',
    disclaimer: 'دستبرداری',
    sitemap: 'سائٹ میپ',
    legalNoticeTitle: 'معلوماتی استعمال کا نوٹس',
    informationalNotice: 'یہ پلیٹ فارم صرف معلوماتی مقاصد کے لیے حسابی اندازے فراہم کرتا ہے۔',
    uaeDisclaimer: 'یہ حسابات متحدہ عرب امارات کے لیبر قانون کے تحت تخمینہ ہیں۔ حتمی فیصلے کے لیے وزارت سے رابطہ کریں۔',

    proTipsTitle: 'بہترین نتائج کے لیے مفید تجاویز',
    recommendedWorkflowTitle: 'تجویز کردہ طریقہ کار',
    relatedToolsTitle: 'متعلقہ ٹولز'
  },

  es: {
    brandName: 'ToolNova',
    tagline: 'Todas tus herramientas. Una plataforma potente.',
    searchPlaceholder: 'Buscar en 35 espacios de trabajo y herramientas (PDF, QR, EMI, JSON)...',
    searchAriaLabel: 'Buscar herramientas y espacios de trabajo',
    workspaces: 'Espacios de Trabajo',
    popularTools: 'Herramientas Populares',
    featuredTools: 'Estudios Destacados',
    allTools: 'Todas las Herramientas',
    howItWorks: 'Cómo Funciona',
    usefulContent: '¿Por qué ToolNova?',
    faq: 'Preguntas Frecuentes',
    privacyBadge: '100% Ejecución en el Navegador — Sin retención de archivos',
    clientSideExecution: 'Ejecución en el Cliente',
    exploreWorkspace: 'Explorar Espacio',
    launchTool: 'Abrir Estudio',
    backToWorkspaces: 'Volver a Espacios',
    clientSidePrivacyNotice: 'Todo el procesamiento de cálculos, documentos e imágenes se realiza localmente en tu navegador sin subir archivos a servidores externos.',
    footerRights: 'Todos los derechos reservados. Diseñado para máxima privacidad, rendimiento y accesibilidad.',
    quickSearch: 'Búsqueda rápida...',
    filterWorkspaces: 'Filtrar 35 espacios...',
    allCategories: 'Todo',
    mediaAndDocs: 'Medios y Documentos',
    devEngineering: 'Desarrollo e Ingeniería',
    financeBusiness: 'Finanzas y Negocios',
    productivityUtils: 'Productividad y Utilidades',
    platformStatus: 'Los 35 Espacios Operativos',
    ready: 'Listo',
    popular: 'Popular',

    tryAgain: 'Reintentar',
    backToTools: 'Volver a Herramientas',
    goHome: 'Inicio de Plataforma',
    browseWorkspaces: 'Explorar Espacios',
    search: 'Buscar',
    clear: 'Limpiar',
    reset: 'Restablecer',
    copy: 'Copiar',
    copied: '¡Copiado!',
    download: 'Descargar',
    upload: 'Subir Archivo',
    dragDrop: 'Arrastra y suelta o haz clic para seleccionar',
    generate: 'Generar',
    convert: 'Convertir',
    calculate: 'Calcular',
    process: 'Procesar',
    share: 'Compartir',
    preview: 'Vista Previa',

    searchPageTitle: 'Buscar en el Directorio',
    searchPageSubtitle: 'Encuentra al instante cualquier herramienta, calculadora o estudio en nuestras 35 colecciones.',
    searchResultsFor: 'Resultados de búsqueda para "{query}"',
    noResultsFound: 'No se encontraron herramientas que coincidan con tu búsqueda',
    noResultsHint: 'Prueba con siglas comunes (como PDF, QR, EMI) o palabras clave generales.',
    toolsFound: 'Herramientas Encontradas',
    workspacesFound: 'Espacios Encontrados',

    notFoundTitle: 'Página no encontrada',
    notFoundSubtitle: 'La ruta solicitada no existe o ha sido movida.',
    notFoundDesc: 'La URL solicitada no está disponible. Puedes buscar en el directorio o volver al inicio.',

    toolErrorTitle: 'Error al cargar esta herramienta',
    toolErrorDesc: 'Ocurrió un error inesperado al procesar la herramienta. Tu entorno local permanece seguro.',
    workspaceErrorTitle: 'Error en Espacio de Trabajo',
    workspaceErrorDesc: 'Ocurrió un problema al cargar esta colección. Por favor, recarga la página.',
    appErrorTitle: 'Error en la Aplicación',
    appErrorDesc: 'Ocurrió una falla inesperada. Puedes volver a la pantalla de inicio de forma segura.',

    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    cookiePreferences: 'Preferencias de Cookies',
    disclaimer: 'Aviso Legal',
    sitemap: 'Mapa del Sitio',
    legalNoticeTitle: 'Aviso de Uso Informativo',
    informationalNotice: 'Esta plataforma proporciona estimaciones para fines informativos. No constituye asesoramiento legal o financiero.',
    uaeDisclaimer: 'Los cálculos son estimaciones informativas. Para asesoría legal oficial, consulte a los organismos competentes.',

    proTipsTitle: 'Consejos Profesionales',
    recommendedWorkflowTitle: 'Flujo de Trabajo Recomendado',
    relatedToolsTitle: 'Herramientas Relacionadas'
  }
};

export const RTL_LOCALES: SupportedLocale[] = ['ar', 'ur'];

export function isRTL(locale: SupportedLocale): boolean {
  return RTL_LOCALES.includes(locale);
}
