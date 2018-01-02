# theme-it  
A tiny (5kb minified), blazing fast theming library powered by CSS custom properties (also known as CSS4 Variables) with absolutely zero dependencies.

### Rationale
Variables are one of the reasons [CSS preprocessors](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) ([SASS](http://sass-lang.com/), [LESS](http://lesscss.org/)) exist at all. The limitation here is that preprocessors provide variable functionality at **compile time**. This means you cannot access these variables at runtime when you compile code from your chosen preprocessor into CSS. This poses a problem that many developers solve by bundling a different stylesheet for every theme and switching between them with JavaScript. 

Native [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) were introduced to allow you to work with variables directly, change them at runtime with JS and DRY up CSS definitions out of the box. theme-it is a small, fast library that provides a bunch of utilities and abstractions for working with CSS variables at runtime, allowing you to dynamically theme your applications at the app or even component level regardless of framework, and without a CSS preprocessor or any other dependencies at all.

**theme-it** allows you to:
- Manage CSS Variable themes at runtime (apply and unapply themes)
- Get and set individual CSS variables at runtime
- Add callbacks for all theming operations so you can update client state, post to the server and more.
- Convert your current CSS in JS theme configuration to use CSS variables
- Genrerate completely new theme CSS using the CLI, or create them in the browser to enable totally custom, user created colour schemes at runtime.

 
## Installation
**npm** 
```
npm i theme-it
```

**yarn** 
```
yarn add theme-it
```

## Basic Usage
There are many different ways to use theme-it in your application. The easiest way is to create your own theme classes in your CSS, and manage the classnames using theme-it. theme-it has a class based API, so you need to instantiate the `Themeit` object in order to use it.

The following is a simple example of a theme you can create in one of your CSS files. Each class contains CSS variables which cascade - meaning any children of the element with that class applied will inherit the theme variables.

```css 
.dark-theme {
    --primary-color: "black";
    --secondary-color: "darkblue";
    --tertiary-color: "darkgreen";
}

.light-theme {
    --primary-color: "white";
    --secondary-color: "skyblue";
    --tertiary-color: "green";
}
```

### Check if your browser supports CSS custom properties and theme-it
`isSupported()` will return a boolean as to whether or not your browser supports CSS custom properties.

```js
const themeit = new Themeit();

if (themeit.isSupported()) {
    console.log("CSS custom properties supported. It's party time");
}
```

### Manage themes and properties using theme-it
You can manage themes as well as individual properties with theme-it. The following example shows you how to do this. 

Every function that manages themes and properties in theme-it follows a convention. The last argument is always a selector, which defaults to `<body /> ` for application wide theming. You can however pass your own selector to theme at the component level.

Every update to a theme or property will trigger a re-render, which will apply your new theme or property instantly. Theme-it will also throw errors if you try to apply themes or remove properties that don't exist.

```js
import Themeit from "theme-it";

const themeit = new Themeit({
    themeClasses: ["light-theme", "dark-theme"]
});

// apply a theme
themeit.applyTheme("dark-theme");

// get the value of a CSS property
const darkThemePrimaryColor = themeit.getProperty("primary-color"); // black

// set the value of a CSS property 
themeit.setProperty("primary-color", "purple");

// remove a CSS property completely
themeit.removeProperty("primary-color");

// apply a different theme (this replaces the theme already on the element)
themeit.applyTheme("light-theme");

// unapply the theme
themeit.unapplyTheme("light-theme");

// apply a theme to a certain element and its children
themeit.applyTheme("dark-theme", ".my-cool-element")
```

### Perform a callback when you execute a theme-it operation  
theme-it allows you to provide optional callbacks when you instantiate the `Themeit` object. This allows you to perform an action when you apply, unapply or create a theme. You can also provide callbacks for getting, setting and removing properties. 

This is especially useful when you want to keep track of the current theme in your client state, or perform a call to the server with the updated theme information. 

Refer to the API for the details on each callback and its arguments. 

```js
const themeit = new Themeit({
    themeClasses: ["dark-theme", "light-theme"],
    onPropertyGet: console.log,
    onPropertySet: console.log,
    onPropertyRemove: console.log,
    onThemesCreate: console.log,
    onThemeApply: console.log,
    onThemeUnapply: console.log
});
```

### Command Line Interface

## Advanced Usage
### Create a completely new theme at runtime, and apply it 
You can create new themes at runtime with theme-it and apply them. You pass in a theme configuration object similar to what you would use in CSS in JS libraries, which theme-it will transform into valid CSS definitions using CSS variables. These CSS definitions will be injected into the `<head />` tag of the document. Be aware that refreshing the page means you will lose your theme.

A solution to this is to use the `onThemesCreate` callback to save your theme somewhere so you can use it again.  

```js
const themeit = new Themeit();

// Create some new themes 
themeit.createThemes({
    "cool-new-theme": {
        primaryColor: "papayawhip",
        secondaryColor: "palevioletred",
        tertiaryColor: "purple",
    },
    "other-cool-new-theme": {
        primaryColor: "white",
        secondaryColor: "white",
        tertiaryColor: "white",
    }
});

// apply the first theme
themeit.applyTheme("cool-new-theme");

// apply the second theme
themeit.applyTheme("other-cool-new-theme");

// You can also create nested themes
```

## API



