<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GetPlanetsDocument } from './types'

const { result, loading, error } = useQuery(GetPlanetsDocument)
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 text-center text-indigo-700">Довідник екзопланет (Exoplanet Directory)</h1>
      
      <div v-if="loading" class="text-center py-10 text-gray-600 text-lg">Завантаження даних...</div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">Помилка завантаження: {{ error.message }}</div>
      <div v-else-if="result && result.planets">
        <div class="flex flex-col gap-6">
          <div v-for="(planet, index) in result.planets" :key="index" 
               class="rounded-xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
               :class="index % 2 === 0 
                  ? 'bg-gradient-to-r from-indigo-50 to-white border-indigo-200 shadow-md ring-1 ring-indigo-50' 
                  : 'bg-white border-gray-200 shadow-sm'">
            
            <!-- Decorative badge for highlighted items -->
            <div v-if="index % 2 === 0" class="absolute top-0 right-0 w-2 h-full bg-indigo-400"></div>
            
            <h2 class="text-2xl font-bold mb-4" :class="index % 2 === 0 ? 'text-indigo-800' : 'text-gray-800'">
              {{ planet.pl_name }}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700">
              <div class="bg-white/60 rounded-lg p-3 border border-gray-100 shadow-sm backdrop-blur-sm">
                <span class="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Зоря-господар</span> 
                <span class="text-lg text-gray-800">{{ planet.hostname }}</span>
              </div>
              <div class="bg-white/60 rounded-lg p-3 border border-gray-100 shadow-sm backdrop-blur-sm">
                <span class="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Рік відкриття</span> 
                <span class="text-lg text-gray-800">{{ planet.disc_year || 'Невідомо' }}</span>
              </div>
              <div class="bg-white/60 rounded-lg p-3 border border-gray-100 shadow-sm backdrop-blur-sm">
                <span class="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Маса (земна)</span> 
                <span class="text-lg text-gray-800">{{ planet.pl_bmasse || 'Невідомо' }}</span>
              </div>
              <div class="bg-white/60 rounded-lg p-3 border border-gray-100 shadow-sm backdrop-blur-sm">
                <span class="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Відстань (пк)</span> 
                <span class="text-lg text-gray-800">{{ planet.sy_dist || 'Невідомо' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
