<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
  (e: 'input'): void
}>()
</script>

<template>
  <div class="search-block">
    <input
      class="search-input"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value); $emit('input')"
      type="text"
      placeholder="Поиск по адресу"
    />

    <button
      :disabled="disabled"
      @click="$emit('clear')"
    >
      Очистить фильтры
    </button>
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
</style>
