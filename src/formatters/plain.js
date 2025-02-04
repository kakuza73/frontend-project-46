import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const treeFormatterPlain = (tree, parentKey = '') => {
  const result = tree.flatMap((node) => {
    const fullKey = parentKey ? `${parentKey}.${node.key}` : node.key;
    switch (node.status) {
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return treeFormatterPlain(node.children, fullKey);
      default:
        return 'Error';
    }
  });
  return result.join('\n');
};

export default treeFormatterPlain;
