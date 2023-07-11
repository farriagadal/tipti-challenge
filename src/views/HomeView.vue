<template>
  <div class="home">
    <h1>Reserva de hoteles</h1>
    <CustomerToggle />
    <DatePicker />
    <HotelList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomerToggle from '../components/CustomerToggle.vue'
import DatePicker from '../components/DatePicker.vue'
import HotelList from '../components/HotelList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    CustomerToggle,
    DatePicker,
    HotelList
  }
})
</script>

<style scoped lang="scss">
.home {
  //
}
</style>
