import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllDestinations, getOneDestination, updateDestination, removeDestination}  from '../../api/destinations'
import EditDestinationModal from "./EditDestinationModal";
import messages from '../shared/AutoDismissAlert/messages'
import { Button } from 'react-bootstrap'
import '../../style.css'

// SnowboardsIndex should make a request to the api
// To get all snowboards
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const DestinationsIndex = (props) => {
    const [destinations, setDestinations] = useState(null)
    const [destination, setDestination] = useState(null);
    const [error, setError] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false);
    const [updated, setUpdated] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate()
    // const { msgAlert } = props

    console.log('Props in DestinationsIndex', props)

    useEffect(() => {
        console.log(props)
        getAllDestinations()
            .then(res => setDestinations(res.data.destinations))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting destinations',
                    message: messages.getDestinationsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    
    const { user, msgAlert } = props;
    console.log("user in props", user);
    // destructuring to get the id value from our route parameters
    
    useEffect(() => {
        getOneDestination(id)
        .then((res) => {
            setDestination(res.data.destination)
        })
        .catch((err) => {
            msgAlert({
                heading: "Error getting destination",
                message: messages.getDestinationsFailure,
                variant: "danger",
            });
            navigate("/");
            //navigate back to the home page if there's an error fetching
        });
    }, [updated]);
    
    if (error) {
        return <p>Error!</p>
    }

    // If snowboards haven't been loaded yet, show a loading message
    if (!destinations) {
        return <LoadingScreen />
    } else if (destinations.length === 0) {
        return <p>No destinations yet. Better add some.</p>
    }

const removeTheDestination = () => {
    removeDestination(user, destination._id)
    // on success send a success message
    .then(() => {
        msgAlert({
        heading: "Success",
        message: messages.removeDestinationSuccess,
        variant: "success",
        });
    })
    // then navigate to index
    .then(() => {
        navigate("/");
    })
    // on failure send a failure message
    .catch((err) => {
        msgAlert({
        heading: "Error removing destination",
        message: messages.removeDestinationFailure,
        variant: "danger",
        });
    });
};

const destinationCards = destinations.map(destination => (
    <Card className="cards" style={{ width: '18rem', margin: '15px', borderRadius: '8px'}} key={ destination.id }>
        <Card.Img style={{borderRadius: '8px 8px 0 0'}}variant="top" src="https://images.unsplash.com/photo-1549041050-386c1c99d655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlcyUyMHNreWxpbmV8ZW58MHx8MHx8&w=1000&q=80" />
        <Card.Body style={{textAlign: 'center'}}>
        <Card.Title>{destination.name}</Card.Title>
            <Card.Text>
                {destination.schedule}
            </Card.Text>
                <Link to={`/destinations/${destination._id}`}><button type="button" class="btn btn-outline-dark" size="sm">View { destination.name }</button></Link>
            </Card.Body>
            <Card.Footer>
                <Button>Edit</Button>
            {user && destination.owner === user._id ? (
                <>
                    <Button
                    onClick={() => setEditModalShow(true)}
                    className="m-2"
                    variant="warning"
                    size='sm'
                    
                    >
                    Edit Destination
                    </Button>
                    <Button
                    onClick={() => removeTheDestination()}
                    className="m-2"
                    variant="danger"
                    
                    >
                    Delete
                    </Button>
                </>
            ) : null}
            </Card.Footer>
    </Card>
))

    return (
        <div style={ cardContainerStyle }>
            { destinationCards }
            <EditDestinationModal
                user={user}
                destination={destination}
                show={editModalShow}
                updateDestination={updateDestination}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated((prev) => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </div>
    )
}

export default DestinationsIndex