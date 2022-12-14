import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ActivityForm from '../shared/ActivityForm'
import { createActivity } from '../../api/activities'
import axios from 'axios'

const NewActivityModal = (props) => {
    const { 
        user, destination, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [activity, setActivity] = useState({})

    // console.log('destination in edit modal', destination)

    const handleChange = (e) => {
        setActivity(prevActivity => {
            let value = e.target.value
            let name = e.target.name
            console.log(value)
            // console.log('this is the input type', e.target.type)

            const updatedActivity = {
                [name]: value
            }
            return {
                ...prevActivity,
                ...updatedActivity
            }
        })
    }

    const handleSubmit = async (e) => {
        // e equals the event
        e.preventDefault()
        console.log(destination)
        let imageSearchId = await axios.get(`https://api.unsplash.com/search/photos?query=${activity.name}&client_id=QJzcjsf5p0Yo-yCWtDRNhN9Picgt8P0Bc4W9N_O9o0k
        `);
        console.log('this is the image response', imageSearchId)
        activity.images = imageSearchId.data.results[0].urls.full
        createActivity(user, destination._id, activity)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! This will be fun!',
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
                    destination={destination} 
                    activity={activity}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Plan Something To Do!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewActivityModal