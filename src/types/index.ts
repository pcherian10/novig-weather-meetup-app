export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  windSpeed: number;
  datetime: string;
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
