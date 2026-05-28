import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'href', title: 'Path / URL', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
