const props: { [key: string]: string[] } = {};

export const registerProp = (component: string, prop: string) => {
    if ( ! props[component] ) props[component] = [];

    props[component].push(prop);
};

export const getPropsForComponent = (component: string) => {
    return props[component] || [];
};
