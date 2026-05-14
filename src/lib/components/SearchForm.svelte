
<script lang="ts">

import { isLoading } from "../store";
  import { fetchWeather } from "../weatherService";

  let city: string = '';

  async function handleSubmit(): Promise<void> {
    await fetchWeather(city);
    city = '';
  }
</script>


<div class="search-wrapper" role="search" aria-label="Weather search">

  <label for="city-input" class="sr-only">City name</label>

<form
    on:submit|preventDefault={handleSubmit}
    class="search-form"
    id="search-form"
  >

<input
      id="city-input"
      type="text"
      bind:value={city}
      placeholder="Search for a city..."
      class="search-input"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      inputmode="text"
      maxlength="100"
      disabled={$isLoading}
      aria-describedby="search-status"
    />

<button
      type="submit"
      class="search-button"
      disabled={$isLoading}
      id="search-button"
    >

{#if $isLoading}
        <div class="spinner" role="status" aria-label="Searching"></div>
        <span class="sr-only">Searching</span>

        {:else}

<svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >

<circle cx="11" cy="11" r='8' />

<line x1="21" y1="21" x2="16.65" y2="16.65" />

</svg>

<span>Search</span>

{/if}

</button>

</form>

<div id="search-status" class="sr-only" aria-live="polite" role="status">
    {#if $isLoading}Searching for weather data{/if}
</div>


</div>
