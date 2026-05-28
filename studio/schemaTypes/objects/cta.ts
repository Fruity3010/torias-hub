import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Button / Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Button label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'href', title: 'Link URL', type: 'string', description: 'Internal (e.g. /about) or full URL', validation: (r) => r.required()}),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'teal',
      options: {list: [
        {title: 'Teal (primary)', value: 'teal'},
        {title: 'Outline', value: 'outline'},
      ]},
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'md',
      options: {list: [
        {title: 'Small', value: 'sm'},
        {title: 'Medium', value: 'md'},
        {title: 'Large', value: 'lg'},
      ]},
    }),
  ],
})
