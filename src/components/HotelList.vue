<template>
  <div class="hotel-list">
    <HotelCard
      v-for="hotel in hotels"
      :key="hotel.name"
      :hotel="hotel"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    console.log(hotels)

    return {
      hotels
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
