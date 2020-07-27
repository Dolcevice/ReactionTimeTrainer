export class Timer {
    private setCallBack: (time: number) => any;

    constructor(setCallBack: (time: number) => any) {
        this.setCallBack = setCallBack;
    }

    private static myInstance: Timer | null = null;
    private static intervalID: number | null;
    
    private static getInstance(setCallBack ?: (time: number) => any): Timer {
        if (setCallBack) {
            Timer.myInstance = new Timer(setCallBack)
        }
        return <Timer>Timer.myInstance
    }

    private static return0IfUndef = (target ?: number) => {
        if (target) {
            return target;
        } else {
            return 0
        }
    }

    static setUpInstance = (setCallBack: (time: number) => any) => {
        Timer.getInstance(setCallBack);
    }

    static startTimer = (resume ?: number) => {
        const instance = Timer.getInstance();
        const resumeVal = Timer.return0IfUndef(resume);

        const startTime = Date.now()
        Timer.intervalID = setInterval(() => {
            instance.setCallBack(Math.floor((Date.now() - startTime) / 1000) + resumeVal);
        }, 1000)
    }

    static stopTimer = () => {
        Timer.intervalID ? clearInterval(Timer.intervalID) : null;
    }
}