import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface MeaningForState {
    firstValue: number;
    secondValue: number;
}

const initialState: MeaningForState = {
    firstValue: 0,
    secondValue: 5,
}

const MeaningForSlice = createSlice({
    name: "MeaningFor",
    initialState: initialState,
    reducers: {
        changeFirstValue: (state, action) => {
            state.firstValue = action.payload;
        },
        changeSecondValue: (state, action) => {
            if(action.payload === "fiveDays"){
                state.secondValue = 5;
            } else if (action.payload === "sevenDays"){
                state.secondValue = 7;
            } else if (action.payload === "tenDays") {
                state.secondValue = 10;
            } else if (action.payload === "twoWeeks"){
                state.secondValue = 14;
            } else if (action.payload === "oneMonths"){
                state.secondValue = 30;
            } else {
                state.secondValue = action.payload;
            }
        }
    }
})

export const { changeFirstValue, changeSecondValue} = MeaningForSlice.actions;
export default MeaningForSlice.reducer;
export const selectFirstValue = (state: RootState) => state.meaningFor.firstValue;
export const selectSecondValue = (state: RootState) => state.meaningFor.secondValue;