import DestinationsIndex from "./destinations/DestinationIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { user, msgAlert, destination } = props
	return (
		
		<>
			<h2>Destinations</h2>
			<DestinationsIndex msgAlert={ msgAlert } user={user} destination={destination}/>
		</>
	)
}

export default Home
