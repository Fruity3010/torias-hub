/* eslint-disable no-console */
/**
 * One-time seed: pushes the existing static-site content into Sanity.
 * Run with: `npm run seed` (inside studio/)
 *
 * Uses the user token that `sanity` already has (from `sanity login`)
 * thanks to `--with-user-token` in the npm script.
 */

import {createClient} from '@sanity/client'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.resolve(__dirname, '../../assets')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId) {
  console.error('SANITY_STUDIO_PROJECT_ID missing. Set it in .env and try again.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

const imageCache = new Map<string, string>()
async function uploadImage(relativePath: string): Promise<{_type: 'image'; asset: {_type: 'reference'; _ref: string}} | undefined> {
  if (imageCache.has(relativePath)) {
    return {_type: 'image', asset: {_type: 'reference', _ref: imageCache.get(relativePath)!}}
  }
  const abs = path.join(ASSETS_DIR, relativePath)
  if (!fs.existsSync(abs)) {
    console.warn(`! missing asset: ${relativePath}`)
    return undefined
  }
  const stream = fs.createReadStream(abs)
  const filename = path.basename(abs)
  console.log(`  uploading ${filename}…`)
  const asset = await client.assets.upload('image', stream, {filename})
  imageCache.set(relativePath, asset._id)
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  console.log(`Seeding Sanity (project ${projectId}, dataset ${dataset})…\n`)

  // ─── SITE SETTINGS ────────────────────────────────────────────
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'TE ',
    brandSuffix: 'Limited',
    navLinks: [
      {_key: 'n1', label: 'Home', href: '/'},
      {_key: 'n2', label: 'About', href: '/about'},
      {_key: 'n3', label: 'Services', href: '/services'},
      {_key: 'n4', label: 'Programs', href: '/programs'},
      {_key: 'n5', label: 'Insights', href: '/stories'},
      {_key: 'n6', label: 'Contact', href: '/contact'},
    ],
    navCta: {label: 'GET INVOLVED', href: '/get-involved', style: 'teal', size: 'sm'},
    footerTagline:
      'Media, communication, training, and community impact services for brands, organizations, and communities.',
    footerColumns: [
      {
        _key: 'fc1',
        heading: 'Organisation',
        links: [
          {_key: 'l1', label: 'About Us', href: '/about'},
          {_key: 'l2', label: 'Our Team', href: '/about#team'},
          {_key: 'l3', label: 'Mission & Vision', href: '/about'},
          {_key: 'l4', label: 'Recognition', href: '/about'},
        ],
      },
      {
        _key: 'fc2',
        heading: 'Programs',
        links: [
          {_key: 'l10', label: 'Services', href: '/services'},
          {_key: 'l5', label: 'YouthCoding', href: '/programs#youthcoding'},
          {_key: 'l6', label: 'Youth in AI', href: '/programs#youth-in-ai'},
          {_key: 'l7', label: 'Young Women in AI', href: '/programs#women-in-ai'},
          {_key: 'l8', label: 'AI Teachers Fellowship', href: '/programs#teachers'},
          {_key: 'l9', label: 'All Programs', href: '/programs'},
        ],
      },
    ],
    socialLinks: [
      {_key: 's1', network: 'twitter', url: 'https://twitter.com/'},
      {_key: 's2', network: 'facebook', url: 'https://facebook.com/'},
      {_key: 's3', network: 'linkedin', url: 'https://linkedin.com/'},
    ],
    copyright: '© 2026 TE Limited. All rights reserved.',
    footerSubline: 'Building brands, empowering people, and creating impact.',
    email: 'info@teltd.com.ng',
    phone: '+234 000 000 0000',
    address: 'Lagos, Nigeria',
  }

  // ─── HOME PAGE ────────────────────────────────────────────────
  console.log('Uploading home page images…')
  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      title: 'TE Limited | Media, Training & Community Impact',
      description:
        'TE Limited delivers media, communication, event hosting, training, and community impact services for brands, organizations, and communities.',
    },
    heroEyebrow: 'TE Limited · Driving Media & Creativity',
    heroTitleLine1: 'Building Brands.',
    heroTitleLine2: 'Empowering People.',
    heroTitleLine3: 'Creating Impact.',
    heroSubtitle:
      'TE Limited is a dynamic media, communication, and capacity-building company delivering professional hosting and event moderation services, media production, strategic media consultation, and transformative training programs for individuals, brands, organizations, youths in underserved communities and marginalized groups.',
    heroSlides: await Promise.all([
      'gallery/speaking-event.jpg',
      'gallery/school-visit.jpg',
      'gallery/hero-1.jpg',
      'gallery/speakers-network.jpg',
      'gallery/girls-1.jpeg',
      'gallery/orphanage-visit.jpg',
      'gallery/community-market.jpg',
    ].map(async (p, i) => ({_key: `slide${i}`, ...(await uploadImage(p)!)}))),
    heroCtas: [
      {_key: 'h1', label: 'Explore Programs', href: '/programs', style: 'teal', size: 'lg'},
      {_key: 'h2', label: 'Work With Us', href: '/contact', style: 'outline', size: 'lg'},
    ],
    stats: [
      {_key: 'st1', value: '5+ Years', label: 'Industry Experience'},
      {_key: 'st2', value: '500+ People', label: 'Trained Through Programs'},
      {_key: 'st3', value: '8+ Years', label: 'Youth & Community Impact'},
      {_key: 'st4', value: '50+', label: 'Projects Executed'},
      {_key: 'st5', value: 'Multiple', label: 'Public & Private Sector Clients'},
    ],
    partnersLabel: 'Funded By',
    partnersImages: [
      {_key: 'pi1', _type: 'partnerImage', image: await uploadImage('partners/funded-by-eu.jpg'), alt: 'Funded by the European Union'},
    ],
    missionLabel: 'Why This Work Matters',
    missionHeading: 'Closing the gap in the digital economy',
    missionParagraphs: [
      'Artificial intelligence and digital technologies are transforming industries and redefining the future of work.',
      'Yet young people remain significantly underrepresented in technology fields, particularly across developing economies.',
      'TE Limited works to ensure young people and underserved communities gain the skills, mentorship, and opportunities needed to participate fully in the creative and digital economy.',
    ],
    missionImage: await uploadImage('gallery/community-meeting.jpg'),
    missionImageAlt: 'Youth at a TE Limited community program',
    missionCtas: [
      {_key: 'm1', label: 'Learn About Us', href: '/about', style: 'outline'},
      {_key: 'm2', label: 'Download Impact Report', href: '#lead', style: 'outline'},
    ],
    awardTitle: 'Youth Empowerment Award 2023',
    awardSubtitle: 'Recognised globally for the YouthCoding project',
    programsLabel: 'Our Programs',
    programsHeading: 'Programs that change lives',
    programCards: [
      {
        _key: 'pc1', chip: 'Training & Capacity Development', title: 'TE Mastery Hub',
        description: 'Our training arm — helping individuals, teams, and brands build modern skills in digital media, virtual events management, public speaking, presentation, and digital marketing strategy.',
        image: await uploadImage('gallery/school-visit.jpg'), imageAlt: 'TE Mastery Hub training',
        cta: {label: 'See Courses', href: '/programs#mastery-hub', style: 'teal', size: 'md'},
      },
      {
        _key: 'pc2', chip: 'Youth Empowerment · TCCSDAE', title: 'NextGen Creatives',
        description: 'Transformative coaching for creative skill development and entrepreneurship — equipping underserved youth with practical media and creative skills for income generation and self-reliance.',
        image: await uploadImage('gallery/community-market.jpg'), imageAlt: 'NextGen Creatives program',
        cta: {label: 'Learn More', href: '/programs#nextgen-creatives', style: 'teal', size: 'md'},
      },
      {
        _key: 'pc3', chip: 'Inclusion & Empowerment', title: 'TransformHer Initiative',
        description: 'Empowering young women, girls, and marginalized groups with creative, digital, and entrepreneurial skills while promoting inclusion, confidence, and active participation in society.',
        image: await uploadImage('gallery/woman-ai.jpg'), imageAlt: 'TransformHer Initiative',
        cta: {label: 'Learn More', href: '/programs#transformher', style: 'teal', size: 'md'},
      },
      {
        _key: 'pc4', chip: 'Outreach & Care', title: 'Community Impact Projects',
        description: 'Meaningful community-centered initiatives — orphanage outreach, mental health awareness for children and youth, community support, and seasonal giving programs.',
        image: await uploadImage('gallery/community-meeting.jpg'), imageAlt: 'Community Impact Projects',
        cta: {label: 'See Projects', href: '/programs#community-impact', style: 'teal', size: 'md'},
      },
    ],
    programsFooterCta: {label: 'View All Programs', href: '/programs', style: 'teal', size: 'lg'},
    philosophyLabel: 'Our Impact Ecosystem',
    philosophyHeading: 'Practical pathways for real growth',
    philosophyIntro: 'TE Limited creates practical pathways for growth by combining media, skills development, visibility, entrepreneurship, and community empowerment.',
    philosophyCards: [
      {_key: 'ph1', title: 'Skills Development', description: 'Training individuals and communities with practical, income-relevant skills.'},
      {_key: 'ph2', title: 'Media Excellence', description: 'Helping brands and organizations communicate with impact.'},
      {_key: 'ph3', title: 'Youth Empowerment', description: 'Creating opportunities for young people through media, creative, and digital training.'},
      {_key: 'ph4', title: 'Women & Inclusion', description: 'Supporting women, girls, and marginalized groups with access, confidence, and skills.'},
      {_key: 'ph5', title: 'Entrepreneurship Growth', description: 'Teaching monetization, business thinking, and sustainable income pathways.'},
      {_key: 'ph6', title: 'Community Impact', description: 'Driving outreach projects that improve wellbeing and social development.'},
    ],
    storiesLabel: 'Latest Impact Stories',
    storiesHeading: 'From the field',
    storyCards: [
      {
        _key: 'sc1', category: 'Speaking Engagement', title: 'First Class Speakers Network, Abuja',
        description: 'TE Limited hosted and spoke at a leadership engagement for young corps members — practical insights on communication, confidence, and personal branding.',
        image: await uploadImage('gallery/speakers-network.jpg'), imageAlt: 'First Class Speakers Network engagement', link: '/stories',
      },
      {
        _key: 'sc2', category: 'Community Impact', title: "Outreach at Mother Theresa Children's Home",
        description: "In partnership with Messentia Medicare Empowerment Foundation, we visited Mother Theresa Children's Home in Abuja for the 2025 Children's Day celebration.",
        image: await uploadImage('gallery/orphanage-visit.jpg'), imageAlt: "Mother Theresa Children's Home outreach", link: '/stories',
      },
      {
        _key: 'sc3', category: 'Events Leadership', title: 'TEDx Baze University — Speakers Management',
        description: "TE Limited's management team was invited to be part of the official Speakers Management Team for TEDx Baze University, coordinating speaker engagement.",
        image: await uploadImage('gallery/speaking-event.jpg'), imageAlt: 'TEDx Baze University speakers management', link: '/stories',
      },
    ],
    ctaLabel: 'Get Involved',
    ctaHeading: 'Be part of the movement',
    ctaBody: "Whether you want to support a young person's journey, bring your organisation's resources, or help spread opportunity — there's a place for you here.",
    ctaButtons: [
      {_key: 'cb1', label: 'Apply to a Program', href: '/programs', style: 'teal', size: 'lg'},
      {_key: 'cb2', label: 'Partner with TE Limited', href: '/get-involved', style: 'outline', size: 'lg'},
      {_key: 'cb3', label: 'Support Our Work', href: '/get-involved#donate', style: 'outline', size: 'lg'},
    ],
    modalTitle: 'Download the Impact Report',
    modalSubtitle: 'Enter your details to access our impact report — stories, data, and insights from across Africa.',
    modalButtonLabel: 'Download Report',
    modalPrivacyText: 'We respect your privacy. No spam — just impact updates from TE Limited.',
  }

  // ─── ABOUT PAGE ───────────────────────────────────────────────
  console.log('Uploading about page images…')
  const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    seo: {title: 'About TE Limited', description: 'Learn about TE Limited, our media, training, communication, and community impact work.'},
    heroEyebrow: "About Toria's Hub",
    heroTitleLine1: "Building Africa's",
    heroTitleLine2: 'Digital Future',
    heroSubtitle: "Since 2016 we've worked with young people across Africa — equipping them with the skills, mentorship, and confidence to lead in the AI economy.",
    heroImage: await uploadImage('gallery/community-meeting.jpg'),
    storyLabel: 'Our Story',
    storyHeading: 'Started with a question, grew into a movement',
    storyParagraphs: [
      "Toria's Hub began with a simple question: where are the young African girls in the rooms where the future is being built? In 2016 we set out to answer it — first as a community, then as a programs organisation, now as an ecosystem serving girls, young women, and educators across the continent.",
      'What started as a handful of weekend coding workshops in Lagos has grown into a network spanning multiple countries, several flagship programs, and partnerships with leading global organisations working in technology and youth development.',
      'The mission has stayed the same. The scale has changed.',
    ],
    storyImage: await uploadImage('gallery/girlsinai.jpg'),
    storyImageAlt: "Toria's Hub story",
    mvvLabel: 'What Drives Us',
    mvvHeading: 'Mission, vision, values',
    mvvCards: [
      {_key: 'mv1', icon: 'target', title: 'Mission', description: 'To equip African girls, young women, and educators with the digital skills, AI literacy, and mentorship they need to thrive in the evolving technology economy.'},
      {_key: 'mv2', icon: 'eye', title: 'Vision', description: 'An African world where young people are proportionally represented as digital and technical leaders — building, shipping, and shaping the products that define the AI era.'},
      {_key: 'mv3', icon: 'star', title: 'Values', description: 'Access. Excellence. Community. Curiosity. We believe talent is universal but opportunity is not — and we work to close that gap, one program, one cohort, one young leader at a time.'},
    ],
    timelineLabel: 'Our Journey',
    timelineHeading: 'From 2016 to today',
    timelineItems: [
      {_key: 't1', year: '2016', title: "Toria's Hub is founded", description: 'A small community of young women hosting weekend coding sessions in Lagos.'},
      {_key: 't2', year: '2018', title: 'YouthCoding launches', description: 'Our flagship program goes formal — structured curriculum, mentor pairing, project showcases.'},
      {_key: 't3', year: '2021', title: 'Youth in AI program', description: 'We expand into AI literacy, introducing thousands of young learners to applied artificial intelligence.'},
      {_key: 't4', year: '2023', title: 'Youth Empowerment Award', description: 'YouthCoding recognised globally for its impact on the next generation of African developers.'},
      {_key: 't5', year: '2024', title: 'Young Women in AI Initiative', description: 'A dedicated program for women advancing in AI careers — learning, mentorship, and a powerful network.'},
      {_key: 't6', year: '2026', title: '5,000+ youth trained', description: 'A continent-wide ecosystem of programs, partners, and young leaders shaping the digital future.', active: true},
    ],
    teamLabel: 'Leadership',
    teamHeading: 'The team behind the work',
    teamIntro: 'A small group of people obsessed with one thing — making sure the next generation of African leaders builds the future, not just consumes it.',
    teamMembers: [
      {_key: 'tm1', name: 'Founder & Executive Director', role: 'Leadership · Strategy', bio: "Drives the long-term vision of Toria's Hub and its programs across Africa.", photo: await uploadImage('gallery/lady-lab-oby.jpg'), photoAlt: 'Founder portrait'},
      {_key: 'tm2', name: 'Programs Lead', role: 'Curriculum · Cohorts', bio: 'Designs and leads the YouthCoding and Youth in AI program experiences.', photo: await uploadImage('gallery/woman-ai.jpg'), photoAlt: 'Programs lead portrait'},
      {_key: 'tm3', name: 'Community & Mentorship', role: 'Network · Pairing', bio: 'Builds the mentor and alumni network that powers everything we do.', photo: await uploadImage('gallery/girls-1.jpeg'), photoAlt: 'Community lead portrait'},
      {_key: 'tm4', name: 'Partnerships & Outreach', role: 'Partners · Funding', bio: 'Leads partnerships with global organisations and funding institutions.', photo: await uploadImage('gallery/speaking-event.jpg'), photoAlt: 'Partnerships lead portrait'},
    ],
    stats: [
      {_key: 'as1', value: '5,000+', label: 'Youth Trained'},
      {_key: 'as2', value: 'Hundreds', label: 'Educators in AI'},
      {_key: 'as3', value: '8+ Yrs', label: 'Advancing Youth'},
      {_key: 'as4', value: '1M+', label: 'Global Audience'},
    ],
    ctaLabel: 'Join the Mission',
    ctaHeading: 'Help us build the next decade',
    ctaBody: "Every young leader we train is a small bet on a different future for Africa. Whether you mentor, partner, or fund — there's a place for you here.",
    ctaButtons: [
      {_key: 'acb1', label: 'Get Involved', href: '/get-involved', style: 'teal', size: 'lg'},
      {_key: 'acb2', label: 'Talk to the Team', href: '/contact', style: 'outline', size: 'lg'},
    ],
  }

  // ─── PROGRAMS PAGE ────────────────────────────────────────────
  console.log('Uploading programs page images…')
  const programsPage = {
    _id: 'programsPage',
    _type: 'programsPage',
    seo: {title: 'Programs | TE Limited', description: 'Explore TE Limited training, youth empowerment, creative development, and community impact programs.'},
    heroEyebrow: 'Our Programs',
    heroTitleLine1: 'Programs that',
    heroTitleLine2: 'change lives',
    heroSubtitle: "Four flagship programs forming a connected pathway — from a young person's first line of code to leadership in the AI economy.",
    heroImage: await uploadImage('gallery/school-visit.jpg'),
    overviewPills: [
      {_key: 'op1', title: 'YouthCoding', tag: 'Digital Skills', anchorId: 'youthcoding'},
      {_key: 'op2', title: 'Youth in AI', tag: 'AI Literacy', anchorId: 'youth-in-ai'},
      {_key: 'op3', title: 'Young Women in AI', tag: 'Career & Leadership', anchorId: 'women-in-ai'},
      {_key: 'op4', title: 'AI Teachers Fellowship', tag: 'Educator Training', anchorId: 'teachers'},
    ],
    programs: [
      {
        _key: 'pg1', anchorId: 'youthcoding', chip: 'Flagship · Digital Skills', title: 'YouthCoding',
        description: 'YouthCoding is our flagship program — coding and digital skills for African youth, delivered through hands-on, project-based learning. Cohorts run multiple times a year and culminate in a public showcase of student projects.',
        features: ['12-week structured curriculum', '1-on-1 mentor pairing', 'Project-based portfolios', 'Final showcase & certificate'],
        image: await uploadImage('gallery/school-visit.jpg'), imageAlt: 'YouthCoding program', imageOnRight: false,
        ctas: [{_key: 'c1', label: 'Apply to Cohort', href: '/contact', style: 'teal', size: 'md'}, {_key: 'c2', label: 'Become a Mentor', href: '/get-involved', style: 'outline', size: 'md'}],
      },
      {
        _key: 'pg2', anchorId: 'youth-in-ai', chip: 'AI Literacy', title: 'Youth in AI',
        description: 'A foundational program introducing young people to artificial intelligence — how it works, where it shows up in everyday life, and the career pathways it\'s opening up. Designed to build confidence with the language and tools of AI.',
        features: ['Intro to ML & LLM concepts', 'Hands-on tool exploration', 'Ethics & responsible AI', 'Industry guest speakers'],
        image: await uploadImage('gallery/community-market.jpg'), imageAlt: 'Youth in AI program', imageOnRight: true,
        ctas: [{_key: 'c3', label: 'Express Interest', href: '/contact', style: 'teal', size: 'md'}, {_key: 'c4', label: 'Sponsor a Cohort', href: '/get-involved', style: 'outline', size: 'md'}],
      },
      {
        _key: 'pg3', anchorId: 'women-in-ai', chip: 'Career & Leadership', title: 'Young Women in AI Initiative',
        description: 'A dedicated track for young women advancing in AI careers. Combines structured learning, mentor pairing with senior practitioners, and access to a growing network of women shaping the AI industry across Africa.',
        features: ['Senior mentor pairing', 'Career roadmapping', 'Speaking & visibility opportunities', 'Alumni leadership network'],
        image: await uploadImage('gallery/woman-ai.jpg'), imageAlt: 'Young Women in AI program', imageOnRight: false,
        ctas: [{_key: 'c5', label: 'Apply', href: '/contact', style: 'teal', size: 'md'}, {_key: 'c6', label: 'Mentor with Us', href: '/get-involved', style: 'outline', size: 'md'}],
      },
      {
        _key: 'pg4', anchorId: 'teachers', chip: 'Educator Training', title: 'AI Teachers Fellowship',
        description: "We can't reach every student — but every teacher we equip can. The Fellowship gives educators the curriculum, classroom resources, and community they need to confidently introduce AI literacy in their schools.",
        features: ['Ready-to-teach lesson kits', 'Peer fellowship cohort', 'Year-long classroom support', 'Recognition & alumni network'],
        image: await uploadImage('gallery/speaking-event.jpg'), imageAlt: 'AI Teachers Fellowship', imageOnRight: true,
        ctas: [{_key: 'c7', label: 'Apply as a Teacher', href: '/contact', style: 'teal', size: 'md'}, {_key: 'c8', label: 'Sponsor a School', href: '/get-involved', style: 'outline', size: 'md'}],
      },
    ],
    pathwayLabel: 'A Connected Pathway',
    pathwayHeading: 'Programs that build on each other',
    pathwayIntro: 'Each program stands alone — but together they form a pathway from first code to AI leadership.',
    pathwayNodes: [
      {_key: 'pn1', label: 'Code', subtitle: 'YouthCoding'},
      {_key: 'pn2', label: 'AI Awareness', subtitle: 'Youth in AI'},
      {_key: 'pn3', label: 'Career', subtitle: 'Women in AI'},
      {_key: 'pn4', label: 'Multiply', subtitle: 'Teachers Fellowship'},
    ],
    ctaLabel: 'Ready to Take Part?',
    ctaHeading: 'Find your place in our programs',
    ctaBody: "Whether you're 14 or 40, there's a way to be part of what we're building.",
    ctaButtons: [
      {_key: 'pcb1', label: 'Apply Now', href: '/contact', style: 'teal', size: 'lg'},
      {_key: 'pcb2', label: 'Mentor or Partner', href: '/get-involved', style: 'outline', size: 'lg'},
    ],
  }

  // ─── STORIES PAGE ─────────────────────────────────────────────
  console.log('Uploading stories page images…')
  const storiesPage = {
    _id: 'storiesPage',
    _type: 'storiesPage',
    seo: {title: 'Stories & Insights | TE Limited', description: 'Read TE Limited stories, insights, events, community updates, and impact highlights.'},
    heroEyebrow: 'Stories & Insights',
    heroTitleLine1: 'From the',
    heroTitleLine2: 'field',
    heroSubtitle: "Stories, reports, and reflections from the work — the young people we're learning with, the events we're showing up at, and the communities we're building inside.",
    heroImage: await uploadImage('gallery/speaking-event.jpg'),
    featured: {
      category: 'Featured · Speaking Engagement',
      title: 'Empowering Young Leaders at First Class Speakers Network, Abuja',
      description: 'TE Limited was invited to host and speak at a leadership engagement for young corps members in Abuja. We delivered practical insights on communication, confidence building, and personal branding while moderating the event experience.',
      image: await uploadImage('gallery/speakers-network.jpg'),
      imageAlt: 'First Class Speakers Network engagement',
      link: '#',
    },
    filters: [
      {_key: 'f1', label: 'Speaking', slug: 'speaking'},
      {_key: 'f2', label: 'Community Impact', slug: 'community'},
      {_key: 'f3', label: 'Events Leadership', slug: 'events'},
      {_key: 'f4', label: 'Brand Consulting', slug: 'brand'},
      {_key: 'f5', label: 'Youth Development', slug: 'youth'},
    ],
    stories: [
      {_key: 'sg1', category: 'Community Impact', filterSlug: 'community', title: "Outreach at Mother Theresa Children's Home", description: "In partnership with Messentia Medicare Empowerment Foundation, our team visited Mother Theresa Children's Home in Abuja to mark the 2025 Children's Day celebration.", image: await uploadImage('gallery/orphanage-visit.jpg'), imageAlt: "Mother Theresa Children's Home outreach", link: '#'},
      {_key: 'sg2', category: 'School Outreach', filterSlug: 'community', title: 'Mental Health Awareness for Primary & Secondary Students', description: 'Alongside The Refuge Foundation and Messentia Medicare Empowerment Foundation, TE Limited led a mental health awareness outreach for World Mental Health Day — safe conversations on emotional wellbeing, confidence, stress management, and seeking help.', image: await uploadImage('gallery/school-visit.jpg'), imageAlt: 'Mental Health Awareness school outreach', link: '#'},
      {_key: 'sg3', category: 'Social Impact', filterSlug: 'community', title: 'Valentine Street Giving Initiative', description: 'Through a kindness-driven campaign, we reached people in the community with financial support, encouragement, and acts of compassion during the Valentine season.', image: await uploadImage('gallery/community-market.jpg'), imageAlt: 'Valentine Street Giving Initiative', link: '#'},
      {_key: 'sg4', category: 'Brand Consulting', filterSlug: 'brand', title: 'Strategic Media Consultation for Growing Brands', description: 'TE Limited provided strategic media consulting for an emerging brand to strengthen brand visibility, communication strategy, audience positioning, and content direction for measurable growth.', image: await uploadImage('gallery/community-meeting.jpg'), imageAlt: 'Strategic Media Consultation', link: '#'},
      {_key: 'sg5', category: 'Events Leadership', filterSlug: 'events', title: 'Selected for TEDx Baze University Speakers Management Team', description: "TE Limited's management team was invited to be part of the official Speakers Management Team for TEDx Baze University, overseeing coordination and engagement for featured speakers.", image: await uploadImage('gallery/speaking-event.jpg'), imageAlt: 'TEDx Baze University Speakers Management', link: '#'},
      {_key: 'sg6', category: 'Speaking Engagement', filterSlug: 'speaking', title: 'First Class Speakers Network, Abuja', description: 'Hosting and speaking at a leadership engagement for young corps members — practical insights on communication, confidence building, and personal branding.', image: await uploadImage('gallery/speakers-network.jpg'), imageAlt: 'First Class Speakers Network', link: '#'},
      {_key: 'sg7', category: 'Youth Development · Coming Soon', filterSlug: 'youth', title: 'NextGen Creatives — Equipping Underserved Youth', description: 'A European Union–supported initiative equipping underserved youth with practical media, creative, and entrepreneurship skills for sustainable income. Currently in planning — full launch story coming soon.', image: await uploadImage('gallery/girlsinai.jpg'), imageAlt: 'NextGen Creatives — upcoming initiative', link: '#'},
    ],
    newsletterLabel: 'Stay in the Loop',
    newsletterHeading: 'Get our newsletter',
    newsletterBody: 'Stories, program announcements, and ways to get involved — once a month, no fluff.',
    newsletterPlaceholder: 'you@example.com',
    newsletterButton: 'Subscribe',
    newsletterSuccess: "You're on the list. Watch your inbox.",
  }

  // ─── CONTACT PAGE ─────────────────────────────────────────────
  console.log('Uploading contact page images…')
  const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    seo: {title: 'Contact TE Limited', description: 'Contact TE Limited for media, communication, training, speaking, partnership, and community impact inquiries.'},
    heroEyebrow: 'Get In Touch',
    heroTitleLine1: "Let's start a",
    heroTitleLine2: 'conversation',
    heroSubtitle: "Whether you're a young person looking to join a program, a partner exploring collaboration, or a journalist with a question — we'd love to hear from you.",
    heroImage: await uploadImage('gallery/speakers-network.jpg'),
    methods: [
      {_key: 'cm1', icon: 'email', title: 'Email Us', description: 'For general inquiries, partnerships, or media.', linkLabel: 'info@teltd.com.ng', linkHref: 'mailto:info@teltd.com.ng'},
      {_key: 'cm2', icon: 'phone', title: 'Call Us', description: 'Mon–Fri, 9am–5pm WAT (West Africa Time).', linkLabel: '+234 000 000 0000', linkHref: 'tel:+2340000000000'},
      {_key: 'cm3', icon: 'pin', title: 'Visit Us', description: 'Stop by our community space in Lagos.', linkLabel: 'Lagos, Nigeria', linkHref: ''},
    ],
    formLabel: 'Send a Message',
    formHeading: 'Tell us how we can help',
    formIntro: 'Fill out the form below and a team member will get back to you within 2 working days.',
    formTopics: [
      {_key: 'ft1', value: 'program', label: 'Joining a program'},
      {_key: 'ft2', value: 'partner', label: 'Partnership / collaboration'},
      {_key: 'ft3', value: 'mentor', label: 'Becoming a mentor'},
      {_key: 'ft4', value: 'donate', label: 'Donating / supporting'},
      {_key: 'ft5', value: 'media', label: 'Media / press'},
      {_key: 'ft6', value: 'other', label: 'Something else'},
    ],
    formSuccessText: "Thanks — your message is on its way. We'll be in touch within 2 working days.",
    sidebarHours: [
      {_key: 'sh1', days: 'Monday – Friday', hours: '9:00 – 17:00 WAT'},
      {_key: 'sh2', days: 'Saturday', hours: 'By appointment'},
      {_key: 'sh3', days: 'Sunday', hours: 'Closed'},
    ],
    sidebarHeadquartersTitle: 'Headquarters',
    sidebarHeadquartersBody: 'TE Limited\nLagos, Nigeria',
    sidebarSocialTitle: 'Follow Along',
    sidebarSocialBody: 'For day-to-day updates and stories from across the continent.',
    faqLabel: 'Frequently Asked',
    faqHeading: 'Quick answers',
    faqItems: [
      {_key: 'fq1', question: 'How do I apply to a program?', answer: 'Each program runs in cohorts. Visit the <a href="/programs" class="contact-link">Programs page</a> to see what\'s open and submit an expression of interest — we\'ll notify you when applications go live.'},
      {_key: 'fq2', question: 'Do programs cost money?', answer: "Our flagship programs are free for participants. They're funded by partners, donors, and sponsors who believe in what we're building."},
      {_key: 'fq3', question: 'Can I become a mentor?', answer: 'Yes — mentors are the engine of our programs. Reach out via the form above and select "Becoming a mentor" so we can route your message to the right team.'},
      {_key: 'fq4', question: 'How can my organisation partner?', answer: "We work with corporates, foundations, schools, and government bodies. Visit <a href=\"/get-involved\" class=\"contact-link\">Get Involved</a> or send us a note and we'll set up a call."},
      {_key: 'fq5', question: 'Do you operate outside Nigeria?', answer: 'Our headquarters is in Lagos but we run programs and partnerships across multiple African countries. Get in touch to discuss your region.'},
      {_key: 'fq6', question: 'Are you a registered nonprofit?', answer: "Yes, Toria's Hub Youth Foundation operates as a registered nonprofit organisation. Contact us for tax and registration documentation if needed for your records."},
    ],
  }

  // ─── GET INVOLVED PAGE ────────────────────────────────────────
  console.log('Uploading get involved page images…')
  const getInvolvedPage = {
    _id: 'getInvolvedPage',
    _type: 'getInvolvedPage',
    seo: {title: 'Get Involved | TE Limited', description: 'Partner with TE Limited, support community impact work, or get involved in training and empowerment programs.'},
    heroEyebrow: 'Get Involved',
    heroTitleLine1: 'Be part of',
    heroTitleLine2: 'the movement',
    heroSubtitle: "Every young leader we train is a small bet on a different future for Africa. Here's how you can place that bet alongside us.",
    heroImage: await uploadImage('gallery/orphanage-visit.jpg'),
    waysLabel: 'Four Ways',
    waysHeading: 'Find your way to contribute',
    ways: [
      {_key: 'w1', icon: 'heart', title: 'Donate', description: 'Fund cohorts, mentor stipends, and program supplies.', arrowLabel: 'Give now', anchor: 'donate'},
      {_key: 'w2', icon: 'share', title: 'Partner', description: 'Co-design programs, sponsor cohorts, host events.', arrowLabel: 'Talk to us', anchor: 'partner'},
      {_key: 'w3', icon: 'people', title: 'Mentor', description: 'Pair with a young person and shape their journey.', arrowLabel: 'Apply', anchor: 'mentor'},
      {_key: 'w4', icon: 'star', title: 'Volunteer', description: 'Lend your skills — design, ops, content, events.', arrowLabel: 'Sign up', anchor: 'volunteer'},
    ],
    donateLabel: 'Donate',
    donateHeading: 'Your gift does the work',
    donateIntro: 'Every donation goes directly to programs — cohort costs, mentor stipends, learning materials, and the public showcases that close each cohort.',
    donateTiers: [
      {_key: 'dt1', tierName: 'Supporter', amount: '$25', frequency: '/ once', impact: 'Funds learning materials for one young coder for a full cohort.', perks: ['Welcome from the team', 'Quarterly impact updates'], cta: {label: 'Donate $25', href: '/contact', style: 'outline', size: 'md'}, featured: false},
      {_key: 'dt2', tierName: 'Champion', amount: '$100', frequency: '/ once', impact: "Sponsors one young person's place in a full 12-week cohort.", perks: ['Personal note from the cohort', 'Showcase invitation', 'Quarterly impact updates'], cta: {label: 'Donate $100', href: '/contact', style: 'teal', size: 'md'}, featured: true, featuredLabel: 'Most Impact'},
      {_key: 'dt3', tierName: 'Builder', amount: '$500', frequency: '/ once', impact: 'Funds mentor pairing and project showcases for an entire cohort.', perks: ['Recognition on our partners page', 'Annual report & deep-dive call', 'Showcase invitation'], cta: {label: 'Donate $500', href: '/contact', style: 'outline', size: 'md'}, featured: false},
    ],
    donateCustom: "Want to give a different amount, set up a recurring gift, or explore a major-gift partnership? <a href=\"/contact\" class=\"contact-link\">Reach out — we'll find the right fit.</a>",
    partnerLabel: 'Partner With Us',
    partnerHeading: 'Build something bigger together',
    partnerBody: 'We work with corporates, foundations, schools, universities, and government bodies to design and deliver programs that move the needle. Partnership is collaborative — your goals shape the work as much as ours do.',
    partnerFeatures: ['Cohort sponsorship & co-branding', 'Curriculum co-design', 'Hiring pipeline & talent access', 'Hosted events & showcases'],
    partnerCta: {label: 'Start a Conversation', href: '/contact', style: 'teal', size: 'md'},
    partnerImage: await uploadImage('gallery/community-meeting.jpg'),
    partnerImageAlt: "Partnership at Toria's Hub",
    mvCards: [
      {_key: 'mvc1', anchor: 'mentor', label: 'Mentor', title: 'Pair with a young leader', description: 'Mentors meet with their mentee a few times a month across a 12-week cohort. The work is light, the impact is heavy.', details: [{_key: 'd1', key: 'Time', value: '~3–4 hours / month'}, {_key: 'd2', key: 'Format', value: 'Virtual or in-person'}, {_key: 'd3', key: 'Need', value: '2+ years professional experience in tech, design, or product'}], cta: {label: 'Apply as a Mentor', href: '/contact', style: 'teal', size: 'md'}},
      {_key: 'mvc2', anchor: 'volunteer', label: 'Volunteer', title: 'Lend your craft', description: "Designers, writers, event runners, photographers, ops folks — there's always a project that needs a few extra hands.", details: [{_key: 'd4', key: 'Roles', value: 'Design, content, ops, events, photography'}, {_key: 'd5', key: 'Time', value: 'Project-based, flexible'}, {_key: 'd6', key: 'Need', value: "Tell us what you'd love to work on"}], cta: {label: 'Sign Up to Volunteer', href: '/contact', style: 'outline', size: 'md'}},
    ],
    stats: [
      {_key: 'gs1', value: '$25', label: 'Materials for 1 Coder'},
      {_key: 'gs2', value: '$100', label: 'Sponsors a Cohort Seat'},
      {_key: 'gs3', value: '3 hrs', label: 'Mentor Time / Month'},
      {_key: 'gs4', value: '100%', label: 'Goes to Programs'},
    ],
    ctaLabel: 'Still Deciding?',
    ctaHeading: 'Have a chat with the team first',
    ctaBody: "Not sure where you fit? Send us a note. We'll talk through what you have to give and find the right way to plug it in.",
    ctaButtons: [{_key: 'gicb1', label: 'Talk to the Team', href: '/contact', style: 'teal', size: 'lg'}],
  }

  console.log('\nWriting documents…')
  const tx = client.transaction()
  ;[siteSettings, homePage, aboutPage, programsPage, storiesPage, contactPage, getInvolvedPage].forEach((doc) => {
    tx.createOrReplace(doc as any)
  })
  await tx.commit()

  console.log('\n✓ Seed complete. Open Sanity Studio to edit content.\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
