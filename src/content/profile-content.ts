import type { Locale } from "@/lib/i18n/config";

export type ServiceGroupKey = "transformation" | "finance" | "strategy" | "technology";

export type ServiceProfile = {
  id: string;
  slug: string;
  group: ServiceGroupKey;
  sourcePages: [number, number];
  title: string;
  summary: string;
  details: string[];
  reviewNote?: string;
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
      exploreProjects: "View project placeholders",
      exploreMarkets: "Explore our markets",
      exploreContact: "View contact details",
      sourceReference: "Company profile source",
      reviewRequired: "Scope pending client confirmation",
      backToServices: "Back to all services",
      previousService: "Previous service",
      nextService: "Next service",
      viewService: "View service",
    },
    aboutPage: {
      introductionLabel: "Who we are",
      introductionTitle: "Practical thinking for consequential business decisions.",
      introduction: [
        "ERTKAZ GROUP is presented in the company profile as a business growth and management consulting practice focused on high-value advisory support and practical strategies tailored to each organization.",
        "The approved company statement describes a dynamic and innovative business-solutions partner committed to excellence, innovation, strategic goals and sustainable growth.",
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
      sectorsLabel: "Sectors named in the profile",
      sectorsTitle: "A cross-sector perspective.",
      sectorsIntro: "The company profile identifies the following sectors as areas of experience. No project counts, clients or outcomes are asserted here.",
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
    },
    servicesPage: {
      indexLabel: "Complete advisory index",
      countLabel: "13 services / four editorial groups",
      introduction: "The complete service index follows the identities and explanations in the 2022–2023 profile. Review labels identify statements whose public scope still requires client or regulatory confirmation.",
      groups: {
        transformation: { label: "Business transformation", description: "Restructuring, management consulting and business setup." },
        finance: { label: "Finance and growth", description: "Feasibility, modeling, pricing and personal financial advisory." },
        strategy: { label: "Market and strategy", description: "Franchise, marketing, customer and organizational strategy." },
        technology: { label: "Technology and people", description: "Information technology and human-capital development." },
      },
    },
    marketsPage: {
      label: "Regional perspective",
      title: "Five markets and regions named in the profile.",
      introduction: "The source profile lists the United Arab Emirates, Oman, the Middle East, Saudi Arabia and Africa as market references.",
      clarification: "These references describe the geography stated in the profile. They do not represent branch locations, operating licences, project counts or verified offices.",
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
      note: "A concise introduction to the principles presented in the company profile.",
    },
    homeMarkets: {
      label: "Regional markets",
      title: "UAE · Oman · Middle East · Saudi Arabia · Africa",
      note: "Geographic references are reproduced from the company profile without implying offices or completed assignments.",
    },
    services: [
      {
        id: "01",
        slug: serviceSlugs[0],
        group: "transformation",
        sourcePages: [9, 29],
        title: "Business Restructuring & Insolvency Services",
        summary: "Assessment of financial and operational challenges to help define a considered path forward.",
        details: [
          "The profile distinguishes between situations that are straightforward to resolve and more complex matters that may involve multiple international jurisdictions.",
          "It describes specialist assessment of financial and operational problems, supported by experience in understanding complex issues and planning a path for the business.",
        ],
        reviewNote: "Insolvency and multi-jurisdiction wording requires confirmation of jurisdictions, professional scope and any partner-delivered services before public promotion.",
      },
      {
        id: "02",
        slug: serviceSlugs[1],
        group: "transformation",
        sourcePages: [10, 30],
        title: "Business & Management Consultancy",
        summary: "Targeted consulting informed by organizational analysis, strategic goals and relevant performance indicators.",
        details: [
          "The profile describes developing a close understanding of the business, its issues and its long-term growth plans before shaping consulting advice.",
          "It also refers to in-depth organizational analysis, strategic goals and objectives, and the identification of relevant key performance indicators across the organization.",
        ],
        reviewNote: "The source phrase “member firms” is withheld until the company confirms its legal or network structure.",
      },
      {
        id: "03",
        slug: serviceSlugs[2],
        group: "transformation",
        sourcePages: [11, 31],
        title: "Business Setup",
        summary: "Profile-sourced guidance on activity, location, legal form and company-registration considerations.",
        details: [
          "The profile describes support in identifying a feasible business activity, considering a location and selecting an appropriate type of legal entity.",
          "It also references assistance with company registration and building the business identity.",
        ],
        reviewNote: "Registration and legal-entity support must be confirmed by jurisdiction and identified as direct or partner-delivered before publication as an active regulated service.",
      },
      {
        id: "04",
        slug: serviceSlugs[3],
        group: "finance",
        sourcePages: [12, 32],
        title: "Feasibility Study",
        summary: "Structured project analysis spanning operational needs, finance and marketing strategy.",
        details: [
          "The profile positions a feasibility study as a foundation for presenting a project to potential investors.",
          "Its described scope includes a detailed project summary covering operational requirements, finance and marketing strategy, with the aim of presenting the project and considering its potential profitability.",
        ],
      },
      {
        id: "05",
        slug: serviceSlugs[4],
        group: "finance",
        sourcePages: [13, 33],
        title: "Financial Modeling",
        summary: "Planning, structuring and analysis of financial models shaped around defined objectives.",
        details: [
          "The profile describes working closely with clients to plan, structure and analyze a customized financial-modeling process.",
          "It refers to practical, structured design rules intended to align the model with the client’s objectives.",
        ],
      },
      {
        id: "06",
        slug: serviceSlugs[5],
        group: "strategy",
        sourcePages: [14, 34],
        title: "Franchise Structuring",
        summary: "Planning the conversion of an existing business model into a scalable franchise system.",
        details: [
          "The profile defines franchise development as converting an existing business model into a franchise system.",
          "It describes planning and strategy to identify the opportunity, shape the model and determine an appropriate approach for launching and scaling a franchise brand.",
        ],
        reviewNote: "A third-party name appears in the English source. That attribution is withheld until ERTKAZ confirms the relationship or approves replacement wording.",
      },
      {
        id: "07",
        slug: serviceSlugs[6],
        group: "strategy",
        sourcePages: [15, 35],
        title: "Marketing Strategy",
        summary: "A tailored marketing direction informed by the business model and structured market analysis.",
        details: [
          "The profile describes marketing strategies customized to the client’s business model and competitive context.",
          "It identifies competitive analysis, SWOT analysis, the marketing mix and other relevant analysis as inputs to a considered marketing strategy.",
        ],
      },
      {
        id: "08",
        slug: serviceSlugs[7],
        group: "strategy",
        sourcePages: [16, 36],
        title: "Customer Behavior Analysis & Strategies",
        summary: "A focused roadmap for understanding customer values and beliefs.",
        details: [
          "The profile presents this service as a roadmap for developing a clearer understanding of the values and beliefs that shape customer behavior.",
        ],
      },
      {
        id: "09",
        slug: serviceSlugs[8],
        group: "strategy",
        sourcePages: [17, 37],
        title: "Strategy Formulation & Development",
        summary: "Defining ambitions and strategic objectives that support the organization’s direction.",
        details: [
          "The profile describes the service as defining the right ambitions and strategic objectives to help an organization move forward.",
        ],
      },
      {
        id: "10",
        slug: serviceSlugs[9],
        group: "finance",
        sourcePages: [18, 38],
        title: "Pricing Strategies",
        summary: "Market analysis supporting a pricing approach relevant to the business.",
        details: [
          "The profile notes the direct influence of list pricing on sales and describes market analysis as the basis for defining a relevant pricing strategy.",
        ],
      },
      {
        id: "11",
        slug: serviceSlugs[10],
        group: "finance",
        sourcePages: [19, 39],
        title: "Personal Financial Advisory",
        summary: "A profile-sourced personal income and financial assessment directed toward an individual financial goal.",
        details: [
          "The source describes assessing personal income and finances, then preparing a plan intended to support progress toward a stated financial goal.",
        ],
        reviewNote: "Public promotion requires confirmation of the licensed entity, permitted jurisdictions, approved wording and required financial-services disclaimers.",
      },
      {
        id: "12",
        slug: serviceSlugs[11],
        group: "technology",
        sourcePages: [20, 41],
        title: "IT Consultancy",
        summary: "Technology assessment that clarifies the IT environment in relation to business goals.",
        details: [
          "The profile describes information-technology assessments that help organizations understand their current IT environment and its ability to support key business goals and objectives.",
        ],
      },
      {
        id: "13",
        slug: serviceSlugs[12],
        group: "technology",
        sourcePages: [21, 40],
        title: "Human Capital Development",
        summary: "Support for defining the principles, rules and guidelines behind human-resources processes.",
        details: [
          "The shared English and Arabic source content describes support in formulating company HR policies and the principles, rules and guidelines on which HR processes are defined.",
        ],
        reviewNote: "Additional Arabic-only statements concerning labor-law alignment, compensation and benefits are withheld pending bilingual parity and jurisdictional review.",
      },
    ],
  },
  ar: {
    interface: {
      explorePage: "استكشف الفصل الكامل",
      exploreAbout: "استكشف صفحة من نحن",
      exploreServices: "استعرض جميع الخدمات",
      exploreProjects: "استعرض مساحات المشاريع",
      exploreMarkets: "استكشف أسواقنا",
      exploreContact: "عرض بيانات التواصل",
      sourceReference: "المصدر: الملف التعريفي للشركة",
      reviewRequired: "نطاق الخدمة بانتظار تأكيد العميل",
      backToServices: "العودة إلى جميع الخدمات",
      previousService: "الخدمة السابقة",
      nextService: "الخدمة التالية",
      viewService: "عرض الخدمة",
    },
    aboutPage: {
      introductionLabel: "من نحن",
      introductionTitle: "تفكير عملي للقرارات المؤثرة في الأعمال.",
      introduction: [
        "يقدّم الملف التعريفي مجموعة ERTKAZ بوصفها جهة متخصصة في استشارات نمو الأعمال والإدارة، تركز على تقديم دعم استشاري ذي قيمة عالية واستراتيجيات عملية مصممة وفق احتياجات كل مؤسسة.",
        "ويصف البيان المعتمد للشركة شريكاً ديناميكياً ومبتكراً في حلول الأعمال، يلتزم بالتميّز والابتكار ويدعم المؤسسات في تحقيق أهدافها الاستراتيجية ونموها المستدام.",
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
      sectorsLabel: "القطاعات المذكورة في الملف",
      sectorsTitle: "منظور عابر للقطاعات.",
      sectorsIntro: "يذكر الملف التعريفي القطاعات التالية بوصفها مجالات خبرة. ولا يقدّم هذا العرض أعداد مشاريع أو أسماء عملاء أو نتائج غير موثقة.",
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
    },
    servicesPage: {
      indexLabel: "الدليل الاستشاري الكامل",
      countLabel: "13 خدمة / أربع مجموعات تحريرية",
      introduction: "يتبع دليل الخدمات هويات الخدمات وشروحاتها الواردة في ملف 2022–2023. وتشير علامات المراجعة إلى العبارات التي ما زال نطاق نشرها بحاجة إلى تأكيد من العميل أو مراجعة تنظيمية.",
      groups: {
        transformation: { label: "تحول الأعمال", description: "إعادة الهيكلة والاستشارات الإدارية وتأسيس الأعمال." },
        finance: { label: "التمويل والنمو", description: "دراسات الجدوى والنمذجة والتسعير والاستشارات المالية الشخصية." },
        strategy: { label: "السوق والاستراتيجية", description: "الامتياز والتسويق والعملاء والاستراتيجية المؤسسية." },
        technology: { label: "التقنية والأفراد", description: "تقنية المعلومات وتنمية رأس المال البشري." },
      },
    },
    marketsPage: {
      label: "منظور إقليمي",
      title: "خمسة أسواق ومناطق يذكرها الملف التعريفي.",
      introduction: "يذكر الملف الإمارات العربية المتحدة وسلطنة عُمان والشرق الأوسط والمملكة العربية السعودية وأفريقيا كمراجع جغرافية للأسواق.",
      clarification: "تعكس هذه الأسماء النطاق الجغرافي المذكور في المصدر، ولا تعني وجود فروع أو تراخيص تشغيل أو أعداد مشاريع أو مكاتب موثقة.",
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
      note: "مقدمة موجزة للمبادئ الواردة في الملف التعريفي للشركة.",
    },
    homeMarkets: {
      label: "الأسواق الإقليمية",
      title: "الإمارات · عُمان · الشرق الأوسط · السعودية · أفريقيا",
      note: "نورد المراجع الجغرافية كما وردت في الملف من دون الإيحاء بوجود مكاتب أو مشاريع منجزة.",
    },
    services: [
      {
        id: "01",
        slug: serviceSlugs[0],
        group: "transformation",
        sourcePages: [9, 29],
        title: "إعادة هيكلة الأعمال والمشاريع",
        summary: "تقييم التحديات المالية والتشغيلية للمساعدة في تحديد مسار مدروس للمضي قدماً.",
        details: [
          "يميّز الملف بين الحالات التي يسهل التعامل معها والحالات الأكثر تعقيداً، بما في ذلك المسائل التي قد تشمل أكثر من ولاية قضائية دولية.",
          "كما يصف تقييماً متخصصاً للمشكلات المالية والتشغيلية وفهماً للقضايا المعقدة بما يساعد على تخطيط المسار المناسب للأعمال.",
        ],
        reviewNote: "يتطلب وصف الإعسار والعمل متعدد الولايات القضائية تأكيد النطاق المهني والدول المعنية وأي خدمات يقدمها شركاء قبل الترويج العام.",
      },
      {
        id: "02",
        slug: serviceSlugs[1],
        group: "transformation",
        sourcePages: [10, 30],
        title: "استشارات الأعمال والإدارة",
        summary: "استشارات موجهة تستند إلى تحليل المؤسسة وأهدافها الاستراتيجية ومؤشرات الأداء ذات الصلة.",
        details: [
          "يصف الملف بناء فهم حقيقي للأعمال وقضاياها وتحدياتها وخطط نموها طويلة الأجل قبل صياغة المشورة الاستشارية.",
          "ويتناول كذلك التحليل المتعمق للمؤسسة وأهدافها وغاياتها الاستراتيجية وتحديد مؤشرات الأداء الرئيسية المناسبة لمستوياتها المختلفة.",
        ],
        reviewNote: "حُجبت عبارة «الشركات الأعضاء» الواردة في المصدر إلى حين تأكيد الهيكل القانوني أو هيكل الشبكة.",
      },
      {
        id: "03",
        slug: serviceSlugs[2],
        group: "transformation",
        sourcePages: [11, 31],
        title: "تأسيس الأعمال التجارية وتسجيل الشركات",
        summary: "إرشاد مذكور في الملف حول النشاط والموقع والشكل القانوني واعتبارات تسجيل الشركة.",
        details: [
          "يصف الملف دعماً لتحديد النشاط التجاري المجدي واختيار الموقع والنوع المناسب للكيان القانوني.",
          "كما يشير إلى المساعدة في تسجيل الشركة وبناء هويتها التجارية.",
        ],
        reviewNote: "يجب تأكيد نطاق التسجيل والدعم القانوني بحسب الدولة، وتحديد ما إذا كانت الخدمة مباشرة أو عبر شركاء قبل نشرها كخدمة تنظيمية نشطة.",
      },
      {
        id: "04",
        slug: serviceSlugs[3],
        group: "finance",
        sourcePages: [12, 32],
        title: "دراسة الجدوى",
        summary: "تحليل منظم للمشروع يشمل الاحتياجات التشغيلية والتمويل واستراتيجية التسويق.",
        details: [
          "يقدّم الملف دراسة الجدوى كأساس لعرض المشروع أمام المستثمرين المحتملين.",
          "ويشمل نطاقها الموصوف ملخصاً مفصلاً للمشروع يغطي متطلبات التشغيل والتمويل واستراتيجية التسويق بهدف عرض المشروع والنظر في ربحيته المحتملة.",
        ],
      },
      {
        id: "05",
        slug: serviceSlugs[4],
        group: "finance",
        sourcePages: [13, 33],
        title: "النمذجة المالية",
        summary: "تخطيط النماذج المالية وهيكلتها وتحليلها بما يتوافق مع أهداف محددة.",
        details: [
          "يصف الملف العمل عن كثب مع العملاء لتخطيط عملية نمذجة مالية مخصصة وهيكلتها وتحليلها.",
          "ويشير إلى قواعد تصميم عملية ومنظمة تهدف إلى مواءمة النموذج مع أهداف العميل.",
        ],
      },
      {
        id: "06",
        slug: serviceSlugs[5],
        group: "strategy",
        sourcePages: [14, 34],
        title: "هيكلة الامتياز التجاري",
        summary: "التخطيط لتحويل نموذج أعمال قائم إلى نظام امتياز قابل للتوسع.",
        details: [
          "يعرّف الملف تطوير الامتياز بأنه تحويل نموذج أعمال قائم إلى نظام امتياز تجاري.",
          "ويصف التخطيط والاستراتيجية لتحديد الفرصة وصياغة النموذج واختيار النهج المناسب لإطلاق علامة امتياز قابلة للتوسع.",
        ],
        reviewNote: "يرد اسم جهة خارجية في المصدر الإنجليزي. حُجبت هذه النسبة إلى حين تأكيد العلاقة أو اعتماد صياغة بديلة من ERTKAZ.",
      },
      {
        id: "07",
        slug: serviceSlugs[6],
        group: "strategy",
        sourcePages: [15, 35],
        title: "استراتيجية التسويق",
        summary: "توجه تسويقي مخصص يستند إلى نموذج الأعمال وتحليل منظم للسوق.",
        details: [
          "يصف الملف استراتيجيات تسويق مخصصة تتناسب مع نموذج أعمال العميل وسياقه التنافسي.",
          "ويذكر التحليل التنافسي وتحليل SWOT والمزيج التسويقي وغيرها من التحليلات ذات الصلة كمدخلات لبناء استراتيجية تسويق مدروسة.",
        ],
      },
      {
        id: "08",
        slug: serviceSlugs[7],
        group: "strategy",
        sourcePages: [16, 36],
        title: "تحليل سلوك العملاء واستراتيجياته",
        summary: "خارطة طريق مركزة لفهم قيم العملاء ومعتقداتهم.",
        details: [
          "يقدم الملف هذه الخدمة كخارطة طريق لبناء فهم أوضح للقيم والمعتقدات التي تشكل سلوك العملاء.",
        ],
      },
      {
        id: "09",
        slug: serviceSlugs[8],
        group: "strategy",
        sourcePages: [17, 37],
        title: "صياغة الاستراتيجية وتطويرها",
        summary: "تحديد الطموحات والأهداف الاستراتيجية التي تدعم توجه المؤسسة.",
        details: [
          "يصف الملف هذه الخدمة بتحديد الطموحات المناسبة والأهداف الاستراتيجية التي تساعد المؤسسة على التقدم.",
        ],
      },
      {
        id: "10",
        slug: serviceSlugs[9],
        group: "finance",
        sourcePages: [18, 38],
        title: "استراتيجيات التسعير",
        summary: "تحليل السوق لدعم منهج تسعير يتناسب مع طبيعة الأعمال.",
        details: [
          "يشير الملف إلى أثر سعر البيع في المبيعات، ويصف تحليل السوق كأساس لتحديد استراتيجية تسعير ذات صلة بالأعمال.",
        ],
      },
      {
        id: "11",
        slug: serviceSlugs[10],
        group: "finance",
        sourcePages: [19, 39],
        title: "استشارات مالية شخصية",
        summary: "تقييم مذكور في الملف للدخل والوضع المالي الشخصي بهدف التقدم نحو غاية مالية فردية.",
        details: [
          "يصف المصدر تقييماً للدخل الشخصي وتحليلاً للأوضاع المالية، يتبعه إعداد خطة تهدف إلى دعم التقدم نحو هدف مالي محدد.",
        ],
        reviewNote: "يتطلب الترويج العام تأكيد الجهة المرخصة والدول المسموح بها والصياغة المعتمدة وإخلاءات المسؤولية اللازمة للخدمات المالية.",
      },
      {
        id: "12",
        slug: serviceSlugs[11],
        group: "technology",
        sourcePages: [20, 41],
        title: "استشارات تكنولوجيا المعلومات",
        summary: "تقييم تقني يوضح بيئة تكنولوجيا المعلومات وعلاقتها بأهداف الأعمال.",
        details: [
          "يصف الملف تقييمات لتكنولوجيا المعلومات تساعد المؤسسات على فهم بيئتها التقنية الحالية ومدى دعمها للأهداف والغايات الرئيسية للأعمال.",
        ],
      },
      {
        id: "13",
        slug: serviceSlugs[12],
        group: "technology",
        sourcePages: [21, 40],
        title: "تنمية رأس المال البشري والموارد البشرية",
        summary: "دعم تحديد المبادئ والقواعد والإرشادات التي تستند إليها عمليات الموارد البشرية.",
        details: [
          "يصف المحتوى المشترك في المصدرين الإنجليزي والعربي دعماً لصياغة سياسات الموارد البشرية والمبادئ والقواعد والإرشادات التي تُبنى عليها عمليات الموارد البشرية.",
        ],
        reviewNote: "حُجبت تفاصيل إضافية وردت بالعربية فقط حول التوافق مع قانون العمل والتعويضات والمزايا، إلى حين تحقيق التكافؤ بين اللغتين والمراجعة القانونية.",
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
