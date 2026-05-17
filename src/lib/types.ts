export interface WeatherData {
  readonly name: string;

  readonly sys: {
    readonly country: string;
  };

  readonly main: {
    readonly temp: number;
    readonly feels_like: number;
    readonly humidity: number;
  };

  readonly weather: ReadonlyArray<{
    readonly main: string;
    readonly description: string;
    readonly icon: string;
  }>;

  readonly wind: {
    readonly speed: number;
  };

  readonly dt: number;
}
