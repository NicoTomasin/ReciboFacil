<script>
  let nombre = "";
  let antiguedad = "";
  let salarioBasico;
  let empleado = null;
  let premios = JSON.parse(localStorage.getItem("premios")) || [];
  function crearRecibo() {
    // Verificar si todos los campos tienen valores
    if (nombre.trim() !== "" && antiguedad !== "" && salarioBasico !== 0) {
      // Crear un nuevo objeto de empleado
      empleado = {
        nombre: nombre,
        antiguedad: antiguedad,
        salarioBasico: salarioBasico,
        salarioFinal: salarioBasico,
      };
      // get deducciones
      let deducciones = JSON.parse(localStorage.getItem("deducciones")) || [];
      for (let i = 0; i < deducciones.length; i++) {
        if (deducciones[i].tipo === "Porcentual") {
          empleado.salarioFinal =
            empleado.salarioFinal -
            (empleado.salarioFinal * deducciones[i].cantidad) / 100;
        } else {
          empleado.salarioFinal -= deducciones[i].cantidad;
        }
      }
      nombre = "";
      antiguedad = "";
      salarioBasico = 0;
    } else {
      empleado = null; // Reiniciar el empleado si no se cumplen las condiciones
    }
  }
</script>

<div class="mx-auto max-w-screen-lg px-3">
  <div class="card bg-neutral text-neutral-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title text-2xl">Agregar Empleado</h2>
      <input bind:value={nombre} placeholder="Nombre" />
      <input bind:value={antiguedad} placeholder="Antiguedad" />
      <input bind:value={salarioBasico} placeholder="Salario Basico" />
      <div class="bg-white premios">
        <span class="badge badge-secondary">Deducciones</span>
        <div class="premios-inactivos p-1 grid gap-1 grid-cols-5">
          {#each premios as premio}
            <span
              id="badge-dismiss-default"
              class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {premio.nombre}
              <button
                type="button"
                class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
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
          {/each}
        </div>
      </div>
      <div class="premios-desactivados">
        <div class="premios-inactivos p-1 grid gap-1 grid-cols-5">
          {#each premios as premio}
            <div>
              <span
                class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {premio.nombre}
                <button
                  type="button"
                  class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
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
          {/each}
        </div>
      </div>

      <div class="card-actions justify-end">
        <button on:click={crearRecibo}>Calcular Recibo</button>
      </div>
    </div>
  </div>
</div>

<style>
  input,
  .premios {
    border: 1px solid #ccc;
    border-radius: 4px;
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
</style>
