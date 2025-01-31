import './App.scss'
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {
    getPostWeather,
    selectAllPostsWeather,
    selectAllPostsWeatherError,
    selectAllPostsWeatherLoading
} from "../features/postsWeathersSlice.ts";
import {useEffect} from "react";
import {selectAllDaysWeather} from "../features/daysWeatherSlice.ts";
import {selectIcons} from "../features/iconsWeathersSlice.ts";
import {changeState, selectDetailedInfo} from "../features/detailedInfoSlice.ts";
import {selectDay, setSelectedDay} from "../features/selectedDaySlice.ts";
import {getCoordinatesCities, selectCoordinatesCities, selectNameCity} from "../features/coordinatesCitiesSlice.ts";
import WeatherService from "../frontendServices/WeatherService.ts";
import {searchCiti, selectSearchedCities} from "../features/searchedCitiesSlice.ts";
import {changeStateNextButton, selectNextButton} from "../features/nextButtonSlice.ts";
import {selectChoiceDay, setChoiceDay} from "../features/choiceDaysSlice.ts";
import {changeFirstValue, changeSecondValue, selectFirstValue, selectSecondValue} from "../features/meaningForSlice.ts";

function App() {

    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectAllPostsWeather)
    const loading = useAppSelector(selectAllPostsWeatherLoading)
    const errorState = useAppSelector(selectAllPostsWeatherError)
    const days = useAppSelector(selectAllDaysWeather)
    const icons = useAppSelector(selectIcons)
    const detailedInfo = useAppSelector(selectDetailedInfo)
    const selectedDayId = useAppSelector(selectDay)
    const coordinatesCities = useAppSelector(selectCoordinatesCities).coordinates
    const searchedCity = useAppSelector(selectSearchedCities)
    const nameCity = useAppSelector(selectNameCity)
    const nextButton = useAppSelector(selectNextButton)
    const choiceDay = useAppSelector(selectChoiceDay)
    const firstMeaning = useAppSelector(selectFirstValue)
    const secondMeaning = useAppSelector(selectSecondValue)
    const newPosts = posts.list;

    const changeStateButton = () => {
        dispatch(changeStateNextButton())
        if (nextButton) {
            dispatch(changeFirstValue(5));
            dispatch(changeSecondValue(10))
        } else {
            dispatch(changeFirstValue(0));
            dispatch(changeSecondValue(5))
        }
    }

    const dayHandler = (id:number) => {
        const number = nextButton ? 0 : 5
        dispatch(setSelectedDay(id + number))
        dispatch(changeState(!detailedInfo))
    }

    const searchedCitiHandler = (city) => {
        dispatch(searchCiti(city))
    }
    const searchHandler = () => {
        dispatch(getCoordinatesCities(searchedCity))
    }

    const choiceQuantityDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setChoiceDay(event.target.value));
        dispatch(changeSecondValue(event.target.value))
    }


    useEffect(() => {
        if(coordinatesCities.lat && coordinatesCities.lon) {
            dispatch(getPostWeather(coordinatesCities));
            const interval = setInterval(() => dispatch(getPostWeather(coordinatesCities)),10800000);
            return () => clearInterval(interval);
        }
    }, [coordinatesCities,dispatch]);

    return (
        <>
            {loading && <h1>LOOOOAAAADIIING</h1>}
            {errorState && <h1>ERRRRROOOORRRR!!!!</h1>}
            <div className={"top_line"}>
                <div className={"select_menu"}>
                    <label htmlFor={"howDays"}>Прогноз на </label>
                    <select className={"select_menu__box"}
                        id="howDays"
                        value={choiceDay}
                        onChange={choiceQuantityDays}>
                        <option value="fiveDays">5 дней</option>
                        <option value="sevenDays">7 дней</option>
                        <option value="tenDays">10 дней</option>
                        <option value="twoWeeks">14 дней</option>
                        <option value="oneMonths">30 дней</option>
                    </select>
                </div>
                <input onChange={(event) => searchedCitiHandler(event.target.value)}
                       className={"search"} type="text"
                       placeholder={"Город..."}/>
                <button onClick={searchHandler} className={"buttonSearch"}>Найти</button>
                <button onClick={changeStateButton}
                        className={nextButton ? "button_next" : "button_next_back"}></button>
            </div>
            <div className={"weather_container"}>
                {newPosts && newPosts.length && (
                    newPosts.slice(firstMeaning, secondMeaning).map((element, id) => {
                        const daysArray = days.days;
                        const day = daysArray[id % daysArray.length]?.day || "no data";
                        const iconsArray = icons.icons
                        const icon = iconsArray[Math.floor(Math.random() * 6)]?.name || "no data";
                        return (
                            <div
                                onClick={() => {dayHandler(id +1)}}
                                className={"weather_container__days"}
                                key={element.dt}>
                                <div className={"weather_container__days__daysOfTheWeek"}>{day}</div>
                                <img className={"weather_container__days__icons"} src={icon}/>
                                <div className={"weather_container__days__dayAndNight"}>
                                    <div className={"weather_container__days__dayAndNight__maxTemp"}>
                                        {WeatherService.getTemperature(element.main.temp_max)}°
                                    </div>
                                    <div className={"weather_container__days__dayAndNight__minTemp"}>
                                        {WeatherService.getTemperature(element.main.temp_min)}°
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
                }
            </div>
            {selectedDayId && (
                <div className={detailedInfo ? "detail" : "noDetail"}>
                    <div>
                        <p className={"detail__city"}>{nameCity}</p>
                        <h4 className={"detail__text"}>Подробный прогноз</h4>
                        <h2 className={"detail__temp"}> {WeatherService.getTemperature(newPosts[selectedDayId - 1].main.temp_max)}°C</h2>
                        <p className={"detail__feels"}>Ощущается
                            как: {WeatherService.getTemperature(newPosts[selectedDayId].main.feels_like)}°</p>
                    </div>
                    <div className={"detail__secondColumn"}>
                        <div>{WeatherService.getPressure(newPosts[selectedDayId].main.pressure)} мм.рт.ст</div>
                        <div
                            className={"detail__secondColumn__humidity"}>Влажность: {newPosts[selectedDayId].main.humidity}%
                        </div>
                        <div>Скорость ветра (М/C): {newPosts[selectedDayId].wind.speed}</div>
                    </div>

                </div>
            )}
        </>
    )
}

export default App
