export const deleteEG = (eGList, id) => {
    eGList.splice(id, 1)
    return [...eGList]
}