import Themeit from "../src/theme-it";

const themeit = new Themeit({
  debug: true,
  themeClasses: ["dark-theme", "light-theme"]
});

const $ = document.querySelector.bind(document);

const renderNavItems = text => {
  const li = document.createElement("li");
  li.innerText = text;
  ul.appendChild(li);
};

const ul = document.createElement("ul");
$(".navbar").appendChild(ul);

const navItems = ["Home", "link one", "link two", "link three"];

navItems.forEach(renderNavItems);

// Event listeners
$(".primary").addEventListener("input", e => {
  themeit.setProperty("navbar-bg-color", e.target.value);
});

$(".go-theme").addEventListener("click", () => {
  const value = $(".selector").value;
  themeit.applyTheme(value);
});

$(".no-go-theme").addEventListener("click", () => {
  const value = $(".selector").value;
  themeit.unapplyTheme(value);
});

$(".generate-theme").addEventListener("click", () => {
  const primary = $(".primary").value;
  const secondary = $(".secondary").value;
  const tertiary = $(".tertiary").value;
  const value = $(".selector").value;

  const themeConfig = {
    [value]: {
      "primary-color": primary,
      "secondary-color": secondary,
      "tertiary-color": tertiary
    }
  };

  themeit.createThemes(themeConfig);
});