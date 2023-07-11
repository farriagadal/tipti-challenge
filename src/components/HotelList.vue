<template>
  <h2>Hoteles disponibles</h2>
  <div class="hotel-list">
    <HotelCard
      v-for="hotel in newHotels"
      :key="hotel.name"
      :hotel="hotel"
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

    // Se calcula el precio final para cada hotel y almacenarlo en el objeto del hotel

    const newHotels = computed(() => {
      const array = []
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
        array.push(hotel)
      }

      // Se selecciona el hotel recomendado con menor precio final y mejor rating
      let bestHotel = array[0]
      for (const hotel of array) {
        hotel.recommended = false
        if (hotel.finalPrice < bestHotel.finalPrice) {
          bestHotel = hotel
        } else if (hotel.finalPrice === bestHotel.finalPrice) {
          if (hotel.rating > bestHotel.rating) {
            bestHotel = hotel
          }
        }
      }
      bestHotel.recommended = true
      return array
    })

    return {
      newHotels
    }
  }
})
</script>

<style scoped lang="scss">
h2 {
  margin-top: 60px;
  margin-bottom: 50px;
}
.hotel-list {
  display: flex;
  margin: auto;
  width: fit-content;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
