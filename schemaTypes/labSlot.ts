import {defineField, defineType} from 'sanity'

export const labSlotType = defineType({
  name: 'labSlot',
  title: 'Lab slot',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time label',
      description: 'e.g. 4:00 PM',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filledSpots',
      title: 'Filled spots',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'maxSpots',
      title: 'Max spots',
      type: 'number',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
  ],
  preview: {
    select: {title: 'title', time: 'time', date: 'date', filled: 'filledSpots', max: 'maxSpots'},
    prepare({title, time, date, filled, max}) {
      return {
        title: `${title} · ${time}`,
        subtitle: `${date} — ${filled ?? 0}/${max ?? 12} filled`,
      }
    },
  },
  orderings: [
    {
      title: 'Date, then time',
      name: 'dateTimeAsc',
      by: [{field: 'date', direction: 'asc'}, {field: 'time', direction: 'asc'}],
    },
  ],
})
