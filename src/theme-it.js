const validateResponse = (response, property) => {
  if (!response) {
    console.warn(
      `Themeit: The CSS custom property --${property} is empty or has not been set.`
    );
  }
};

/**
 * Checks whether or not the users browser supports custom CSS properties.
 */
const themingSupported = () => {
    const isSupported = CSS.supports("--custom-properties", "custom");
    if (!isSupported) {
        console.warn("Your browser does not support custom CSS properties.");
    }
    return isSupported;
}


/**
 * Gets the value of a CSS custom property from the specified element.
 * @param {String} property - The property to get. Auto prefixed with --.
 * @param {DOMNode} element - DOM node to get CSS custom property from.
 */
const getThemeProperty = (property, element = document.body) => {
  const customPropertyValue = getComputedStyle(element).getPropertyValue(
    `--${property}`
  ).trim();

  validateResponse(customPropertyValue, property);

  return customPropertyValue;
};


/**
 * Sets the value of a custom CSS property on the specified DOM Node.
 * @param {String} property - The name of the property to set. This is auto-prefixed with --
 * @param {String | Number} value - The value of the property
 * @param {DOMNode} element - element to set the property on.
 */
const setThemeProperty = (property, value, element = document.body) => {
  element.style.setProperty(`--${property}`, value);
};


/**
 * Remove a custom CSS property from the DOM Node.
 * @param {String} property - The name of the property to remove. This is auto-prefixed with --
 * @param {DOMNode} element - The element to remove the property from.
 */
const removeThemeProperty = (property, element = document.body) => {
  const removed = element.style.removeProperty(`--${property}`);
  validateResponse(removed, property);
};

export { themingSupported, getThemeProperty, setThemeProperty, removeThemeProperty };

export default {
  themingSupported, 
  getThemeProperty,
  setThemeProperty,
  removeThemeProperty
};
