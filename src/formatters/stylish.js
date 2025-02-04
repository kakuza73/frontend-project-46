import _ from 'lodash';

const fourSpaces = '    ';
const getCurrentIndent = (depth) => `${fourSpaces.repeat(depth - 1)}${fourSpaces.slice(0, 2)}`;
const getBracketIndent = (depth) => fourSpaces.repeat(depth - 1);

const stringify = (value, depth = 1) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.flatMap((key) => `${getCurrentIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getBracketIndent(depth + 1)}}`;
};

const treeFormatterStylish = (tree, depth = 1) => {
  const result = tree.flatMap((node) => {
    const {
      key, value, value1, value2, status, children,
    } = node;

    switch (status) {
      case 'added':
        return `${getCurrentIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${getCurrentIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return `${getCurrentIndent(depth)}- ${key}: ${stringify(value1, depth)}\n`
                + `${getCurrentIndent(depth)}+ ${key}: ${stringify(value2, depth)}`;
      case 'unchanged':
        return `${getCurrentIndent(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'nested':
        return `${getCurrentIndent(depth)}  ${key}: ${treeFormatterStylish(children, depth + 1)}`;
      default:
        throw new Error(`Unknow status: ${status}`);
    }
  });
  return `{\n${result.join('\n')}\n${getBracketIndent(depth)}}`;
};

export default treeFormatterStylish;
