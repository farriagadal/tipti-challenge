<template>
  <div class="hotel-card" @click="selectHotel">
    <h2 class="hotel-name">{{ hotel.name }}</h2>
    <div class="hotel-rating">
      <span v-for="star in hotel.rating" :key="star" class="star">★</span>
    </div>
    <div class="hotel-rates">
      <div>
        <h3>Tarifas entre semana:</h3>
        <p>Regular: ${{ hotel.weekdayRates.regular }}</p>
        <p>Rewards: ${{ hotel.weekdayRates.rewards }}</p>
      </div>
      <div>
        <h3>Tarifas de fin de semana:</h3>
        <p>Regular: ${{ hotel.weekendRates.regular }}</p>
        <p>Rewards: ${{ hotel.weekendRates.rewards }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Hotel } from '../models/Hotel'

export default defineComponent({
  name: 'HotelCard',
  props: {
    hotel: {
      type: Object as () => Hotel,
      required: true
    }
  },
  methods: {
    selectHotel () {
      this.$emit('select', this.hotel.name)
    }
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
