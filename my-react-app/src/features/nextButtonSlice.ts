import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface nextButtonState {
    buttonState: boolean
}

const initialState: nextButtonState = {
    buttonState: true
}

const nextButtonSlice = createSlice({
    name: "nextButton",
    initialState: initialState,
    reducers : {
        changeStateNextButton: (state) => {
            state.buttonState = !state.buttonState;
        }
    }
})

export const {changeStateNextButton} = nextButtonSlice.actions
export default nextButtonSlice.reducer
export const selectNextButton = (state: RootState) => state.nextButton.buttonState