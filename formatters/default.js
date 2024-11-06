const formatAst = (ast, depth = 1) => {
    const indent = (depth) => ' '.repeat(depth * 4 - 2);
    const formatValue = (value, depth) => {
        if (!_.isObject(value)) {
            return value;
        }
        const keys = Object.keys(value);
        const result = keys.map((key) => `${indent(depth + 1)}  ${key}: ${formatValue(value[key], depth + 1)}`);
        return `{
  ${result.join('\n')}
  ${indent(depth)}  }`;
    };

    const lines = ast.map((node) => {
        switch (node.type) {
            case 'added':
                return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth)}`;
            case 'removed':
                return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth)}`;
            case 'changed':
                return `${indent(depth)}- ${node.key}: ${formatValue(node.oldValue, depth)}\n${indent(depth)}+ ${node.key}: ${formatValue(node.newValue, depth)}`;
            case 'unchanged':
                return `${indent(depth)}  ${node.key}: ${formatValue(node.value, depth)}`;
            case 'nested':
                return `${indent(depth)}  ${node.key}: {
  ${formatAst(node.children, depth + 1)}
  ${indent(depth)}  }`;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return lines.join('\n');
};

module.exports = (ast) => `{
  ${formatAst(ast)}
  }`;