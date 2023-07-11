<template>
  <div class="hotel-card">
    <h2 class="hotel-card__name">{{ hotel.name }}</h2>
    <div class="hotel-card__rating">
      <span v-for="star in hotel.rating" :key="star" class="star">★</span>
    </div>
    <div class="hotel-card__rates">
      <div v-if="!hasDates || isWeek">
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
    <div v-if="customerType && hasDates" class="hotel-card__price">
      Precio final: ${{ hotel.finalPrice }}
      <label v-if="hotel.recommended">{{ hotel.recommended ? 'Recomendado' : '' }}</label>
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
    }
  },
  setup () {
    const store = useStore()
    const customerType = computed(() => store.state.hotel.customerType)

    const hasDates = computed(() => {
      return store.state.hotel.dates.length > 0
    })

    const dates = computed(() => {
      return store.state.hotel.dates
    })

    const isWeekend = computed(() => {
      return store.state.hotel.dates.some((dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDay()
        return day === 5 || day === 6 // 0 es domingo, 6 es sábado
      })
    })

    const isWeek = computed(() => {
      return store.state.hotel.dates.some((dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDay()
        return day !== 5 && day !== 6 // 0 es domingo, 6 es sábado
      })
    })

    return { customerType, isWeekend, isWeek, hasDates, dates }
  }
})
</script>

<style lang="scss" scoped>
.hotel-card {
  padding: 20px 50px;
  padding-bottom: 0;
  margin-bottom: 10px;
  cursor: pointer;
  background: #f6f8fa;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  &__rating {
    color: rgb(195, 166, 52);
  }

  &__rates {
    padding-bottom: 20px;
  }

  &__price {
    background: #000;
    color: #fff;
    padding: 20px;
    margin: 0 -50px;
    margin-top: 20px;
    font-size: 17px;
    letter-spacing: 1px;

    label {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      color: #fff;
      padding: 5px 10px;
    }
  }
}
</style>
