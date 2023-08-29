<script>
  import Modificador from "./components/Modificador.svelte";
  import Empleado from "./components/Empleado.svelte";
  import { Components } from "./store/uiActions";
  let componentSelected = "Empleado";
  Components.subscribe((component) => {
    componentSelected = component;
  });
</script>

<main class="flex min-h-screen flex-col items-center md:p-24 p-5">
  <div class="mx-auto max-w-screen-lg px-3">
    {#if componentSelected === "Modificador"}
      <Modificador />
    {/if}
    {#if componentSelected === "Empleado"}
      <Empleado />
    {/if}
  </div>
</main>
