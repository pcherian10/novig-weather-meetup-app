export interface WeatherData {
  icon: string;
  conditions: string;
  date: string;
  temperature: number;
  humidity: number;
  morningData?: HourlyData[];
  afternoonData?: HourlyData[];
  eveningData?: HourlyData[];
}

export interface HourlyData {
  hour: string;
  temperature: number;
  humidity: number;
}

export interface WeatherMessage {
  text: string;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export const TIME_RANGES = {
  morning: { start: 9, end: 12 },
  afternoon: { start: 12, end: 17 },
  evening: { start: 17, end: 21 }
} as const;
