<script>
  let nombre = "";
  let tipo = "Porcentual";
  let cantidad = "";

  let deducciones = JSON.parse(localStorage.getItem("deducciones")) || [
    { nombre: "Jubilacion", tipo: "Porcentual", cantidad: "11" },
    { nombre: "Ley 19.032", tipo: "Porcentual", cantidad: "3" },
  ];
  localStorage.setItem("deducciones", JSON.stringify(deducciones));
  function handleSetData() {
    // Verificar si todos los campos tienen valores
    if (nombre.trim() !== "" && tipo !== "" && cantidad !== "") {
      // Crear un nuevo objeto de empleado
      const nuevaDeduccion = {
        nombre: nombre,
        tipo: tipo,
        cantidad: cantidad,
      };
      // Agregar el nuevo empleado a la lista
      deducciones.push(nuevaDeduccion);

      // Actualizar el Local Storage con la lista de empleados en formato JSON
      localStorage.setItem("deducciones", JSON.stringify(deducciones));
      deducciones = JSON.parse(localStorage.getItem("deducciones"));
      // Limpiar los campos después de agregar el empleado
      nombre = "";
      tipo = "Porcentual";
      cantidad = "";
    }
  }
  function eliminarDeduccion(index) {
    deducciones.splice(index, 1);
    localStorage.setItem("deducciones", JSON.stringify(deducciones));
    deducciones = JSON.parse(localStorage.getItem("deducciones"));
  }
</script>

<div class="mx-auto max-w-screen-lg px-3">
  <div class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title text-2xl">Agregar Deduccion</h2>
      <input bind:value={nombre} placeholder="Nombre" />
      <div class="card-actions justify-end">
        <select bind:value={tipo}>
          <option value="Fija">Fija</option>
          <option value="Porcentual">Porcentual</option>
        </select>
        <input bind:value={cantidad} placeholder="Cantidad" />
      </div>
      <div class="card-actions justify-end">
        <button on:click={handleSetData}>Agregar Deduccion</button>
      </div>
    </div>
  </div>

  <h2 class="text-2xl">Deducciones:</h2>
  <ul>
    {#each deducciones as deduccion, index (deduccion)}
      <li>
        <strong>Nombre:</strong>
        {deduccion.nombre}, <strong>Tipo:</strong>
        {deduccion.tipo}, <strong>Cantidad:</strong>
        {deduccion.cantidad}
        <button on:click={() => eliminarDeduccion(index)}>Eliminar</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  input,
  select,
  option {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    color: black;
  }
  button {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    color: black;
    background-color: #ccc;
  }
  .card {
    border-radius: 15px;
    padding: 10px;
    margin: 10px 0;
    color: black;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
