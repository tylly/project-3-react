import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneDestination, updateDestination, removeDestination } from '../../api/destinations'
import messages from '../shared/AutoDismissAlert/messages'
// import EditDestinationModal from './EditDestinationModal'
import NewActivityModal from '../activities/NewActivityModal'
// import ShowActivity from '../activities/ShowActivity'

// We need to get the pet's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowDestination = (props) => {
    const [destination, setDestination] = useState(null)
    // const [editModalShow, setEditModalShow] = useState(false)
    // const [activityModalShow, setActivityModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the destination in showDestination', destination)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneDestination(id)
            .then(res => setDestination(res.data.destination))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting destination',
                    message: messages.getDestinationsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the destination
    // this function's promise chain should send a message, and then go somewhere
    const removeTheDestination = () => {
        removeDestination(user, destination.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeDestinationSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing destination',
                    message: messages.removeDestinationFailure,
                    variant: 'danger'
                })
            })
    }
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

    if (!destination) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ destination.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Schedule: { destination.schedule }</small></div>
                            {/* <div><small>Type: { destination.type }</small></div>
                            <div><small>
                                Adoptable: { destination.adoptable ? 'yes' : 'no'}
                            </small></div> */}
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                        <Button onClick={() => setActivityModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {destination.name} a activity!
                        </Button>
                        {
                            destination.owner && user && destination.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Destination
                                </Button>
                                <Button onClick={() => removeTheDestination()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {destination.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer> */}
                </Card>
            </Container>
            {/* <Container style={cardContainerLayout}>
                {activityCards}
            </Container>  */}
            {/* <EditDestinationModal 
                user={user}
                destination={destination} 
                show={editModalShow} 
                updateDestination={updateDestination}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            /> */}
            <NewActivityModal 
                destination={destination}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                />
        </>
    )
}

export default ShowDestination
// show={activityModalShow}
// handleClose={() => setActivityModalShow(false)} 