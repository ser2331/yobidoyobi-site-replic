export default class BaseModal {
    copyFrom(data) {
        if (data === null || typeof data !== 'object') {
            return;
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const name in data) {
            if (Object.prototype.hasOwnProperty.call(data, name)) {
                this[name] = data[name];
            }
        }

        // eslint-disable-next-line consistent-return
        return this;
    }
}
