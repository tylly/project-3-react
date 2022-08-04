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
    
        
    //     <Card className="cards" style={{ width: '18rem' }} key={destination.id}>
    //     <Card.Img variant="top" src="holder.js/100px180" />
    //     <Card.Body>
    //       <Card.Title>{destination.name}</Card.Title>
    //       <Card.Text>
    //         {destination.schedule}
    //       </Card.Text>
    //       <Link to={`/destinations/${destination._id}`}><Button variant="primary">View {destination.name}</Button></Link>
          
    //     </Card.Body>
    //   </Card>

        <Card className="cards" style={{ width: '18rem'}} key={ destination.id }>
             <Card.Img variant="top" src="https://images.unsplash.com/photo-1549041050-386c1c99d655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlcyUyMHNreWxpbmV8ZW58MHx8MHx8&w=1000&q=80" />
            <Card.Body style={{textAlign: 'center'}}>
            <Card.Title>{destination.name}</Card.Title>
                <Card.Text>
                    {destination.schedule}
                </Card.Text>
                    <Link to={`/destinations/${destination._id}`}><button type="button" class="btn btn-outline-dark" size="sm">View { destination.name }</button></Link>
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