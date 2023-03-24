export const randomId = () => (Math.random() + 1).toString(36).substring(7);

export const secToMinSec = (sec:number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec - minutes * 60;
    if(seconds <= 9){
        return minutes + ':0' + seconds;
    }
    return minutes + ':' + seconds;

}
