export type PropChangeDetails = {
	name: string;
	value: any;
	oldValue: any;
};

export function PropChange(prop?: string) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		if ( ! prop ) prop = '*';
		if ( ! target._observedCallbacks ) target._observedCallbacks = {};
		if ( ! target._observedCallbacks[prop] ) target._observedCallbacks[prop] = [];

		target._observedCallbacks[prop].push(descriptor.value);
	}
}
