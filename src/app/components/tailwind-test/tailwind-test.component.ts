import { Component } from '@angular/core';

@Component({
  selector: 'app-tailwind-test',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            🎉 ¡Tailwind CSS está funcionando!
          </h1>
          <p class="text-xl text-gray-600">
            Este es un componente de prueba para verificar que Tailwind CSS v4 esté correctamente configurado.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">🎨</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Diseño Moderno</h3>
            <p class="text-gray-600">Tailwind CSS te permite crear diseños modernos y responsivos de manera rápida.</p>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">⚡</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Rápido y Eficiente</h3>
            <p class="text-gray-600">Utiliza clases de utilidad para un desarrollo más rápido y mantenible.</p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-white text-xl">📱</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Responsivo</h3>
            <p class="text-gray-600">Diseños que se adaptan perfectamente a todos los dispositivos.</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105">
            ¡Empezar a usar Tailwind!
          </button>
        </div>

        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Clases de Tailwind utilizadas en este componente:</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <code class="bg-white px-2 py-1 rounded border">min-h-screen</code>
            <code class="bg-white px-2 py-1 rounded border">bg-gradient-to-br</code>
            <code class="bg-white px-2 py-1 rounded border">from-blue-50</code>
            <code class="bg-white px-2 py-1 rounded border">to-indigo-100</code>
            <code class="bg-white px-2 py-1 rounded border">max-w-4xl</code>
            <code class="bg-white px-2 py-1 rounded border">mx-auto</code>
            <code class="bg-white px-2 py-1 rounded border">text-center</code>
            <code class="bg-white px-2 py-1 rounded border">text-4xl</code>
            <code class="bg-white px-2 py-1 rounded border">font-bold</code>
            <code class="bg-white px-2 py-1 rounded border">text-gray-900</code>
            <code class="bg-white px-2 py-1 rounded border">mb-4</code>
            <code class="bg-white px-2 py-1 rounded border">grid</code>
            <code class="bg-white px-2 py-1 rounded border">grid-cols-1</code>
            <code class="bg-white px-2 py-1 rounded border">md:grid-cols-2</code>
            <code class="bg-white px-2 py-1 rounded border">lg:grid-cols-3</code>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TailwindTestComponent {} 