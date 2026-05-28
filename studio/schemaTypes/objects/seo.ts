import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Browser tab title', type: 'string'}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 2}),
  ],
})
