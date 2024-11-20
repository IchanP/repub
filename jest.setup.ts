import "@testing-library/jest-dom";
import util from "util";

expect.extend({
  toBe(received, expected) {
    const pass = Object.is(received, expected);
    const testName = expect.getState().currentTestName;

    return {
      pass,
      message: () =>
        pass
          ? ""
          : `Test "${testName}":\n` +
            `Expected: ${util.inspect(expected)}` +
            `\nReceived: ${util.inspect(received)}`,
    };
  },
});
