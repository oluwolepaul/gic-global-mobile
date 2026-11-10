import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'churchEvent',
  title: 'Church event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'campusId', title: 'Campus', type: 'string', validation: (rule) => rule.required(),
      options: { list: [{ title: 'Texas', value: 'texas' }, { title: 'New York', value: 'new-york' }, { title: 'Lagos', value: 'lagos' }] },
    }),
    defineField({ name: 'startDate', title: 'First event date', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'endDate', title: 'Last event date', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'displayDate', title: 'Date shown in the app', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'time', title: 'Service or event times', type: 'text', rows: 4 }),
    defineField({ name: 'place', title: 'Venue and address', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'theme', title: 'Theme', type: 'string' }),
    defineField({ name: 'speaker', title: 'Ministering', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: 'image', title: 'Event flyer', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryImage', title: 'Additional flyer (optional)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isPublished', title: 'Show in app', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'campusId', media: 'image' } },
});
