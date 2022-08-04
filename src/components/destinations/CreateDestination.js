import { useState } from 'react'
import { createDestination } from '../../api/destinations'
import { useNavigate } from 'react-router-dom'
import { createDestinationSuccess, createDestinationFailure } from '../shared/AutoDismissAlert/messages'
import DestinationForm from '../shared/DestinationForm'

const CreateDestination = (props) => {
    console.log('these are the props in createDestination\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [destination, setDestination] = useState({
        name: '',
        schedule: '',
    })

    console.log('this is destination in createDestination', destination)

    const handleChange = (e) => {
        setDestination(prevDestination => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
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
        <DestinationForm 
            destination={ destination } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new destination!"
        />
    )
}

export default CreateDestination