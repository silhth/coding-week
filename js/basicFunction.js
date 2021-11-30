const c = (element) => document.createElement(element);
const q = (element) => document.querySelector(element);
const a = (parent, element) => parent.appendChild(element);

const eraseDivContent = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };}

export { c, q, a, eraseDivContent}