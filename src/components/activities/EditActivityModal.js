import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ActivityForm from '../shared/ActivityForm'
import { updateActivity } from '../../api/activities'


const EditActivityModal = (props) => {
    const { 
        user, destination, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [activity, setActivity] = useState(props.activity)
    // console.log('this is the activity in the update modal', activity)
    const handleChange = (e) => {
        setActivity(prevActivity => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)
            // this handles the checkbox, changing on to true etc
            if (name === "isSqueaky" && e.target.checked) {
                value = true
            } else if (name === "isSqueaky" && !e.target.checked) {
                value = false
            }

            const updatedActivity = {
                [name]: value
            }
            return {
                ...prevActivity,
                ...updatedActivity
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateActivity(user, destination._id, activity)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The activity is better than ever!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ActivityForm 
                    activity={activity}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update this activity!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditActivityModal