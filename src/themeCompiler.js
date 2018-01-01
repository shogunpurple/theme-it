import {
  camelToKebab,
  doubleQuoteRgx,
  commaRgx,
  rightParenSemicolonRgx,
  leadingAndTrailingParenRgx,
  colonSpaceLeftParenRgx
} from "./utils";

const formatOutput = output => JSON.stringify(output, null, 2);

const parseNestedPrefix = (prefix) => prefix ? `${prefix}-` : "";

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
    const cssVariableKey = parseNestedPrefix(prefix) + cssVariableName;

    if (isNested(cssVariableValue)) {
      traverse(cssVariableValue, result, cssVariableKey);
    } else {
      result[`--${camelToKebab(cssVariableKey)}`] = cssVariableValue;
    }
  }
}

/**
 * Generates the CSS variable theme by passing in your theme styles as an object. Calls traverse() to do the conversion. 
 * @param {Object} themeConfig - Nested or Flat Theme configuration object
 */
const generateTheme = (themeConfig) => {
  const generated = {};
  for (let themeName in themeConfig) {
    const themeClass = "." + camelToKebab(themeName);
    generated[themeClass] = {};
    
    traverse(themeConfig[themeName], generated[themeClass]);
  }

  return generated;
};

/**
 * Generates a valid CSS definition as a string from the passed in theme configuration object.
 * @param {Object} themeConfig - theme configuration object
 * @param {Boolean} printCSS - print the generated CSS to the console for copy + paste or debugging.
 */
function generateCSSFromThemeObj(themeConfig, printCSS) {
  const cssVariableTree = generateTheme(themeConfig); 
  const cssRuleDefinition = objectToCssString(cssVariableTree);

  if (printCSS) {
    console.log(cssRuleDefinition);
  }

  return cssRuleDefinition;
}



export { generateTheme, generateCSSFromThemeObj };
