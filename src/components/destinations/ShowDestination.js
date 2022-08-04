import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneDestination, updateDestination, removeDestination } from '../../api/destinations'
import messages from '../shared/AutoDismissAlert/messages'
import EditDestinationModal from './EditDestinationModal'
import NewActivityModal from '../activities/NewActivityModal'
import ShowActivity from '../activities/ShowActivity'

import '../../style.css'

// We need to get the pet's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
}

const ShowDestination = (props) => {
    const [destination, setDestination] = useState(null)
    // const [editModalShow, setEditModalShow] = useState(false)
    // const [activityModalShow, setActivityModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
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
        removeDestination(user, destination._id)
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
    let activityCards
    if (destination) {
        if (destination.activities.length > 0) {
            activityCards = destination.activities.map(activity => (
                <ShowActivity 
                    key={activity._id}
                    activity={activity}
                    destination={destination}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!destination) {
        return <LoadingScreen />
    }

    return (
            <>
                <Card  style={{width: '30rem'}} className="mx-auto mt-4" id="card">
                    <Card.Img id="card-img" variant="top" src="https://images.unsplash.com/photo-1549041050-386c1c99d655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlcyUyMHNreWxpbmV8ZW58MHx8MHx8&w=1000&q=80" />
                        <Card.Body>
                        <Card.Text>
                        <h2 style={cardContainerLayout}>{destination.name}</h2>
                        <h4 style={cardContainerLayout}>{destination.schedule}</h4>
                        </Card.Text>
                        </Card.Body>
                        {
                            // user && destination.owner === user._id 
                            // ?
                        // <>
                        // <span style={{textAlign: 'center'}}>
                        //         <Button onClick={() => setEditModalShow(true)} 
                        //             className="m-2" 
                        //             variant="warning"
                        //             size="sm"
                        //             >
                        //             Edit Destination
                        //         </Button>
                        //         <Button onClick={() => removeTheDestination()}
                        //             className="m-2"
                        //             variant="danger"
                        //             size="sm"
                        //             >
                        //             Delete
                        //         </Button>
                        // </span>
                        // </>
                            
                            // :
                            // null
                        }
                        <Card.Body>
                        <Card.Text>
                        <h3 style={cardContainerLayout}>Activities</h3>
                            <ul >
                                <li style={{listStyle: 'none'}}>
                                   Los Angeles County Museum of Art (LACMA)
                                </li>
                                <li style={{listStyle: 'none'}}>
                                    Santa Monica Pier
                                </li>
                                <li style={{listStyle: 'none'}}>
                                    Disneyland
                                </li>
                                <li style={{listStyle: 'none'}}>
                                    Griffith Observatory
                                </li>
                            </ul>
                        </Card.Text>
                        </Card.Body>
                </Card>
                <br />
            </>
            // <Container className="col-sm col-md mt-3">
            //     <Card
            //     name={destination.name}
            //     schedule={destination.schedule}
            //     >
            //         <Card.Header>{ destination.name }</Card.Header>
            //         <Card.Body>
            //             <Card.Text>
            //                 <div><small>Schedule: { destination.schedule }</small></div>
            //                 <div><small>Type: { destination.type }</small></div>
            //                 <div><small>
            //                     Adoptable: { destination.adoptable ? 'yes' : 'no'}
            //                 </small></div>
            //             </Card.Text>
            //         </Card.Body>
            //         <Card.Footer>
            //             {/* <Button onClick={() => setActivityModalShow(true)}
            //                 className="m-2" variant="info"
            //             >
            //                 Give {destination.name} a activity!
            //             </Button> */}
            //             {
            //                 user && destination.owner === user._id 
            //                 ?
            //                 <>
            //                     <Button onClick={() => setEditModalShow(true)} 
            //                         className="m-2" 
            //                         variant="warning"
            //                     >
            //                         Edit Destination
            //                     </Button>
            //                     <Button onClick={() => removeTheDestination()}
            //                         className="m-2"
            //                         variant="danger"
            //                     >
            //                         Delete
            //                     </Button>
            //                 </>
            //                 :
            //                 null
            //             }
            //         </Card.Footer>
            //     </Card>
            // </Container>
            // <Container>
            //     Activity
            //     <Button 
            //         className="m-2"
            //         variant="info"
            //     >
            //         View Suggested Activities
            //     </Button>
            //     <Button 
            //         className="m-2"
            //         variant="success"
            //     >
            //         Create an Activity
            //     </Button>
            //     <Button 
            //         className="m-2"
            //         variant="warning"
            //     >
            //         Edit your Activity
            //     </Button>
            //     <Button 
            //         className="m-2"
            //         variant="danger"
            //     >
            //         Delete your Activity
            //     </Button>
                
            // </Container>
            // {/* <Container style={cardContainerLayout}>
            //     {activityCards}
            // </Container>  */}
            // <EditDestinationModal 
            //     user={user}
            //     destination={destination} 
            //     show={editModalShow} 
            //     updateDestination={updateDestination}
            //     msgAlert={msgAlert}
            //     triggerRefresh={() => setUpdated(prev => !prev)}
            //     handleClose={() => setEditModalShow(false)} 
            // />
            // <NewActivityModal 
            //     destination={destination}
            //     user={user}
            //     msgAlert={msgAlert}
            //     triggerRefresh={() => setUpdated(prev => !prev)}
            //     />
        // </>
    )
}

export default ShowDestination
// show={activityModalShow}
// handleClose={() => setActivityModalShow(false)} 