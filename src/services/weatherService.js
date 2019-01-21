import locationService from './locationService';

const api = '//api.openweathermap.org/data/2.5/weather';
const apiKey = 'cad3370b1bbe974e2dab04659aadd531';

let weatherService = new Promise(function(resolve, reject) {
    locationService
        .then((position) => {
            return new Request(`${api}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${apiKey}`);
        })
        .then((request)=>{
            console.warn('weather!');
            fetch(request).then((response) => {
                resolve(response.json());
            }).catch((error) => {
                reject(error);
            });
        });
});

export default weatherService;