import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Sanity Studio',

  projectId: 't3n0rxcc', // <-- Paste your ID from Step 1
  dataset: 'production',

  plugins: [structureTool(),
           visionTool()
           ],

  schema: {
    types: schemaTypes,
  },
})