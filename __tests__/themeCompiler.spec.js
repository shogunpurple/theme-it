import { generateTheme, generateCSSFromThemeObj } from "themeCompiler";
import {
  testThemeConfig,
  generatedTheme,
  nestedThemeConfig,
  nestedGeneratedTheme
} from "./testData";

describe("Themeit theme compiler tests", () => {
  it("Should generate the correct CSS class structure when the themeConfig is passed in", () => {
    const generated = generateTheme(testThemeConfig);
    expect(generated).toEqual(generatedTheme);
  });

  it("Should generate the correct CSS class structure when the nestedThemeConfig is passed in", () => {
    const generated = generateTheme(nestedThemeConfig);
    expect(generated).toEqual(nestedGeneratedTheme);
  });

  it("Should generate the correct valid CSS when when the themeConfig is passed in", () => {
    expect(generateCSSFromThemeObj(testThemeConfig, true)).toMatchSnapshot();
  });

  it("Should generate the correct valid CSS when when the nestedThemeConfig is passed in", () => {
    expect(generateCSSFromThemeObj(nestedThemeConfig, true)).toMatchSnapshot();
  });
});
