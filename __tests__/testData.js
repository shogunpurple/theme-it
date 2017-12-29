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

const nestedThemeConfig = {
  darkTheme: {
    primaryColor: "black",
    secondaryColor: "papayawhip",
    globalBorder: "2px",
    button: {
      primaryColor: "blue"
    },
    input: {
      secondaryColor: "papayawhip",
      radio: {
        color: "purple"
      },
      text: {
        border: "5px"
      }
    }
  },
  lightTheme: {
    primaryColor: "gray",
    secondaryColor: "purple",
    globalBorder: "2px",
    button: {
      primaryColor: "blue"
    },
    input: {
      secondaryColor: "papayawhip",
      radio: {
        color: "purple"
      },
      text: {
        border: "5px"
      }
    }
  }
};

const generatedTheme = {
  ".dark-theme": {
    "--primary-color": "black",
    "--secondary-color": "papayawhip",
    "--global-border": "2px"
  },
  ".light-theme": {
    "--primary-color": "gray",
    "--secondary-color": "purple",
    "--global-border": "2px"
  }
};

const nestedGeneratedTheme = {
  ".dark-theme": {
    "--primary-color": "black",
    "--secondary-color": "papayawhip",
    "--global-border": "2px",
    "--button-primary-color": "blue",
    "--input-secondary-color": "papayawhip",
    "--input-radio-color": "purple",
    "--input-text-border": "5px"
  },
  ".light-theme": {
    "--primary-color": "gray",
    "--secondary-color": "purple",
    "--global-border": "2px",
    "--button-primary-color": "blue",
    "--input-secondary-color": "papayawhip",
    "--input-radio-color": "purple",
    "--input-text-border": "5px"
  }
};

export {
    testThemeConfig,
    nestedThemeConfig,
    generatedTheme,
    nestedGeneratedTheme
};