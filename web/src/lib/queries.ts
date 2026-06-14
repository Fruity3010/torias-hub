// GROQ queries for each page. Each fetches the singleton document
// of the given type and dereferences nested assets.

import {sanity} from './sanity'

const SITE_QUERY = `*[_type == "siteSettings"][0]{
  brandName, brandSuffix,
  navLinks[]{label, href},
  navCta{label, href, style, size},
  footerTagline,
  footerColumns[]{heading, links[]{label, href}},
  socialLinks[]{network, url},
  copyright, footerSubline,
  email, phone, address
}`

const HOME_QUERY = `*[_type == "homePage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroTitleLine3,
  heroSubtitle,
  heroSlides[]{ asset->{url}, alt },
  heroCtas[]{label, href, style, size},
  stats[]{value, label},
  partnersLabel, partnersImages[]{image{asset->{url}}, alt},
  missionLabel, missionHeading, missionParagraphs,
  missionImage{asset->{url}}, missionImageAlt,
  missionCtas[]{label, href, style, size},
  awardTitle, awardSubtitle,
  programsLabel, programsHeading,
  programCards[]{chip, title, description, image{asset->{url}}, imageAlt, cta{label, href, style, size}},
  programsFooterCta{label, href, style, size},
  philosophyLabel, philosophyHeading, philosophyIntro,
  philosophyCards[]{title, description},
  storiesLabel, storiesHeading,
  storyCards[]{category, title, description, image{asset->{url}}, imageAlt, link},
  ctaLabel, ctaHeading, ctaBody,
  ctaButtons[]{label, href, style, size},
  modalTitle, modalSubtitle, modalButtonLabel, modalPrivacyText
}`

const ABOUT_QUERY = `*[_type == "aboutPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  storyLabel, storyHeading, storyParagraphs,
  storyImage{asset->{url}}, storyImageAlt,
  mvvLabel, mvvHeading,
  mvvCards[]{icon, title, description},
  timelineLabel, timelineHeading,
  timelineItems[]{year, title, description, active},
  teamLabel, teamHeading, teamIntro,
  teamMembers[]{name, role, bio, photo{asset->{url}}, photoAlt},
  stats[]{value, label},
  ctaLabel, ctaHeading, ctaBody,
  ctaButtons[]{label, href, style, size}
}`

const PROGRAMS_QUERY = `*[_type == "programsPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  overviewPills[]{title, tag, anchorId},
  programs[]{anchorId, chip, title, description, features, image{asset->{url}}, imageAlt, imageOnRight, ctas[]{label, href, style, size}},
  pathwayLabel, pathwayHeading, pathwayIntro,
  pathwayNodes[]{label, subtitle},
  ctaLabel, ctaHeading, ctaBody,
  ctaButtons[]{label, href, style, size}
}`

const SERVICES_QUERY = `*[_type == "servicesPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  introLabel, introHeading, introBody,
  services[]{anchorId, chip, title, description, features, image{asset->{url}}, imageAlt, cta{label, href, style, size}},
  processLabel, processHeading, processIntro,
  processSteps[]{title, description},
  ctaLabel, ctaHeading, ctaBody,
  ctaButtons[]{label, href, style, size}
}`

const STORIES_QUERY = `*[_type == "storiesPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  featured{category, title, description, image{asset->{url}}, imageAlt, link},
  filters[]{label, slug},
  stories[]{category, filterSlug, title, description, image{asset->{url}}, imageAlt, link},
  newsletterLabel, newsletterHeading, newsletterBody,
  newsletterPlaceholder, newsletterButton, newsletterSuccess
}`

const CONTACT_QUERY = `*[_type == "contactPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  methods[]{icon, title, description, linkLabel, linkHref},
  formLabel, formHeading, formIntro,
  formTopics[]{value, label},
  formSuccessText,
  sidebarHours[]{days, hours},
  sidebarHeadquartersTitle, sidebarHeadquartersBody,
  sidebarSocialTitle, sidebarSocialBody,
  faqLabel, faqHeading,
  faqItems[]{question, answer}
}`

const GET_INVOLVED_QUERY = `*[_type == "getInvolvedPage"][0]{
  seo,
  heroEyebrow, heroTitleLine1, heroTitleLine2, heroSubtitle,
  heroImage{asset->{url}},
  waysLabel, waysHeading,
  ways[]{icon, title, description, arrowLabel, anchor},
  donateLabel, donateHeading, donateIntro,
  donateTiers[]{tierName, amount, frequency, impact, perks, cta{label, href, style, size}, featured, featuredLabel},
  donateCustom,
  partnerLabel, partnerHeading, partnerBody, partnerFeatures,
  partnerCta{label, href, style, size}, partnerImage{asset->{url}}, partnerImageAlt,
  mvCards[]{anchor, label, title, description, details[]{key, value}, cta{label, href, style, size}},
  stats[]{value, label},
  ctaLabel, ctaHeading, ctaBody,
  ctaButtons[]{label, href, style, size}
}`

// Single-call helpers. Errors surface as `null` so the page renders
// a friendly empty state rather than crashing the whole build.
async function fetchSafe<T>(query: string): Promise<T | null> {
  try {
    return await sanity.fetch<T>(query)
  } catch (e) {
    console.error('[sanity] fetch failed:', e)
    return null
  }
}

export const getSite = () => fetchSafe<any>(SITE_QUERY)
export const getHome = () => fetchSafe<any>(HOME_QUERY)
export const getAbout = () => fetchSafe<any>(ABOUT_QUERY)
export const getPrograms = () => fetchSafe<any>(PROGRAMS_QUERY)
export const getServices = () => fetchSafe<any>(SERVICES_QUERY)
export const getStories = () => fetchSafe<any>(STORIES_QUERY)
export const getContact = () => fetchSafe<any>(CONTACT_QUERY)
export const getGetInvolved = () => fetchSafe<any>(GET_INVOLVED_QUERY)
