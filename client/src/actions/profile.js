import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types'

// Get current user profile (stubbed since auth.user contains the tickets and profile info directly)
export const getCurrentProfile = () => async dispatch => {
    try {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'Server Error' }
        })
    }
}

// Remove a booked bus/ticket
export const removeBus = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/users/buses/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Bus Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response?.statusText || 'Error', status: err.response?.status }
        })
    }
}

// Search for buses
export const searchBuses = ({ start, end }) => {
    try {
        const res = axios.get(`/api/search/${start}/${end}`).then((hii) => {
            return (hii.data)
        })
        return res
    } catch (err) {
        console.log('error here')
    }
}

// Add a booked ticket/bus
export const addTicket = (FormData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/users/buses', FormData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Bus Added', 'success'))
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response?.statusText || 'Error', status: err.response?.status }
        })
    }
}

// Delete user account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure to delete your Account?')) {
        try {
            await axios.delete('/api/users')
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert('Your account has been permanently Deleted'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response?.statusText || 'Error', status: err.response?.status }
            })
        }
    }
}