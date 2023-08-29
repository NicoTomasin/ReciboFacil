<script>
  import { Deducciones, Premios } from "../store/Modificadores";

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

<div class="mx-auto max-w-screen-lg px-3">
  <div class="card bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title text-2xl">Agregar Empleado</h2>
      <input bind:value={nombre} placeholder="Nombre" />
      <input bind:value={antiguedad} type="number" placeholder="Antiguedad" />
      <input
        bind:value={salarioBasico}
        type="number"
        placeholder="Salario Basico"
      />
      <div class="bg-white activados">
        <span class="badge badge-secondary">Modificadores activos</span>
        <div class="p-1 grid gap-1 grid-cols-5">
          {#each premios as premio}
            {#if premio.estado === true}
              <span
                id="badge-dismiss-default"
                class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-200 rounded"
              >
                {premio.nombre}
                <button
                  type="button"
                  class="inline-flex items-center p-1 ml-2 text-sm text-green-800 bg-transparent rounded-sm hover:bg-green-400 hover:text-green-900"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                  on:click={() => {
                    premio.estado = false;
                  }}
                >
                  <svg
                    class="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Remove badge</span>
                </button>
              </span>
            {/if}
          {/each}
          {#each deducciones as deduccion}
            {#if deduccion.estado === true}
              <span
                id="badge-dismiss-default"
                class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-300 rounded"
              >
                {deduccion.nombre}
                <button
                  type="button"
                  class="inline-flex items-center p-1 ml-2 text-sm text-red-800 bg-transparent rounded-sm hover:bg-red-400 hover:text-red-900"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                  on:click={() => {
                    deduccion.estado = false;
                  }}
                >
                  <svg
                    class="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Remove badge</span>
                </button>
              </span>
            {/if}
          {/each}
        </div>
      </div>
      <div class="desactivados">
        <div class="p-1 grid gap-1 grid-cols-5">
          {#each premios as premio}
            {#if premio.estado === false}
              <div>
                <span
                  class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-green-800 bg-green-200 rounded"
                >
                  {premio.nombre}
                  <button
                    type="button"
                    class="inline-flex items-center p-1 ml-2 text-sm text-green-800 bg-transparent rounded-sm hover:bg-green-400 hover:text-green-900"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                    on:click={() => {
                      premio.estado = true;
                    }}
                  >
                    <svg
                      class="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span class="sr-only">Remove badge</span>
                  </button>
                </span>
              </div>
            {/if}
          {/each}
          {#each deducciones as deduccion}
            {#if deduccion.estado === false}
              <div>
                <span
                  class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-300 rounded"
                >
                  {deduccion.nombre}
                  <button
                    type="button"
                    class="inline-flex items-center p-1 ml-2 text-sm text-red-800 bg-transparent rounded-sm hover:bg-red-400 hover:text-red-900"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                    on:click={() => {
                      deduccion.estado = true;
                    }}
                  >
                    <svg
                      class="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span class="sr-only">Remove badge</span>
                  </button>
                </span>
              </div>
            {/if}
          {/each}
        </div>
      </div>
      <div class="card-actions justify-end">
        <button on:click={getRecibo} class="formButton">
          Generar Recibo
        </button>
      </div>
      <div class="card-actions justify-end">
        <button
          on:click={() => helpers.drawComponent("Modificador")}
          class="formButton"
        >
          Agregar Modificador
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  input,
  .activados {
    padding: 10px;
    margin: 10px 0;
    color: black;
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
</style>
