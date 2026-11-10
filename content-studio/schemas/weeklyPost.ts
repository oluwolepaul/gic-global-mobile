import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'weeklyPost',
  title: 'Weekly Word post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Post title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'speaker', title: 'Speaker', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'scripture', title: 'Scripture references', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Short thumbnail summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'thumbnail', title: 'Thumbnail image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'introduction', title: 'Introduction', type: 'text', rows: 5 }),
    defineField({ name: 'discussion', title: 'Discussion', type: 'text', rows: 6 }),
    defineField({ name: 'parable', title: 'Additional teaching', type: 'text', rows: 5 }),
    defineField({
      name: 'habits', title: 'Teaching points', type: 'array', of: [defineArrayMember({
        type: 'object', fields: [
          defineField({ name: 'title', title: 'Point', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'reference', title: 'Bible reference', type: 'string' }),
          defineField({ name: 'text', title: 'Explanation', type: 'text', rows: 4, validation: (rule) => rule.required() }),
        ],
      })],
    }),
    defineField({ name: 'prayer', title: 'Closing prayer', type: 'text', rows: 4 }),
    defineField({ name: 'publishedAt', title: 'Publish date', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'isPublished', title: 'Show in app', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'speaker', media: 'thumbnail' } },
});
