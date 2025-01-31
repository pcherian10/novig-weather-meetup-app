export interface WeatherData {
  date: string;
  temperature: number;
  conditions: string;
  icon: string;
  windSpeed: number;
  precipitationChance: number;
  humidity: number;
}

export interface EventSettings {
  location: string;
  dayOfWeek: string;
  timeRange: {
    start: string;
    end: string;
  };
}

export interface WeatherMessage {
  type: 'success' | 'warning' | 'error';
  message: string;
}
