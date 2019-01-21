import weatherService from './weatherService';

it('weatherService should get the weather', () => {
    weatherService.then((weather) => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});