const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      }))),
    watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

global.fetch = jest.fn(() => Promise.resolve());