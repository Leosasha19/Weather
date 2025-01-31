import {combineReducers} from "@reduxjs/toolkit";
import postsWeathersReducer from "../../features/postsWeathersSlice.ts";
import dayReducer from "../../features/daysWeatherSlice.ts"
import iconReducer from "../../features/iconsWeathersSlice.ts"
import detailInfoReducer from "../../features/detailedInfoSlice.ts"
import selectedDayReducer from "../../features/selectedDaySlice.ts"
import coordinatesCitiesReducer from "../../features/coordinatesCitiesSlice.ts"
import searchedCitiReducer from "../../features/searchedCitiesSlice.ts"
import nextButtonReducer from "../../features/nextButtonSlice.ts"
import choiceDayReducer from "../../features/choiceDaysSlice.ts"
import meaningForReducer from "../../features/meaningForSlice.ts"


export const rootReducer = combineReducers({
    posts: postsWeathersReducer,
    days: dayReducer,
    icons: iconReducer,
    detailInfo: detailInfoReducer,
    selectedDay: selectedDayReducer,
    coordinates: coordinatesCitiesReducer,
    searchedCiti: searchedCitiReducer,
    nextButton: nextButtonReducer,
    choiceDay: choiceDayReducer,
    meaningFor: meaningForReducer
})