export interface Hotel {
  name: string
  rating: number
  weekdayRates: {
    regular: number
    rewards: number
  }
  weekendRates: {
    regular: number
    rewards: number
  }
}
