import React from "react";
import {Button, Header, Image, Modal, Statistic, Message, Icon} from "semantic-ui-react";

const MOCKUP_ISO_SIZE_MB = 8192

const DownloadingScreen = ({onSuccess, pause}: {onSuccess: () => void, pause: boolean}) => {
    const [speed, setSpeed] = React.useState(Math.random()*1000)
    const [timeSec, setTimeSec] = React.useState(1)
    const [downloadedMBs, setDownloadedMBs] = React.useState(0)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        let timerId: string | number | NodeJS.Timeout | undefined;
        if (!error && !pause) {
            timerId = setInterval(() => {
                let newSpeed = Math.random()*1000
                setSpeed(newSpeed)
                setTimeSec((prevState) => prevState + 1)
                setDownloadedMBs((prevState) => prevState + newSpeed)
                setError(Math.floor(Math.random()*20) === 13)
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [pause, error]);

    React.useEffect(() => {
        if (downloadedMBs > MOCKUP_ISO_SIZE_MB) {
            onSuccess()
        }
    }, [downloadedMBs])

    const toHumanReadableTime = (totalSeconds: number) => {
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        if (minutes <= 0 && seconds <= 0) {
            return `00:00`
        }
        return `${(minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
    }

    return <div className={"screen-container"}>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            size={"tiny"}
            open={error}
        >
            <Modal.Header style={{backgroundColor: "#E40C2B", color: "#F7F4E9"}}>
                ERROR {Math.floor(Math.random()*1000)}
            </Modal.Header>
            <Modal.Content>
                <Message icon error>
                    <Icon name='warning sign' />
                    <Message.Content>
                        <Message.Header>Unfortunately, an error occurred while loading data from the server</Message.Header>
                        <p>
                            This could happen due to the following reasons:
                        </p>
                        <Message.List>
                            <Message.Item>Network error</Message.Item>
                            <Message.Item>Server error</Message.Item>
                            <Message.Item>Device error</Message.Item>
                        </Message.List>
                        <p>
                            One of the simplest ways to solve it - try to do it again
                        </p>
                    </Message.Content>
                </Message>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={() => setError(false)}
                    style={{margin: "1vh", backgroundColor: "#438945", color: "#F7F4E9"}}
                >
                    Try again
                </Button>
            </Modal.Actions>
        </Modal>
        <Header size='huge'>Downloading...</Header>
        <div className={"content-section"}>
            <div style={{width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                <Header size='large'>Network status</Header>
                <Statistic.Group size={"mini"} widths={4}>
                    <Statistic>
                        <Statistic.Label>Speed</Statistic.Label>
                        <Statistic.Value>{speed.toFixed(2)}</Statistic.Value>
                        <Statistic.Label>MB/s</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Label>Time spent:</Statistic.Label>
                        <Statistic.Value>{toHumanReadableTime(timeSec)}</Statistic.Value>
                    </Statistic>
                    <Statistic>
                        <Statistic.Label>ETA:</Statistic.Label>
                        <Statistic.Value>{toHumanReadableTime((MOCKUP_ISO_SIZE_MB - downloadedMBs)/speed)}</Statistic.Value>
                    </Statistic>
                    <Statistic>
                        <Statistic.Label>Downloaded</Statistic.Label>
                        <Statistic.Value>{downloadedMBs.toFixed(2)}</Statistic.Value>
                        <Statistic.Label>MB</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </div>
            <div
                style={{width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid #EBA63F", backgroundColor: "#fff"}}
            >
                <Image size={"medium"} centered={true} src={'https://i.pcmag.com/imagery/reviews/06ajIYT7R4AM7Fx9S9aUmBn-14..v1613661897.png'}/>
                <h3>
                    Try our new Office suite!
                </h3>
                <i>
                    It`s totally free
                </i>
            </div>
        </div>
    </div>
}

export default DownloadingScreen