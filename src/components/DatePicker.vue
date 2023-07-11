<template>
  <div>
    <input
      type="date"
      v-model="selectedDate"
    />
    <button @click="updateDates">Update Dates</button>
  </div>
  <div>
    <template v-for="date in dates">
      {{ date }}
    </template>
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

    return { selectedDate, updateDates, dates }
  }
})
</script>
