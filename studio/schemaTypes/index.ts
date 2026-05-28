import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import programsPage from './programsPage'
import storiesPage from './storiesPage'
import contactPage from './contactPage'
import getInvolvedPage from './getInvolvedPage'

// Reusable object types
import cta from './objects/cta'
import statCard from './objects/statCard'
import navLink from './objects/navLink'
import socialLink from './objects/socialLink'
import footerColumn from './objects/footerColumn'
import seo from './objects/seo'

export const schemaTypes = [
  // Documents (singletons)
  siteSettings,
  homePage,
  aboutPage,
  programsPage,
  storiesPage,
  contactPage,
  getInvolvedPage,
  // Reusable objects
  cta,
  statCard,
  navLink,
  socialLink,
  footerColumn,
  seo,
]
