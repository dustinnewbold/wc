type JSXChild = HTMLElement | string;
type JSXAttributes = {
    [key: string]: string | Function
};

export const jsx = (tag: string, attributes: JSXAttributes, ...children: JSXChild[]) => {
    const element = document.createElement(tag);

    if ( attributes ) {
        Object.keys(attributes).forEach(key => {
            const attributeName = key.toLowerCase();
            const attributeValue = attributes[key];
            (element as any)[attributeName] = attributeValue;
        });
    }

    if ( children && children.length ) {
        children.forEach(child => {
            if ( typeof child === 'string' ) {
                element.innerText += child;
            } else if ( child !== undefined ) {
                element.appendChild(child);
            }
        });
    }

    return element;
}