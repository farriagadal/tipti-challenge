import { shallowMount } from '@vue/test-utils'
import HotelList from '@/components/HotelList.vue'
import HotelCard from '@/components/HotelCard.vue'
import { createStore } from 'vuex'
import hotelModule from '@/store/hotel.module'

hotelModule.state = {
  ...hotelModule.state,
  customerType: 'regular',
  dates: [new Date('2023-07-14T00:00:00.000Z')]
}

const store: any = createStore({
  modules: {
    hotel: hotelModule
  }
})

describe('HotelList.vue', () => {
  it('renders the hotel list correctly', async () => {
    const wrapper = shallowMount(HotelList, {
      global: {
        plugins: [store]
      }
    })

    // Comprueba que todos los hoteles se renderizan.
    const hotelCards = wrapper.findAllComponents(HotelCard)
    expect(hotelCards.length).toBe(store.state.hotel.hotels.length)

    // Comprueba que los hoteles se renderizan en el orden correcto.
    for (let i = 0; i < hotelCards.length; i++) {
      expect(hotelCards[i].props().hotel).toBe(store.state.hotel.hotels[i])
    }
  })

  // Prueba que verifica si el hotel con el precio final más bajo y la mejor clasificación se marca como recomendado.
  it('marks the hotel with the lowest final price and best rating as recommended', () => {
    const wrapper = shallowMount(HotelList, {
      global: {
        plugins: [store]
      }
    })

    const hotelCards = wrapper.findAllComponents(HotelCard)
    const recommendedHotelCard = hotelCards.filter(hotelCard => hotelCard.props().hotel.recommended)[0]

    expect(recommendedHotelCard).toBeDefined()

    const recommendedHotel = recommendedHotelCard.props().hotel

    for (const hotelCard of hotelCards) {
      const hotel = hotelCard.props().hotel
      expect(recommendedHotel.finalPrice <= hotel.finalPrice).toBe(true)
      if (hotel.finalPrice === recommendedHotel.finalPrice) {
        expect(hotel.rating <= recommendedHotel.rating).toBe(true)
      }
    }
  })
})
