import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@reduxjs/toolkit/query";

export interface DayWeather {
    id: number;
    day: string;
}

export interface DaysWeatherState {
    days: DayWeather[];
}

const initialState: DaysWeatherState = {
    days: [
        { id: 1, day: "пн" },
        { id: 2, day: "вт" },
        { id: 3, day: "ср" },
        { id: 4, day: "чт" },
        { id: 5, day: "пт" },
        { id: 6, day: "сб" },
        { id: 7, day: "вс" },

    ]
};

const daySlice = createSlice({
    name: "days",
    initialState: initialState,
    reducers: {
        addDay(state,aciton) {
            state.days.push(aciton.payload);
        },
        removeDay(state,aciton) {
            state.days = state.days.filter(day => day.id !== aciton.payload);
        }
    }
})

export const {addDay, removeDay} = daySlice.actions;
export default daySlice.reducer;
export const selectAllDaysWeather = (state:RootState) => state.days