<template>
  <h2>Selecciona las fechas</h2>
  <div class="date-picker">
    <input
      class="date-picker__input"
      type="date"
      v-model="selectedDate"
    />
    <button class="date-picker__button" @click="updateDates">APLICAR</button>
  </div>
  <div v-if="dates.length" class="dates-display">
    <div v-for="(date, index) in dates" class="dates-display__date" :key="index">
      {{  getDate(date)  }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DatePicker',
  setup () {
    const store = useStore()
    const selectedDate = ref('')

    const dates = computed(() => {
      return store.state.hotel.dates
    })

    const updateDates = () => {
      if (!selectedDate.value) {
        store.commit('updateDates', [])
        return
      }
      const selectedDateISO = new Date(selectedDate.value).toISOString()
      if (!store.state.hotel.dates.includes(selectedDateISO)) {
        store.commit('updateDates', [...store.state.hotel.dates, selectedDateISO])
      }
    }

    const getDate = (date: string) => {
      // desfase horario en minutos.
      const timezoneOffsetMinutes = new Date().getTimezoneOffset()

      // desfase horario en milisegundos.
      const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000

      // fecha en base a la fecha ISO y compensa el desfase horario.
      const localDate = new Date(new Date(date).getTime() + timezoneOffsetMilliseconds)

      const year = localDate.getFullYear()
      const month = localDate.getMonth() + 1 // Los meses en JavaScript son 0-indexados.
      const day = localDate.getDate()

      return `${day}/${month}/${year}`
    }

    return { selectedDate, updateDates, dates, getDate }
  }
})
</script>

<style lang="scss" scoped>
$date-picker-bg: #f6f8fa;
$button-bg: #000000;
$border-color: #ddd;

.date-picker {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  background: $date-picker-bg;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);

  &__input {
    width: 70%;
    padding: 10px;
    border: 1px solid $border-color;
  }

  &__button {
    width: 150px;
    padding: 10px;
    border: none;
    background-color: $button-bg;
    color: #fff;
    cursor: pointer;
  }
}

.dates-display {
  margin-top: 20px;
  padding: 10px;
  background: $date-picker-bg;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  max-width: 300px;
  margin: auto;

  &__date {
    padding: 5px;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }
  }
}

</style>
