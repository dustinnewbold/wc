import { jsx } from './lib/jsx';

export { WebComponent } from './lib/WebComponent';
export { registerElement } from './lib/registerElement';

// Decorators
export { Component } from './lib/decorators/Component';
export { Prop } from './lib/decorators/Prop';
export { PropChange } from './lib/decorators/PropChange';

export default {
    h: jsx,
};
