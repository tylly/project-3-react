import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE Activity
export const createActivity = (user, destinationId, newActivity) => {
    console.log('the user in createActivity', user)
    console.log('the newActivity in createActivity', newActivity)
	return axios({
		url: `${apiUrl}/activities/${destinationId}`,
		method: 'POST',
		data: { activity: newActivity }
	})
}

// UPDATE Activity
export const updateActivity = (user, destinationId, updatedActivity) => {
    console.log('this is updatedActivity', updatedActivity)
	return axios({
		url: `${apiUrl}/activities/${destinationId}/${updatedActivity._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { activity: updatedActivity }
	})
}

// DELETE Activity
export const deleteActivity = (user, destinationId, activityId) => {
	return axios({
		url: `${apiUrl}/activities/${destinationId}/${activityId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
} 