export const stringToNumber = (obj, arr) => {
    for(const key in obj) {
        if(arr.includes(key)) obj[key] = parseInt(obj[key])
    }
}