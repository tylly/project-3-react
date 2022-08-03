import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DestinationForm from '../shared/DestinationForm'
import { updateDestinationSuccess, updateDestinationFailure } from '../shared/AutoDismissAlert/messages'

const EditDestinationModal = (props) => {
    const { 
        user, show, handleClose, 
        updateDestination, msgAlert, triggerRefresh
    } = props

    const [destination, setDestination] = useState(props.destination)

    console.log('destination in edit modal', destination)

    const handleChange = (e) => {
        setDestination(prevDestination => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedDestination = {
                [updatedName]: updatedValue
            }
            return {
                ...prevDestination,
                ...updatedDestination
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateDestination(user, destination)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateDestinationSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showDestination component
            // updated is in ShowDestination's useEffect's dependency array
            // changes to the updated boolean cause ShowDestination's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateDestinationFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <DestinationForm 
                    destination={destination}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Destination"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditDestinationModal