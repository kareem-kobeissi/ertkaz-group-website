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
    motionLabel: string;
  };
  motionReel: {
    meta: [string, string];
    titleLines: [string, string];
    introduction: string;
    chapters: [
      { index: string; label: string; title: string },
      { index: string; label: string; title: string },
      { index: string; label: string; title: string },
    ];
    progress: string;
    ariaLabel: string;
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
  contact: {
    meta: [string, string];
    titleLines: [string, string];
    cta: string;
    generalEmail: string;
    executiveEmail: string;
    primaryPhone: string;
    secondaryPhone: string;
    office: string;
    website: string;
    directoryLabel: string;
  };
  footer: {
    description: string;
    invitation: string;
    invitationLink: string;
    navigate: string;
    contact: string;
    office: string;
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
      services: { title: "Services — ERTKAZ GROUP", description: "Explore thirteen ERTKAZ GROUP advisory services." },
      projects: { title: "Projects — ERTKAZ GROUP", description: "Discuss project requirements with ERTKAZ GROUP." },
      markets: { title: "Markets — ERTKAZ GROUP", description: "Explore ERTKAZ GROUP's regional perspective." },
      contact: { title: "Contact — ERTKAZ GROUP", description: "Contact ERTKAZ GROUP." },
    },
    hero: {
      eyebrow: "ERTKAZ GROUP / ADVISORY",
      introLines: ["Business consulting", "& strategic advisory"],
      titleLines: ["Strategy today.", "Impact tomorrow."],
      scroll: "Scroll to discover",
      cta: "Start a conversation",
      motionLabel: "View the motion reel",
    },
    motionReel: {
      meta: ["In motion", "ERTKAZ perspective"],
      titleLines: ["One perspective.", "Many dimensions."],
      introduction: "A connected view across business, strategy and technology.",
      chapters: [
        { index: "01", label: "Business", title: "Business & management consultancy" },
        { index: "02", label: "Direction", title: "Strategy formulation & development" },
        { index: "03", label: "Systems", title: "Information technology consultancy" },
      ],
      progress: "Scroll through the perspective",
      ariaLabel: "Animated ERTKAZ perspective across business, strategy and technology",
    },
    about: {
      meta: ["01 / About us", "Our perspective"],
      statement: [
        { text: "Practical strategies" },
        { text: "shaped around requirements.", modifier: "indent" },
        { text: "We help organizations", modifier: "deep" },
        { text: "navigate decisions," },
        { text: "development and expansion" },
        { text: "with thoughtful guidance.", modifier: "accent" },
      ],
      notes: ["Thoughtful analysis", "Personal approach", "Honored commitments"],
      summary: "We analyze requirements, define scope and develop considered responses that support meaningful decisions and opportunities.",
    },
    services: {
      meta: ["02 / Our services", "Selected services"],
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
    contact: {
      meta: ["05 / Contact", "ERTKAZ GROUP"],
      titleLines: ["Start a", "conversation."],
      cta: "Email us",
      generalEmail: "General enquiries",
      executiveEmail: "Executive office",
      primaryPhone: "Primary phone",
      secondaryPhone: "Alternate phone",
      office: "Dubai office",
      website: "Website",
      directoryLabel: "Contact methods",
    },
    footer: {
      description: "Business consulting and strategic advisory.",
      invitation: "Have a business question worth exploring?",
      invitationLink: "Start a conversation",
      navigate: "Navigate",
      contact: "Contact",
      office: "Office",
      copyright: "ERTKAZ GROUP",
      backToTop: "Back to top",
      homeLabel: "ERTKAZ GROUP — Back to home",
      navigationLabel: "Footer navigation",
    },
    scaffold: {
      about: { index: "01", eyebrow: "Who we are", title: "About ERTKAZ", description: "Our positioning, mission, vision, values and sector perspective." },
      services: { index: "02", eyebrow: "Advisory index", title: "Our Services", description: "Thirteen advisory services presented in a focused bilingual index." },
      projects: { index: "03", eyebrow: "Project enquiries", title: "Projects", description: "Speak with ERTKAZ GROUP about your project requirements." },
      markets: { index: "04", eyebrow: "Regional perspective", title: "Our Markets", description: "A global outlook grounded in local understanding across five named markets and regions." },
      contact: { index: "05", eyebrow: "Start a conversation", title: "Contact", description: "Speak with ERTKAZ GROUP about your requirements." },
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
      services: { title: "خدماتنا — ERTKAZ GROUP", description: "استكشف ثلاث عشرة خدمة استشارية لمجموعة ERTKAZ." },
      projects: { title: "المشاريع — ERTKAZ GROUP", description: "ناقش متطلبات مشروعك مع مجموعة ERTKAZ." },
      markets: { title: "أسواقنا — ERTKAZ GROUP", description: "استكشف منظور مجموعة ERTKAZ الإقليمي." },
      contact: { title: "تواصل معنا — ERTKAZ GROUP", description: "تواصل مع مجموعة ERTKAZ." },
    },
    hero: {
      eyebrow: "مجموعة ERTKAZ / الاستشارات",
      introLines: ["استشارات الأعمال", "والاستشارات الاستراتيجية"],
      titleLines: ["استراتيجية اليوم.", "أثر الغد."],
      scroll: "مرّر للاستكشاف",
      cta: "ابدأ محادثة",
      motionLabel: "شاهد العرض المتحرك",
    },
    motionReel: {
      meta: ["في حركة", "منظور ERTKAZ"],
      titleLines: ["منظور واحد.", "أبعاد متعددة."],
      introduction: "رؤية مترابطة تجمع الأعمال والاستراتيجية والتكنولوجيا.",
      chapters: [
        { index: "01", label: "الأعمال", title: "استشارات الأعمال والإدارة" },
        { index: "02", label: "التوجه", title: "صياغة الاستراتيجية وتطويرها" },
        { index: "03", label: "الأنظمة", title: "استشارات تكنولوجيا المعلومات" },
      ],
      progress: "مرّر عبر المنظور",
      ariaLabel: "منظور متحرك لمجموعة ERTKAZ عبر الأعمال والاستراتيجية والتكنولوجيا",
    },
    about: {
      meta: ["01 / من نحن", "رؤيتنا"],
      statement: [
        { text: "استراتيجيات عملية" },
        { text: "مصمّمة وفق المتطلبات.", modifier: "indent" },
        { text: "نساعد المؤسسات", modifier: "deep" },
        { text: "في اتخاذ القرارات،" },
        { text: "ومراحل التطوير والتوسع" },
        { text: "بتوجيه مدروس.", modifier: "accent" },
      ],
      notes: ["تحليل مدروس", "نهج شخصي", "الوفاء بالالتزامات"],
      summary: "نحلل المتطلبات ونحدد النطاق ونطور استجابات مدروسة تدعم القرارات والفرص المهمة.",
    },
    services: {
      meta: ["02 / خدماتنا", "خدمات مختارة"],
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
    contact: {
      meta: ["05 / تواصل معنا", "ERTKAZ GROUP"],
      titleLines: ["لنبدأ", "محادثة."],
      cta: "راسلنا",
      generalEmail: "الاستفسارات العامة",
      executiveEmail: "المكتب التنفيذي",
      primaryPhone: "الهاتف الرئيسي",
      secondaryPhone: "الهاتف البديل",
      office: "مكتب دبي",
      website: "الموقع الإلكتروني",
      directoryLabel: "وسائل التواصل",
    },
    footer: {
      description: "استشارات الأعمال والاستشارات الاستراتيجية.",
      invitation: "هل لديك مسألة أعمال تستحق النقاش؟",
      invitationLink: "ابدأ محادثة",
      navigate: "تصفّح",
      contact: "تواصل",
      office: "المكتب",
      copyright: "ERTKAZ GROUP",
      backToTop: "العودة إلى الأعلى",
      homeLabel: "ERTKAZ GROUP — العودة إلى الرئيسية",
      navigationLabel: "تنقل التذييل",
    },
    scaffold: {
      about: { index: "01", eyebrow: "من نحن", title: "عن ERTKAZ", description: "تموضعنا ورسالتنا ورؤيتنا وقيمنا ومنظورنا القطاعي." },
      services: { index: "02", eyebrow: "دليل الاستشارات", title: "خدماتنا", description: "ثلاث عشرة خدمة استشارية ضمن دليل مركز باللغتين." },
      projects: { index: "03", eyebrow: "استفسارات المشاريع", title: "المشاريع", description: "تحدث مع مجموعة ERTKAZ حول متطلبات مشروعك." },
      markets: { index: "04", eyebrow: "منظور إقليمي", title: "أسواقنا", description: "نظرة عالمية ترتكز على فهم محلي عبر خمسة أسواق ومناطق مسماة." },
      contact: { index: "05", eyebrow: "ابدأ محادثة", title: "تواصل معنا", description: "تحدث مع مجموعة ERTKAZ حول متطلباتك." },
    },
  },
};
