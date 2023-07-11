<template>
  <div class="customer-toggle">
    <label>
      <input
        name="customerType"
        type="radio"
        value="regular"
        v-model="internalValue"
      />
      Regular
    </label>
    <label>
      <input
        name="customerType"
        type="radio"
        value="rewards"
        v-model="internalValue"
      />
      Rewards
    </label>
    <label>
      <input
        name="customerType"
        type="radio"
        :value="null"
        v-model="internalValue"
      />
      None
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { CustomerType } from '../models/CustomerType'

export default defineComponent({
  name: 'CustomerToggle',
  setup () {
    const store = useStore()

    const internalValue = computed<CustomerType | null | undefined>({
      get: () => store.state.customerType,
      set: (value) => store.commit('updateCustomerType', value)
    })

    return { internalValue }
  }
})
</script>

<style scoped lang="scss">
.customer-toggle {
  //
}
</style>
