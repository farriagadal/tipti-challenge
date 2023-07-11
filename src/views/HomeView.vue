<template>
  <div class="home">
    <div class="home__hero">
      <h1>RESERVA DE HOTELES</h1>
    </div>
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
  padding-bottom: 100px;
  &__hero {
    background-image: url(../assets/hero.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 60px;

    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(270deg,rgba(0,0,0,.6),rgba(0,0,0,.2) 48.15%,rgba(0,0,0,.6) 97.32%);
    }

    h1 {
      font-size: 3rem;
      color: #fff;
      position: relative;
      z-index: 1;
      letter-spacing: 4px;
      background: #030303;
      padding: 10px 50px;
    }
  }
}
</style>
