export const timeDiffCalc = (dateFuture: Date, dateNow: Date) => {
    // @ts-ignore
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    const arr = []

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    if(days > 0) arr.push(days + (days > 1 ? " days": " day"))

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    if(hours > 0) arr.push(hours + (hours > 1 ? " hours": " hour"))


    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    if(minutes > 0) arr.push(minutes + (minutes > 1 ? " minutes" : " minute"))

    const seconds = Math.floor(diffInMilliSeconds % 60);
    if(seconds > 0) arr.push(seconds + (seconds > 1 ? " seconds" : " second"))

    return arr[0]
}

//@ts-ignore
window.timeDiffCalc = timeDiffCalc