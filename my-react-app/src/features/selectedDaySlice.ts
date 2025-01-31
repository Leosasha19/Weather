import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface SelectedDayState {
    selectedDayId: number | null;
}

export const initialState: SelectedDayState = {
    selectedDayId: null
}

const SelectedDaySlice = createSlice({
    name: "SelectedDay",
    initialState: initialState,
    reducers: {
        setSelectedDay(state, action: PayloadAction<boolean>) {
            state.selectedDayId = action.payload
},
        clearSelectedDay(state) {
            state.selectedDayId = null;
        }
    }
})

export const {setSelectedDay, clearSelectedDay} = SelectedDaySlice.actions;
export const selectDay = (state: RootState) => state.selectedDay.selectedDayId
export default SelectedDaySlice.reducer