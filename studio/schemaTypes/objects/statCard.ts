import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statCard',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Number / value', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})
