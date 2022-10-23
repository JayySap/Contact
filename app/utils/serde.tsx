
export function text2bool (text: string) {
    if(text === 'true' || text === '1' || text === 'on') {
        return true;
    }
    return false;
}

export function time2days (time:string) {
    if(time.includes('day')) {
        return parseInt(time.split(' ')[0]);
    } else if (time.includes('week')) {
        return parseInt(time.split(' ')[0]) * 7;
    } else if (time.includes('month')) {
        return parseInt(time.split(' ')[0]) * 30;
    } else if (time.includes('year')) {
        return parseInt(time.split(' ')[0]) * 365;
    }
}