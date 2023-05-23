import { ref, computed, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, onValue, set, remove } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const registrosRef = dbRef(db, 'registros');

export default {
  setup() {
    // Datos y métodos
    const nuevoRegistro = ref({ descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' });
    const registros = ref([]);
    const editIndex = ref(null);

    // Cuando se monta el componente, comenzar a escuchar cambios en la base de datos de Firebase
    onMounted(() => {
      onValue(registrosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          registros.value = Object.values(data);
        } else {
          registros.value = [];
        }
      });
    });

    const addRegistro = () => {
      // Agrega una nueva fecha al registro y luego lo agrega a la lista de registros
      let fecha = new Date();
      let options = { timeZone: "America/Bogota", hour12: true };
      let strFecha = fecha.toLocaleString('en-US', options);
      nuevoRegistro.value.fecha = strFecha;
      const id = Date.now();
      set(registrosRef.child(id.toString()), { ...nuevoRegistro.value, id });
      nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
    };

    const editRecord = (id) => {
      // Configura el registro que estamos editando
      const registro = registros.value.find(registro => registro.id === id);
      nuevoRegistro.value = { ...registro };
      editIndex.value = id;
    };

    const saveEdit = (id) => {
      // Guarda las ediciones en el registro
      set(registrosRef.child(id.toString()), { ...nuevoRegistro.value, id });
      nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
      editIndex.value = null;
    };

    const cancelEdit = () => {
      // Cancela la edición actual
      nuevoRegistro.value = { descripcion: '', monto: 0, tipo: 'ingreso', fecha: '' };
      editIndex.value = null;
    };

    const deleteRecord = (id) => {
      // Elimina el registro seleccionado
      remove(registrosRef.child(id.toString()));
    };

      // Computa los totales de ingresos y gastos
      const totalIngresos = computed(() => registros.value.filter(r => r.tipo === 'ingreso').reduce((total, r) => total + Number(r.monto), 0));
      const totalGastos = computed(() => registros.value.filter(r => r.tipo === 'gasto').reduce((total, r) => total + Number(r.monto), 0));

      return { 
        nuevoRegistro, 
        registros, 
        editIndex, 
        addRegistro, 
        editRecord, 
        saveEdit, 
        cancelEdit, 
        deleteRecord, 
        totalIngresos, 
        totalGastos 
      };
  }
}
