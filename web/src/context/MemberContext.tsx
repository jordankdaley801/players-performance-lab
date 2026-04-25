import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CageBooking = {
  id: string
  cageId: number
  label: string
  date: string
  start: string
  end: string
}

export type MemberProfile = {
  email: string
  name: string
  team?: string
  membershipMonthly: number
  nextBilling: string
}

type MemberContextValue = {
  member: MemberProfile | null
  bookings: CageBooking[]
  signIn: (email: string, name: string) => void
  signOut: () => void
  addBooking: (b: Omit<CageBooking, 'id'>) => void
  cancelBooking: (id: string) => void
  updateCardPlaceholder: () => void
  lastCardUpdate: string | null
}

const STORAGE_KEY = 'ppl-member-v1'

function load(): {member: MemberProfile | null; bookings: CageBooking[]} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {member: null, bookings: []}
    return JSON.parse(raw) as {member: MemberProfile | null; bookings: CageBooking[]}
  } catch {
    return {member: null, bookings: []}
  }
}

const MemberContext = createContext<MemberContextValue | null>(null)

export function MemberProvider({children}: {children: ReactNode}) {
  const initial = typeof window !== 'undefined' ? load() : {member: null, bookings: []}
  const [member, setMember] = useState<MemberProfile | null>(initial.member)
  const [bookings, setBookings] = useState<CageBooking[]>(initial.bookings)
  const [lastCardUpdate, setLastCardUpdate] = useState<string | null>(null)

  const persist = useCallback((m: MemberProfile | null, b: CageBooking[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({member: m, bookings: b}))
  }, [])

  const signIn = useCallback(
    (email: string, name: string) => {
      const m: MemberProfile = {
        email,
        name,
        team: 'Facility member',
        membershipMonthly: 85,
        nextBilling: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      }
      setMember(m)
      setBookings([])
      persist(m, [])
    },
    [persist],
  )

  const signOut = useCallback(() => {
    setMember(null)
    setBookings([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const addBooking = useCallback(
    (b: Omit<CageBooking, 'id'>) => {
      const id = crypto.randomUUID()
      const next = [...bookings, {...b, id}]
      setBookings(next)
      if (member) persist(member, next)
    },
    [bookings, member, persist],
  )

  const cancelBooking = useCallback(
    (id: string) => {
      const next = bookings.filter((x) => x.id !== id)
      setBookings(next)
      if (member) persist(member, next)
    },
    [bookings, member, persist],
  )

  const updateCardPlaceholder = useCallback(() => {
    setLastCardUpdate(new Date().toISOString())
  }, [])

  const value = useMemo<MemberContextValue>(
    () => ({
      member,
      bookings,
      signIn,
      signOut,
      addBooking,
      cancelBooking,
      updateCardPlaceholder,
      lastCardUpdate,
    }),
    [
      member,
      bookings,
      signIn,
      signOut,
      addBooking,
      cancelBooking,
      updateCardPlaceholder,
      lastCardUpdate,
    ],
  )

  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
}

export function useMember() {
  const ctx = useContext(MemberContext)
  if (!ctx) throw new Error('useMember must be used within MemberProvider')
  return ctx
}
