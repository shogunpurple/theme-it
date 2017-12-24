import themeit from "../src/theme-it";

const renderNavItems = (text) => {
  const li = document.createElement("li");
  li.innerText = text;
  ul.appendChild(li);
}

const ul = document.createElement("ul");
document.querySelector(".navbar").appendChild(ul);

const navItems = ["Home", "link one", "link two", "link three"];

navItems.forEach(renderNavItems);

themeit.set("navbar-bg-color", "papayawhip");

