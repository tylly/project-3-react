import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup, Container} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
        <Container style={{position: 'absolute', zIndex: '2'}} >
            <div className='row'>
                <div className='col-sm col-md mx-auto mt-5'style={{color: 'white', justifyContent: 'center',}}>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small>
                    <br/>
                    <br/>
                    <ButtonGroup>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            </Container>
		</>
	)
}

export default SignOut
