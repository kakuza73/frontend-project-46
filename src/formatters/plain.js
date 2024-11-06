import _ from 'lodash';

const extractValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return _.isObject(value) ? '[complex value]' : String(value);
};

const formatPlainOutput = (tree) => {
  const inner = (currentValue, path) => {
    const lines = Object.entries(currentValue).flatMap(([key, value]) => {
      const fullPath = (path === '') ? key : `${path}.${key}`;
      switch (value.type) {
        case 'nested':
          return inner(value.children, fullPath);
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${extractValue(value.value)}`;
        case 'unchanged':
          return []; // Просто пропускаем, не добавляем ничего
        case 'changed':
          return `Property '${fullPath}' was updated. From ${extractValue(value.oldValue)} to ${extractValue(value.newValue)}`;
        default:
          throw new Error(`Unknown type ${value.type}.`);
      }
    });
    return lines.join('\n');
  };
  return inner(tree, '');
};

export default formatPlainOutput;
