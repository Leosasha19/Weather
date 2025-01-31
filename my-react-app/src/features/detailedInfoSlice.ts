import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../redux/store/store.ts";

export interface DetailedInfoState {
    state: boolean;
}

const initialState: DetailedInfoState = {
    state: false
}

const DetailInfoSlice = createSlice({
    name: "detailedInfo",
    initialState: initialState,
    reducers: {
        changeState(state,action: PayloadAction<boolean>) {
            state.state = action.payload;
        }
    }
})

export const {changeState} = DetailInfoSlice.actions;
export default DetailInfoSlice.reducer;
export const selectDetailedInfo = (state: RootState) => state.detailInfo.state