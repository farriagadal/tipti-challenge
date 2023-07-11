<template>
  <div class="hotel-list">
    <HotelCard
      v-for="hotel in hotels"
      :key="hotel.name"
      :hotel="hotel"
      :lowestPrice="lowestPrice"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import HotelCard from './HotelCard.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HotelList',
  components: {
    HotelCard
  },
  setup () {
    const store = useStore()
    const hotels = store.state.hotel.hotels // Obteniendo los hoteles desde el store de Vuex

    const customerType = computed(() => store.state.hotel.customerType)

    const dates = computed(() => {
      return store.state.hotel.dates
    })

    // Calcular el precio final para cada hotel y almacenarlo en el objeto del hotel

    const lowestPrice = computed(() => {
      for (const hotel of hotels) {
        const rates = customerType.value === 'rewards' ? 'rewards' : 'regular'
        let totalPrice = 0
        for (const dateString of dates.value) {
          const date = new Date(dateString)
          const day = date.getDay()
          if (day === 5 || day === 6) { // si es fin de semana
            totalPrice += hotel.weekendRates[rates]
          } else { // si es día de la semana
            totalPrice += hotel.weekdayRates[rates]
          }
        }
        hotel.finalPrice = totalPrice
      }
      // Usar la función Math.min para encontrar el precio más bajo de todos los hoteles
      return Math.min(...hotels.map((hotel: any) => hotel.finalPrice))
    })

    return {
      hotels,
      lowestPrice
    }
  }
})
</script>

<style scoped lang="scss">
.hotel-list {
  display: flex;
  margin: auto;
  width: fit-content;
  gap: 40px;
  margin-top: 70px;
}
</style>
