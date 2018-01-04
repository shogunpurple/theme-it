import { generateTheme, generateCSSFromThemeObj } from "./themeCompiler";
import { camelToKebab } from "./utils";

const ROOT_SELECTOR = "body";

class Themeit {
  constructor(config = {}) {
    const {
      debug = false,
      onPropertySet,
      onPropertyGet,
      onPropertyRemove,
      themeClasses = [],
      onThemesCreate,
      onThemeApply,
      onThemeUnapply
    } = config;

    this.debug = debug;
    this.onPropertySet = onPropertySet;
    this.onPropertyGet = onPropertyGet;
    this.onPropertyRemove = onPropertyRemove;
    this.onThemesCreate = onThemesCreate;
    this.onThemeApply = onThemeApply;
    this.onThemeUnapply = onThemeUnapply;
    this.themeClasses = themeClasses;
  }

  executeCallback(callback, ...args) {
    typeof callback === "function" && callback(...args);
  }

  validateProperty(response, property) {
    if (!response && this.debug) {
      console.error(
        `Themeit: The CSS custom property --${property} is empty or has not been set.`
      );
    }
  }

  validateTheme(themeName) {
    const valid = this.themeClasses.includes(themeName);
    if (!valid) {
      throw new Error(`Themeit: The theme: ${themeName} does not exist. Please add it to the themeClasses array or create it at runtime using createTheme().`);
    }

    return valid;
  }

  /**
   * Generates CSS from the passed in theme configuration object, injects it in the <head> tag of the document,
   * and allows you to then apply the newly created theme.
   * @param {Object} themeConfig - Theme configuration object
   */
  createThemes(themeConfig) {
    const themeNames = Object.keys(themeConfig).map(camelToKebab);

    const themeExists = this.themeClasses.some(themeClass =>
      themeNames.includes(themeClass)
    );

    if (themeExists) {
      throw new Error(
        `One of the themes of the ones you created already exists. Please try again with a different theme name. 
        Current Themes: ${this.themeClasses}
        Themes you tried to create: ${themeNames}`
      );
    }

    const generatedThemeCSS = generateCSSFromThemeObj(themeConfig);
    const themeStyleTag = document.createElement("style");

    themeStyleTag.appendChild(document.createTextNode(generatedThemeCSS));
    document.head.appendChild(themeStyleTag);

    this.themeClasses.push(...themeNames);

    this.executeCallback(this.onThemesCreate, themeNames, generatedThemeCSS);

    if (this.debug) {
      console.log(`New themes generated: ${themeNames}`, themeConfig, generatedThemeCSS);
    }
  }

  /**
   * Applies the selected theme to an element.
   * @param {String} themeName - Name of the theme. Must exist in the themeClasses array.
   * @param {String} selector - Selector of the element to apply the theme to.
   */
  applyTheme(themeName, selector = ROOT_SELECTOR) {
    this.validateTheme(themeName);

    const element = document.querySelector(selector);
    element.classList.remove(...this.themeClasses);
    element.classList.add(themeName);

    this.executeCallback(this.onThemeApply, themeName, element);
  }

  /**
   * Removes the selected theme from an element.
   * @param {String} themeName - Name of the theme. Must exist in the themeClasses array.
   * @param {String} selector - Selector of the element to unapply the theme from.
   */
  unapplyTheme(themeName, selector = ROOT_SELECTOR) {
    this.validateTheme(themeName);

    const element = document.querySelector(selector);
    element.classList.remove(themeName);

    this.executeCallback(this.onThemeUnapply, themeName, element);
  }

  /**
   * Checks whether or not the users browser supports custom CSS properties, and therefore supports theme-it.
   */
  isSupported() {
    const isSupported = CSS.supports("--custom-properties", "custom");
    if (!isSupported && this.debug) {
      console.warn("Your browser does not support custom CSS properties.");
    }
    return isSupported;
  }

  /**
   * Gets the value of a CSS custom property from the specified element.
   * @param {String} property - The property to get. Auto prefixed with --.
   * @param {String} selector - DOM selector for the node to get CSS custom property from.
   */
  getProperty(property, selector = ROOT_SELECTOR) {
    const element = document.querySelector(selector);
    const customPropertyValue = getComputedStyle(element)
      .getPropertyValue(`--${property}`)
      .trim();

    this.validateProperty(customPropertyValue, property);
    this.executeCallback(
      this.onPropertyGet,
      property,
      customPropertyValue,
      element
    );

    return customPropertyValue;
  }

  /**
   * Sets the value of a custom CSS property on the specified DOM Node.
   * @param {String} property - The name of the property to set. This is auto-prefixed with --
   * @param {String | Number} value - The value of the property
   * @param {String} selector - selector of the element to set the property on.
   */
  setProperty(property, value, selector = ROOT_SELECTOR) {
    const element = document.querySelector(selector);
    element.style.setProperty(`--${property}`, value);

    this.executeCallback(this.onPropertySet, property, value, element);
  }

  /**
   * Remove a custom CSS property from the DOM Node.
   * @param {String} property - The name of the property to remove. This is auto-prefixed with --
   * @param {String} selector - The selector of the element to remove the property from.
   */
  removeProperty(property, selector = ROOT_SELECTOR) {
    const element = document.querySelector(selector);
    const removed = element.style.removeProperty(`--${property}`);

    this.validateProperty(removed, property);
    this.executeCallback(this.onPropertyRemove, property, removed, element);

    return removed;
  }
}

export default Themeit;
