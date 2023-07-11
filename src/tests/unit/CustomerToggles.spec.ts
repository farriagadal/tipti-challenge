import { shallowMount } from '@vue/test-utils'
import CustomerToggle from '@/components/CustomerToggle.vue'

describe('CustomerToggle.vue', () => {
  it('renderiza las opciones de cliente', () => {
    const wrapper = shallowMount(CustomerToggle)

    // Verifica que las opciones de cliente se rendericen
    expect(wrapper.text()).toContain('Regular')
    expect(wrapper.text()).toContain('Rewards')
  })

  it('emite un evento de cambio con el tipo de cliente seleccionado', async () => {
    const wrapper = shallowMount(CustomerToggle)

    // Selecciona la opción 'Rewards'
    await wrapper.find('input[value="rewards"]').setValue('rewards')

    // Verifica que el evento 'change' fue emitido con el valor 'rewards'
    expect(wrapper.emitted().change[0]).toEqual(['rewards'])
  })
})
