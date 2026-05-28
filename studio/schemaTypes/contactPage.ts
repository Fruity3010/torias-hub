import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'methods', title: 'Contact Methods'},
    {name: 'form', title: 'Contact Form'},
    {name: 'sidebar', title: 'Sidebar Info'},
    {name: 'faq', title: 'FAQ'},
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

    // METHODS
    defineField({
      name: 'methods',
      title: 'Contact method cards',
      type: 'array',
      group: 'methods',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactMethod',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: [
                {title: 'Envelope (email)', value: 'email'},
                {title: 'Phone', value: 'phone'},
                {title: 'Map pin (visit)', value: 'pin'},
              ]},
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Short description', type: 'string'}),
            defineField({name: 'linkLabel', title: 'Link label', type: 'string'}),
            defineField({name: 'linkHref', title: 'Link URL', type: 'string', description: 'Use mailto:, tel:, or a path'}),
          ],
          preview: {select: {title: 'title', subtitle: 'linkLabel'}},
        }),
      ],
    }),

    // FORM
    defineField({name: 'formLabel', title: 'Small label', type: 'string', group: 'form'}),
    defineField({name: 'formHeading', title: 'Heading', type: 'string', group: 'form'}),
    defineField({name: 'formIntro', title: 'Intro paragraph', type: 'text', rows: 2, group: 'form'}),
    defineField({
      name: 'formTopics',
      title: 'Reason / topic dropdown options',
      type: 'array',
      group: 'form',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formTopic',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({name: 'formSuccessText', title: 'Success message', type: 'string', group: 'form'}),

    // SIDEBAR
    defineField({
      name: 'sidebarHours',
      title: 'Office hours rows',
      type: 'array',
      group: 'sidebar',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'hoursRow',
          fields: [
            defineField({name: 'days', title: 'Days', type: 'string'}),
            defineField({name: 'hours', title: 'Hours', type: 'string'}),
          ],
          preview: {select: {title: 'days', subtitle: 'hours'}},
        }),
      ],
    }),
    defineField({name: 'sidebarHeadquartersTitle', title: 'Headquarters card title', type: 'string', group: 'sidebar'}),
    defineField({name: 'sidebarHeadquartersBody', title: 'Headquarters body', type: 'text', rows: 3, group: 'sidebar'}),
    defineField({name: 'sidebarSocialTitle', title: 'Social card title', type: 'string', group: 'sidebar'}),
    defineField({name: 'sidebarSocialBody', title: 'Social card body', type: 'text', rows: 2, group: 'sidebar'}),

    // FAQ
    defineField({name: 'faqLabel', title: 'Small label', type: 'string', group: 'faq'}),
    defineField({name: 'faqHeading', title: 'Heading', type: 'string', group: 'faq'}),
    defineField({
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'answer', title: 'Answer (HTML allowed)', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Contact Page'})},
})
