import { Hotel } from '../models/Hotel'

export interface HotelState {
  hotels: Hotel[]
}

// Datos iniciales de los hoteles
const hotelsData: Hotel[] = [
  {
    name: 'Lakewood',
    rating: 3,
    weekdayRates: { regular: 110, rewards: 80 },
    weekendRates: { regular: 90, rewards: 80 }
  },
  {
    name: 'Bridgewood',
    rating: 4,
    weekdayRates: { regular: 160, rewards: 110 },
    weekendRates: { regular: 60, rewards: 50 }
  },
  {
    name: 'Ridgewood',
    rating: 5,
    weekdayRates: { regular: 220, rewards: 100 },
    weekendRates: { regular: 150, rewards: 40 }
  }
]

interface State {
  dates: Date[];
  customerType: string | null;
  hotels: Hotel[];
}

export default {
  state: {
    dates: [],
    customerType: null,
    hotels: hotelsData
  } as State,
  mutations: {
    updateDates (state: State, date: Date) {
      console.log('updateDates', date)
      if (date) {
        state.dates = [date]
      } else {
        state.dates = []
      }
    },
    updateCustomerType (state: State, type: string) {
      state.customerType = type
    }
  },
  actions: {},
  getters: {}
}
