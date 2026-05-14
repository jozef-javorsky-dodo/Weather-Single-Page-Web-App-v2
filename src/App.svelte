<script lang="ts">
  import SearchForm from "./lib/components/SearchForm.svelte";
  import ErrorMessage from "./lib/components/ErrorMessage.svelte";
  import WeatherDisplay from "./lib/components/WeatherDisplay.svelte";
  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import SkeletonLoader from "./lib/components/SkeletonLoader.svelte";
  import EmptyState from "./lib/components/EmptyState.svelte";
  import { isLoading, weatherData, hasSearched } from "./lib/store";
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="app-layout">
  <header class="app-header">
    <h1 class="app-title">Weather App</h1>
    <ThemeToggle />
  </header>

  <main id="main-content" class="app-card">
    <SearchForm />

    <ErrorMessage />

    {#if $isLoading}
      <SkeletonLoader />
    {:else if $weatherData}
      <WeatherDisplay />
    {:else if !$hasSearched}
      <EmptyState />
    {/if}
  </main>

  <footer class="app-footer">
    <p>
      <a href="mailto:jozef.javorsky.dodo@gmail.com"
        >jozef.javorsky.dodo@gmail.com</a
      >
      {" | "}

      <a
        href="https://github.com/jozef-javorsky-dodo"
        target="_blank"
        rel="noopener noreferrer">GitHub</a
      >
      {" | "}

      <a
        href="https://g.dev/jozef-javorsky-dodo"
        target="_blank"
        rel="noopener noreferrer">Google Dev</a
      >
    </p>
  </footer>
</div>
