import React, { Component } from 'react';
import weatherService from './services/weatherService';
import WeatherIcon from 'react-open-weather-icons';

class Weather extends Component {
    constructor(){
        super()
        this.state = {
            location : '',
            weatherMain: '',
            weatherDescription: '',
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
                weatherDescription: weatherReport.weather.map(weather => {return weather.description}),
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
                <span className="h1 table-cell align-middle">Finding your weather…</span>
            }
            {this.state.weatherRequest && !this.state.promiseRes && this.state.weatherError &&
                <div className="table-cell align-middle">
                    <span className="h1">Sorry, we couldn’t retrieve your weather at this time.</span>
                    <button onClick={this.weatherButton} className="btn btn-primary">Try again?</button>
                </div>
            }
            {this.state.weatherRequest && this.state.promiseRes &&
                <div className="table-cell align-middle">
                    <WeatherIcon name={this.state.weatherIcon} className="weather-icon" />
                    <h1>The weather in {this.state.name}: {this.state.weatherDescription} and the temperature is {this.state.weatherTemp}˚C</h1>
                </div>
            }
            
            </div>
        )
    }
}

export default Weather;