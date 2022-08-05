import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllActivities = () => {
    return axios(`${apiUrl}/activities`)
}

// READ => SHOW
export const getOneActivity = (user, destinationId, activityId) => {
	console.log('the user in showActivity', user)
	console.log('the activity in showActivity', activityId)
    return axios({
		url: `${apiUrl}/activities/${destinationId}/${activityId}`,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// CREATE Activity
export const createActivity = (user, destinationId, newActivity) => {
    console.log('the user in createActivity', user)
    console.log('the newActivity in createActivity', newActivity)
	return axios({
		url: `${apiUrl}/activities/${destinationId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
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
export const removeActivity = (user, destinationId, activityId) => {
	return axios({
		url: `${apiUrl}/activities/${destinationId}/${activityId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
} 