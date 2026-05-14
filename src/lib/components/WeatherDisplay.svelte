
<script lang="ts">

import { weatherData } from "../store";
import { getWeatherIcon } from "../weatherService";

  function formatTime(timestamp: number): string {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(new Date(timestamp * 1000));
  }

  function formatTemp(value: number): string {
    return new Intl.NumberFormat("en", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  }

  function formatSpeed(value: number): string {
    return new Intl.NumberFormat("en", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  }
</script>

{#if $weatherData}

<div class="weather-results" aria-live="polite" id="weather-results">

  <div class="weather-header">

    <h2 class="weather-location">
        {$weatherData.name}, {$weatherData.sys.country}
      </h2>

      <img
        class="weather-icon-img"
        src={getWeatherIcon($weatherData.weather[0].icon)}
        alt="Weather condition: {$weatherData.weather[0].description}"
        width="80"
        height="80"
        loading="eager"
      />
    </div>

    <div class="weather-temp-section">
      <p class="weather-temp">{formatTemp($weatherData.main.temp)}°C</p>
      <p class="weather-condition">{$weatherData.weather[0].description}</p>
    </div>

    <dl class="weather-details">

      <div class="weather-detail-card">
        <svg
          class="detail-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />

        </svg>

        <dt class="detail-label">Feels like</dt>
        <dd class="detail-value">
          {formatTemp($weatherData.main.feels_like)}°C
        </dd>

      </div>

      <div class="weather-detail-card">

<svg
          class="detail-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />

        </svg>

        <dt class="detail-label">Humidity</dt>
        <dd class="detail-value">{$weatherData.main.humidity}%</dd>

      </div>

      <div class="weather-detail-card">

<svg
          class="detail-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
          />

</svg>

<dt class="detail-label">Wind</dt>

<dd class="detail-value">{formatSpeed($weatherData.wind.speed)} m/s</dd>

</div>

</dl>


<p class="weather-updated">

  <time datetime={new Date($weatherData.dt * 1000).toISOString()}>
        Updated {formatTime($weatherData.dt)}

      </time>

    </p>

  </div>

  {/if}
