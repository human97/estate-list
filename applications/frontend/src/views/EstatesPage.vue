<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEstateStore } from '@/store/estateStore'
import { storeToRefs } from 'pinia'
import EstateTable from '@/components/EstateTable.vue'
import AppLoader from '@/components/UI/AppLoader.vue'

const estateStore = useEstateStore()

const { loading, error, estates, searchQuery, currentCityFilter } = storeToRefs(estateStore)

const tableHeads = ['Адрес', 'Город', 'Тип', 'Цена']

onMounted(() => {
  estateStore.fetchEstates()
})

const filteredEstates = computed(() => {
  if (!searchQuery.value || estates.value.length === 0) return estates.value

  return estates.value.filter((estate) =>
    estate.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isClearButtonDisabled = computed(() => {
  return !searchQuery.value && !currentCityFilter.value;
})
</script>

<template>
  <div>
    <h1>Список объектов недвижимости</h1>

    <div class="search-block">
      <input
        class="search-input"
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по адресу"
        @input="estateStore.handleSearch"
      />

      <button
        :disabled="isClearButtonDisabled"
        @click="estateStore.clearFilters"
      >
        Очистить фильтры
      </button>
    </div>

    <AppLoader v-if="loading" /> 

    <p v-if="error" class="error-message">{{ error }}</p>

    <EstateTable
      v-else-if="estates.length > 0"
      :head="tableHeads"
      :estates="filteredEstates"
      :highlightSearch="estateStore.highlightSearch"
      :filterByCity="estateStore.filterByCity"
    />

    <p v-else class="no-data">Нет данных для отображения</p>
  </div>
</template>

<style scoped lang="scss">
.search-block {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-input { 
  border: 1px solid gray;
  padding: 0 10px;
  height: 40px;
  border-radius: 7px;
  font-size: 15px;
  width: 50%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-weight: bold;
}

.no-data {
  color: gray;
  font-style: italic;
}
</style>