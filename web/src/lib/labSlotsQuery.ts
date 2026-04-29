export type LabSlotDoc = {
  _id: string
  title: string
  time: string
  filledSpots: number
  maxSpots: number
  date: string
}

/** GROQ: slots in date range, ordered by date then time. */
export const labSlotsInRangeQuery = `*[_type == "labSlot" && date >= $from && date <= $to] | order(date asc, time asc) {
  _id,
  title,
  time,
  filledSpots,
  "maxSpots": coalesce(maxSpots, 12),
  date
}`
