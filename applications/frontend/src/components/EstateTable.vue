<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, index) in head" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="estate in estates" :key="estate.id">
        <td v-html="highlightSearch(estate.address)"></td>
        <td>
          <button @click="filterByCity(estate.city)">&#8859;</button>
          {{ estate.city }}
        </td>
        <td>{{ estate.type }}</td>
        <td>{{ estate.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface Estate {
  id: number;
  address: string;
  city: string;
  type: string;
  price: number;
}

interface Props {
  head: string[]; 
  estates: Estate[];
  highlightSearch: (text: string) => string;
  filterByCity: (city: string) => void;
}

const props = defineProps<Props>()
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>