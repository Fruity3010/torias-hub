import type {StructureBuilder} from 'sanity/structure'

// Custom navigation: singletons (one-of) appear as direct items,
// grouped under sensible sections so editors can find things fast.
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Services Page')
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
      S.listItem()
        .title('Programs Page')
        .child(S.document().schemaType('programsPage').documentId('programsPage')),
      S.listItem()
        .title('Stories Page')
        .child(S.document().schemaType('storiesPage').documentId('storiesPage')),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.listItem()
        .title('Get Involved Page')
        .child(S.document().schemaType('getInvolvedPage').documentId('getInvolvedPage')),
    ])
