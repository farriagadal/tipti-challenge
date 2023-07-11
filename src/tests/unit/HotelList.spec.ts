import { shallowMount } from '@vue/test-utils'
import HotelList from '@/components/HotelList.vue'
import { Hotel } from '@/models/Hotel'

describe('HotelList.vue', () => {
  const hotels: Hotel[] = [
    {
      name: 'Lakewood',
      rating: 3,
      weekdayRates: { regular: 110, rewards: 80 },
      weekendRates: { regular: 90, rewards: 80 }
    }
  ]

  it('renderiza la lista de hoteles', () => {
    const wrapper = shallowMount(HotelList, {
      props: { hotels }
    })

    expect(wrapper.find('.hotel-list').exists()).toBe(true)
    expect(wrapper.findAll('.hotel-card')).toHaveLength(hotels.length)
  })
})
