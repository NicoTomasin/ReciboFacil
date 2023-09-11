<script>
  import { Deducciones, Premios,Edicion} from "../store/Modificadores";
  import Badge from "./Badge.svelte";
  import * as helpers from "../helpers";

  let nombre = "";
  let antiguedad;
  let salarioBasico;
  let deducciones = [];
  let premios = [];
  let empleado = {};

  Deducciones.subscribe((deduccionesSub) => {
    deducciones = deduccionesSub;
  });

  Premios.subscribe((premiosSub) => {
    premios = premiosSub;
  });
  function getRecibo() {
    let deduccionesFinales = deducciones.filter(
      (deduccion) => deduccion.estado === true
    );
    let premiosFinales = premios.filter((premio) => premio.estado === true);

    empleado = {
      nombre,
      antiguedad,
      salarioBasico,
      deduccionesFinales,
      premiosFinales,
      salarioFinal: salarioBasico,
    };

    premiosFinales.forEach((premio) => {
      const nombrePremio = premio.nombre;
      const applyLogic = helpers[nombrePremio] || helpers.Default;
      applyLogic(empleado, premio);
    });

    deduccionesFinales.forEach((deduccion) => {
      helpers.Deducciones(empleado, deduccion);
    });
    console.log(empleado);
    return empleado;
  }
  const agregarModificador = ()=>{
    Edicion.update(() => [
        { nombre:"", tipo:"", cantidad:0, estado: true, modificador:"" },
      ]);
    return helpers.drawComponent("Modificador")
  }
</script>

<div class="form">
  <h2>Empleado</h2>
  <div class="input">
    <div class="inputBox">
      <label>Nombre</label>
      <input bind:value={nombre} type="text" placeholder="Armando Barreras" />
    </div>
    <div class="inputBox">
      <label>Antiguedad</label>
      <input bind:value={antiguedad} type="number" placeholder="2" />
    </div>
    <div class="inputBox">
      <label>Salario Basico</label>
      <input bind:value={salarioBasico} type="number" placeholder="20000" />
    </div>
    <div class="inputBox">
      <label>Modificadores</label>
      <div class="input">
        {#each premios as premio}
          {#if premio.estado === true}
            <Badge
              nombre={premio.nombre}
              estadoCallback={() => {
                premio.estado = false;
              }}
              estado={premio.estado}
              color="green"
            />
          {/if}
        {/each}
        {#each deducciones as deduccion}
          {#if deduccion.estado === true}
            <Badge
              nombre={deduccion.nombre}
              estadoCallback={() => {
                deduccion.estado = false;
              }}
              estado={deduccion.estado}
              color="red"
            />
          {/if}
        {/each}
      </div>
      {#each premios as premio}
        {#if premio.estado === false}
          <Badge
            nombre={premio.nombre}
            estadoCallback={() => {
              premio.estado = true;
            }}
            estado={premio.estado}
            color="green"
          />
        {/if}
      {/each}
      {#each deducciones as deduccion}
        {#if deduccion.estado === false}
          <Badge
            nombre={deduccion.nombre}
            estadoCallback={() => {
              deduccion.estado = true;
            }}
            estado={deduccion.estado}
            color="red"
          />
        {/if}
      {/each}
    </div>
    <div class="inputBox">
      <button on:click={agregarModificador}
        >Agregar Modificadores</button
      >
    </div>
    <div class="inputBox">
      <button on:click={getRecibo}>Generar Recibo</button>
    </div>
  </div>
</div>

<style>
  ::-webkit-scrollbar-thumb {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
      inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    background: #525252;

    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
      inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    background: rgb(65, 64, 64);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
      inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    background: #131419;
    border-radius: 2px;
  }
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 100%;
  }
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
