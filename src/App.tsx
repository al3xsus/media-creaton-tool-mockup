import React from 'react';
import './App.css';
import ProgressBar from "./components/ProgressBar";
import Intro from "./components/Intro";
import TargetScreen from "./components/TargetScreen";
import DestinationScreen from "./components/DestinationScreen";
import DownloadingScreen from "./components/DownloadingScreen";
import Outro from "./components/Outro";
import {Stages} from "./types";
import Buttons from "./components/Buttons";
import ArchitectureScreen from "./components/ArchitectureScreen";
import TitleBar from "./components/TitleBar";
import UniversalModal from "./components/UniversalModal";
import {Button, Icon} from "semantic-ui-react";

interface State {
    stage: Stages;
    pause: boolean,
    freeSpaceAvail: number[],
    config: {
        target: "ISO" | "media" | null,
        lang: string,
        architecture: "x32" | "x64" | "ARM" | null,
        destination: string
    };
}

const App = () => {
    const defaultState: State = {
        pause: false,
        stage: Stages.Intro,
        freeSpaceAvail: [Math.random() * 128, Math.random() * 32, Math.random() * 250, Math.random() * 500],
        config: {
            target: null,
            lang: "EN",
            architecture: null,
            destination: ""
        }
    }

    const [state, setState] = React.useState<State>(defaultState)

    console.log(state)

    const ForwardBtn = ({disabled}: {disabled: boolean}) => {
        return <Button
            icon
            labelPosition='right'
            disabled={disabled}
            onClick={() => changeState({type: "changeStage", param: "forward"})}
            style={{backgroundColor: "#3CBCC3", color: "#F7F4E9"}}
        >
            Next
            <Icon name={'arrow right'} />
        </Button>
    }

    const BackBtn = () => {
        return <Button
            icon
            labelPosition='left'
            onClick={() => changeState({type: "changeStage", param: "back"})}
            style={{backgroundColor: "#EBA63F", color: "#F7F4E9"}}
        >
            Back
            <Icon name={'arrow left'} />
        </Button>
    }

    const changeState = ({type, param}: {type: "changeStage" | "changeTarget" | "changeArchitecture" | "changeDestination" | "changeLanguage" | "refreshAvailSpace" | "enablePause" | "disablePause", param: any}) => {
      const newState = {...state}
        switch (type) {
            case "changeLanguage":
                newState.config.lang = param
                break
            case "changeStage":
                if (param === "forward") {
                    newState.stage = newState.stage + 1
                }
                else {
                    newState.stage = newState.stage - 1
                    newState.pause = false
                }
                break
            case "changeArchitecture":
                newState.config.architecture = param
                break
            case "changeDestination":
                newState.config.destination = param
                break
            case "changeTarget":
                newState.config.target = param
                break
            case "refreshAvailSpace":
                newState.freeSpaceAvail = [Math.random() * 128, Math.random() * 32, Math.random() * 250, Math.random() * 500]
                newState.config.destination = ""
                break
            case "enablePause":
                newState.pause = true
                break
            case "disablePause":
                newState.pause = false
                break
        }
        setState(newState)
    }

    const changeTarget = (target: "ISO" | "media") => {
        setState((prevState) => ({
            ...prevState,
            config: {
                ...prevState.config,
                target
            }
        }))
    }

    const changeArchitecture = (architecture: "x32" | "x64" | "ARM") => {
        setState((prevState) => ({
            ...prevState,
            config: {
                ...prevState.config,
                architecture
            }
        }))
    }

    const selectLanguage = (event: any) => {
        setState((prevState) => ({
            ...prevState,
            config: {
                ...prevState.config,
                lang: event.target.value
            }
        }))
    }

    const setDestination = (destination: string) => {
        setState((prevState) => ({
            ...prevState,
            config: {
                ...prevState.config,
                destination
            }
        }))
    }

    const returnCorrectPanel = (stage: Stages) => {
        switch (stage) {
            case Stages.Intro:
                return <Intro lang={state.config.lang} onLangChange={selectLanguage}/>
            case Stages.Target:
                return <TargetScreen chosenTarget={state.config.target} onTargetChange={changeTarget}/>
            case Stages.Architecture:
                return <ArchitectureScreen architecture={state.config.architecture}
                                           onArchitectreChange={changeArchitecture}/>
            case Stages.Destination:
                return <DestinationScreen
                    freeSpaceAvail={state.freeSpaceAvail}
                    destination={state.config.destination}
                    onDestinationChange={setDestination}
                    onRefresh={() => changeState({type: "refreshAvailSpace", param: null})}
                />
            case Stages.Download:
                return <DownloadingScreen onSuccess={() => changeState({type: "changeStage", param: "forward"})} pause={state.pause}/>
            case Stages.Outro:
                return <Outro/>
        }
    }

    const getProperModal = () => {
      if (state.stage === Stages.Destination) return <UniversalModal
          disabled={state.config.destination === ""}
          type={"approve"}
          content={<pre>{JSON.stringify(state.config, null, 4)}</pre>}
          onSubmit={() => changeState({type: "changeStage", param: "forward"})}
          enablePause={() => changeState({type: "enablePause", param: null})}
          disablePause={() => changeState({type: "disablePause", param: null})}
      />
      if (state.stage === Stages.Download) return <UniversalModal
          disabled={false}
          type={"cancel"}
          content={<p>Are you sure you want to cancel downloading?</p>}
          onSubmit={() => changeState({type: "changeStage", param: "back"})}
          enablePause={() => changeState({type: "enablePause", param: null})}
          disablePause={() => changeState({type: "disablePause", param: null})}
      />
    }

    const generateBtnConfig = () => {
        switch (state.stage) {
            case Stages.Intro:
                return {
                    forwardBtn: <ForwardBtn disabled={false}/>,
                    backBtn: <div/>,
                }
            case Stages.Target:
                return {
                    forwardBtn: <ForwardBtn disabled={state.config.target === null}/>,
                    backBtn: <BackBtn/>,
                }
            case Stages.Architecture:
                return {
                    forwardBtn: <ForwardBtn disabled={state.config.architecture === null}/>,
                    backBtn: <BackBtn/>,
                }
            case Stages.Destination:
                return {
                    forwardBtn: getProperModal(),
                    backBtn: <BackBtn/>,
                }
            case Stages.Download:
                return {
                    forwardBtn: <div/>,
                    backBtn: getProperModal()
                }
            case Stages.Outro:
                return {
                    forwardBtn: <div/>,
                    backBtn: <div/>
                }
        }
    }

    return (
        <React.Fragment>
            <div className={"main-container neumorph-default"}>
                <TitleBar/>
                <ProgressBar stage={state.stage}/>
                {returnCorrectPanel(state.stage)}
                <Buttons btnConfig={generateBtnConfig()}/>
            </div>
        </React.Fragment>
    );
}

export default App;
