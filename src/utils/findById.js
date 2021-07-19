export const findById = (list, id) => {
    return list.find(listItem => listItem.id === id);
};