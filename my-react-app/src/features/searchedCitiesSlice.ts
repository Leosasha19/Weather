import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface SearchedCitiesState {
    city: string
}

const initialState: SearchedCitiesState = {
    city: "",
}

const SearchedCitiesSlice = createSlice({
    name:"searchedCiti",
    initialState: initialState,
    reducers: {
        searchCiti(state, action) {
            state.city = action.payload;
        }
    }
})


export const {searchCiti} = SearchedCitiesSlice.actions;
export default SearchedCitiesSlice.reducer;
export const selectSearchedCities = (state: RootState) => state.searchedCiti.city