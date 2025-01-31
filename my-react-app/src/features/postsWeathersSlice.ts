import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../redux/store/store.ts";

export interface PostWeather {
    id: number;
    temp_min: number;
    temp_max: number;
}

export interface PostsWeathersState {
    list: PostWeather[] | [];
    loading: boolean;
    error: null | string;
}

const initialState: PostsWeathersState = {
    list: [],
    loading: false,
    error: null,
}

export const getPostWeather = createAsyncThunk("posts/getPosts", async (coordinates:{lat, lon}, {rejectWithValue}) => {
    try {
        const posts = await axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=6126dee4c5dc5e2b4c2d5e110a557376`)
        return posts.data
    } catch (error) {
        console.log( error, "ТУТ ОШИБКА ЗАПРОСА")
        return rejectWithValue(error);
    }
})
const postSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder
            .addCase(getPostWeather.pending, (state => {
                state.loading = true,
                    state.error = null
            }))
            .addCase(getPostWeather.fulfilled, ((state, action) => {
                state.loading = false,
                    state.error = null,
                    state.list = action.payload
            }))
            .addCase(getPostWeather.rejected, ((state, action) => {
                state.error = action.payload as string,
                state.loading = false
            }))
    }
})

export default postSlice.reducer

export const selectAllPostsWeather = (state:RootState) => state.posts.list
export const selectAllPostsWeatherError = (state:RootState) => state.posts.error
export const selectAllPostsWeatherLoading = (state:RootState) => state.posts.loading


