export type LeftTopType = {
    greetingVal?: string
    dateVal?: string
    locationName?: string
}
export type LeftMidType = {
    currentTemp?: string | number | null
    weathType?: string | number | null
    speed?: number
    speedUnit?: string
}
export type CurrWeathType = {
    interval?: string | number | null
    is_day?: string | number | null
    temperature?: string | number | null
    time?: string | number | null
    weathercode?: number
    winddirection?: string | number | null
    windspeed?: number
}
export type WeatherType = {
    current_weather?: CurrWeathType
    current_weather_units?: CurrWeathUnitType
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
export type CurrWeathUnitType = {
    interval?: string
    is_day?: string
    temperature?: string
    time?: string
    weathercode?: string
    windspeed?: string
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