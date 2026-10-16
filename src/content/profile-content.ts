import type { Locale } from "@/lib/i18n/config";

export type ServiceGroupKey = "transformation" | "finance" | "strategy" | "technology";

export type ServiceProfile = {
  id: string;
  slug: string;
  group: ServiceGroupKey;
  title: string;
  summary: string;
  details: string[];
};

type ProfileContent = {
  interface: {
    explorePage: string;
    exploreAbout: string;
    exploreServices: string;
    exploreProjects: string;
    exploreMarkets: string;
    exploreContact: string;
    sourceReference: string;
    reviewRequired: string;
    backToServices: string;
    previousService: string;
    nextService: string;
    viewService: string;
  };
  aboutPage: {
    introductionLabel: string;
    introductionTitle: string;
    introduction: string[];
    missionLabel: string;
    missionTitle: string;
    mission: string[];
    visionLabel: string;
    visionTitle: string;
    vision: string[];
    valuesLabel: string;
    valuesTitle: string;
    values: string[];
    sectorsLabel: string;
    sectorsTitle: string;
    sectorsIntro: string;
    sectors: string[];
    leadershipLabel: string;
    leadershipName: string;
    leadershipRole: string;
    leadershipCredentialsLabel: string;
    leadershipCredentials: string;
    leadershipContactLabel: string;
  };
  servicesPage: {
    indexLabel: string;
    countLabel: string;
    introduction: string;
    groups: Record<ServiceGroupKey, { label: string; description: string }>;
  };
  marketsPage: {
    label: string;
    title: string;
    introduction: string;
    clarification: string;
    markets: Array<{ name: string; type: string; code: string }>;
  };
  homeHighlights: {
    label: string;
    title: string;
    values: string[];
    note: string;
  };
  homeMarkets: {
    label: string;
    title: string;
    note: string;
  };
  services: ServiceProfile[];
};

export const serviceSlugs = [
  "business-restructuring-insolvency",
  "business-management-consultancy",
  "business-setup",
  "feasibility-study",
  "financial-modeling",
  "franchise-structuring",
  "marketing-strategy",
  "customer-behavior-analysis",
  "strategy-formulation-development",
  "pricing-strategies",
  "personal-financial-advisory",
  "it-consultancy",
  "human-capital-development",
] as const;

export const profileContent: Record<Locale, ProfileContent> = {
  en: {
    interface: {
      explorePage: "Explore the full chapter",
      exploreAbout: "Explore About us",
      exploreServices: "View all services",
      exploreProjects: "Discuss a project",
      exploreMarkets: "Explore our markets",
      exploreContact: "View contact details",
      sourceReference: "Service overview",
      reviewRequired: "Service scope",
      backToServices: "Back to all services",
      previousService: "Previous service",
      nextService: "Next service",
      viewService: "View service",
    },
    aboutPage: {
      introductionLabel: "Who we are",
      introductionTitle: "Practical thinking for consequential business decisions.",
      introduction: [
        "ERTKAZ GROUP provides business growth and management consulting, developing practical strategies tailored to each organization’s requirements.",
        "Its approach emphasizes close collaboration, a clear understanding of business challenges and support through relevant stages of development and expansion.",
      ],
      missionLabel: "Mission",
      missionTitle: "Help people and organizations thrive in a changing world.",
      mission: [
        "Guide clients through decisions and help them recognize meaningful opportunities.",
        "Connect perspectives, create possibilities and build relationships through a personal approach.",
        "Support clients through relevant stages of development and expansion.",
      ],
      visionLabel: "Vision",
      visionTitle: "Thoughtful solutions shaped around real requirements.",
      vision: [
        "Analyze client requirements before developing a considered, effective and compliant response.",
        "Stay focused on the defined scope of each client requirement.",
        "Honor commitments while building value for client teams and their customers.",
      ],
      valuesLabel: "Core values",
      valuesTitle: "Four principles carried through the work.",
      values: ["Integrity", "Excellence", "Commitment", "Results-driven"],
      sectorsLabel: "Sector perspective",
      sectorsTitle: "A cross-sector perspective.",
      sectorsIntro: "A multidisciplinary view across the following sectors.",
      sectors: [
        "Oil & Gas",
        "Restaurants",
        "Hotels",
        "Food & Beverage",
        "Healthcare",
        "Retail & Distribution",
        "Insurance",
        "Financial Services",
        "Construction Materials",
        "Industrial Contracting & Manufacturing",
        "Nonprofit",
      ],
      leadershipLabel: "Leadership",
      leadershipName: "Dr. Mohammed M. Sheaitani",
      leadershipRole: "Founder / CEO",
      leadershipCredentialsLabel: "Credentials listed in the company profile",
      leadershipCredentials: "PhD, MBA, BC, SA, MC, CA, BSC",
      leadershipContactLabel: "Executive contact",
    },
    servicesPage: {
      indexLabel: "Complete advisory index",
      countLabel: "13 services / four areas",
      introduction: "A complete view of the advisory services, organized for clear and direct exploration.",
      groups: {
        transformation: { label: "Business transformation", description: "Restructuring, management consulting and business setup." },
        finance: { label: "Finance and growth", description: "Feasibility, modeling, pricing and personal financial advisory." },
        strategy: { label: "Market and strategy", description: "Franchise, marketing, customer and organizational strategy." },
        technology: { label: "Technology and people", description: "Information technology and human-capital development." },
      },
    },
    marketsPage: {
      label: "Regional perspective",
      title: "A perspective across five markets and regions.",
      introduction: "Our regional perspective spans the United Arab Emirates, Oman, the Middle East, Saudi Arabia and Africa.",
      clarification: "Thinking globally. Acting locally.",
      markets: [
        { name: "United Arab Emirates", type: "Country", code: "UAE" },
        { name: "Oman", type: "Country", code: "OMN" },
        { name: "Middle East", type: "Region", code: "MENA" },
        { name: "Saudi Arabia", type: "Country", code: "KSA" },
        { name: "Africa", type: "Region", code: "AFR" },
      ],
    },
    homeHighlights: {
      label: "Mission / Vision / Values",
      title: "Focused on thoughtful decisions, enduring relationships and practical value.",
      values: ["Integrity", "Excellence", "Commitment", "Results-driven"],
      note: "Principles that guide thoughtful, practical work.",
    },
    homeMarkets: {
      label: "Regional markets",
      title: "UAE · Oman · Middle East · Saudi Arabia · Africa",
      note: "Thinking globally. Acting locally.",
    },
    services: [
      {
        id: "01",
        slug: serviceSlugs[0],
        group: "transformation",
        title: "Business Restructuring & Insolvency Services",
        summary: "Assessment of financial and operational challenges to help define a considered path forward.",
        details: [
          "Situations may range from straightforward resolutions to complex matters involving multiple international jurisdictions.",
          "The work centers on specialist assessment of financial and operational problems, understanding complex issues and planning an appropriate path for the business.",
        ],
      },
      {
        id: "02",
        slug: serviceSlugs[1],
        group: "transformation",
        title: "Business & Management Consultancy",
        summary: "Targeted consulting informed by organizational analysis, strategic goals and relevant performance indicators.",
        details: [
          "Consulting advice begins with a close understanding of the business, its issues and its long-term growth plans.",
          "The process includes in-depth organizational analysis, strategic goals and objectives, and relevant key performance indicators across the organization.",
        ],
      },
      {
        id: "03",
        slug: serviceSlugs[2],
        group: "transformation",
        title: "Business Setup",
        summary: "Guidance on activity, location, legal form and company-registration considerations.",
        details: [
          "The scope includes identifying a feasible business activity, considering a location and selecting an appropriate type of legal entity.",
          "It also covers company-registration considerations and development of the business identity.",
        ],
      },
      {
        id: "04",
        slug: serviceSlugs[3],
        group: "finance",
        title: "Feasibility Study",
        summary: "Structured project analysis spanning operational needs, finance and marketing strategy.",
        details: [
          "A feasibility study provides a foundation for presenting a project to potential investors.",
          "Its scope includes a detailed project summary covering operational requirements, finance and marketing strategy, with consideration of the project’s potential profitability.",
        ],
      },
      {
        id: "05",
        slug: serviceSlugs[4],
        group: "finance",
        title: "Financial Modeling",
        summary: "Planning, structuring and analysis of financial models shaped around defined objectives.",
        details: [
          "The process involves working closely with clients to plan, structure and analyze a customized financial model.",
          "Practical, structured design rules help align the model with the client’s objectives.",
        ],
      },
      {
        id: "06",
        slug: serviceSlugs[5],
        group: "strategy",
        title: "Franchise Structuring",
        summary: "Planning the conversion of an existing business model into a scalable franchise system.",
        details: [
          "Franchise development converts an existing business model into a franchise system.",
          "Planning and strategy identify the opportunity, shape the model and determine an appropriate approach for launching and scaling a franchise brand.",
        ],
      },
      {
        id: "07",
        slug: serviceSlugs[6],
        group: "strategy",
        title: "Marketing Strategy",
        summary: "A tailored marketing direction informed by the business model and structured market analysis.",
        details: [
          "Marketing strategies are customized to the client’s business model and competitive context.",
          "Competitive analysis, SWOT analysis, the marketing mix and other relevant analysis inform a considered marketing strategy.",
        ],
      },
      {
        id: "08",
        slug: serviceSlugs[7],
        group: "strategy",
        title: "Customer Behavior Analysis & Strategies",
        summary: "A focused roadmap for understanding customer values and beliefs.",
        details: [
          "The service provides a roadmap for developing a clearer understanding of the values and beliefs that shape customer behavior.",
        ],
      },
      {
        id: "09",
        slug: serviceSlugs[8],
        group: "strategy",
        title: "Strategy Formulation & Development",
        summary: "Defining ambitions and strategic objectives that support the organization’s direction.",
        details: [
          "The service defines the right ambitions and strategic objectives to help an organization move forward.",
        ],
      },
      {
        id: "10",
        slug: serviceSlugs[9],
        group: "finance",
        title: "Pricing Strategies",
        summary: "Market analysis supporting a pricing approach relevant to the business.",
        details: [
          "List pricing directly influences sales, while market analysis provides a basis for defining a relevant pricing strategy.",
        ],
      },
      {
        id: "11",
        slug: serviceSlugs[10],
        group: "finance",
        title: "Personal Financial Advisory",
        summary: "A personal income and financial assessment directed toward an individual financial goal.",
        details: [
          "The process assesses personal income and finances, then prepares a plan intended to support progress toward a stated financial goal.",
        ],
      },
      {
        id: "12",
        slug: serviceSlugs[11],
        group: "technology",
        title: "IT Consultancy",
        summary: "Technology assessment that clarifies the IT environment in relation to business goals.",
        details: [
          "Information-technology assessments help organizations understand their current IT environment and its ability to support key business goals and objectives.",
        ],
      },
      {
        id: "13",
        slug: serviceSlugs[12],
        group: "technology",
        title: "Human Capital Development",
        summary: "Support for defining the principles, rules and guidelines behind human-resources processes.",
        details: [
          "The service supports formulation of company HR policies and the principles, rules and guidelines on which HR processes are defined.",
        ],
      },
    ],
  },
  ar: {
    interface: {
      explorePage: "استكشف الفصل الكامل",
      exploreAbout: "استكشف صفحة من نحن",
      exploreServices: "استعرض جميع الخدمات",
      exploreProjects: "ناقش مشروعاً",
      exploreMarkets: "استكشف أسواقنا",
      exploreContact: "عرض بيانات التواصل",
      sourceReference: "نظرة عامة على الخدمة",
      reviewRequired: "نطاق الخدمة",
      backToServices: "العودة إلى جميع الخدمات",
      previousService: "الخدمة السابقة",
      nextService: "الخدمة التالية",
      viewService: "عرض الخدمة",
    },
    aboutPage: {
      introductionLabel: "من نحن",
      introductionTitle: "تفكير عملي للقرارات المؤثرة في الأعمال.",
      introduction: [
        "تقدم مجموعة ERTKAZ استشارات نمو الأعمال والإدارة، وتطور استراتيجيات عملية مصممة وفق متطلبات كل مؤسسة.",
        "يرتكز نهجها على التعاون الوثيق والفهم الواضح لتحديات الأعمال ودعم المراحل المناسبة من التطور والتوسع.",
      ],
      missionLabel: "الرسالة",
      missionTitle: "مساعدة الأفراد والمؤسسات على الازدهار في عالم متغيّر.",
      mission: [
        "إرشاد العملاء في قراراتهم ومساعدتهم على الاستفادة من الفرص ذات القيمة.",
        "ربط الأفكار وصناعة الإمكانات وبناء العلاقات من خلال نهج شخصي.",
        "دعم العملاء في المراحل المناسبة من التطور والتوسع.",
      ],
      visionLabel: "الرؤية",
      visionTitle: "حلول مدروسة تنطلق من المتطلبات الفعلية.",
      vision: [
        "تحليل متطلبات العملاء قبل تطوير استجابة مدروسة وفعالة ومتوافقة.",
        "الحفاظ على التركيز ضمن نطاق متطلبات كل عميل.",
        "الوفاء بالالتزامات وبناء قيمة لفرق العملاء وعملائهم.",
      ],
      valuesLabel: "القيم الأساسية",
      valuesTitle: "أربعة مبادئ توجه العمل.",
      values: ["النزاهة", "التميّز", "الالتزام", "التركيز على النتائج"],
      sectorsLabel: "المنظور القطاعي",
      sectorsTitle: "منظور عابر للقطاعات.",
      sectorsIntro: "رؤية متعددة التخصصات عبر القطاعات التالية.",
      sectors: [
        "النفط والغاز",
        "المطاعم",
        "الفنادق",
        "الأغذية والمشروبات",
        "الرعاية الصحية",
        "البيع بالتجزئة والتوزيع",
        "التأمين",
        "الخدمات المالية",
        "مواد البناء",
        "المقاولات الصناعية والتصنيع",
        "القطاع غير الربحي",
      ],
      leadershipLabel: "القيادة",
      leadershipName: "Dr. Mohammed M. Sheaitani",
      leadershipRole: "المؤسس / الرئيس التنفيذي",
      leadershipCredentialsLabel: "المؤهلات الواردة في ملف الشركة",
      leadershipCredentials: "PhD, MBA, BC, SA, MC, CA, BSC",
      leadershipContactLabel: "التواصل التنفيذي",
    },
    servicesPage: {
      indexLabel: "الدليل الاستشاري الكامل",
      countLabel: "13 خدمة / أربعة مجالات",
      introduction: "نظرة متكاملة على الخدمات الاستشارية، منظمة لتصفح واضح ومباشر.",
      groups: {
        transformation: { label: "تحول الأعمال", description: "إعادة الهيكلة والاستشارات الإدارية وتأسيس الأعمال." },
        finance: { label: "التمويل والنمو", description: "دراسات الجدوى والنمذجة والتسعير والاستشارات المالية الشخصية." },
        strategy: { label: "السوق والاستراتيجية", description: "الامتياز والتسويق والعملاء والاستراتيجية المؤسسية." },
        technology: { label: "التقنية والأفراد", description: "تقنية المعلومات وتنمية رأس المال البشري." },
      },
    },
    marketsPage: {
      label: "منظور إقليمي",
      title: "منظور يشمل خمسة أسواق ومناطق.",
      introduction: "يمتد منظورنا الإقليمي عبر الإمارات العربية المتحدة وسلطنة عُمان والشرق الأوسط والمملكة العربية السعودية وأفريقيا.",
      clarification: "نفكر عالمياً ونعمل محلياً.",
      markets: [
        { name: "الإمارات العربية المتحدة", type: "دولة", code: "UAE" },
        { name: "سلطنة عُمان", type: "دولة", code: "OMN" },
        { name: "الشرق الأوسط", type: "منطقة", code: "MENA" },
        { name: "المملكة العربية السعودية", type: "دولة", code: "KSA" },
        { name: "أفريقيا", type: "منطقة", code: "AFR" },
      ],
    },
    homeHighlights: {
      label: "الرسالة / الرؤية / القيم",
      title: "تركيز على القرارات المدروسة والعلاقات المستدامة والقيمة العملية.",
      values: ["النزاهة", "التميّز", "الالتزام", "التركيز على النتائج"],
      note: "مبادئ توجه عملاً مدروساً وعملياً.",
    },
    homeMarkets: {
      label: "الأسواق الإقليمية",
      title: "الإمارات · عُمان · الشرق الأوسط · السعودية · أفريقيا",
      note: "نفكر عالمياً ونعمل محلياً.",
    },
    services: [
      {
        id: "01",
        slug: serviceSlugs[0],
        group: "transformation",
        title: "إعادة هيكلة الأعمال والمشاريع",
        summary: "تقييم التحديات المالية والتشغيلية للمساعدة في تحديد مسار مدروس للمضي قدماً.",
        details: [
          "تتراوح الحالات بين المعالجات المباشرة والمسائل الأكثر تعقيداً، بما في ذلك ما قد يشمل أكثر من ولاية قضائية دولية.",
          "يرتكز العمل على تقييم متخصص للمشكلات المالية والتشغيلية وفهم القضايا المعقدة لتخطيط المسار المناسب للأعمال.",
        ],
      },
      {
        id: "02",
        slug: serviceSlugs[1],
        group: "transformation",
        title: "استشارات الأعمال والإدارة",
        summary: "استشارات موجهة تستند إلى تحليل المؤسسة وأهدافها الاستراتيجية ومؤشرات الأداء ذات الصلة.",
        details: [
          "تبدأ المشورة الاستشارية ببناء فهم حقيقي للأعمال وقضاياها وتحدياتها وخطط نموها طويلة الأجل.",
          "وتشمل العملية التحليل المتعمق للمؤسسة وأهدافها وغاياتها الاستراتيجية وتحديد مؤشرات الأداء الرئيسية المناسبة لمستوياتها المختلفة.",
        ],
      },
      {
        id: "03",
        slug: serviceSlugs[2],
        group: "transformation",
        title: "تأسيس الأعمال التجارية وتسجيل الشركات",
        summary: "إرشاد حول النشاط والموقع والشكل القانوني واعتبارات تسجيل الشركة.",
        details: [
          "يشمل النطاق تحديد النشاط التجاري المجدي واختيار الموقع والنوع المناسب للكيان القانوني.",
          "كما يغطي اعتبارات تسجيل الشركة وبناء هويتها التجارية.",
        ],
      },
      {
        id: "04",
        slug: serviceSlugs[3],
        group: "finance",
        title: "دراسة الجدوى",
        summary: "تحليل منظم للمشروع يشمل الاحتياجات التشغيلية والتمويل واستراتيجية التسويق.",
        details: [
          "توفر دراسة الجدوى أساساً لعرض المشروع أمام المستثمرين المحتملين.",
          "ويشمل نطاقها ملخصاً مفصلاً للمشروع يغطي متطلبات التشغيل والتمويل واستراتيجية التسويق والنظر في ربحيته المحتملة.",
        ],
      },
      {
        id: "05",
        slug: serviceSlugs[4],
        group: "finance",
        title: "النمذجة المالية",
        summary: "تخطيط النماذج المالية وهيكلتها وتحليلها بما يتوافق مع أهداف محددة.",
        details: [
          "تتضمن العملية العمل عن كثب مع العملاء لتخطيط نموذج مالي مخصص وهيكلته وتحليله.",
          "وتساعد قواعد التصميم العملية والمنظمة على مواءمة النموذج مع أهداف العميل.",
        ],
      },
      {
        id: "06",
        slug: serviceSlugs[5],
        group: "strategy",
        title: "هيكلة الامتياز التجاري",
        summary: "التخطيط لتحويل نموذج أعمال قائم إلى نظام امتياز قابل للتوسع.",
        details: [
          "يحوّل تطوير الامتياز نموذج أعمال قائماً إلى نظام امتياز تجاري.",
          "ويحدد التخطيط والاستراتيجية الفرصة ويصوغان النموذج ويختاران النهج المناسب لإطلاق علامة امتياز قابلة للتوسع.",
        ],
      },
      {
        id: "07",
        slug: serviceSlugs[6],
        group: "strategy",
        title: "استراتيجية التسويق",
        summary: "توجه تسويقي مخصص يستند إلى نموذج الأعمال وتحليل منظم للسوق.",
        details: [
          "تُخصص استراتيجيات التسويق بما يتناسب مع نموذج أعمال العميل وسياقه التنافسي.",
          "ويسهم التحليل التنافسي وتحليل SWOT والمزيج التسويقي وغيرها من التحليلات ذات الصلة في بناء استراتيجية تسويق مدروسة.",
        ],
      },
      {
        id: "08",
        slug: serviceSlugs[7],
        group: "strategy",
        title: "تحليل سلوك العملاء واستراتيجياته",
        summary: "خارطة طريق مركزة لفهم قيم العملاء ومعتقداتهم.",
        details: [
          "توفر الخدمة خارطة طريق لبناء فهم أوضح للقيم والمعتقدات التي تشكل سلوك العملاء.",
        ],
      },
      {
        id: "09",
        slug: serviceSlugs[8],
        group: "strategy",
        title: "صياغة الاستراتيجية وتطويرها",
        summary: "تحديد الطموحات والأهداف الاستراتيجية التي تدعم توجه المؤسسة.",
        details: [
          "تحدد الخدمة الطموحات المناسبة والأهداف الاستراتيجية التي تساعد المؤسسة على التقدم.",
        ],
      },
      {
        id: "10",
        slug: serviceSlugs[9],
        group: "finance",
        title: "استراتيجيات التسعير",
        summary: "تحليل السوق لدعم منهج تسعير يتناسب مع طبيعة الأعمال.",
        details: [
          "يؤثر سعر البيع مباشرة في المبيعات، ويوفر تحليل السوق أساساً لتحديد استراتيجية تسعير ذات صلة بالأعمال.",
        ],
      },
      {
        id: "11",
        slug: serviceSlugs[10],
        group: "finance",
        title: "استشارات مالية شخصية",
        summary: "تقييم للدخل والوضع المالي الشخصي بهدف التقدم نحو غاية مالية فردية.",
        details: [
          "تبدأ العملية بتقييم الدخل الشخصي وتحليل الأوضاع المالية، ثم إعداد خطة تهدف إلى دعم التقدم نحو هدف مالي محدد.",
        ],
      },
      {
        id: "12",
        slug: serviceSlugs[11],
        group: "technology",
        title: "استشارات تكنولوجيا المعلومات",
        summary: "تقييم تقني يوضح بيئة تكنولوجيا المعلومات وعلاقتها بأهداف الأعمال.",
        details: [
          "تساعد تقييمات تكنولوجيا المعلومات المؤسسات على فهم بيئتها التقنية الحالية ومدى دعمها للأهداف والغايات الرئيسية للأعمال.",
        ],
      },
      {
        id: "13",
        slug: serviceSlugs[12],
        group: "technology",
        title: "تنمية رأس المال البشري والموارد البشرية",
        summary: "دعم تحديد المبادئ والقواعد والإرشادات التي تستند إليها عمليات الموارد البشرية.",
        details: [
          "تدعم الخدمة صياغة سياسات الموارد البشرية والمبادئ والقواعد والإرشادات التي تُبنى عليها عمليات الموارد البشرية.",
        ],
      },
    ],
  },
};

export function getService(locale: Locale, slug: string) {
  return profileContent[locale].services.find((service) => service.slug === slug);
}

export function getServiceNeighbors(locale: Locale, slug: string) {
  const services = profileContent[locale].services;
  const index = services.findIndex((service) => service.slug === slug);
  if (index < 0) return null;

  return {
    previous: services[(index - 1 + services.length) % services.length],
    next: services[(index + 1) % services.length],
  };
}
