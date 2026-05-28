import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'storiesPage',
  title: 'Stories Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Page Hero'},
    {name: 'featured', title: 'Featured Story'},
    {name: 'stories', title: 'Story Cards'},
    {name: 'newsletter', title: 'Newsletter CTA'},
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

    // FEATURED STORY
    defineField({
      name: 'featured',
      title: 'Featured story',
      type: 'object',
      group: 'featured',
      fields: [
        defineField({name: 'category', title: 'Category', type: 'string'}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
        defineField({name: 'link', title: 'Link URL', type: 'string'}),
      ],
    }),

    // FILTERS
    defineField({
      name: 'filters',
      title: 'Filter categories',
      type: 'array',
      group: 'stories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'filter',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'slug', title: 'Slug (data attribute)', type: 'string'}),
          ],
          preview: {select: {title: 'label', subtitle: 'slug'}},
        }),
      ],
    }),

    // STORY CARDS
    defineField({
      name: 'stories',
      title: 'Story cards',
      type: 'array',
      group: 'stories',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'story',
          fields: [
            defineField({name: 'category', title: 'Category label', type: 'string'}),
            defineField({name: 'filterSlug', title: 'Filter slug', type: 'string', description: 'Match one of the filter slugs above'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
            defineField({name: 'link', title: 'Link URL', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
        }),
      ],
    }),

    // NEWSLETTER
    defineField({name: 'newsletterLabel', title: 'Small label', type: 'string', group: 'newsletter'}),
    defineField({name: 'newsletterHeading', title: 'Heading', type: 'string', group: 'newsletter'}),
    defineField({name: 'newsletterBody', title: 'Body text', type: 'text', rows: 2, group: 'newsletter'}),
    defineField({name: 'newsletterPlaceholder', title: 'Email input placeholder', type: 'string', group: 'newsletter'}),
    defineField({name: 'newsletterButton', title: 'Subscribe button label', type: 'string', group: 'newsletter'}),
    defineField({name: 'newsletterSuccess', title: 'Success message', type: 'string', group: 'newsletter'}),
  ],
  preview: {prepare: () => ({title: 'Stories Page'})},
})
