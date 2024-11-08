module.exports = (modelName, totalLength) => {
    return (
        "CHANAK" +
        modelName.toUpperCase() +
        new Date().getFullYear() +
        new Date().getMonth() +
        new Date().getDate() +
        (totalLength + 1)
    );
};
