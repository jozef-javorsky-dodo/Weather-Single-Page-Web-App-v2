
<script lang="ts">
  
  import { errorMessage } from "../store";
  import { onMount } from "svelte";


  let timer: ReturnType<typeof setTimeout> | null = null;

  function dismiss(): void {
    errorMessage.set(null);
  }



  $: if ($errorMessage) {
    if (timer) clearTimeout(timer);
   
    timer = setTimeout(dismiss, 8000);
  }

  onMount(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

</script>



{#if $errorMessage}

<div
    class="error-container"
    role="alert"
    aria-live="assertive"
    id="error-message"
  >

<svg
      class="error-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >

<circle cx="12" cy="12" r="10" />

<line x1="15" y1='9' x2='9' y2="15" />

<line x1='9' y1='9' x2="15" y2="15" />

</svg>

<span class="error-text">{$errorMessage}</span>

<button
      type="button"
      class="error-dismiss"
      on:click={dismiss}
      aria-label="Dismiss error"
      id="error-dismiss"
    >

<svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >

<line x1="18" y1='6' x2='6' y2="18" />

<line x1='6' y1='6' x2="18" y2="18" />

</svg>

</button>

</div>

{/if}
