import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'intro', title: 'Intro'},
    {name: 'services', title: 'Services'},
    {name: 'process', title: 'Process'},
    {name: 'cta', title: 'CTA Banner'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', type: 'seo', group: 'seo'}),

    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine1', title: 'Title - line 1', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitleLine2', title: 'Title - line 2 (teal)', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Background image', type: 'image', options: {hotspot: true}, group: 'hero'}),

    defineField({name: 'introLabel', title: 'Small label', type: 'string', group: 'intro'}),
    defineField({name: 'introHeading', title: 'Heading', type: 'string', group: 'intro'}),
    defineField({name: 'introBody', title: 'Body text', type: 'text', rows: 3, group: 'intro'}),

    defineField({
      name: 'services',
      title: 'Service cards',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceCard',
          fields: [
            defineField({name: 'anchorId', title: 'Anchor ID', type: 'string', description: 'Used in URL links, e.g. #hosting'}),
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
            defineField({name: 'imageAlt', title: 'Image alt text', type: 'string'}),
            defineField({name: 'cta', title: 'Button', type: 'cta'}),
          ],
          preview: {select: {title: 'title', subtitle: 'chip'}},
        }),
      ],
    }),

    defineField({name: 'processLabel', title: 'Small label', type: 'string', group: 'process'}),
    defineField({name: 'processHeading', title: 'Heading', type: 'string', group: 'process'}),
    defineField({name: 'processIntro', title: 'Intro paragraph', type: 'text', rows: 3, group: 'process'}),
    defineField({
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      group: 'process',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

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
  preview: {prepare: () => ({title: 'Services Page'})},
})
