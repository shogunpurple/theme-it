import Themeit from "theme-it";

const testProperty = "test";
const testTheme = "test-theme";
const testVariable = `--${testProperty}`;
const testThemeConfig = {
  test: {
    "primary-color": "blue"
  }
};
let containerNode;

// callbacks
const onPropertyGet = jest.fn();
const onPropertySet = jest.fn();
const onPropertyRemove = jest.fn();
const onThemesCreate = jest.fn();
const onThemeApply = jest.fn();
const onThemeUnapply = jest.fn();

const themeit = new Themeit({
  debug: true,
  onPropertyGet,
  onPropertySet,
  onPropertyRemove,
  onThemesCreate,
  onThemeApply,
  onThemeUnapply,
  themeClasses: [testTheme]
});

describe("Themeit API tests", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div> 
        <div id="container">
        </div>
      </div>
    `;
    containerNode = document.querySelector("#container");
  });

  it("Should print a warning message when the returned property is empty", () => {
    const actual = themeit.getProperty(testProperty);
    expect(actual).toEqual("");
  });

  it("Should generate a new theme when a theme configuration is passed, which should inject the CSS into the <head> tag.", () => {
    themeit.createThemes(testThemeConfig);
    expect(document.head.childNodes[0].textContent).toMatchSnapshot();
  });

  it("Should execute the onPropertySet callback when a property is set", () => {
    themeit.setProperty(testProperty, "red");
    expect(onPropertySet).toHaveBeenCalledWith(testProperty, "red", expect.any(Node));
  });

  it("Should execute the onPropertyGet callback when a property is retrieved", () => {
    themeit.getProperty(testProperty);
    expect(onPropertyGet).toHaveBeenCalledWith(testProperty, expect.anything(), expect.any(Node));
  });

  it("Should execute the onPropertyRemove callback when a property is removed", () => {
    const actual = themeit.removeProperty(testProperty);
    expect(onPropertyRemove).toHaveBeenCalledWith(testProperty, "", expect.any(Node));
  });

  // TODO: improve test to use tohaveBeenCalledWith
  it("Should execute the onThemeCreate callback when a theme is created", () => {
    const actual = themeit.createThemes({});
    expect(onThemesCreate).toHaveBeenCalled();
  });

  it("Should execute the onThemeApply callback when a theme is applied", () => {
    const actual = themeit.applyTheme(testTheme);
    expect(onThemeApply).toHaveBeenCalledWith(testTheme, expect.any(Node));
  });

  it("Should execute the onThemeUnapply callback when a theme is unapplied", () => {
    const actual = themeit.unapplyTheme(testTheme);
    expect(onThemeUnapply).toHaveBeenCalledWith(testTheme, expect.any(Node));
  });

  // CSS Variables are not yet supported by JSDOM - https://github.com/tmpvar/jsdom/issues/1895
  // Skipping these tests until the issue is resolved.
  it.skip("Should return the correct CSS custom property on an element using getThemeProperty when it exists", () => {
    containerNode.style.setProperty(testVariable, "red");

    const actual = themeit.getProperty(testProperty, containerNode);

    expect(actual).toEqual("red");
  });

  it.skip("Should set a CSS Custom property on an element using setThemeProperty", () => {
    themeit.setProperty(testProperty, "red");

    const actual = getComputedStyle(containerNode).getPropertyValue(testVariable);

    expect(actual).toEqual("red");
  });

  it.skip("Should remove a CSS Custom property from an element using removeThemeProperty", () => {
    containerNode.style.setProperty(testVariable, "red");

    const removed = themeit.removeProperty(testProperty, containerNode);
    const actual = getComputedStyle(containerNode).getPropertyValue(testVariable);

    expect(removed).toEqual("red");
    expect(actual).toEqual("");
  });
});