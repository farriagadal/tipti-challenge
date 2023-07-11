import { shallowMount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'
import { createStore } from 'vuex'
import hotelModule from '@/store/hotel.module'

hotelModule.state = {
  ...hotelModule.state,
  dates: []
}

const store: any = createStore({
  modules: {
    hotel: hotelModule
  }
})

describe('DatePicker.vue', () => {
  it('adds selected dates to the store and displays them correctly', async () => {
    const wrapper = shallowMount(DatePicker, {
      global: {
        plugins: [store]
      }
    })

    // Verifica que inicialmente no hay fechas
    expect(store.state.hotel.dates).toEqual([])

    // Simula la selección de una fecha y haz clic en el botón 'APLICAR'
    const dateInput = wrapper.find('.date-picker__input')
    const applyButton = wrapper.find('.date-picker__button')
    await dateInput.setValue('2023-07-20')
    await applyButton.trigger('click')

    // Verifica que la fecha seleccionada se ha agregado al store
    expect(store.state.hotel.dates).toEqual(['2023-07-20T00:00:00.000Z'])

    // Verifica que la fecha seleccionada se muestra correctamente en la interfaz de usuario
    expect(wrapper.find('.dates-display__date').text()).toBe('20/7/2023')

    // Simula la selección de una segunda fecha y haz clic en el botón 'APLICAR'
    await dateInput.setValue('2023-07-22')
    await applyButton.trigger('click')

    // Verifica que la segunda fecha seleccionada se ha agregado al store
    expect(store.state.hotel.dates).toEqual(['2023-07-20T00:00:00.000Z', '2023-07-22T00:00:00.000Z'])

    // Verifica que ambas fechas seleccionadas se muestran correctamente en la interfaz de usuario
    const displayedDates = wrapper.findAll('.dates-display__date')
    expect(displayedDates[0].text()).toBe('20/7/2023')
    expect(displayedDates[1].text()).toBe('22/7/2023')
  })
})
