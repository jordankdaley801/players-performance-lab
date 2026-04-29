import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '45psouop'
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'prod'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-04-28'

/** Browser client for public dataset reads + live subscriptions. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
