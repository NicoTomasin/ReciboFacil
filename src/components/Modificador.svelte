<script>
  import { Premios, Deducciones } from "../store/Modificadores";
  import { drawComponent } from "../helpers";
  let nombre = "";
  let tipo = "Porcentual";
  let cantidad = 0;
  let estado = true;
  let modificador = "Deduccion";
  const setModificador = () => {
    if (nombre === "") {
      alert("El nombre no puede estar vacio");
      nombre = "";
      tipo = "Porcentual";
      cantidad = 0;
      estado = true;
      return;
    }
    if (modificador === "Deduccion") {
      Deducciones.update((deducciones) => [
        ...deducciones,
        { nombre, tipo, cantidad, estado },
      ]);
    } else {
      Premios.update((premios) => [
        ...premios,
        { nombre, tipo, cantidad, estado },
      ]);
    }
    nombre = "";
    tipo = "Porcentual";
    cantidad = 0;
    estado = true;
  };
</script>

<div class="mx-auto max-w-screen-lg px-3">
  <div class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title text-2xl">Agregar Modificador</h2>
      <select bind:value={modificador}>
        <option value="Deduccion">Deduccion</option>
        <option value="Premio">Premio</option>
      </select>
      <input bind:value={nombre} placeholder="Nombre" />
      <div class="card-actions justify-end">
        <select bind:value={tipo}>
          <option value="Fija">Fija</option>
          <option value="Porcentual">Porcentual</option>
        </select>
        <input bind:value={cantidad} type="number" placeholder="Cantidad" />
      </div>
      <div class="card-actions justify-end">
        <button on:click={setModificador}>Agregar Deduccion</button>
      </div>
      <div class="card-actions justify-end">
        <button on:click={() => drawComponent("Empleado")} class="formButton">
          Volver a Empleado
        </button>
      </div>
    </div>
  </div>
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
