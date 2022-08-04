import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneActivity, updateActivity, removeActivity } from '../../api/activities'
import messages from '../shared/AutoDismissAlert/messages'
import EditActivityModal from './EditActivityModal'


// We need to get the activity's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowActivity = (props) => {
    const [activity, setActivity] = useState(null)
    // const [activityModalShow, setActivityModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the activity in showActivity', activity)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneActivity(id)
            .then(res => setActivity(res.data.activity))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting activity',
                    message: messages.getActivityFailure,
                    variant: 'danger'
                })
                navigate('/destinations/:_id')
                //navigate back to the destinations page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the activity
    // this function's promise chain should send a message, and then go somewhere
    const removeTheActivity = () => {
        removeActivity(user, activity._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeActivitySuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing activty',
                    message: messages.removeActivityFailure,
                    variant: 'danger'
                })
            })
    }
    // //////////////////////////////////////////////
    // // I dont think we want this part for our app.
    // //////////////////////////////////////////////
    // let activityCards
    // if (destination) {
    //     if (destination.activities.length > 0) {
    //         activityCards = destination.activities.map(activity => (
    //             <ShowActivity 
    //                 key={activity._id}
    //                 activity={activity}
    //                 destination={destination}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }

    if (!activity) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ activity.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Schedule: { activity.schedule }</small></div>
                            {/* <div><small>Type: { activity.type }</small></div>
                            <div><small>
                                Adoptable: { activity.adoptable ? 'yes' : 'no'}
                            </small></div> */}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button onClick={() => setActivityModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {activity.name} a activity!
                        </Button> */}
                        {
                            user && activity.owner === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Activity
                                </Button>
                                <Button onClick={() => removeTheActivity()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete Activity
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            {/* <Container style={cardContainerLayout}>
                {activityCards}
            </Container>  */}
            <EditActivityModal 
                user={user}
                activity={activity} 
                show={editModalShow} 
                updateActivity={updateActivity}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowActivity
// show={activityModalShow}
// handleClose={() => setActivityModalShow(false)} 