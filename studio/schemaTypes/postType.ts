import { defineType, defineField } from 'sanity';
import { LocationSelector } from '../components/LocationSelector'

export const postType = defineType({
  name: 'post',
  title: 'Travel Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
   defineField({
      name: 'locationDetails',
      title: 'Destination Location',
      description: 'Select country and city to automatically save coordinates.',
      type: 'object',
      components: {
        input: LocationSelector, // Registers your custom React dropdown component
      },
      fields: [
        { name: 'countryName', type: 'string' },
        { name: 'countryCode', type: 'string' },
        { name: 'cityName', type: 'string' },
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
});