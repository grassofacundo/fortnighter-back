export function getDaysBetweenDates(startDate, endDate) {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(daysDifference);
}

export function getFutureDate(daysInTheFuture, referenceDate) {
    const futureDate = structuredClone(referenceDate) ?? getToday();
    futureDate.setDate(futureDate.getDate() + daysInTheFuture);
    return futureDate;
}
