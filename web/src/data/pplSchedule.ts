export type SessionSlot = {
  time: string
  group: string
  full?: boolean
}

export type DayBlock = {
  label: string
  sessions: SessionSlot[]
}

/** Matches Players Performance Lab + KinetiQ flyer scheduling */
export const pplScheduleBlocks: DayBlock[] = [
  {
    label: 'Tuesday & Thursday',
    sessions: [
      {time: '4:00 PM', group: 'High School'},
      {time: '5:00 PM', group: 'Ages 11–13'},
      {time: '6:00 PM', group: 'Ages 9–10', full: true},
    ],
  },
  {
    label: 'Monday, Wednesday & Friday',
    sessions: [
      {time: '4:00 PM', group: 'Ages 9–10'},
      {time: '5:00 PM', group: 'Ages 11–13'},
      {time: '6:00 PM', group: 'High School'},
    ],
  },
]

export const pplBenefits = [
  'Increase exit velocity',
  'Improve pitching velocity',
  'Develop speed & explosiveness',
  'Improve 60-yard dash',
  'Monthly field testing',
  'Measured results',
]
