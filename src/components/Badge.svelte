<script>
  export let nombre = "";
  export let estadoCallback;
  export let color = "red";
  export let estado = true;
</script>

<span>
  <button
    class={`m-1 text-${color}-800 bg-${color}-300 rounded inline-flex items-center p-1`}
  >
    {nombre}
    <span class="ml-2">
      <button
        type="button"
        class={`text-${color}-800 bg-transparent rounded hover:bg-${color}-400 hover:text-${color}-900`}
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
