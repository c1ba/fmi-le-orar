export const getWeekOfMonth = (date: Date) => {
    let adjustedDate = new Date(new Date().setDate(date.getDate() - date.getDay())).getDate();
    let prefixes = ['1', '2', '3', '4', '5', '6'];
    return (parseInt(prefixes[0 | Math.round(adjustedDate / 7)]));
}