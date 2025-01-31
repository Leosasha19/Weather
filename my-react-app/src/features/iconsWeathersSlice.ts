import sunny from "../assets/wheather-icons/sunny.png"
import rainy from "../assets/wheather-icons/rainy.png"
import rainySunny from "../assets/wheather-icons/rainy&sunny.png"
import cloudySunny from "../assets/wheather-icons/cloudy&sunny.png"
import snowy from "../assets/wheather-icons/snowy.png"
import thunderstorm from "../assets/wheather-icons/thunderstorm.png"
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";


export interface IconWeather {
    id: number;
    name:WeatherIcons;
}

export interface iconsWeatherState {
    icons: IconWeather[];
}

export enum WeatherIcons {
    Sunny = sunny,
    Rainy = rainy,
    Snowy = snowy,
    Thunderstorm = thunderstorm,
    RainyAndSunny = rainySunny,
    CloudyAndSunny = cloudySunny
}
const initialState: iconsWeatherState = {
    icons: [
        {id:1, name: WeatherIcons.Rainy},
        {id:2, name: WeatherIcons.RainyAndSunny},
        {id:3, name: WeatherIcons.Sunny},
        {id:4, name: WeatherIcons.Snowy},
        {id:5, name: WeatherIcons.CloudyAndSunny},
        {id:6, name: WeatherIcons.Thunderstorm}
    ]
}

const iconSlice = createSlice({
    name: "icons",
    initialState: initialState,
    reducers:{

    }
})

export default iconSlice.reducer;
export const selectIcons = (state: RootState) => state.icons