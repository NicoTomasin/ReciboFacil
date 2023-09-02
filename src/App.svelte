<script>
  import Modificador from "./components/Modificador.svelte";
  import Empleado from "./components/Empleado.svelte";
  import { Components } from "./store/uiActions";
  let componentSelected = "Empleado";
  Components.subscribe((component) => {
    componentSelected = component;
  });
</script>

{#if componentSelected === "Modificador"}
  <Modificador />
{/if}
{#if componentSelected === "Empleado"}
  <Empleado />
{/if}
