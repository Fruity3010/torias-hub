import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'getInvolvedPage',
  title: 'Get Involved Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'ways', title: 'Ways to Help'},
    {name: 'donate', title: 'Donate Section'},
    {name: 'partner', title: 'Partner Section'},
    {name: 'mentor', title: 'Mentor & Volunteer'},
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

    // WAYS TO HELP
    defineField({name: 'waysLabel', title: 'Small label', type: 'string', group: 'ways'}),
    defineField({name: 'waysHeading', title: 'Heading', type: 'string', group: 'ways'}),
    defineField({
      name: 'ways',
      title: 'Way-to-help cards',
      type: 'array',
      group: 'ways',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'way',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: [
                {title: 'Heart (donate)', value: 'heart'},
                {title: 'Share (partner)', value: 'share'},
                {title: 'People (mentor)', value: 'people'},
                {title: 'Star (volunteer)', value: 'star'},
              ]},
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({name: 'arrowLabel', title: 'Arrow label (e.g. "Give now")', type: 'string'}),
            defineField({name: 'anchor', title: 'Anchor ID it links to', type: 'string'}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),

    // DONATE
    defineField({name: 'donateLabel', title: 'Small label', type: 'string', group: 'donate'}),
    defineField({name: 'donateHeading', title: 'Heading', type: 'string', group: 'donate'}),
    defineField({name: 'donateIntro', title: 'Intro paragraph', type: 'text', rows: 3, group: 'donate'}),
    defineField({
      name: 'donateTiers',
      title: 'Donation tiers',
      type: 'array',
      group: 'donate',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'donateTier',
          fields: [
            defineField({name: 'tierName', title: 'Tier name (e.g. Supporter)', type: 'string'}),
            defineField({name: 'amount', title: 'Amount (e.g. $25)', type: 'string'}),
            defineField({name: 'frequency', title: 'Frequency (e.g. / once)', type: 'string'}),
            defineField({name: 'impact', title: 'Impact line', type: 'text', rows: 2}),
            defineField({
              name: 'perks',
              title: 'Perks list',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({name: 'cta', title: 'Button', type: 'cta'}),
            defineField({name: 'featured', title: 'Mark as featured / most impact', type: 'boolean', initialValue: false}),
            defineField({name: 'featuredLabel', title: 'Featured flag text (e.g. "Most Impact")', type: 'string'}),
          ],
          preview: {select: {title: 'tierName', subtitle: 'amount'}},
        }),
      ],
    }),
    defineField({name: 'donateCustom', title: 'Custom-amount footnote (HTML allowed)', type: 'text', rows: 2, group: 'donate'}),

    // PARTNER
    defineField({name: 'partnerLabel', title: 'Small label', type: 'string', group: 'partner'}),
    defineField({name: 'partnerHeading', title: 'Heading', type: 'string', group: 'partner'}),
    defineField({name: 'partnerBody', title: 'Body paragraph', type: 'text', rows: 4, group: 'partner'}),
    defineField({
      name: 'partnerFeatures',
      title: 'Partner feature bullets',
      type: 'array',
      group: 'partner',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'partnerCta', title: 'Button', type: 'cta', group: 'partner'}),
    defineField({name: 'partnerImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'partner'}),
    defineField({name: 'partnerImageAlt', title: 'Image alt', type: 'string', group: 'partner'}),

    // MENTOR + VOLUNTEER
    defineField({
      name: 'mvCards',
      title: 'Mentor & Volunteer cards',
      type: 'array',
      group: 'mentor',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mvCard',
          fields: [
            defineField({name: 'anchor', title: 'Anchor ID', type: 'string'}),
            defineField({name: 'label', title: 'Small label', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'details',
              title: 'Detail rows',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'mvDetail',
                  fields: [
                    defineField({name: 'key', title: 'Key (e.g. Time)', type: 'string'}),
                    defineField({name: 'value', title: 'Value', type: 'string'}),
                  ],
                  preview: {select: {title: 'key', subtitle: 'value'}},
                }),
              ],
            }),
            defineField({name: 'cta', title: 'Button', type: 'cta'}),
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
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
  preview: {prepare: () => ({title: 'Get Involved Page'})},
})
