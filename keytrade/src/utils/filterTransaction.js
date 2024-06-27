const filterTransactions = (data) => {
    const result = []
    const formattedData = data.map(item => {
        // Destructure the item, omit updatedAt field, and format createdAt
        let { ...rest } = item._doc;
        const formattedCreatedAt = new Date(item.createdAt).toLocaleDateString();
        const formattedUpdatedAt = new Date(item.updatedAt).toLocaleDateString();

        // Return the updated item
        return {
            ...rest,
            createdAt: formattedCreatedAt,
            updatedAt: formattedUpdatedAt,
        };
    });
    return formattedData;
}

export default filterTransactions