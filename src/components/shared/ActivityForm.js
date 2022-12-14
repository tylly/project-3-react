import { Form,Button,Container} from 'react-bootstrap'
import React, { useState } from 'react'

const ActivityForm = (props) => {
    const {activity, handleChange, handleSubmit, heading} = props

    return (
            <Container className="justify-content-center">
                <h3>{heading}</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        placeholder="What is the activities name?"
                        name="name"
                        id="name"
                        value={ activity.name }
                        onChange={ handleChange }
                    />
                    <Form.Label htmlFor="address" className='mt-2'>Address</Form.Label>
                    <Form.Control
                        placeholder="What is the address?"
                        name="address"
                        id="address"
                        value={ activity.address }
                        onChange={ handleChange }
                    />
                    <Form.Label htmlFor="schedule" className='mt-2'>Schedule</Form.Label>
                    <Form.Control
                        placeholder="What time?"
                        name="schedule"
                        id="schedule"
                        value={ activity.schedule}
                        onChange={ handleChange }
                 />
                 <Form.Label htmlFor="priority" className='mt-2'>How badly do you want to do this?</Form.Label>
                    <Form.Range 
                    name="priority"
                    id="priority"
                    value={activity.priority}
                    onChange={handleChange}
                    />
                  
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        )
}

export default ActivityForm