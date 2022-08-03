import DestinationsIndex from "./destinations/DestinationIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { msgAlert } = props
	return (
		
		<>
			<h2>Destinations</h2>
			<DestinationsIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
