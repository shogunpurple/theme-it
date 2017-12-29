import { generateTheme } from "theme-it-cli";
import {
  testThemeConfig,
  generatedTheme,
  nestedThemeConfig,
  nestedGeneratedTheme
} from "./testData";

describe("Themeit CLI tests", () => {
  it("Should generate the correct CSS class structure when the themeConfig is passed in", () => {
    const generated = generateTheme(testThemeConfig, true);
    expect(generated).toEqual(generatedTheme);
  });

  it("Should generate the correct CSS class structure when the nestedThemeConfig is passed in", () => {
    const generated = generateTheme(nestedThemeConfig, true);
    expect(generated).toEqual(nestedGeneratedTheme);
  });
});
