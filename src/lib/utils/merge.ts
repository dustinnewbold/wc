export const merge = <T extends object = object>(objectA: T, objectB: T): T => {
    const mergedObject = {};

    Object.keys(objectA).forEach(key => {
        (mergedObject as any)[key] = (objectA as any)[key];
    });

    Object.keys(objectB).forEach(key => {
        (mergedObject as any)[key] = (objectB as any)[key];
    });

    return mergedObject as T;
}