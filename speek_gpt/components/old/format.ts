const formatUTCtoJapanDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const offsetInMilliseconds = 9 * 60 * 60 * 1000;
    const localDate = new Date(date.getTime() + offsetInMilliseconds);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
export default formatUTCtoJapanDate;