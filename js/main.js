/* ==========================================================================
   Moataz.dev — Portfolio Vanilla JavaScript
   Features:
   - Structured bilingual translations (EN / AR) via data-i18n attributes
   - Dynamic LTR / RTL HTML direction & Bootstrap 5.3 CSS CDN swap
   - Dark / Light mode toggle synced with Bootstrap 5.3 data-bs-theme
   - localStorage persistence for both language and theme
   - Graceful photo/thumbnail fallback & active scroll navigation
   ========================================================================== */

(function () {
  'use strict';

  // Bootstrap 5.3 CDN URLs for dynamic LTR / RTL switching
  const BOOTSTRAP_CDN = {
    ltr: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    rtl: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css',
  };

  const STORAGE_KEYS = {
    theme: 'portfolio_theme',
    lang: 'portfolio_lang',
  };

  // ========================================================================
  // EDIT HERE: All English & Arabic copy is centralized in this object.
  // Update any text value below and it will automatically update the UI.
  // ========================================================================
  const translations = {
    en: {
      meta: {
        title: 'Moataz.dev — Developer Portfolio',
        description:
          'Personal developer portfolio of Moataz AbdElmutaal, Full-Stack Web Developer specializing in Laravel, AWS cloud infrastructure, and responsive web interfaces.',
      },
      controls: {
        themeToggle: 'Toggle dark or light theme',
        langToggle: 'Switch language to Arabic',
        nextLangLabel: 'AR',
      },
      nav: {
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact',
      },
      hero: {
        role: 'Full-Stack Web Developer (Laravel & AWS)',
        name: 'Moataz AbdElmutaal',
        bio: 'I build reliable Laravel backend systems, manage scalable AWS cloud infrastructure, and craft clean, responsive web interfaces. By pairing solid engineering fundamentals with AI-assisted development workflows, I deliver production-ready applications with speed and precision.',
        downloadCv: 'Download My CV',
        viewGithub: 'View GitHub',
        photoHint: 'Laravel & AWS Engineer',
        focus1Label: 'Backend Engineering',
        focus1Value: 'PHP · Laravel · MySQL',
        focus2Label: 'Cloud Infrastructure',
        focus2Value: 'AWS EC2 · RDS · IAM',
        focus3Label: 'Frontend Systems',
        focus3Value: 'Bootstrap 5 · Vanilla JS',
        focus4Label: 'Delivery Workflow',
        focus4Value: 'Linux · Git · AI-Assisted',
      },
      skills: {
        kicker: 'Core Capabilities',
        title: 'Technical Skills',
        subtitle:
          'A focused full-stack toolkit covering backend architecture, cloud infrastructure, responsive UI engineering, and modern developer tooling.',
        backend: {
          title: 'Backend & Database Architecture',
          subtitle:
            'Building scalable, maintainable server-side systems and relational databases.',
          items: [
            {
              label: 'PHP 8+ & Laravel',
              detail: 'MVC Architecture, Eloquent ORM, Blade, Migrations & Seeders',
            },
            {
              label: 'System Capabilities',
              detail:
                'Multi-Tenancy, Role-Based Access Control (RBAC), RESTful APIs, Excel Data Import/Export',
            },
            {
              label: 'Databases',
              detail:
                'MySQL & MariaDB — Relational Schema Design, Indexing & Query Optimization',
            },
          ],
        },
        cloud: {
          title: 'Cloud Infrastructure & DevOps',
          subtitle: 'Deploying, securing, and scaling production web applications.',
          items: [
            {
              label: 'AWS Compute & Scaling',
              detail: 'EC2, AMIs, Launch Templates, Auto Scaling Groups',
            },
            {
              label: 'AWS Data & Security',
              detail:
                'Amazon RDS (MariaDB), IAM Policies, HTTPS / SSL & Domain Routing',
            },
            {
              label: 'Server & Automation',
              detail:
                'Linux Server Administration, Bash & Windows Batch Scripting, Standalone Offline Packaging',
            },
          ],
        },
        frontend: {
          title: 'Frontend Engineering',
          subtitle: 'Crafting clean, responsive, and accessible user interfaces.',
          items: [
            {
              label: 'Core Web',
              detail: 'Semantic HTML5, Modern CSS3 (Flexbox, Grid, CSS Variables)',
            },
            {
              label: 'UI & Styling',
              detail:
                'Bootstrap 5, Responsive Mobile-First Design, Dark/Light Theming',
            },
            {
              label: 'Interactivity & Localization',
              detail:
                'Vanilla JavaScript (ES6+), Bilingual Support (English LTR & Arabic RTL)',
            },
          ],
        },
        tools: {
          title: 'Tools & Development Workflow',
          subtitle:
            'Streamlining delivery with version control and modern productivity tooling.',
          items: [
            {
              label: 'Version Control & Deployment',
              detail: 'Git, GitHub, GitHub Pages, Composer',
            },
            {
              label: 'Environment & Debugging',
              detail: 'Local & Portable Dev Stacks (XAMPP), Browser DevTools',
            },
            {
              label: 'Modern Workflow',
              detail:
                'AI-Assisted Development, Code Refactoring & Workflow Automation',
            },
          ],
          aiTag: 'AI-Assisted Dev',
        },
      },
      projects: {
        kicker: 'Selected Work',
        title: 'Projects',
        subtitle:
          'Production-oriented full-stack systems backed by Laravel and AWS, alongside responsive frontend implementations built with clean semantic markup.',
        featuredCategory: 'Featured Full-Stack Systems',
        featuredCount: '02 Production Systems',
        frontendCategory: 'Frontend Showcases',
        frontendCount: '06 Responsive Templates',
        openProject: 'Open Project',
        viewProject: 'View Project',
        githubRepo: 'GitHub Repo',
        liveDemo: 'Live Demo',
        caseOverview: 'Documentation',
        healthCenter: {
          title: 'Pharmacy & Health Center Management System (POS)',
          desc: 'Comprehensive point-of-sale billing and clinical management platform featuring real-time inventory tracking, role-based access control, and offline desktop execution scripts for uninterrupted local operations.',
        },
        schoolSystem: {
          title: 'Cloud School Management System',
          desc: 'Cloud-hosted academic management platform deployed on AWS EC2 Linux servers with managed Amazon RDS database integration, automated backups, and secure custom domain configuration.',
        },
        agency: {
          title: 'Agency Design',
          desc: 'Modern creative agency landing page featuring structured service sections, crisp grid alignment, and mobile-first styling.',
        },
        leon: {
          title: 'Leon Design',
          desc: 'Minimalist creative studio template focused on generous whitespace, clean typographic rhythm, and fluid responsive cards.',
        },
        kasper: {
          title: 'Kasper Design',
          desc: 'Multi-section creative portfolio template with full-bleed hero overlays, structured pricing tables, and responsive gallery layouts.',
        },
        gaming: {
          title: 'Gaming Design',
          desc: 'Interactive gaming portal interface built with rich dark-surface contrast, structured content cards, and smooth hover transitions.',
        },
        bootcamp: {
          title: 'Bootcamp Design',
          desc: 'Responsive developer bootcamp landing page powered by Bootstrap 5 components, FAQ accordions, and enrollment modals.',
        },
        thebook: {
          title: 'The Book Design',
          desc: 'Clean e-book showcase and publishing page highlighting chapter previews, pricing editions, and balanced reading hierarchy.',
        },
      },
      contact: {
        kicker: 'Get In Touch',
        title: 'Contact',
        subtitle:
          'Open to full-stack web development roles, Laravel & AWS consulting, and collaborative engineering projects. Reach out directly through any channel below.',
        emailLabel: 'Email',
        linkedinLabel: 'LinkedIn',
        whatsappLabel: 'WhatsApp',
        githubLabel: 'GitHub',
      },
      footer: {
        rights: 'Moataz AbdElmutaal. All rights reserved.',
        backToTop: 'Back to top',
      },
    },

    ar: {
      meta: {
        title: 'Moataz.dev — معرض أعمال معتز عبد المتعال',
        description:
          'معرض الأعمال الشخصي لمعتز عبد المتعال، مطور ويب متكامل (Full-Stack) متخصص في Laravel والبنية السحابية AWS وتطوير واجهات الويب المتجاوبة.',
      },
      controls: {
        themeToggle: 'التبديل بين الوضع الداكن والفاتح',
        langToggle: 'التبديل إلى اللغة الإنجليزية',
        nextLangLabel: 'EN',
      },
      nav: {
        about: 'نبذة عني',
        skills: 'المهارات',
        projects: 'المشاريع',
        contact: 'التواصل',
      },
      hero: {
        role: 'مطور ويب متكامل (Laravel و AWS)',
        name: 'معتز عبد المتعال',
        bio: 'أبني أنظمة خلفية موثوقة باستخدام Laravel، وأدير بنية سحابية قابلة للتوسع على AWS، وأصمم واجهات مستخدم نظيفة ومتجاوبة. من خلال الجمع بين الأساسيات الهندسية المتينة وسير العمل المدعوم بالذكاء الاصطناعي، أقدم تطبيقات جاهزة للإنتاج بسرعة ودقة عالية.',
        downloadCv: 'تحميل السيرة الذاتية',
        viewGithub: 'حساب GitHub',
        photoHint: 'مهندس Laravel و AWS',
        focus1Label: 'تطوير الأنظمة الخلفية',
        focus1Value: 'PHP · Laravel · MySQL',
        focus2Label: 'البنية السحابية',
        focus2Value: 'AWS EC2 · RDS · IAM',
        focus3Label: 'تطوير الواجهات',
        focus3Value: 'Bootstrap 5 · Vanilla JS',
        focus4Label: 'بيئة وسير العمل',
        focus4Value: 'Linux · Git · تطوير مدعوم بالذكاء الاصطناعي',
      },
      skills: {
        kicker: 'القدرات الأساسية',
        title: 'المهارات التقنية',
        subtitle:
          'مجموعة مهارات متكاملة تغطي هندسة الأنظمة الخلفية، البنية السحابية، تطوير الواجهات المتجاوبة، وأدوات العمل الحديثة.',
        backend: {
          title: 'هندسة الأنظمة الخلفية وقواعد البيانات',
          subtitle:
            'بناء أنظمة خلفية قابلة للتوسع وسهلة الصيانة مع قواعد بيانات علائقية متينة.',
          items: [
            {
              label: 'PHP 8+ و Laravel',
              detail: 'معمارية MVC، و Eloquent ORM، وقوالب Blade، و Migrations و Seeders',
            },
            {
              label: 'قدرات الأنظمة',
              detail:
                'تعدد المستأجرين (Multi-Tenancy)، صلاحيات المستخدمين (RBAC)، واجهات RESTful APIs، واستيراد وتصدير بيانات Excel',
            },
            {
              label: 'قواعد البيانات',
              detail:
                'MySQL و MariaDB — تصميم المخططات العلائقية، الفهرسة (Indexing)، وتحسين أداء الاستعلامات',
            },
          ],
        },
        cloud: {
          title: 'البنية السحابية و DevOps',
          subtitle: 'نشر وتأمين وتوسيع تطبيقات الويب في بيئات الإنتاج السحابية.',
          items: [
            {
              label: 'الحوسبة والتوسع على AWS',
              detail: 'EC2، وصور AMIs، وقوالب الإطلاق (Launch Templates)، ومجموعات Auto Scaling',
            },
            {
              label: 'البيانات والأمان على AWS',
              detail:
                'Amazon RDS (MariaDB)، وسياسات IAM، وشهادات HTTPS / SSL وتوجيه النطاقات',
            },
            {
              label: 'إدارة الخوادم والأتمتة',
              detail:
                'إدارة خوادم Linux، وسكربتات Bash و Windows Batch، وتغليف الأنظمة للعمل المحلي دون إنترنت',
            },
          ],
        },
        frontend: {
          title: 'هندسة الواجهات الأمامية',
          subtitle: 'تصميم وبناء واجهات مستخدم نظيفة، متجاوبة، وسهلة الوصول.',
          items: [
            {
              label: 'أساسيات الويب',
              detail: 'HTML5 الدلالية، و CSS3 الحديثة (Flexbox و Grid ومتغيرات CSS)',
            },
            {
              label: 'الواجهات والتنسيق',
              detail:
                'Bootstrap 5، والتصميم المتجاوب (Mobile-First)، وتبديل الوضع الداكن والفاتح',
            },
            {
              label: 'التفاعل ودعم اللغات',
              detail:
                'Vanilla JavaScript (ES6+)، ودعم المواقع ثنائية اللغة (الإنجليزية LTR والعربية RTL)',
            },
          ],
        },
        tools: {
          title: 'الأدوات وسير العمل التطويري',
          subtitle:
            'تسريع تسليم المشاريع عبر إدارة الإصدارات وأدوات الإنتاجية الحديثة.',
          items: [
            {
              label: 'إدارة الإصدارات والنشر',
              detail: 'Git و GitHub و GitHub Pages و Composer',
            },
            {
              label: 'بيئة التطوير وتصحيح الأخطاء',
              detail: 'بيئات التطوير المحلية والمحمولة (XAMPP)، وأدوات مطوري المتصفح (DevTools)',
            },
            {
              label: 'سير العمل الحديث',
              detail:
                'التطوير المدعوم بالذكاء الاصطناعي، وإعادة هيكلة الشيفرة، وأتمتة مهام العمل',
            },
          ],
          aiTag: 'تطوير بالذكاء الاصطناعي',
        },
      },
      projects: {
        kicker: 'أبرز الأعمال',
        title: 'المشاريع',
        subtitle:
          'أنظمة ويب متكاملة مبنية على Laravel و AWS للاستخدام الفعلي، إلى جانب نماذج واجهات أمامية متجاوبة بهيكلة نظيفة.',
        featuredCategory: 'الأنظمة المتكاملة المميزة',
        featuredCount: '02 أنظمة متكاملة',
        frontendCategory: 'نماذج الواجهات الأمامية',
        frontendCount: '06 قوالب متجاوبة',
        openProject: 'فتح المشروع',
        viewProject: 'عرض المشروع',
        githubRepo: 'مستودع GitHub',
        liveDemo: 'معاينة مباشرة',
        caseOverview: 'التوثيق',
        healthCenter: {
          title: 'نظام إدارة الصيدلية والمركز الصحي (POS)',
          desc: 'منصة شاملة لنقاط البيع والفوترة وإدارة المراكز الصحية، تضم تتبعاً فورياً للمخزون، وصلاحيات متعددة للمستخدمين، وسكربتات تشغيل محلي للعمل دون اتصال بالإنترنت.',
        },
        schoolSystem: {
          title: 'نظام إدارة المدارس السحابي',
          desc: 'منصة سحابية لإدارة الشؤون المدرسية مستضافة على خوادم AWS EC2 بنظام Linux، مع ربط قاعدة بيانات Amazon RDS وإعداد آمن للنطاق والنسخ الاحتياطي.',
        },
        agency: {
          title: 'تصميم وكالة رقمية (Agency Design)',
          desc: 'صفحة هبوط حديثة لوكالة رقمية تضم أقساماً منظمة للخدمات، وتوزيعاً شبكياً دقيقاً، وتجاوباً كاملاً مع مختلف الشاشات.',
        },
        leon: {
          title: 'قالب ليون (Leon Design)',
          desc: 'قالب إبداعي بسيط يعتمد على المساحات البيضاء المريحة، والتسلسل الطباعي الواضح، وبطاقات عرض مرنة ومتجاوبة.',
        },
        kasper: {
          title: 'قالب كاسبر (Kasper Design)',
          desc: 'قالب معرض أعمال متعدد الأقسام يحتوي على واجهة رئيسية متكاملة، وجداول أسعار منظمة، ومعرض أعمال متجاوب.',
        },
        gaming: {
          title: 'واجهة بوابة ألعاب (Gaming Design)',
          desc: 'واجهة تفاعلية لمجتمع الألعاب بتباين داكن متوازن، وبطاقات محتوى منظمة، وتأثيرات حركة سلسة عند التفاعل.',
        },
        bootcamp: {
          title: 'صفحة معسكر برمجي (Bootcamp Design)',
          desc: 'صفحة هبوط متجاوبة لمعسكر تدريبي برمجي مبنية بمكونات Bootstrap 5 وقوائم الأسئلة الشائعة ونوافذ التسجيل.',
        },
        thebook: {
          title: 'صفحة عرض كتاب (The Book Design)',
          desc: 'صفحة تعريفية أنيقة لكتاب إلكتروني تستعرض فصول الكتاب، وباقات النسخ المتاحة، وتنسيقاً مريحاً للقراءة.',
        },
      },
      contact: {
        kicker: 'تواصل معي',
        title: 'التواصل',
        subtitle:
          'متاح لفرص عمل كمطور ويب متكامل، واستشارات Laravel و AWS، والمشاريع الهندسية المشتركة. يمكنك التواصل مباشرة عبر أي قناة أدناه.',
        emailLabel: 'البريد الإلكتروني',
        linkedinLabel: 'لينكدإن',
        whatsappLabel: 'واتساب',
        githubLabel: 'جيت هب',
      },
      footer: {
        rights: 'معتز عبد المتعال. جميع الحقوق محفوظة.',
        backToTop: 'العودة للأعلى',
      },
    },
  };

  /**
   * Resolve a dot-notated path (e.g. "skills.backendItems.0") from an object
   */
  function getTranslationValue(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc !== undefined && acc !== null ? acc[key] : undefined;
    }, obj);
  }

  /**
   * Apply selected language ('en' | 'ar'), swap LTR/RTL & Bootstrap CDN stylesheet
   */
  function applyLanguage(lang) {
    const normalizedLang = lang === 'ar' ? 'ar' : 'en';
    const dir = normalizedLang === 'ar' ? 'rtl' : 'ltr';
    const dict = translations[normalizedLang];

    document.documentElement.setAttribute('lang', normalizedLang);
    document.documentElement.setAttribute('dir', dir);

    // Dynamically swap Bootstrap CSS between standard LTR and RTL build
    const bootstrapLink = document.getElementById('bootstrap-css');
    if (bootstrapLink && bootstrapLink.getAttribute('href') !== BOOTSTRAP_CDN[dir]) {
      bootstrapLink.setAttribute('href', BOOTSTRAP_CDN[dir]);
    }

    // Update page title and meta description
    document.title = dict.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', dict.meta.description);
    }

    // Update all text elements marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = getTranslationValue(dict, key);
      if (typeof value === 'string') {
        el.textContent = value;
      }
    });

    // Update accessible aria-label attributes marked with data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      const value = getTranslationValue(dict, key);
      if (typeof value === 'string') {
        el.setAttribute('aria-label', value);
        el.setAttribute('title', value);
      }
    });

    // Update all language toggle button labels (shows target language: AR or EN)
    document.querySelectorAll('.lang-label').forEach(function (label) {
      label.textContent = dict.controls.nextLangLabel;
    });

    try {
      localStorage.setItem(STORAGE_KEYS.lang, normalizedLang);
    } catch (e) {
      // Ignore storage write errors
    }
  }

  /**
   * Apply color theme ('light' | 'dark') using Bootstrap 5.3 data-bs-theme
   */
  function applyTheme(theme) {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', normalizedTheme);

    document.querySelectorAll('.theme-icon').forEach(function (icon) {
      if (normalizedTheme === 'dark') {
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
      } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-stars');
      }
    });

    try {
      localStorage.setItem(STORAGE_KEYS.theme, normalizedTheme);
    } catch (e) {
      // Ignore storage write errors
    }
  }

  /**
   * Handle personal profile photo loading & graceful monogram fallback
   */
  function initProfilePhoto() {
    const frame = document.getElementById('profileFrame');
    const photo = document.getElementById('profilePhoto');
    const fallback = document.getElementById('profileFallback');

    if (!frame || !photo) return;

    function showPhoto() {
      frame.classList.add('has-photo');
      if (fallback) fallback.setAttribute('aria-hidden', 'true');
    }

    function showFallback() {
      frame.classList.remove('has-photo');
      if (fallback) fallback.setAttribute('aria-hidden', 'false');
    }

    photo.addEventListener('load', function () {
      if (photo.naturalWidth > 0) {
        showPhoto();
      } else {
        showFallback();
      }
    });

    photo.addEventListener('error', showFallback);

    // Handle cached image state
    if (photo.complete) {
      if (photo.naturalWidth > 0) {
        showPhoto();
      } else {
        showFallback();
      }
    }
  }

  /**
   * Graceful fallback for project thumbnails if an image file is not yet placed
   */
  function initProjectThumbnails() {
    document.querySelectorAll('.project-thumb-img').forEach(function (img) {
      const link = img.closest('.project-thumb-link');
      if (!link) return;

      img.addEventListener('error', function () {
        link.classList.add('is-fallback');
      });

      if (img.complete && img.naturalWidth === 0) {
        link.classList.add('is-fallback');
      }
    });
  }

  /**
   * Auto-close mobile Bootstrap Collapse navbar when a navigation link is clicked
   */
  function initMobileNavAutoClose() {
    const navbarCollapse = document.getElementById('mainNavbar');
    if (!navbarCollapse) return;

    navbarCollapse.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show') && window.bootstrap && window.bootstrap.Collapse) {
          const instance = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
          instance.hide();
        }
      });
    });
  }

  /**
   * Highlight active nav link based on current scroll section
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.site-header .nav-link');

    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              const isMatch = link.getAttribute('href') === '#' + activeId;
              link.classList.toggle('active', isMatch);
            });
          }
        });
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /**
   * Initialize portfolio state & event listeners on DOMContentLoaded
   */
  function init() {
    // 1. Restore saved theme (or system preference)
    let initialTheme = 'light';
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    } catch (e) {
      initialTheme = 'light';
    }
    applyTheme(initialTheme);

    // 2. Restore saved language (defaults to English)
    let initialLang = 'en';
    try {
      initialLang = localStorage.getItem(STORAGE_KEYS.lang) || 'en';
    } catch (e) {
      initialLang = 'en';
    }
    applyLanguage(initialLang);

    // 3. Bind Theme Toggle buttons (desktop & mobile)
    document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-bs-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    // 4. Bind Language Toggle buttons (desktop & mobile)
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('lang');
        applyLanguage(current === 'ar' ? 'en' : 'ar');
      });
    });

    // 5. Set dynamic copyright year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    // 6. Initialize media fallbacks & navigation UX
    initProfilePhoto();
    initProjectThumbnails();
    initMobileNavAutoClose();
    initScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
