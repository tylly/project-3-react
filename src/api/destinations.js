import apiUrl from '../apiConfig'
import axios from 'axios'


// READ => INDEX
export const getAllDestinations = () => {
    return axios(`${apiUrl}/destinations`)
}

// READ => SHOW
export const getOneDestination = (id) => {
    return axios(`${apiUrl}/destinations/${id}`)
}

// CREATE
export const createDestination = (user, newDestination) => {
    console.log('hit')
	return axios({
		url: apiUrl + '/destinations/:id',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { destination: newDestination }
	})
}

// UPDATE
export const updateDestination = (user, updatedDestination) => {
    console.log('this is updatedDestination', updatedDestination)
	return axios({
		url: `${apiUrl}/destinations/${updatedDestination.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { destination: updatedDestination }
	})
}

// DELETE
export const removeDestination = (user, destinationId) => {
    return axios({
        url: `${apiUrl}/destinations/${destinationId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}