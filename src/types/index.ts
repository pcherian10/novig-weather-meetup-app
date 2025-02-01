export interface WeatherData {
  date: string;
  temperature: number;
  conditions: string;
  icon: string;
  humidity: number;
}

export interface WeatherMessage {
  type: 'success' | 'warning' | 'error';
  message: string;
}
