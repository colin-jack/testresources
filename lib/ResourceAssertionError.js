function ResourceAssertionError(message) {
    this.name = 'ResourceAssertionError';
    this.message = message;
    this.stack = (new Error()).stack;
}

ResourceAssertionError.prototype = new Error;

module.exports = ResourceAssertionError;