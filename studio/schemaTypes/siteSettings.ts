import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Brand'},
    {name: 'nav', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: "Brand name (e.g. \"Toria's\")",
      type: 'string',
      group: 'brand',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brandSuffix',
      title: 'Brand suffix (e.g. "Hub" — coloured part)',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'navLinks',
      title: 'Top navigation links',
      type: 'array',
      group: 'nav',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'navCta',
      title: 'Top right CTA button',
      type: 'cta',
      group: 'nav',
    }),

    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 3,
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      group: 'footer',
      of: [{type: 'footerColumn'}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      group: 'footer',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright line',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerSubline',
      title: 'Footer sub-line',
      type: 'string',
      group: 'footer',
    }),

    defineField({name: 'email', title: 'Contact email', type: 'string', group: 'contact'}),
    defineField({name: 'phone', title: 'Contact phone', type: 'string', group: 'contact'}),
    defineField({name: 'address', title: 'Office address', type: 'text', rows: 2, group: 'contact'}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
