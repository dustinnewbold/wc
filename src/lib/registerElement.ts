export const registerElement = (tag: string, element: CustomElementConstructor) => {
    customElements.define(tag, element);
};