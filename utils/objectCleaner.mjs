export function removeEmptyProperties(object) {
    if (object == null) return;

    const objectKeys = Object.keys(object);
    for (let index = 0; index < objectKeys.length; index++) {
        const item = object[objectKeys[index]];
        const itemIsObject = typeof item === "object";
        const itemPropertiesAreEmpty = itemIsObject
            ? Object.keys(item).length === 0 ||
              Object.values(item).every((i) => i == null)
            : false;
        if (itemPropertiesAreEmpty) object[objectKeys[index]] = undefined;
        if (itemIsObject && !itemPropertiesAreEmpty)
            removeEmptyProperties(item);
    }
    return object;
}
