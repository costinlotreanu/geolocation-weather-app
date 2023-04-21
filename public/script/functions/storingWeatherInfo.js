//storing value from Weather API in data for sending to Database on server
import { data } from '../index.js';

export function storingWeatherInfo() {
  data.temperature = temperature;
  data.status = text;
  data.windspeed = windspeed;
  data.winddirection = winddirection;
}