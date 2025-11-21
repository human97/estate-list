<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEstateStore } from '@/store/estateStore'
import { storeToRefs } from 'pinia'
import EstateTable from '@/components/EstateTable.vue'
import AppLoader from '@/components/UI/AppLoader.vue'
import EstateFilter from '@/components/EstateFilter.vue'
import { highlightSearch as highlightSearchUtil } from '@/utils/textUtils'

// 1. Store
const estateStore = useEstateStore()
const { loading, error, estates, searchQuery, currentCityFilter } = storeToRefs(estateStore)
const tableHeads = ['Адрес', 'Город', 'Тип', 'Цена']

// 2. Computed
const filteredEstates = computed(() => {
  if (!searchQuery.value || estates.value.length === 0) return estates.value

  return estates.value.filter((estate) =>
    estate.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isClearButtonDisabled = computed(() => {
  return !searchQuery.value && !currentCityFilter.value;
})

// 3. Methods
const highlightSearch = (text: string) => {
  return highlightSearchUtil(text, searchQuery.value)
}

// 4. Hooks
onMounted(() => {
  estateStore.fetchEstates()
})
</script>

<template>
  <div>
    <h1>Список объектов недвижимости</h1>

    <EstateFilter
      v-model="searchQuery"
      :disabled="isClearButtonDisabled"
      @clear="estateStore.clearFilters"
      @input="estateStore.handleSearch"
    />

    <AppLoader v-if="loading" /> 

    <p v-if="error" class="error-message">{{ error }}</p>

    <EstateTable
      v-else-if="estates.length > 0"
      :head="tableHeads"
      :estates="filteredEstates"
      :highlightSearch="highlightSearch"
      :filterByCity="estateStore.filterByCity"
    />

    <p v-else class="no-data">Нет данных для отображения</p>
  </div>
</template>

<style scoped lang="scss">
.error-message {
  color: red;
  font-weight: bold;
}

.no-data {
  color: gray;
  font-style: italic;
}
</style>