import { shallowMount } from '@vue/test-utils'
import CustomerToggle from '@/components/CustomerToggle.vue'
import { createStore } from 'vuex'
import hotelModule from '@/store/hotel.module'

hotelModule.state = {
  ...hotelModule.state,
  customerType: null
}

const store: any = createStore({
  modules: {
    hotel: hotelModule
  }
})

describe('CustomerToggle.vue', () => {
  it('updates the customer type correctly when a radio button is clicked', async () => {
    const wrapper = shallowMount(CustomerToggle, {
      global: {
        plugins: [store]
      }
    })

    // Verificar que inicialmente el tipo de cliente es null
    expect(store.state.hotel.customerType).toBe(null)

    // Haz clic en el botón de radio 'Regular' y verifica que el tipo de cliente se actualiza
    const regularRadioButton = wrapper.findAll('input[type="radio"]')[1]
    await regularRadioButton.setValue('regular')
    expect(store.state.hotel.customerType).toBe('regular')

    // Haz clic en el botón de radio 'Rewards' y verifica que el tipo de cliente se actualiza
    const rewardsRadioButton = wrapper.findAll('input[type="radio"]')[2]
    await rewardsRadioButton.setValue('rewards')
    expect(store.state.hotel.customerType).toBe('rewards')
  })
})
