function renderNavItems(element, index, arr) {
  const li = document.createElement("li");

  ul.appendChild(li);

  const text = document.createTextNode(element);

  li.innerHTML = li.innerHTML + element;
}

const ul = document.createElement("ul");
document.querySelector(".navbar").appendChild(ul);

const navItems = ["Home", "link one", "link two", "link three"];

navItems.forEach(renderNavItems);

