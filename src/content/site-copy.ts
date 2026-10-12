import type { Locale, SitePage } from "@/lib/i18n/config";

type ServicePreview = {
  title: string;
  description: string;
};

type StatementPart = {
  text: string;
  modifier?: "indent" | "deep" | "accent";
};

type SiteCopy = {
  navigation: Record<SitePage, string>;
  header: {
    primaryLabel: string;
    desktopLabel: string;
    mobileLabel: string;
    open: string;
    close: string;
    closeText: string;
    menu: string;
    navigate: string;
    footer: string;
    switchLanguage: string;
    homeLabel: string;
  };
  metadata: Record<SitePage, { title: string; description: string }>;
  hero: {
    eyebrow: string;
    introLines: [string, string];
    titleLines: [string, string];
    scroll: string;
    cta: string;
  };
  about: {
    meta: [string, string];
    statement: StatementPart[];
    notes: [string, string, string];
    summary: string;
  };
  services: {
    meta: [string, string];
    title: string;
    items: ServicePreview[];
  };
  projects: {
    meta: [string, string];
    titleLines: [string, string];
    note: string;
    visual: string;
    disclaimer: string;
    categoryPending: string;
    projectPlaceholder: string;
  };
  philosophy: {
    meta: [string, string];
    kicker: string;
    statement: [string, string, string, string];
  };
  leadership: {
    meta: [string, string];
    role: string;
    nameLines: [string, string];
    reserve: string;
    portrait: [string, string];
    portraitLabel: string;
    caption: string;
  };
  contact: {
    meta: [string, string];
    titleLines: [string, string];
    cta: string;
    email: string;
    phone: string;
    website: string;
    directoryLabel: string;
  };
  footer: {
    description: string;
    copyright: string;
    backToTop: string;
    homeLabel: string;
    navigationLabel: string;
  };
  scaffold: Record<Exclude<SitePage, "home">, {
    index: string;
    eyebrow: string;
    title: string;
    description: string;
    status: string;
  }>;
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      markets: "Markets",
      contact: "Contact",
    },
    header: {
      primaryLabel: "Primary navigation",
      desktopLabel: "Desktop navigation",
      mobileLabel: "Mobile navigation",
      open: "Open navigation",
      close: "Close navigation",
      closeText: "Close",
      menu: "Menu",
      navigate: "Navigate",
      footer: "Business consulting · Strategic advisory",
      switchLanguage: "Switch to Arabic",
      homeLabel: "ERTKAZ GROUP — Home",
    },
    metadata: {
      home: {
        title: "ERTKAZ GROUP — Strategy Today. Impact Tomorrow.",
        description: "ERTKAZ GROUP is a business consulting and strategic advisory firm.",
      },
      about: { title: "About — ERTKAZ GROUP", description: "About ERTKAZ GROUP." },
      services: { title: "Services — ERTKAZ GROUP", description: "Explore the thirteen services presented in the ERTKAZ GROUP company profile." },
      projects: { title: "Projects — ERTKAZ GROUP", description: "ERTKAZ GROUP project placeholders." },
      markets: { title: "Markets — ERTKAZ GROUP", description: "Markets and regional references presented in the ERTKAZ GROUP company profile." },
      contact: { title: "Contact — ERTKAZ GROUP", description: "Contact ERTKAZ GROUP." },
    },
    hero: {
      eyebrow: "ERTKAZ GROUP / ADVISORY",
      introLines: ["Business consulting", "& strategic advisory"],
      titleLines: ["Strategy today.", "Impact tomorrow."],
      scroll: "Scroll to discover",
      cta: "Start a conversation",
    },
    about: {
      meta: ["01 / About us", "Our perspective"],
      statement: [
        { text: "An innovative business" },
        { text: "solutions partner,", modifier: "indent" },
        { text: "committed to excellence." },
        { text: "We help organizations", modifier: "deep" },
        { text: "achieve strategic goals and" },
        { text: "drive sustainable growth.", modifier: "accent" },
      ],
      notes: ["Dynamic thinking", "Purposeful partnership", "Sustainable direction"],
      summary: "We bring innovation and strategic focus together to support organizations as they navigate important decisions and pursue long-term growth.",
    },
    services: {
      meta: ["02 / Our services", "Selected profile capabilities"],
      title: "Our services",
      items: [
        { title: "Business & Management Consultancy", description: "Organizational analysis, strategic goals and relevant performance indicators." },
        { title: "Feasibility Study", description: "Project analysis spanning operational needs, finance and marketing strategy." },
        { title: "Strategy Formulation & Development", description: "Defining ambitions and objectives that support the organization’s direction." },
        { title: "Marketing Strategy", description: "A tailored direction informed by the business model and market analysis." },
        { title: "IT Consultancy", description: "Technology assessment in relation to key business goals and objectives." },
        { title: "Human Capital Development", description: "Principles, rules and guidance supporting human-resources processes." },
      ],
    },
    projects: {
      meta: ["03 / Selected projects", "Project framework preview"],
      titleLines: ["Selected", "Projects"],
      note: "This showcase is intentionally populated with placeholders until approved ERTKAZ GROUP project material is provided.",
      visual: "Placeholder visual",
      disclaimer: "Not a live case study",
      categoryPending: "Category pending",
      projectPlaceholder: "Project Placeholder",
    },
    philosophy: {
      meta: ["05 / Our philosophy", "How we create value"],
      kicker: "ERTKAZ GROUP / OUR PHILOSOPHY",
      statement: [
        "Our philosophy is rooted in providing",
        "exceptional value to our customers",
        "while fostering a supportive and",
        "inclusive work environment.",
      ],
    },
    leadership: {
      meta: ["06 / Leadership", "Founder / CEO"],
      role: "Founder / Chief Executive Officer",
      nameLines: ["Dr. Mohammed", "M. Sheaitani"],
      reserve: "Leadership profile reserved for approved company information.",
      portrait: ["Authentic portrait", "Reserved"],
      portraitLabel: "Reserved space for an authentic photograph of Dr. Mohammed M. Sheaitani",
      caption: "Designed to accommodate approved founder photography without changing the layout.",
    },
    contact: {
      meta: ["08 / Contact", "ERTKAZ GROUP"],
      titleLines: ["Start a", "conversation."],
      cta: "Let’s talk",
      email: "Email",
      phone: "Phone",
      website: "Website",
      directoryLabel: "Contact methods",
    },
    footer: {
      description: "Business consulting and strategic advisory.",
      copyright: "ERTKAZ GROUP",
      backToTop: "Back to top",
      homeLabel: "ERTKAZ GROUP — Back to home",
      navigationLabel: "Footer navigation",
    },
    scaffold: {
      about: { index: "01", eyebrow: "Company profile", title: "About ERTKAZ", description: "Company positioning, mission, vision, values, philosophy, sectors and confirmed leadership information.", status: "Bilingual profile chapter" },
      services: { index: "02", eyebrow: "Advisory index", title: "Our Services", description: "Thirteen profile-sourced services organized into a complete bilingual editorial index.", status: "Complete service profile" },
      projects: { index: "03", eyebrow: "Selected projects", title: "Projects", description: "Project placeholders remain clearly identified until authentic, approved case-study material is supplied.", status: "No live case studies published" },
      markets: { index: "04", eyebrow: "Regional perspective", title: "Our Markets", description: "The geographic references listed in the profile, presented without implying offices or completed assignments.", status: "Source-defined regional scope" },
      contact: { index: "05", eyebrow: "Start a conversation", title: "Contact", description: "Current verified contact methods remain unchanged while conflicting profile details are under review.", status: "Contact verification preserved" },
    },
  },
  ar: {
    navigation: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      projects: "المشاريع",
      markets: "أسواقنا",
      contact: "تواصل معنا",
    },
    header: {
      primaryLabel: "التنقل الرئيسي",
      desktopLabel: "التنقل على سطح المكتب",
      mobileLabel: "التنقل على الهاتف",
      open: "فتح قائمة التنقل",
      close: "إغلاق قائمة التنقل",
      closeText: "إغلاق",
      menu: "القائمة",
      navigate: "تصفّح",
      footer: "استشارات الأعمال · الاستشارات الاستراتيجية",
      switchLanguage: "Switch to English",
      homeLabel: "ERTKAZ GROUP — الصفحة الرئيسية",
    },
    metadata: {
      home: { title: "ERTKAZ GROUP — استراتيجية اليوم. أثر الغد.", description: "مجموعة ERTKAZ للاستشارات الإدارية والاستراتيجية." },
      about: { title: "من نحن — ERTKAZ GROUP", description: "تعرف إلى مجموعة ERTKAZ." },
      services: { title: "خدماتنا — ERTKAZ GROUP", description: "استكشف الخدمات الثلاث عشرة الواردة في الملف التعريفي لمجموعة ERTKAZ." },
      projects: { title: "المشاريع — ERTKAZ GROUP", description: "مساحات مشاريع مجموعة ERTKAZ المؤقتة." },
      markets: { title: "أسواقنا — ERTKAZ GROUP", description: "الأسواق والمراجع الإقليمية الواردة في الملف التعريفي لمجموعة ERTKAZ." },
      contact: { title: "تواصل معنا — ERTKAZ GROUP", description: "تواصل مع مجموعة ERTKAZ." },
    },
    hero: {
      eyebrow: "مجموعة ERTKAZ / الاستشارات",
      introLines: ["استشارات الأعمال", "والاستشارات الاستراتيجية"],
      titleLines: ["استراتيجية اليوم.", "أثر الغد."],
      scroll: "مرّر للاستكشاف",
      cta: "ابدأ محادثة",
    },
    about: {
      meta: ["01 / من نحن", "رؤيتنا"],
      statement: [
        { text: "شريك مبتكر" },
        { text: "في حلول الأعمال،", modifier: "indent" },
        { text: "ملتزم بالتميّز." },
        { text: "نساعد المؤسسات", modifier: "deep" },
        { text: "على تحقيق أهدافها الاستراتيجية" },
        { text: "ودفع النمو المستدام.", modifier: "accent" },
      ],
      notes: ["تفكير ديناميكي", "شراكة هادفة", "توجّه مستدام"],
      summary: "نجمع بين الابتكار والتركيز الاستراتيجي لدعم المؤسسات في قراراتها المهمة وسعيها نحو نمو طويل الأمد.",
    },
    services: {
      meta: ["02 / خدماتنا", "قدرات مختارة من الملف"],
      title: "خدماتنا",
      items: [
        { title: "استشارات الأعمال والإدارة", description: "تحليل المؤسسة وأهدافها الاستراتيجية ومؤشرات الأداء ذات الصلة." },
        { title: "دراسة الجدوى", description: "تحليل المشروع عبر الاحتياجات التشغيلية والتمويل واستراتيجية التسويق." },
        { title: "صياغة الاستراتيجية وتطويرها", description: "تحديد الطموحات والأهداف التي تدعم توجه المؤسسة." },
        { title: "استراتيجية التسويق", description: "توجه مخصص يستند إلى نموذج الأعمال وتحليل السوق." },
        { title: "استشارات تكنولوجيا المعلومات", description: "تقييم البيئة التقنية وعلاقتها بأهداف الأعمال الرئيسية." },
        { title: "تنمية رأس المال البشري", description: "مبادئ وقواعد وإرشادات تدعم عمليات الموارد البشرية." },
      ],
    },
    projects: {
      meta: ["03 / مشاريع مختارة", "معاينة إطار المشاريع"],
      titleLines: ["مشاريع", "مختارة"],
      note: "يستخدم هذا العرض مساحات مؤقتة بوضوح إلى حين توفير مواد مشاريع معتمدة من مجموعة ERTKAZ.",
      visual: "تصميم مؤقت",
      disclaimer: "ليست دراسة حالة فعلية",
      categoryPending: "التصنيف قيد التحديد",
      projectPlaceholder: "مشروع مؤقت",
    },
    philosophy: {
      meta: ["05 / فلسفتنا", "كيف نصنع القيمة"],
      kicker: "مجموعة ERTKAZ / فلسفتنا",
      statement: [
        "ترتكز فلسفتنا على تقديم",
        "قيمة استثنائية لعملائنا",
        "مع تعزيز بيئة عمل",
        "داعمة وشاملة.",
      ],
    },
    leadership: {
      meta: ["06 / القيادة", "المؤسس / الرئيس التنفيذي"],
      role: "المؤسس / الرئيس التنفيذي",
      nameLines: ["Dr. Mohammed", "M. Sheaitani"],
      reserve: "الملف القيادي محفوظ للمعلومات المعتمدة من الشركة.",
      portrait: ["صورة أصلية", "مساحة محفوظة"],
      portraitLabel: "مساحة محفوظة لصورة أصلية للدكتور محمد م. شيطاني",
      caption: "صُمّم هذا الإطار لاستقبال صورة المؤسس المعتمدة دون تغيير التخطيط.",
    },
    contact: {
      meta: ["08 / تواصل معنا", "ERTKAZ GROUP"],
      titleLines: ["لنبدأ", "محادثة."],
      cta: "لنتحدث",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      website: "الموقع الإلكتروني",
      directoryLabel: "وسائل التواصل",
    },
    footer: {
      description: "استشارات الأعمال والاستشارات الاستراتيجية.",
      copyright: "ERTKAZ GROUP",
      backToTop: "العودة إلى الأعلى",
      homeLabel: "ERTKAZ GROUP — العودة إلى الرئيسية",
      navigationLabel: "تنقل التذييل",
    },
    scaffold: {
      about: { index: "01", eyebrow: "الملف التعريفي", title: "عن ERTKAZ", description: "تموضع الشركة ورسالتها ورؤيتها وقيمها وفلسفتها وقطاعاتها ومعلومات القيادة المؤكدة.", status: "فصل تعريفي ثنائي اللغة" },
      services: { index: "02", eyebrow: "دليل الاستشارات", title: "خدماتنا", description: "ثلاث عشرة خدمة من المصدر، منظمة ضمن دليل تحريري كامل باللغتين.", status: "ملف الخدمات الكامل" },
      projects: { index: "03", eyebrow: "مشاريع مختارة", title: "المشاريع", description: "تبقى مساحات المشاريع مؤقتة وموسومة بوضوح إلى حين توفير مواد دراسات حالة أصلية ومعتمدة.", status: "لا توجد دراسات حالة منشورة" },
      markets: { index: "04", eyebrow: "منظور إقليمي", title: "أسواقنا", description: "المراجع الجغرافية الواردة في الملف، من دون الإيحاء بوجود مكاتب أو مشاريع منجزة.", status: "نطاق إقليمي محدد بالمصدر" },
      contact: { index: "05", eyebrow: "ابدأ محادثة", title: "تواصل معنا", description: "تبقى وسائل التواصل الحالية دون تغيير أثناء مراجعة التفاصيل المتعارضة في الملفين.", status: "تم الحفاظ على بيانات التواصل الحالية" },
    },
  },
};
