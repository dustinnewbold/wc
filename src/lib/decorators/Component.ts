import { merge } from '../utils/merge';
import { getPropsForComponent } from '../utils/props';
import { WebComponentOptions } from '../WebComponent';

type ComponentType = { new (...args: any[]): {} };

const defaultOptions: WebComponentOptions = {
    tag: '',
    useShadowDOM: false,
    autoRegister: true,
};

export function Component(elementOptions: WebComponentOptions) {
	return function _Component<T extends ComponentType>(constr: T) {
		const options = merge<WebComponentOptions>(defaultOptions, elementOptions);

		const returnClass: any = class extends constr {
			constructor(...args: any[]) {
				super(options);
			}
		};

		const props = getPropsForComponent(constr.name);
		returnClass.observedAttributes = props;

		// Auto-define components
		if ( options.autoRegister ) {
			customElements.define(elementOptions.tag, returnClass);
		}

		return returnClass;
	};
};
