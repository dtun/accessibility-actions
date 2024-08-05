import "react-native-gesture-handler/jestSetup";

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

beforeAll(() => {
  jest.useFakeTimers();
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    // TODO: solve for this warning:
    let workletWarning = `[react-native-gesture-handler] None of the callbacks in the gesture are worklets. If you wish to run them on the JS thread use '.runOnJS(true)' modifier on the gesture to make this explicit. Otherwise, mark the callbacks as 'worklet' to run them on the UI thread.`
    
    if (!message.includes(workletWarning)) {
      console.warn(message);
    }
  });
});


afterAll(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});
