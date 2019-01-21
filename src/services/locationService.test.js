import locationService from './locationService';

it('locationService accesses the window navigator service', () => {
    locationService.then((position) => {
        expect(position).toEqual({
            coords: {
                latitude: 51.1,
                longitude: 45.3
            }
        })
    });
});