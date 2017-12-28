import { generateTheme } from "theme-it-cli";

const testThemeConfig = {
  darkTheme: {
    primaryColor: "black",
    secondaryColor: "papayawhip",
    globalBorder: "2px"
  },
  lightTheme: {
    primaryColor: "gray",
    secondaryColor: "purple",
    globalBorder: "2px"
  }
};

const generatedTheme = {
  "dark-theme": {
    "--primary-color": "black",
    "--secondary-color": "papayawhip",
    "--global-border": "2px"
  },
  "light-theme": {
    "--primary-color": "gray",
    "--secondary-color": "purple",
    "--global-border": "2px"
  }
};

describe("Themeit CLI tests", () => {
  it("Should generate the correct CSS classes when the themeConfig is passed in", () => {
    const generated = generateTheme(testThemeConfig);
    expect(generated).toEqual(generatedTheme);
  });
});
