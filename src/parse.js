import jsYaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);

const parseYaml = (data) => jsYaml.load(data);

const parse = (format, data) => {
  if (format === 'json') {
    return parseJson(data);
  } if (format === 'yml' || format === 'yaml') {
    return parseYaml(data);
  }
  throw new Error(`Not support format: ${format}`);
};

export default parse;
