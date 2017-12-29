// Regex expressions
const doubleQuoteRgx = /"/g;
const commaRgx = /,/g;
const rightParenSemicolonRgx = /};/g;
const leadingAndTrailingParenRgx = /^\{|\}$/g;
const colonSpaceLeftParenRgx = /: {/g;
const camelCaseRgx = /([a-z])([A-Z])/g;

const camelToKebab = identifier => identifier.replace(camelCaseRgx, "$1-$2").toLowerCase();

export { 
    camelToKebab,
    doubleQuoteRgx,
    commaRgx,
    rightParenSemicolonRgx,
    leadingAndTrailingParenRgx,
    colonSpaceLeftParenRgx
};
