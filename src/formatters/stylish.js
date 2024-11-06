import _ from 'lodash';

const getIdent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBrackeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth - 1) * spacesCount);

const stringify = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;

  const currentIndent = getIdent(depth);
  const bracketIndent = getBrackeIndent(depth);
  const currentValue = Object.entries(data);

  const lines = currentValue.map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const formatStylishOutput = (tree) => {
  const inner = (currentValue, depth = 1) => {
    const currentIndent = getIdent(depth);
    const bracketIndent = getBrackeIndent(depth);
    const lines = Object.entries(currentValue).map(([key, value]) => {
      switch (value.type) {
        case 'nested':
          return `${currentIndent}  ${key}: ${inner(value.children, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value.value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(value.oldValue, depth + 1)}
${currentIndent}+ ${key}: ${stringify(value.newValue, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type ${value.type}.`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return inner(tree);
};

export default formatStylishOutput;
