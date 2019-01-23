import React, { Component } from 'react';
import weatherService from './services/weatherService';
import WeatherIcon from 'react-open-weather-icons';
import WeatherItem from './WeatherItem';

class Weather extends Component {
    constructor(){
        super()
        this.state = {
            location : '',
            weatherMain: '',
            weatherDescriptions: [],
            weatherTemp: '',
            weatherCode: '',
            promiseRes: false,
            weatherRequest: false,
            weatherError: false
        }
        this.weatherButton = this.weatherButton.bind(this);
    }

    getWeather(){
        weatherService.then(weatherReport => {
            this.setState({
                name: weatherReport.name,
                weatherDescriptions: weatherReport.weather,
                weatherIcon: weatherReport.weather[0].icon,
                weatherTemp: parseInt(weatherReport.main.temp - 273, 10),
                promiseRes: true
            })
        }).catch(error => 
            this.setState({weatherError: true})
        );
    }

    weatherButton(){
        this.setState({weatherRequest:true});
        this.getWeather();
    }

    render() {
        return (
            <div className="weather col-8 px2 mx-auto table">
            {!this.state.weatherRequest && !this.state.promiseRes &&
                <div className="table-cell align-middle">
                    <button onClick={this.weatherButton.bind(this)} className="btn btn-primary">Get the weather near me</button>
                </div>
            }
            {this.state.weatherRequest && !this.state.promiseRes && !this.state.weatherError &&
                <h1 className="table-cell align-middle">Finding your weather…</h1>
            }
            {this.state.weatherRequest && !this.state.promiseRes && this.state.weatherError &&
                <div className="table-cell align-middle">
                    <h1 className="h1">Sorry, we couldn’t retrieve your weather at this time.</h1>
                    <button onClick={this.weatherButton} className="btn btn-primary">Try again?</button>
                </div>
            }
            {this.state.weatherRequest && this.state.promiseRes &&
                <div className="table-cell align-middle">
                    <WeatherIcon name={this.state.weatherIcon} className="weather-icon" />
                    <h1>The weather in {this.state.name}: {
                            this.state.weatherDescriptions.map(weatherItem => {return <WeatherItem weatherItem={weatherItem.description} /> })
                        } the temperature is {this.state.weatherTemp}˚C</h1>
                </div>
            }
            
            </div>
        )
    }
}

export default Weather;