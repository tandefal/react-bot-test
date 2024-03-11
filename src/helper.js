export function notNullObj(data) {
    return Object.keys(data).reduce((acc, key) => {
        if (data[key]) {
            acc[key] = data[key];
        }
        return acc;
    }, {});
}