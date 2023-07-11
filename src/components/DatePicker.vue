<template>
  <div>
    <input
      type="date"
      v-model="selectedDates"
      multiple
    />
    <button @click="updateDates">Update Dates</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DatePicker',
  setup () {
    const store = useStore()
    const selectedDates = ref([])

    const updateDates = () => {
      console.log(selectedDates.value)
      store.commit('updateDates', selectedDates.value)
    }

    return { selectedDates, updateDates }
  }
})
</script>
