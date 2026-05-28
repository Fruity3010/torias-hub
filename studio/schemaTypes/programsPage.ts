import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'programsPage',
  title: 'Programs Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'overview', title: 'Programs Overview'},
    {name: 'programs', title: 'Program Details'},
    {name: 'pathway', title: 'Pathway Diagram'},
    {name: 'cta', title: 'CTA Banner'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', type: 'seo', group: 'seo'}),

    // HERO
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine1', title: 'Title — line 1', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine2', title: 'Title — line 2 (teal)', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Background image', type: 'image', options: {hotspot: true}, group: 'hero'}),

    // OVERVIEW PILLS
    defineField({
      name: 'overviewPills',
      title: 'Program quick links (pills)',
      type: 'array',
      group: 'overview',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'overviewPill',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'tag', title: 'Tag', type: 'string'}),
            defineField({name: 'anchorId', title: 'Anchor ID (e.g. "youthcoding")', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'tag'}},
        }),
      ],
    }),

    // PROGRAM DETAILS
    defineField({
      name: 'programs',
      title: 'Program detail sections',
      type: 'array',
      group: 'programs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'program',
          fields: [
            defineField({name: 'anchorId', title: 'Anchor ID', type: 'string', description: 'Used in URL (e.g. #youthcoding)'}),
            defineField({name: 'chip', title: 'Chip text', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
            defineField({
              name: 'features',
              title: 'Feature bullets',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
            defineField({
              name: 'imageOnRight',
              title: 'Image on right (alternating layout)',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'ctas',
              title: 'Buttons',
              type: 'array',
              of: [{type: 'cta'}],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'chip'}},
        }),
      ],
    }),

    // PATHWAY
    defineField({name: 'pathwayLabel', title: 'Small label', type: 'string', group: 'pathway'}),
    defineField({name: 'pathwayHeading', title: 'Heading', type: 'string', group: 'pathway'}),
    defineField({name: 'pathwayIntro', title: 'Intro paragraph', type: 'text', rows: 3, group: 'pathway'}),
    defineField({
      name: 'pathwayNodes',
      title: 'Pathway stages',
      type: 'array',
      group: 'pathway',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pathwayNode',
          fields: [
            defineField({name: 'label', title: 'Stage label', type: 'string'}),
            defineField({name: 'subtitle', title: 'Program name', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'subtitle'}},
        }),
      ],
    }),

    // CTA
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
  ],
  preview: {prepare: () => ({title: 'Programs Page'})},
})
