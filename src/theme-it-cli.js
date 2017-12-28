import { camelToKebab } from "./utils";

const formatOutput = (output) => JSON.stringify(output, null, 2);

const generateTheme = (themeConfig, print = true) => {
  const generated = {};
  for (let themeName in themeConfig) {
    const themeClass = camelToKebab(themeName);
    generated[themeClass] = {};

    // Debug
    let themeVariables = "";

    for (let variableName in themeConfig[themeName]) {
      const cssVariableKey = "--" + (camelToKebab(variableName));
      const cssVariableValue = themeConfig[themeName][variableName];
      generated[themeClass][cssVariableKey] = cssVariableValue;

      // Debug
      const cssRule = `${cssVariableKey}: ${cssVariableValue}; `;
      themeVariables += cssRule;
    }

    if (print) {
      console.log(`.${themeClass} { ${themeVariables} }`);
    }
  }

  console.log(formatOutput(generated));
  return generated;
};

export { generateTheme };
