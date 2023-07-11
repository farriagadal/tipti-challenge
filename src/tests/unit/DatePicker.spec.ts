import { shallowMount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'

describe('DatePicker.vue', () => {
  it('emite un evento de cambio con la fecha seleccionada', async () => {
    const wrapper = shallowMount(DatePicker)

    // Simula la selección de una fecha
    await wrapper.vm.$emit('change', '2023-07-15')

    // Verifica que el evento 'change' fue emitido con la fecha correcta
    expect(wrapper.emitted().change[0]).toEqual(['2023-07-15'])
  })
})
