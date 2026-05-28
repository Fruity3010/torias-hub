import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'network',
      title: 'Network',
      type: 'string',
      options: {list: [
        {title: 'Twitter / X', value: 'twitter'},
        {title: 'Facebook', value: 'facebook'},
        {title: 'LinkedIn', value: 'linkedin'},
        {title: 'Instagram', value: 'instagram'},
        {title: 'YouTube', value: 'youtube'},
      ]},
      validation: (r) => r.required(),
    }),
    defineField({name: 'url', title: 'Profile URL', type: 'url', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'network', subtitle: 'url'}},
})
