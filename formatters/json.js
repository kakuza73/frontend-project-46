const formatJson = (ast) => {
    return JSON.stringify(ast, null, 2);
};

module.exports = formatJson;