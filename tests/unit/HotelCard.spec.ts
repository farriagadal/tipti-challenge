import { shallowMount } from '@vue/test-utils'
import HotelCard from '@/components/HotelCard.vue'
import { createStore } from 'vuex'
import hotelModule from '@/store/hotel.module'

hotelModule.state = {
  ...hotelModule.state,
  customerType: 'regular',
  dates: [new Date('2023-07-14T00:00:00.000Z')]
}

const store = createStore({
  modules: {
    hotel: hotelModule
  }
})

describe('HotelCard.vue', () => {
  it('renders correctly for regular customer and no date is specified', async () => {
    const wrapper = shallowMount(HotelCard, {
      global: {
        plugins: [store]
      },
      props: {
        hotel: {
          name: 'Lakewood',
          rating: 3,
          weekdayRates: { regular: 110, rewards: 80 },
          weekendRates: { regular: 90, rewards: 80 },
          recomended: true,
          finalPrice: 110
        }
      }
    })

    // Verificar que el componente se renderiza correctamente.
    expect(wrapper.find('.hotel-card__name').text()).toBe('Lakewood')
    expect(wrapper.find('.hotel-card__rating').exists()).toBe(true)

    // Verificar que se muestra el precio final.
    expect(wrapper.find('.hotel-card__price').text()).toContain('Precio final: $110') // Ya que el precio final es 110

    // Verificar que el texto del tipo de cliente se muestra correctamente. weekdayRates (1) * regular price (110) = $110
    expect(wrapper.text()).toContain('Regular: $110')

    // Verificar que no se muestra el tipo de cliente "Rewards"m ya qye se selecciono "regular"
    expect(wrapper.text()).not.toContain('Rewards')
  })
})
