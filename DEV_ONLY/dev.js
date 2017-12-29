import Themeit from "../src/theme-it";

const themeit = new Themeit({
  debug: true
});

const renderNavItems = (text) => {
  const li = document.createElement("li");
  li.innerText = text;
  ul.appendChild(li);
}

const ul = document.createElement("ul");
document.querySelector(".navbar").appendChild(ul);

const navItems = ["Home", "link one", "link two", "link three"];

navItems.forEach(renderNavItems);

// Colour pickers
document.querySelector(".primary").addEventListener("input", (e) => {
  themeit.setProperty("navbar-bg-color", e.target.value);
})
