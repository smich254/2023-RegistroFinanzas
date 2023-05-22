import { ref, computed } from 'vue';

export default {
  setup() {
    // Datos y métodos
    const nuevoRegistro = ref({ descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' });
    const registros = ref(JSON.parse(localStorage.getItem('registros')) || []);
    const editIndex = ref(-1);

    const addRegistro = () => {
        // Agrega una nueva fecha al registro y luego lo agrega a la lista de registros
        let fecha = new Date();
        let options = { timeZone: "America/Bogota", hour12: true};
        let strFecha = fecha.toLocaleString('en-US', options);
        nuevoRegistro.value.fecha = strFecha;
        registros.value.push({ ...nuevoRegistro.value, id: Date.now() });
        localStorage.setItem('registros', JSON.stringify(registros.value));
        nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
    };

    const editRecord = (index) => {
      // Configura el registro que estamos editando
      nuevoRegistro.value = { ...registros.value[index] };
      editIndex.value = index;
    };

    const saveEdit = (index) => {
      // Guarda las ediciones en el registro
      nuevoRegistro.value.fecha = new Date(nuevoRegistro.value.fecha).toISOString().slice(0,10);
      registros.value.splice(index, 1, nuevoRegistro.value);
      localStorage.setItem('registros', JSON.stringify(registros.value));
      nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
      editIndex.value = -1;
    };

    const cancelEdit = () => {
      // Cancela la edición actual
      nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
      editIndex.value = -1;
    };

    const deleteRecord = (index) => {
      // Elimina el registro seleccionado
      registros.value.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros.value));
    };

    // Computa los totales de ingresos y gastos
    const totalIngresos = computed(() => registros.value.filter(r => r.tipo === 'ingreso').reduce((total, r) => total + Number(r.monto), 0));
    const totalGastos = computed(() => registros.value.filter(r => r.tipo === 'gasto').reduce((total, r) => total + Number(r.monto), 0));

    return { nuevoRegistro, registros, editIndex, addRegistro, editRecord, saveEdit, cancelEdit, deleteRecord, totalIngresos, totalGastos };
  }
}
