import _ from 'lodash';

const buildTreeDiff = (obj1, obj2) => {
  const obj1KeysArray = Object.keys(obj1);
  const obj2KeysArray = Object.keys(obj2);
  const uniqKeys = _.sortBy(_.union(obj1KeysArray, obj2KeysArray));
  const result = uniqKeys.map((key) => {
    const valueObj1 = obj1[key];
    const valueObj2 = obj2[key];
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = buildTreeDiff(valueObj1, valueObj2);
      return { key, status: 'nested', children: nestedDiff };
    } if (!Object.hasOwn(obj1, key)) {
      return { key, value: valueObj2, status: 'added' };
    } if (!Object.hasOwn(obj2, key)) {
      return { key, value: valueObj1, status: 'deleted' };
    } if (valueObj1 === valueObj2) {
      return { key, value: valueObj1, status: 'unchanged' };
    } if (valueObj1 !== valueObj2) {
      return {
        key, value1: valueObj1, value2: valueObj2, status: 'changed',
      };
    }
    throw new Error(`Error for key: ${key}`);
  });
  return result;
};
export default buildTreeDiff;
