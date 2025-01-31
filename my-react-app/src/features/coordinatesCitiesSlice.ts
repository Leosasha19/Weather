import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";
import axios from "axios";

export interface coordinatesCitiesState {
    id: number | string;
    name: string;
    coordinates: {
        lat: number | string;
        lon: number | string;
    },
    loading: boolean;
    error: string | null;
}

const initialState: coordinatesCitiesState = {
    id: 396167690,
    name: 'Реутов',
    coordinates: {
        lat: 55.7622453,
        lon: 37.856555
    },
    loading: false,
    error: null,
}

export const getCoordinatesCities = createAsyncThunk("coordinate/getCoordinate", async (city:string, {rejectWithValue}) => {
    try {
        const coordinates = await axios(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`);
            if(coordinates.data && coordinates.data.length > 0) {
                const {lat, lon, display_name, place_id} = coordinates.data[0];
                return {lat, lon, name: display_name, id: place_id}
            }
            throw new Error("Город не найден")
    } catch (error) {
        console.error("Ошибка при запросе координат:", error)
        return  rejectWithValue(error)
    }
})

const coordinatesCitiesSlice = createSlice({
    name: "coordinates",
    initialState: initialState,
    reducers: {
        addCities(state, action) {
            state.id = action.payload;
            state.coordinates = action.payload;
            state.name = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getCoordinatesCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCoordinatesCities.fulfilled, (state, action) => {
                state.loading = false;
                state.id = action.payload.id
                state.coordinates = {
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
                state.name = action.payload.name.split(',')[0]
            })
            .addCase(getCoordinatesCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
})

export const {addCities} = coordinatesCitiesSlice.actions;
export default coordinatesCitiesSlice.reducer;
export const selectCoordinatesCities = (state: RootState) =>  state.coordinates
export const selectNameCity = (state: RootState) => state.coordinates.name