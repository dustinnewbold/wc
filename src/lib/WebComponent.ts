import { PropChangeDetails } from './decorators/PropChange';
import { updateDOM } from './utils/updateDOM';

export type WebComponentOptions = {
    tag: string;
    useShadowDOM?: false | 'open' | 'closed';
    autoRegister?: boolean;
};

export abstract class WebComponent extends HTMLElement {
    public _tagName: string;
    private _root: HTMLElement | ShadowRoot;
    private _useShadowDOM: false | 'open' | 'closed';
    private _firstDrawn: boolean = false;
    private _observedCallbacks: { [key: string]: Function[] };

    abstract render(): HTMLElement;

    mount() {};
    unmount() {};

    constructor(options: Required<WebComponentOptions>) {
        super();

        this._useShadowDOM = options.useShadowDOM;
        this._tagName = options.tag || 'wc-unknown';

        if ( ! this._useShadowDOM ) {
            this._root = this;
        } else {
            this._root = this.attachShadow({ mode: this._useShadowDOM });
        }
    }

    private connectedCallback() {
        this.mount();
        this.draw();
    }

    private draw() {
        this._root.innerHTML = '';
        this._root.appendChild(this.render());
        this._firstDrawn = true;
    }

    private update() {
        if ( ! this._firstDrawn ) return;
        this.draw();
    }

    private adoptedCallback() {
        console.debug('adopted');
    }

    private disconnectedCallback() {
        this.unmount();
        console.debug('disconnected');
    }

    private attributeChangedCallback(attributeName: string, oldValue: any, newValue: any) {
        // @ts-ignore
        this[attributeName] = newValue;
        this.update();

        if ( ! this._observedCallbacks ) return;
        if ( ! this._firstDrawn ) return;

        const propChange: PropChangeDetails = {
            name: attributeName,
            value: newValue,
            oldValue,
        };

        if ( this._observedCallbacks[attributeName] ) {
            this._observedCallbacks[attributeName].forEach(callback => callback(propChange));
        }

        if ( this._observedCallbacks['*'] ) {
            this._observedCallbacks['*'].forEach(callback => callback(propChange));
        }
    }
}