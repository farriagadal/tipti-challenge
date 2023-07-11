<template>
  <div class="customer-toggle">
    <h2>Tipo de cliente</h2>
    <div class="radio-wrapper">
      <label class="radio-container">
        Regular
        <input
          name="customerType"
          type="radio"
          value="regular"
          v-model="internalValue"
        />
        <span class="checkmark"></span>
      </label>
      <label class="radio-container">
        Rewards
        <input
          name="customerType"
          type="radio"
          value="rewards"
          v-model="internalValue"
        />
        <span class="checkmark"></span>
      </label>
      <label class="radio-container">
        None
        <input
          name="customerType"
          type="radio"
          :value="null"
          v-model="internalValue"
        />
        <span class="checkmark"></span>
      </label>
    </div>
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
      get: () => store.state.customerType || null,
      set: (value) => store.commit('updateCustomerType', value)
    })

    return { internalValue }
  }
})
</script>

<style scoped lang="scss">
.customer-toggle {
  .radio-wrapper {
    margin: 1rem 0;
    display: flex;
    gap: 30px;
    margin: auto;
    width: fit-content;
  }
  .radio-container {
    padding-top: 4px;
    text-align: left;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: #2196F3;
        &:after {
          display: block;
        }
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 50%;
      &:after {
        content: "";
        position: absolute;
        display: none;
        top: 9px;
        left: 9px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: white;
      }
    }

    &:hover input ~ .checkmark {
      transition: all 0.3s ease-in-out;
      background-color: #ccc;
    }
  }
}
</style>
