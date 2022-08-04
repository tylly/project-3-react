import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditActivityModal from './EditActivityModal'
import { deleteActivity } from '../../api/activities'

const ShowActivity = (props) => {
    // destructure some props
    const { activity, destination, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit activity modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)
    // this will set a color depending on the activity's condition
    // const setBgCondition = (cond) => {
    //     if (cond === 'new') {
    //         return({width: '18rem', backgroundColor:'#b5ead7'})
    //     } else if (cond === 'used') {
    //         return({width: '18rem', backgroundColor:'#ffdac1'})
    //     } else {
    //         return({width: '18rem', backgroundColor:'#ff9aa2'})
    //     }
    // }

    // calls this to destroy a activity
    const destroyActivity = () => {
        deleteActivity(user, destination._id, activity._id)
            .then(() => 
                msgAlert({
                    heading: 'Activity Deleted',
                    message: 'Bye bye activity!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            {/* <Card className="m-2" style={setBgCondition(activity.condition)}>
                <Card.Header>{activity.name}</Card.Header>
                <Card.Body>
                    <small>{activity.description}</small><br/>
                    <small>
                        {activity.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {activity.condition}</small><br/>
                    {
                        user && user._id === destination.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                                >Edit Activity</Button>
                            <Button 
                                onClick={() => destroyActivity()} 
                                variant="danger"
                            >
                                Delete Activity
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card> */}
            <EditActivityModal
                user={user}
                destination={destination}
                activity={activity}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowActivity