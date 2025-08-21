export type LeftTopType = {
    greetingVal?: string
    dateVal?: string
    locationName?: string
}
export type LeftMidType = {
    currentTemp?: string | number | null
    weathType?: string | number | null
}
export type CurrWeathType = {
    interval?: string | number | null
    is_day?: string | number | null
    temperature?: string | number | null
    time?: string | number | null
    weathercode?: string | number | null
    winddirection?: string | number | null
    windspeed?: string | number | null
}
export type WeatherType = {
    current_weather?: any
    current_weather_units?: any
    daily?: any
    daily_units?: any
    elevation?: number
    generationtime_ms?: number
    latitude?: number
    longitude?: number
    timezone?: string
    timezone_abbreviation?: string
    utc_offset_seconds?: string | number | null
}
export type CodesType = {
    code?: number
    type?: string
}
export type DailyWeathType = {
    date?: string
    temp?: number
    type?: string
}