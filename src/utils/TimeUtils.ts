export const getWeekOfMonth = (date: Date) => {
    let adjustedDate = date.getDate() + (6 - date.getDay());
    let prefixes = ['1', '2', '3', '4', '5', '6'];
    return (parseInt(prefixes[0 | adjustedDate / 7]));
}