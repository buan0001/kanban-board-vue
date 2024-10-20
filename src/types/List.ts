import type { Card } from "./Card"

interface List {
  id: number
  heading: string
  tasks: Card[]
}
export type { List }
