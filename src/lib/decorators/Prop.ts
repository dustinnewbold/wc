import { registerProp } from '../utils/props';

export function Prop(name?: string): PropertyDecorator {
    return (target: object, propertyKey: string | Symbol): void => {
        if ( typeof propertyKey === 'string' ) {
            registerProp(target.constructor.name, propertyKey);
        }
    }
};
