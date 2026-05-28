import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
  ],
  preview: {select: {title: 'heading'}},
})
