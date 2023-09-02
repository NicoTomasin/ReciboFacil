<script>
  export let nombre = "";
  export let estadoCallback;
  export let color;
  export let estado = true;

  let textColor = color === "green" ? "text-green-500" : "text-red-500";
  let bgColor = color === "green" ? "bg-green-100" : "bg-red-100";
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };
</script>

<span class="p-2">
  <button class={"prueba " + textColor}>
    {truncate(nombre)}
    <span class="ml-2">
      <button
        type="button"
        class={"bg-transparent rounded " + textColor + " " + bgColor}
        on:click={() => {
          estadoCallback();
        }}
      >
        {#if estado}
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
        {:else}
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
        {/if}
      </button>
    </span>
  </button>
</span>

<style>
  .prueba {
    background: #131419;
    border: none;
    outline: none;
    border-radius: 40px;
    padding: 5px 15px;
    font-size: 18px;
    margin-top: 15px;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.1),
      2px 2px 6px rgba(0, 0, 0, 0.8);
  }
</style>
