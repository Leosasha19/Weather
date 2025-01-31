import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface ChoiceDaysState {
    choice : string
}

const initialState: ChoiceDaysState = {
    choice: "fiveDays"
}

const ChoiceDaysSlice = createSlice({
    name:"choiceDay",
    initialState: initialState,
    reducers: {
        setChoiceDay ( state, action) {
            state.choice = action.payload
        }
    }
})

export const {setChoiceDay} = ChoiceDaysSlice.actions;
export default ChoiceDaysSlice.reducer;
export const selectChoiceDay = (state: RootState) => state.choiceDay.choice