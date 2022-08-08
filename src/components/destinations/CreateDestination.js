import { useState } from 'react'
import { createDestination } from '../../api/destinations'
import { useNavigate } from 'react-router-dom'
import { createDestinationSuccess, createDestinationFailure } from '../shared/AutoDismissAlert/messages'
import DestinationForm from '../shared/DestinationForm'
import axios from 'axios'
import '../../style.css'

// import { createApi } from 'unsplash-js';
// import * as nodeFetch from 'node-fetch'

// declare global {
//   var fetch: typeof nodeFetch.default;
//   type RequestInit = nodeFetch.RequestInit;
//   type Response = nodeFetch.Response;
// }
// global.fetch = nodeFetch.default;

// const unsplash = createApi({
//   accessKey: 'QJzcjsf5p0Yo-yCWtDRNhN9Picgt8P0Bc4W9N_O9o0k',
//   fetch: nodeFetch.default,
// });

const formStyle = {
    zIndex: "2"
}
const CreateDestination = (props) => {
    //console.log('these are the props in createDestination\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [destination, setDestination] = useState({
        name: '',
        schedule: '',
    })

    //console.log('this is destination in createDestination', destination)

    const handleChange = (e) => {
        setDestination(prevDestination => {
            let updatedValue = e.target.value
            updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
            const updatedName = e.target.name

            //console.log('this is the input type', e.target.type)

            const updatedDestination = {
                [updatedName]: updatedValue
            }
            return {
                ...prevDestination,
                ...updatedDestination
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response

    const handleSubmit = async (e) => {
        e.preventDefault();
        let testing = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${destination.name}&apikey=5ae2e3f221c38a28845f05b6ee69c6dabf1a1c065bbb25f00387dbd9`)
        console.log('testing', testing)
        destination.lat = testing.data.lat
        destination.lon = testing.data.lon
        destination.population = testing.data.population
        console.log(destination)
        // let LALat = '34.05223'
        // let LALon = '-118.24368'
        let imageSearchId = await axios.get(`https://api.unsplash.com/search/photos?query=${destination.name}&client_id=QJzcjsf5p0Yo-yCWtDRNhN9Picgt8P0Bc4W9N_O9o0k
        `);
        console.log('this is the image response', imageSearchId)
        destination.images = imageSearchId.data.results[0].urls.full
        // console.log('this is the imageId', destination.imageId )
        // let imageSearch = await axios.get(`https://api.unsplash.com/photos/${destination.imageId}?client_id=QJzcjsf5p0Yo-yCWtDRNhN9Picgt8P0Bc4W9N_O9o0k
        // `);
        // console.log('this is the image', imageSearch)
        // destination.images = imageSearch.data.urls.full
        // destination.images = imageSearch
        // let radiusTester = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=32186.9&lon=${destination.lon}&lat=${destination.lat}&apikey=5ae2e3f221c38a28845f05b6ee69c6dabf1a1c065bbb25f00387dbd9`)

        // destination.xid = radiusTester.data.features[3].properties.xid
        // console.log('this is the xid', destination.xid)
        // console.log('radiusTester', radiusTester)
        // let imageTester = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${destination.xid}?apikey=5ae2e3f221c38a28845f05b6ee69c6dabf1a1c065bbb25f00387dbd9`)
        // console.log('this is the image', imageTester)
        createDestination(user, destination)
        .then(res => {
            navigate(`/destinations/${res.data.destination._id}`)})
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: createDestinationSuccess,
              variant: "success",
            })
          )
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: createDestinationFailure,
              variant: "danger",
            })
          );
      };

    return (
      <>
      <DestinationForm 
      destination={ destination } 
      handleChange={ handleChange }
      handleSubmit={ handleSubmit }
      heading="Where to?"
      />
      </>
    )
}

export default CreateDestination