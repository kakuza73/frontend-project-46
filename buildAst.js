const _ = require('lodash');

const buildAst = (file1, file2) => {
    const allKeys = _.union(Object.keys(file1), Object.keys(file2));
    const sortedKeys = _.sortBy(allKeys);

    return sortedKeys.map((key) => {
        if (!_.has(file1, key)) {
            return { key, type: 'added', value: file2[key] };
        }
        if (!_.has(file2, key)) {
            return { key, type: 'removed', value: file1[key] };
        }
        if (_.isObject(file1[key]) && _.isObject(file2[key])) {
            return { key, type: 'nested', children: buildAst(file1[key], file2[key]) };
        }
        if (file1[key] !== file2[key]) {
            return { key, type: 'changed', oldValue: file1[key], newValue: file2[key] };
        }
        return { key, type: 'unchanged', value: file1[key] };
    });
};

module.exports = buildAst;