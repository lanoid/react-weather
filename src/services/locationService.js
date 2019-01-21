let locationService =  new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
});

export default locationService;