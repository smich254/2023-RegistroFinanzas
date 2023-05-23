<template>
  <div>
    <h1>Gestión de Finanzas</h1>
    <!-- Formulario de entrada para agregar un nuevo registro -->
    <form @submit.prevent="addRegistro">
      <input type="text" v-model="nuevoRegistro.descripcion" placeholder="Descripción">
      <input type="number" v-model="nuevoRegistro.monto" placeholder="Monto">
      <select v-model="nuevoRegistro.tipo">
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <button type="submit">Agregar</button>
    </form>

    <!-- Loop a través de cada registro -->
    <div v-for="(registro, index) in registros" :key="registro.id" :class="registro.tipo">
      <!-- Si no estamos editando este registro, muéstralo normalmente -->
      <p v-if="registro.id !== editIndex">{{ registro.descripcion }}: ${{ registro.monto }} (<span v-format-date="registro.fecha"></span>)</p>
      
      <!-- Si estamos editando este registro, muestre los inputs para editar -->
      <div v-else>
        <input type="text" v-model="registro.descripcion" />
        <input type="number" v-model="registro.monto" />
        <input type="date" v-model="registro.fecha" />
        <select v-model="registro.tipo">
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <button @click="saveEdit(registro.id)">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </div>
      
      <!-- Botones para editar y eliminar este registro -->
      <button @click="editRecord(registro.id)">Editar</button>
      <button @click="deleteRecord(registro.id)">Eliminar</button>
    </div>

    <!-- Resumen de ingresos, gastos y saldo restante -->
    <p>Total de Ingresos: ${{ totalIngresos }}</p>
    <p>Total de Gastos: ${{ totalGastos }}</p>
    <p>Dinero restante: ${{ totalIngresos - totalGastos }}</p>
  </div>
</template>


<script src="./RegistroFinanzas.js"></script>

<style scoped src="./RegistroFinanzas.css"></style>
