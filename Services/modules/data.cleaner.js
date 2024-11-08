module.exports = async (data) => {
    return Object.fromEntries(
        await Promise.all(
            Object.entries(data).map(async ([key, value]) => [
                key,
                value.replace(/"/g, "'").replace(/\s+/g, " "),
            ])
        )
    );
};
