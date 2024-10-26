const formatPlain = (ast) => {
    const iter = (node, path) => {
        return node.flatMap((item) => {
            const property = path ? `${path}.${item.key}` : item.key;

            switch (item.type) {
                case 'added':
                    return `Property '${property}' was added with value: ${formatValue(item.value)}`;
                case 'removed':
                    return `Property '${property}' was removed`;
                case 'changed':
                    return `Property '${property}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
                case 'nested':
                    return iter(item.children, property);
                case 'unchanged':
                    return [];
                default:
                    throw new Error(`Unknown type: ${item.type}`);
            }
        });
    };

    return iter(ast, '').join('\n');
};

const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
        return '[complex value]';
    }
    if (typeof value === 'string') {
        return `'${value}'`;
    }
    return String(value);
};

module.exports = formatPlain;