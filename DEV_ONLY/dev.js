import Themeit from "../src/theme-it";

const themeit = new Themeit({
  debug: true,
  themeClasses: ["dark-theme", "light-theme"]
});

const $ = document.querySelector.bind(document);

themeit.themeClasses.map(themeClass => {
  const applyThemeButton = document.createElement("button");
  applyThemeButton.textContent = `Apply ${themeClass}`;
  applyThemeButton.addEventListener("click", () => {
    themeit.applyTheme(themeClass);
  });
  $(".current-themes").appendChild(applyThemeButton);
})

// Event listeners
$(".primary").addEventListener("input", e => {
  themeit.setProperty("navbar-bg-color", e.target.value);
});

$(".apply-theme").addEventListener("click", () => {
  const value = $(".selector").value;
  themeit.applyTheme(value);
});

$(".unapply-theme").addEventListener("click", () => {
  const value = $(".selector").value;
  themeit.unapplyTheme(value);
});

$(".generate-theme").addEventListener("click", () => {
  const primary = $(".primary").value;
  const secondary = $(".secondary").value;
  const tertiary = $(".tertiary").value;
  const themeName = $(".selector").value;

  const themeConfig = {
    [themeName]: {
      "primary-color": primary,
      "secondary-color": secondary,
      "tertiary-color": tertiary
    }
  };

  themeit.createThemes(themeConfig);
});