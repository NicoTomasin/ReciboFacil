<script>
  import { Deducciones, Premios } from "../store/Modificadores";
  import Badge from "./Badge.svelte";
  import * as helpers from "../helpers";

  let nombre = "";
  let antiguedad = 0;
  let salarioBasico = 0;
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
</script>

<div class="card grid grid-column-1 grid-row-6 gap-2 items-center text-center">
  <div class="p-2">
    <h2 class="card-title text-2xl">Empleado</h2>
  </div>
  <div class="p-2 flex items-center">
    <span class="mr-2">Nombre</span>
    <input
      class="flex-grow text-center"
      bind:value={nombre}
      placeholder="Nombre"
    />
  </div>
  <div class="p-2 flex items-center">
    <span class="mr-2">Antiguedad</span>
    <input
      class="flex-grow text-center"
      bind:value={antiguedad}
      type="number"
      placeholder="Antiguedad"
    />
  </div>
  <div class="p-2 flex items-center">
    <span class="mr-2">Salario Basico</span>
    <input
      class="flex-grow text-center"
      bind:value={salarioBasico}
      type="number"
      placeholder="Salario Basico"
    />
  </div>

  <div class="campo">
    <h3>Modificadores activos</h3>
    <div class="p-2">
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
    <button
      on:click={() => helpers.drawComponent("Modificador")}
      class="boton-flotante"
    >
      <span>+</span>
    </button>
  </div>
  <div>
    <div class="desactivados">
      <div class="p-2">
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
    </div>
  </div>
  <div>
    <div class="card-actions justify-end">
      <button on:click={getRecibo} class="formButton"> Generar Recibo </button>
    </div>
  </div>
</div>

<style>
  .campo {
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 15px 2px 2px 15px;
    padding: 1rem;
    margin: 10px 0;
    color: black;
    background: rgba(0, 186, 214, 0.54);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    position: relative; /* Agregamos position: relative al div campo */
  }
  .card {
    border-radius: 15px;
    padding: 10px;
    margin: 10px 0;
    color: black;
    background: rgba(0, 186, 214, 0.54);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 186, 214, 0.3);
  }
  .formButton {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    color: black;
    background-color: #ccc;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(1, 109, 163);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(0, 170, 255);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(20, 79, 108);
    border-radius: 2px;
  }
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 100%;
  }
  .boton-flotante {
    position: sticky;
    bottom: 0px;
    left: 100vh;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
  }

  .boton-flotante span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
