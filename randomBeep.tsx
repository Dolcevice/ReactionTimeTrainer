import React from "react";
import {Audio} from "expo-av";
import {View} from "react-native";

interface RandomBeepProps {
    beepInitialized : () => any;
    beepSatisfied : () => any;
    needNewBeep : boolean;
    destroyImpendingBeep : boolean;
    min : number;
    max : number;
}

interface RandomBeepStates {
    timeout : number | null
}

export default class RandomBeep extends React.Component<RandomBeepProps, RandomBeepStates> {
    static timeoutID : number | null = null;
    constructor(props : RandomBeepProps) {
        super(props);
        this.state = {
            timeout : null
        }
    }

    clearTimeout = () => {
        this.state.timeout ? clearTimeout(this.state.timeout) : null;
        this.setState({timeout : null});
    }

    componentDidUpdate(prevProps: Readonly<RandomBeepProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps !== this.props) {
            if (this.props.destroyImpendingBeep) {
                this.clearTimeout();
            }
            else if (this.props.needNewBeep) {
                this.generateInterval();
            }
        }
    }

    generateInterval = () => {
        this.props.beepInitialized();
        const timeoutAmount = Math.floor(Math.random() * (this.props.max - this.props.min + 1) + this.props.min);
        this.setState({
            timeout : setTimeout(this.callbackHandle, timeoutAmount * 1000)
        })
    }

    callbackHandle = () => {
        this.playSound().then(_ => this.props.beepSatisfied())
    }

    playSound = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('./assets/beep.mp3'));
            await soundObject.playAsync();
        }
        catch (e) {
            console.log(e)
        }
    }
    render() : JSX.Element {
        return <View/>;
    }
}
