import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'story', title: 'Our Story'},
    {name: 'mvv', title: 'Mission / Vision / Values'},
    {name: 'timeline', title: 'Timeline'},
    {name: 'team', title: 'Team'},
    {name: 'stats', title: 'Stats Band'},
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

    // STORY
    defineField({name: 'storyLabel', title: 'Small label', type: 'string', group: 'story'}),
    defineField({name: 'storyHeading', title: 'Heading', type: 'string', group: 'story'}),
    defineField({
      name: 'storyParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'story',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({name: 'storyImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'story'}),
    defineField({name: 'storyImageAlt', title: 'Image alt', type: 'string', group: 'story'}),

    // MVV
    defineField({name: 'mvvLabel', title: 'Small label', type: 'string', group: 'mvv'}),
    defineField({name: 'mvvHeading', title: 'Heading', type: 'string', group: 'mvv'}),
    defineField({
      name: 'mvvCards',
      title: 'Mission / Vision / Values cards',
      type: 'array',
      group: 'mvv',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mvvCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon style',
              type: 'string',
              options: {list: [
                {title: 'Target (mission)', value: 'target'},
                {title: 'Eye (vision)', value: 'eye'},
                {title: 'Star (values)', value: 'star'},
              ]},
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),

    // TIMELINE
    defineField({name: 'timelineLabel', title: 'Small label', type: 'string', group: 'timeline'}),
    defineField({name: 'timelineHeading', title: 'Heading', type: 'string', group: 'timeline'}),
    defineField({
      name: 'timelineItems',
      title: 'Timeline events',
      type: 'array',
      group: 'timeline',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'timelineItem',
          fields: [
            defineField({name: 'year', title: 'Year', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
            defineField({name: 'active', title: 'Mark as current / latest', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {title: 'year', subtitle: 'title'}},
        }),
      ],
    }),

    // TEAM
    defineField({name: 'teamLabel', title: 'Small label', type: 'string', group: 'team'}),
    defineField({name: 'teamHeading', title: 'Heading', type: 'string', group: 'team'}),
    defineField({name: 'teamIntro', title: 'Intro paragraph', type: 'text', rows: 3, group: 'team'}),
    defineField({
      name: 'teamMembers',
      title: 'Team members',
      type: 'array',
      group: 'team',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({name: 'name', title: 'Name / Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'role', title: 'Role', type: 'string'}),
            defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 2}),
            defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
            defineField({name: 'photoAlt', title: 'Photo alt', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        }),
      ],
    }),

    // STATS
    defineField({
      name: 'stats',
      title: 'Stat cards',
      type: 'array',
      group: 'stats',
      of: [{type: 'statCard'}],
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
  preview: {prepare: () => ({title: 'About Page'})},
})
