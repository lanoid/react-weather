import React, { Component } from 'react';
import weatherService from './services/weatherService';

class Weather extends Component {
    constructor(props){
        super(props)
        this.state = {
            location : '',
            weatherMain: '',
            weatherDescription: '',
            weatherTemp: '',
            weatherCode: '',
            promiseRes: false,
            weatherRequest: false
        }
        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(){
        this.setState({weatherRequest:true});
        weatherService.then((weatherReport) => {
            this.setState({
                name: weatherReport.name,
                weatherMain: weatherReport.weather[0].main,
                weatherDescription: weatherReport.weather[0].description,
                weatherIcon: `//openweathermap.org/img/w/${weatherReport.weather[0].icon}.png`,
                weatherTemp: parseInt(weatherReport.main.temp - 273, 10),
                promiseRes: true
            })
        }).catch((error) => {
            console.warn(error);
        });
    }

    render() {
        return (
            <div className="weather col-8 px2 mx-auto table">
            {this.state.weatherRequest === false && this.state.promiseRes === false &&
                <div className="table-cell align-middle">
                    <button onClick={this.getWeather} className="btn btn-primary">Get the weather near me</button>
                </div>
            }
            {this.state.weatherRequest === true && this.state.promiseRes === false &&
                <span className="h1 table-cell align-middle">Finding your weather…</span>
            }
            {this.state.weatherRequest === true && this.state.promiseRes === true &&
                <div className="table-cell align-middle">
                    <img src={this.state.weatherIcon} alt={this.state.weatherDescription}/>
                    <h1>The Weather in {this.state.name}: {this.state.weatherMain}, {this.state.weatherDescription} and the temperature is {this.state.weatherTemp}˚C</h1>
                </div>
            }
            </div>
        )
    }
}

export default Weather;