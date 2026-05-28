import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats Band'},
    {name: 'partners', title: 'Partners'},
    {name: 'mission', title: 'Mission'},
    {name: 'programs', title: 'Programs'},
    {name: 'philosophy', title: 'Philosophy / Ecosystem'},
    {name: 'stories', title: 'Stories Highlight'},
    {name: 'cta', title: 'CTA Banner'},
    {name: 'modal', title: 'Lead Capture Modal'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', type: 'seo', group: 'seo'}),

    // HERO
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine1', title: 'Title — line 1', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine2', title: 'Title — line 2 (teal accent)', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine3', title: 'Title — line 3', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'hero'}),
    defineField({
      name: 'heroSlides',
      title: 'Hero slideshow images',
      type: 'array',
      group: 'hero',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({
      name: 'heroCtas',
      title: 'Hero buttons',
      type: 'array',
      group: 'hero',
      of: [{type: 'cta'}],
      validation: (r) => r.max(3),
    }),

    // STATS
    defineField({
      name: 'stats',
      title: 'Stat cards',
      type: 'array',
      group: 'stats',
      of: [{type: 'statCard'}],
    }),

    // PARTNERS
    defineField({name: 'partnersLabel', title: 'Label (e.g. "Funded By")', type: 'string', group: 'partners'}),
    defineField({
      name: 'partnersImages',
      title: 'Partner / funding images (up to 4)',
      type: 'array',
      group: 'partners',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerImage',
          fields: [
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
            defineField({name: 'alt', title: 'Image alt text', type: 'string'}),
          ],
          preview: {select: {title: 'alt', media: 'image'}},
        }),
      ],
    }),

    // MISSION
    defineField({name: 'missionLabel', title: 'Small label', type: 'string', group: 'mission'}),
    defineField({name: 'missionHeading', title: 'Heading', type: 'string', group: 'mission'}),
    defineField({
      name: 'missionParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'mission',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({name: 'missionImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'mission'}),
    defineField({name: 'missionImageAlt', title: 'Image alt text', type: 'string', group: 'mission'}),
    defineField({
      name: 'missionCtas',
      title: 'Buttons',
      type: 'array',
      group: 'mission',
      of: [{type: 'cta'}],
    }),
    defineField({name: 'awardTitle', title: 'Award badge — title', type: 'string', group: 'mission'}),
    defineField({name: 'awardSubtitle', title: 'Award badge — subtitle', type: 'string', group: 'mission'}),

    // PROGRAMS
    defineField({name: 'programsLabel', title: 'Small label', type: 'string', group: 'programs'}),
    defineField({name: 'programsHeading', title: 'Heading', type: 'string', group: 'programs'}),
    defineField({
      name: 'programCards',
      title: 'Program cards',
      type: 'array',
      group: 'programs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programCard',
          fields: [
            defineField({name: 'chip', title: 'Chip text', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'imageAlt', title: 'Image alt text', type: 'string'}),
            defineField({name: 'cta', title: 'Button', type: 'cta'}),
          ],
          preview: {select: {title: 'title', subtitle: 'chip'}},
        }),
      ],
    }),
    defineField({name: 'programsFooterCta', title: 'Footer "View all" button', type: 'cta', group: 'programs'}),

    // PHILOSOPHY
    defineField({name: 'philosophyLabel', title: 'Small label', type: 'string', group: 'philosophy'}),
    defineField({name: 'philosophyHeading', title: 'Heading', type: 'string', group: 'philosophy'}),
    defineField({name: 'philosophyIntro', title: 'Intro paragraph', type: 'text', rows: 2, group: 'philosophy'}),
    defineField({
      name: 'philosophyCards',
      title: 'Ecosystem cards',
      type: 'array',
      group: 'philosophy',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'philCard',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),

    // STORIES
    defineField({name: 'storiesLabel', title: 'Small label', type: 'string', group: 'stories'}),
    defineField({name: 'storiesHeading', title: 'Heading', type: 'string', group: 'stories'}),
    defineField({
      name: 'storyCards',
      title: 'Featured story cards',
      type: 'array',
      group: 'stories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'storyCard',
          fields: [
            defineField({name: 'category', title: 'Category', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
            defineField({name: 'link', title: 'Link URL', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'category'}},
        }),
      ],
    }),

    // CTA BANNER
    defineField({name: 'ctaLabel', title: 'Small label', type: 'string', group: 'cta'}),
    defineField({name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBody', title: 'Body text', type: 'text', rows: 3, group: 'cta'}),
    defineField({
      name: 'ctaButtons',
      title: 'Buttons',
      type: 'array',
      group: 'cta',
      of: [{type: 'cta'}],
    }),

    // LEAD MODAL
    defineField({name: 'modalTitle', title: 'Modal title', type: 'string', group: 'modal'}),
    defineField({name: 'modalSubtitle', title: 'Modal subtitle', type: 'text', rows: 2, group: 'modal'}),
    defineField({name: 'modalButtonLabel', title: 'Submit button label', type: 'string', group: 'modal'}),
    defineField({name: 'modalPrivacyText', title: 'Privacy text', type: 'text', rows: 2, group: 'modal'}),
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})
