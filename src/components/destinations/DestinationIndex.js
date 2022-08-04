import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllDestinations } from '../../api/destinations'
import messages from '../shared/AutoDismissAlert/messages'
import { Button } from 'bootstrap'
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
    const [error, setError] = useState(false)

    const { msgAlert } = props

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

    if (error) {
        return <p>Error!</p>
    }

    // If snowboards haven't been loaded yet, show a loading message
    if (!destinations) {
        return <LoadingScreen />
    } else if (destinations.length === 0) {
        return <p>No destinations yet. Better add some.</p>
    }

    const destinationCards = destinations.map(destination => (
        <Card className="cards" style={{ width: '30%', margin: 5}} key={ destination.id }>
            <Card.Header>{ destination.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/destinations/${destination._id}`}>View { destination.name }</Link>
                </Card.Text>
                
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { destinationCards }
        </div>
    )
}

export default DestinationsIndex