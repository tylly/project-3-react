import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import RecActivityForm from '../shared/RecActivityForm'
import { createActivity } from '../../api/activities'


const NewRecActivityModal = (props) => {
    const { 
        user, destination, show, handleClose, msgAlert, triggerRefresh
    } = props
console.log(props)
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

    // let complete = {
    //     name: props.activity.poi.name,
    //     address: props.activity.address.freeformAddress
        
    // }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        console.log(props.activity)
        createActivity(user, destination._id, props.activity)
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
                <RecActivityForm 
                    activity={props.activity}
                    
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Plan Something To Do!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewRecActivityModal