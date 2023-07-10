import React from "react";
import { Button, Modal } from 'semantic-ui-react'

const UniversalModal = ({type, disabled, content, onSubmit, enablePause, disablePause}: {type: "approve" | "cancel", disabled: boolean, content: any, onSubmit: () => void, enablePause: () => void, disablePause: () => void}) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
      if (type === "cancel") {
          enablePause()
      }
      setOpen(true)
    }

    const handleClose = () => {
        if (type === "cancel") {
            disablePause()
        }
        setOpen(false)
    }

    const handleSubmit = () => {
      setOpen(false)
      onSubmit()
    }

    return <React.Fragment>
        <Button
            disabled={disabled}
            onClick={handleOpen}
            style={{backgroundColor: type === "approve" ? "#3CBCC3" : "#E40C2B", color: "#F7F4E9"}}
        >
            {type === "approve" ? "Start" : "Cancel"}
        </Button>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            size={"mini"}
            open={open}
        >
            <Modal.Header>
                {type === "approve" ? "Check the parameters before downloading" : "Are you sure?"}
            </Modal.Header>
            <Modal.Content>
                {content}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    onClick={handleClose}
                    floated={"left"}
                    style={{margin: "1vh", backgroundColor: "#EBA63F", color: "#F7F4E9"}}
                >
                    Close
                </Button>
                <Button
                    onClick={handleSubmit}
                    floated={"right"}
                    style={{margin: "1vh", backgroundColor: type === "approve" ? "#438945" : "#E40C2B", color: "#F7F4E9"}}
                >
                    {type === "approve" ? "Start" : "Cancel"}
                </Button>
            </Modal.Actions>
        </Modal>
    </React.Fragment>
}

export default UniversalModal