<template>
  <div class="hotel-card">
    <h2 class="hotel-name">{{ hotel.name }}</h2>
    <div class="hotel-rating">
      <span v-for="star in hotel.rating" :key="star" class="star">★</span>
    </div>
    <!-- {{ dates }} -->

    <div v-if="customerType && hasDates" class="hotel-final-price">
      Precio final: ${{ finalPrice }}
    </div>
    {{ lowestPrice && lowestPrice === finalPrice ? 'Cheapest' : '' }}
    <div class="hotel-rates">
      <div v-if="!hasDates || !isWeekend">
        <h3>Tarifas entre semana:</h3>
        <p v-if="!customerType || customerType === 'regular'">
          Regular: ${{ hotel.weekdayRates.regular }}
        </p>
        <p v-if="!customerType || customerType === 'rewards'">
          Rewards: ${{ hotel.weekdayRates.rewards }}
        </p>
      </div>
      <div v-if="!hasDates || isWeekend">
        <h3>Tarifas de fin de semana:</h3>
        <p v-if="!customerType || customerType === 'regular'">
          Regular: ${{ hotel.weekendRates.regular }}
        </p>
        <p v-if="!customerType || customerType === 'rewards'">
          Rewards: ${{ hotel.weekendRates.rewards }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Hotel } from '../models/Hotel'

export default defineComponent({
  name: 'HotelCard',
  props: {
    hotel: {
      type: Object as () => Hotel,
      required: true
    },
    lowestPrice: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const customerType = computed(() => store.state.hotel.customerType)

    const hasDates = computed(() => {
      return store.state.hotel.dates.length > 0
    })

    const dates = computed(() => {
      return store.state.hotel.dates
    })

    const finalPrice = computed(() => {
      const rates = customerType.value === 'rewards' ? 'rewards' : 'regular'
      let totalPrice = 0
      for (const dateString of dates.value) {
        const date = new Date(dateString)
        const day = date.getDay()
        if (day === 5 || day === 6) { // si es fin de semana
          totalPrice += props.hotel.weekendRates[rates]
        } else { // si es día de la semana
          totalPrice += props.hotel.weekdayRates[rates]
        }
      }
      return totalPrice
    })

    const isWeekend = computed(() => {
      return store.state.hotel.dates.some((dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDay()
        return day === 5 || day === 6 // 0 es domingo, 6 es sábado
      })
    })

    return { customerType, isWeekend, hasDates, dates, finalPrice }
  }
})
</script>

<style lang="scss" scoped>
.hotel-card {
  border: solid 1px #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
