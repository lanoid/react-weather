import React, { Component } from 'react';

class WeatherItem extends Component {
    render(){
        return(
            <span>{this.props.weatherItem}, </span>
        )
    }
}

export default WeatherItem;