const formatDefault = require('./default');
const formatPlain = require('./plain');
const formatJson = require('./json');

const formatters = {
    default: formatDefault,
    plain: formatPlain,
    json: formatJson,
};

const getFormatter = (format) => {
    if (!formatters[format]) {
        throw new Error(`Unknown format: ${format}`);
    }
    return formatters[format];
};

module.exports = getFormatter;
