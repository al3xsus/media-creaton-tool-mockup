import React from "react";
import {ReactComponent as HDDIcon} from "../assets/hdd.svg";
import {ReactComponent as SSDIcon} from "../assets/ssd.svg";
import {ReactComponent as USBIcon} from "../assets/usb.svg";
import {ReactComponent as SDIcon} from "../assets/sd.svg";
import {Button, Header, Icon, Message} from "semantic-ui-react";

const MOCKUP_ISO_SIZE_GB = 8
const allDrivesAvail = ["C:\\", "D:\\", "E:\\", "F:\\"]
// const freeSpaceAvail = [Math.random() * 128, Math.random() * 32, Math.random() * 250, Math.random() * 500]

const DestinationScreen = ({freeSpaceAvail, destination, onDestinationChange, onRefresh}: {freeSpaceAvail: number[], destination: string, onDestinationChange: (destination: string) => void, onRefresh: () => void}) => {
    const checkSelected = (destination: string, freeSpace: number, address: string) => {
      if (address === destination) {
          return "choose-option neumorph-pressed"
      }
      if (freeSpace > MOCKUP_ISO_SIZE_GB) {
          return "choose-option neumorph-default"
      }
      return "unselectable"
    }
    const getBgColor = (destination: string, address: string) => {
      return address === destination ? "#438945" : "#1D1D2C"
    }
    return <div className={"screen-container"}>
        <Header size='huge'>Please, choose destination ({MOCKUP_ISO_SIZE_GB} GB of free space or more):</Header>
        <Message>
            <Message.Header>Want to use device, that listed as unsuitable?</Message.Header>
            <p>
                Try to clean up the space and click <Button
                icon
                labelPosition='left'
                onClick={onRefresh}
                style={{backgroundColor: "#438945", color: "#F7F4E9"}}
            >
                Refresh
                <Icon name={'refresh'} />
            </Button>
            </p>
        </Message>
        <div className={"content-section"}>
            {
                [USBIcon, SDIcon, SSDIcon, HDDIcon].map((Device, index) => {
                    return <div className={checkSelected(destination, freeSpaceAvail[index], allDrivesAvail[index])}
                                key={index} onClick={() => onDestinationChange(allDrivesAvail[index])}>
                        <Device style={{
                            width: "15vw",
                            height: "15vh"
                        }} fill={getBgColor(destination, allDrivesAvail[index])}/>
                        <Header as='h2'>
                            {allDrivesAvail[index]}
                            <Header.Subheader>
                                <i>Free space: <b>{freeSpaceAvail[index].toFixed(2)}</b> GB</i>
                            </Header.Subheader>
                        </Header>

                        {/*<h3>*/}
                        {/*    {allDrivesAvail[index]}*/}
                        {/*</h3>*/}
                        {/*<i>Free space: <b>{freeSpaceAvail[index].toFixed(2)}</b> GB</i>*/}
                    </div>
                })
            }
        </div>
    </div>
}

export default DestinationScreen