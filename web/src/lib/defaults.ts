// Fallback content matching the existing static HTML site.
// Used when Sanity hasn't been set up yet or a field is empty.
// Once editors fill in content via Sanity Studio, those values
// override these defaults automatically.

export const site = {
  brandName: "Toria's",
  brandSuffix: 'Hub',
  navLinks: [
    {label: 'Home', href: '/'},
    {label: 'About', href: '/about'},
    {label: 'Programs', href: '/programs'},
    {label: 'Insights', href: '/stories'},
    {label: 'Contact', href: '/contact'},
  ],
  navCta: {label: 'GET INVOLVED', href: '/get-involved', style: 'teal', size: 'sm'},
  footerTagline:
    'An African world where youth are proportionally represented as digital and technical leaders. Empowering young people to excel in technology since 2016.',
  footerColumns: [
    {
      heading: 'Organisation',
      links: [
        {label: 'About Us', href: '/about'},
        {label: 'Our Team', href: '/about#team'},
        {label: 'Mission & Vision', href: '/about'},
        {label: 'Recognition', href: '/about'},
      ],
    },
    {
      heading: 'Programs',
      links: [
        {label: 'YouthCoding', href: '/programs#youthcoding'},
        {label: 'Youth in AI', href: '/programs#youth-in-ai'},
        {label: 'Young Women in AI', href: '/programs#women-in-ai'},
        {label: 'AI Teachers Fellowship', href: '/programs#teachers'},
        {label: 'All Programs', href: '/programs'},
      ],
    },
  ],
  socialLinks: [
    {network: 'twitter', url: 'https://twitter.com/'},
    {network: 'facebook', url: 'https://facebook.com/'},
    {network: 'linkedin', url: 'https://linkedin.com/'},
  ],
  copyright: '© 2026 Toria\'s Hub Youth Foundation. All rights reserved.',
  footerSubline: 'Empowering African youth in the digital and AI-driven future.',
  email: 'info@toriashub.org',
  phone: '+234 000 000 0000',
  address: 'Lagos, Nigeria',
}

export const home = {
  seo: {
    title: "Toria's Hub — Empowering African Youth in the Digital & AI Economy",
    description:
      "Toria's Hub equips African youth with digital skills, AI literacy, and mentorship to thrive in the evolving technology landscape.",
  },
  heroEyebrow: 'TE Limited · Driving Media & Creativity',
  heroTitleLine1: 'Building Brands.',
  heroTitleLine2: 'Empowering People.',
  heroTitleLine3: 'Creating Impact.',
  heroSubtitle:
    'TE Limited is a dynamic media, communication, and capacity-building company delivering professional hosting and event moderation services, media production, strategic media consultation, and transformative training programs for individuals, brands, organizations, youths in underserved communities and marginalized groups.',
  heroSlides: [
    {url: '/assets/gallery/speaking-event.jpg'},
    {url: '/assets/gallery/school-visit.jpg'},
    {url: '/assets/gallery/hero-1.jpg'},
    {url: '/assets/gallery/speakers-network.jpg'},
    {url: '/assets/gallery/girls-1.jpeg'},
    {url: '/assets/gallery/orphanage-visit.jpg'},
    {url: '/assets/gallery/community-market.jpg'},
  ],
  heroCtas: [
    {label: 'Explore Programs', href: '/programs', style: 'teal', size: 'lg'},
    {label: 'Work With Us', href: '/contact', style: 'outline', size: 'lg'},
  ],
  stats: [
    {value: '5+ Years', label: 'Industry Experience'},
    {value: '500+ People', label: 'Trained Through Programs'},
    {value: '8+ Years', label: 'Youth & Community Impact'},
    {value: '50+', label: 'Projects Executed'},
    {value: 'Multiple', label: 'Public & Private Sector Clients'},
  ],
  partnersLabel: 'Funded By',
  partnersImages: [
    {image: {url: '/assets/partners/funded-by-eu.jpg'}, alt: 'Funded by the European Union'},
  ],
  missionLabel: 'Why This Work Matters',
  missionHeading: 'Closing the gap in the digital economy',
  missionParagraphs: [
    'Artificial intelligence and digital technologies are transforming industries and redefining the future of work.',
    'Yet young people remain significantly underrepresented in technology fields, particularly across developing economies.',
    'Toria\'s Hub works to ensure African girls and young women gain the skills, mentorship, and opportunities needed to participate fully in the digital economy.',
  ],
  missionImage: {url: '/assets/gallery/community-meeting.jpg'},
  missionImageAlt: "Youth at Toria's Hub",
  missionCtas: [
    {label: 'Learn About Us', href: '/about', style: 'outline'},
    {label: 'Download Impact Report', href: '#lead', style: 'outline'},
  ],
  awardTitle: 'Youth Empowerment Award 2023',
  awardSubtitle: 'Recognised globally for the YouthCoding project',
  programsLabel: 'Our Programs',
  programsHeading: 'Programs that change lives',
  programCards: [
    {
      chip: 'Training & Capacity Development',
      title: 'TE Mastery Hub',
      description:
        'Our training arm — helping individuals, teams, and brands build modern skills in digital media, virtual events management, public speaking, presentation, and digital marketing strategy.',
      image: {url: '/assets/gallery/school-visit.jpg'},
      imageAlt: 'TE Mastery Hub training',
      cta: {label: 'See Courses', href: '/programs#mastery-hub'},
    },
    {
      chip: 'Youth Empowerment · TCCSDAE',
      title: 'NextGen Creatives',
      description:
        'Transformative coaching for creative skill development and entrepreneurship — equipping underserved youth with practical media and creative skills for income generation and self-reliance.',
      image: {url: '/assets/gallery/community-market.jpg'},
      imageAlt: 'NextGen Creatives program',
      cta: {label: 'Learn More', href: '/programs#nextgen-creatives'},
    },
    {
      chip: 'Inclusion & Empowerment',
      title: 'TransformHer Initiative',
      description:
        'Empowering young women, girls, and marginalized groups with creative, digital, and entrepreneurial skills while promoting inclusion, confidence, and active participation in society.',
      image: {url: '/assets/gallery/woman-ai.jpg'},
      imageAlt: 'TransformHer Initiative',
      cta: {label: 'Learn More', href: '/programs#transformher'},
    },
    {
      chip: 'Outreach & Care',
      title: 'Community Impact Projects',
      description:
        'Meaningful community-centered initiatives — orphanage outreach, mental health awareness for children and youth, community support, and seasonal giving programs.',
      image: {url: '/assets/gallery/community-meeting.jpg'},
      imageAlt: 'Community Impact Projects',
      cta: {label: 'See Projects', href: '/programs#community-impact'},
    },
  ],
  programsFooterCta: {label: 'View All Programs', href: '/programs', style: 'teal', size: 'lg'},
  philosophyLabel: 'Our Impact Ecosystem',
  philosophyHeading: 'Practical pathways for real growth',
  philosophyIntro:
    'TE Limited creates practical pathways for growth by combining media, skills development, visibility, entrepreneurship, and community empowerment.',
  philosophyCards: [
    {title: 'Skills Development', description: 'Training individuals and communities with practical, income-relevant skills.'},
    {title: 'Media Excellence', description: 'Helping brands and organizations communicate with impact.'},
    {title: 'Youth Empowerment', description: 'Creating opportunities for young people through media, creative, and digital training.'},
    {title: 'Women & Inclusion', description: 'Supporting women, girls, and marginalized groups with access, confidence, and skills.'},
    {title: 'Entrepreneurship Growth', description: 'Teaching monetization, business thinking, and sustainable income pathways.'},
    {title: 'Community Impact', description: 'Driving outreach projects that improve wellbeing and social development.'},
  ],
  storiesLabel: 'Latest Impact Stories',
  storiesHeading: 'From the field',
  storyCards: [
    {
      category: 'Speaking Engagement',
      title: 'First Class Speakers Network, Abuja',
      description:
        'TE Limited hosted and spoke at a leadership engagement for young corps members — practical insights on communication, confidence, and personal branding.',
      image: {url: '/assets/gallery/speakers-network.jpg'},
      imageAlt: 'First Class Speakers Network engagement',
      link: '/stories',
    },
    {
      category: 'Community Impact',
      title: "Outreach at Mother Theresa Children's Home",
      description:
        "In partnership with Messentia Medicare Empowerment Foundation, we visited Mother Theresa Children's Home in Abuja for the 2025 Children's Day celebration.",
      image: {url: '/assets/gallery/orphanage-visit.jpg'},
      imageAlt: "Mother Theresa Children's Home outreach",
      link: '/stories',
    },
    {
      category: 'Events Leadership',
      title: 'TEDx Baze University — Speakers Management',
      description:
        "TE Limited's management team was invited to be part of the official Speakers Management Team for TEDx Baze University, coordinating speaker engagement.",
      image: {url: '/assets/gallery/speaking-event.jpg'},
      imageAlt: 'TEDx Baze University speakers management',
      link: '/stories',
    },
  ],
  ctaLabel: 'Get Involved',
  ctaHeading: 'Be part of the movement',
  ctaBody:
    "Whether you want to support a young person's journey, bring your organisation's resources, or help spread opportunity — there's a place for you here.",
  ctaButtons: [
    {label: 'Apply to a Program', href: '/programs', style: 'teal', size: 'lg'},
    {label: "Partner with Toria's Hub", href: '/get-involved', style: 'outline', size: 'lg'},
    {label: 'Support Our Work', href: '/get-involved#donate', style: 'outline', size: 'lg'},
  ],
  modalTitle: 'Download the Impact Report',
  modalSubtitle:
    'Enter your details to access our impact report — stories, data, and insights from across Africa.',
  modalButtonLabel: 'Download Report',
  modalPrivacyText: "We respect your privacy. No spam — just impact updates from Toria's Hub.",
}
