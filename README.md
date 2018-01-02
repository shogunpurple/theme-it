# theme-it
A tiny (5kb minified), blazing fast theming library powered by CSS custom properties (also known as CSS4 Variables) with absolutely zero dependencies.

### Rationale
Variables are one of the reasons [CSS preprocessors](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) ([SASS](http://sass-lang.com/), [LESS](http://lesscss.org/)) exist at all. The limitation here is that preprocessors provide variable functionality at **compile time**. This means you cannot change these variables at runtime when you compile code from your chosen preprocessor into CSS. This poses a problem that many developers solve by bundling a different stylesheet for every theme and switching between them with JavaScript. Native [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) were introduced to allow you to work with variables directly, change them at runtime with JS and DRY up CSS definitions out of the box. Theme-it is a small, fast library that provides a whole bunch of utilities and abstractions for working with CSS variables at runtime, allowing you to dynamically theme your applications at the app or even component level regardless of framework, and without a CSS preprocessor or any other dependencies at all.

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
### Check if your browser supports CSS custom properties
Include chart here

### Create a theme and manage it using theme-it
Fetch all the latest news stories from bbc-news: 
```js
const themeit = "";
```

### Manage themes and properties at runtime

### Perform a callback when you apply a theme 
Show all the sources you can get news from. Use the ```Fetch Id``` field with the ```fetch``` command to get news for that source.
```js
const themeit = {};
```

### 

## Advanced Usage

## API



