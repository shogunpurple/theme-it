import {
  camelToKebab,
  doubleQuoteRgx,
  commaRgx,
  rightParenSemicolonRgx,
  leadingAndTrailingParenRgx,
  colonSpaceLeftParenRgx
} from "./utils";

const formatOutput = output => JSON.stringify(output, null, 2);

const parseNestedPrefix = (prefix) => prefix ? `${camelToKebab(prefix)}-` : "";

const isNested = value => typeof value === "object";

/**
 * Parses the Themeit CSS Variables "AST" into valid CSS class definitions.
 * @param {Object} obj - Parsed Themeit CSS Variables Object
 */
function objectToCssString(obj) {
  return formatOutput(obj)
    .replace(doubleQuoteRgx, "")
    .replace(leadingAndTrailingParenRgx, "")
    .replace(commaRgx, ";")
    .replace(rightParenSemicolonRgx, "}")
    .replace(colonSpaceLeftParenRgx, " {");
}

/**
 * Recursive function that traverses the passed in object tree/JSON and creates a complete CSS variable theme structure from it. 
 * You can define styles the same way you would in react or a similar library, and theme-it will generate a complete CSS Variable definition for you
 * that can be used for theming.
 * @param {Object} themeObj - The theme object, such as the theme configuration object from a CSS in JS library.
 * @param {Object} result - The parsed and generated "AST" containing information about the css variables and their values. 
 * @param {String} prefix - Stateful buildup of CSS variable names when traversing a nested object.  
 */
function traverse(themeObj, result, prefix) {
  for (let cssVariableName in themeObj) {
    const cssVariableValue = themeObj[cssVariableName];

    let cssVariableKey;
    if (isNested(cssVariableValue)) {
      cssVariableKey = camelToKebab(parseNestedPrefix(prefix) + cssVariableName);
      traverse(cssVariableValue, result, cssVariableKey);
    } else {
      cssVariableKey = prefix ? `${prefix}-${camelToKebab(cssVariableName)}` : camelToKebab(cssVariableName);
      result[`--${cssVariableKey}`] = cssVariableValue;
    }
  }
}

/**
 * Generates the CSS variable theme by passing in your theme styles as an object. Calls traverse() to do the conversion. 
 * @param {Object} themeConfig - Nested or Flat Theme configuration object
 * @param {Boolean} printCSS - Whether or not to print a copy & paste CSS class definition so you can start using your new themes straight away.
 */
const generateTheme = (themeConfig, printCSS = false) => {
  const generated = {};
  for (let themeName in themeConfig) {
    const themeClass = "." + camelToKebab(themeName);
    generated[themeClass] = {};
    
    traverse(themeConfig[themeName], generated[themeClass]);
  }

  if (!printCSS) {
    console.log(objectToCssString(generated));
  }

  return generated;
};

export { generateTheme };
