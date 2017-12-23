import themeit from "theme-it";

const testProperty = "test";
const testVariable = `--${testProperty}`;
let containerNode;

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
    const actual = themeit.getThemeProperty(testProperty);
    expect(actual).toEqual("");
  });

  it("Should return the correct CSS custom property on an element using getThemeProperty when it exists", () => {
    containerNode.style.setProperty(testVariable, "red");

    const actual = themeit.getThemeProperty(testProperty, containerNode);

    expect(actual).toEqual("red");
  });

  it("Should set a CSS Custom property on an element using setThemeProperty", () => {
    themeit.setThemeProperty(testProperty, "red");

    const actual = getComputedStyle(containerNode).getPropertyValue(testVariable);

    expect(actual).toEqual("red");
  });

  it("Should remove a CSS Custom property from an element using removeThemeProperty", () => {
    containerNode.style.setProperty(testVariable, "red");

    const removed = themeit.removeThemeProperty(testProperty, containerNode);
    const actual = getComputedStyle(containerNode).getPropertyValue(testVariable);

    expect(removed).toEqual("red");
    expect(actual).toEqual("");
  });
});