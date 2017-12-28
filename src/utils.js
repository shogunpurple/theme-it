const camelToKebab = (identifier) => identifier.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export {
    camelToKebab
};