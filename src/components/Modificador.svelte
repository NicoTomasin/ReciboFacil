<script>
  import { Premios, Deducciones, Edicion } from "../store/Modificadores";
  import { drawComponent } from "../helpers";
  import { get } from "svelte/store";
    


  let nombre = "";
  let tipo = "Porcentual";
  let cantidad = 0;
  let estado = true;
  let modificador = "Deduccion";
  Edicion.subscribe((editar) => {
    nombre = editar[0].nombre;
    tipo = editar[0].tipo;
    cantidad = editar[0].cantidad;
    estado =  editar[0].estado;
    modificador =  editar[0].modificador;
  });
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
      // check if the name already exists
      const deducciones = get(Deducciones);
      const deduccion = deducciones.findIndex((deduccion) => deduccion.nombre === nombre);
      if (deduccion !== -1) {
       // remove index
        deducciones.splice(deduccion, 1);
       Deducciones.update((deducciones) => [
        ...deducciones,
        { nombre, tipo, cantidad, estado },
      ]);
      } else {
        Deducciones.update((deducciones) => [
          ...deducciones,
          { nombre, tipo, cantidad, estado },
        ]);
      }
    } else {
      // check if the name already exists
      const premios = get(Premios);
      const premio = premios.findIndex((premio) => premio.nombre === nombre);
      if (premio !== -1) {
        // remove index
        premios.splice(premio, 1);
        Premios.update((premios) => [
          ...premios,
          { nombre, tipo, cantidad, estado },
        ]);
      } else {
        Premios.update((premios) => [
          ...premios,
          { nombre, tipo, cantidad, estado },
        ]);
      }
    }
    nombre = "";
    tipo = "Porcentual";
    cantidad = 0;
    estado = true;
    return drawComponent("Empleado")
  };
</script>

<div class="form">
  <h2>Agregar Modificador</h2>
  <div class="input">
    <div class="inputBox">
      <label>Tipo</label>
      <select bind:value={modificador}>
        <option value="Deduccion">Deduccion</option>
        <option value="Premio">Premio</option>
      </select>
    </div>
    <div class="inputBox">
      <label>Nombre</label>
      <input bind:value={nombre} placeholder="Nombre" />
    </div>
    <div class="inputBox">
      <label>Como afecta</label>
      <select bind:value={tipo}>
        <option value="Fija">Fija</option>
        <option value="Porcentual">Porcentual</option>
      </select>
    </div>
    <div class="inputBox">
      <label>Cantidad</label>
      <input bind:value={cantidad} type="number" placeholder="Cantidad" />
    </div>
    <div class="inputBox">
      <button on:click={setModificador}>Agregar Deduccion</button>
    </div>
    <div class="inputBox">
      <button on:click={() => drawComponent("Empleado")} class="formButton">
        Volver a Empleado
      </button>
    </div>
  </div>
</div>

<style>
  .form .input .inputBox button {
    width: 100%;
    height: 50px;
    color: #03f4d4;
    background: #131419;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    font-size: 18px;
    margin-top: 20px;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.1),
      2px 2px 6px rgba(0, 0, 0, 0.8);
  }
  .form .input .inputBox button:active {
    color: #006c9c;
    margin-top: 20px;
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
      inset 2px 2px 6px rgba(0, 0, 0, 0.8);
  }
  .form .input .inputBox input::placeholder {
    color: #555;
    font-size: 18px;
  }
</style>
