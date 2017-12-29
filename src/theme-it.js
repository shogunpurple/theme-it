const DEFAULT_CONFIG = {
  debug: false
};

class Themeit {
  constructor(config = DEFAULT_CONFIG) {
    const {
      debug,
      onThemeChange,
      onPropertySet,
      onPropertyGet,
      onPropertyRemove
    } = config;

    this.debug = debug;
    this.onThemeChange = onThemeChange;
    this.onPropertySet = onPropertySet;
    this.onPropertyGet = onPropertyGet;
    this.onPropertyRemove = onPropertyRemove;
    this.loadThemes();
  }

  loadThemes() {
    console.log("loading themes");
  }

  validateResponse(response, property) {
    if (!response && this.debug) {
      console.warn(
        `Themeit: The CSS custom property --${property} is empty or has not been set.`
      );
    }
  }

  /**
   * Checks whether or not the users browser supports custom CSS properties.
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
   * @param {DOMNode} element - DOM node to get CSS custom property from.
   */
  getProperty(property, element = document.body) {
    const customPropertyValue = getComputedStyle(element).getPropertyValue(
      `--${property}`
    ).trim();

    this.validateResponse(customPropertyValue, property);

    return customPropertyValue;
  }

  /**
   * Sets the value of a custom CSS property on the specified DOM Node.
   * @param {String} property - The name of the property to set. This is auto-prefixed with --
   * @param {String | Number} value - The value of the property
   * @param {DOMNode} element - element to set the property on.
   */
  setProperty(property, value, element = document.body) {
    element.style.setProperty(`--${property}`, value);
  }

  /**
   * Remove a custom CSS property from the DOM Node.
   * @param {String} property - The name of the property to remove. This is auto-prefixed with --
   * @param {DOMNode} element - The element to remove the property from.
   */
  removeProperty(property, element = document.body) {
    const removed = element.style.removeProperty(`--${property}`);
    this.validateResponse(removed, property);
  }
}

export default Themeit;
