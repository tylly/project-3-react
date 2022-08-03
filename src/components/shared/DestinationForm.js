import { Form, Button, Container } from 'react-bootstrap'

const DestinationForm = (props) => {
    const { destination, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="What is your destination's name?"
                    name="name"
                    id="name"
                    value={ destination.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="schedule">Schedule</Form.Label>
                <Form.Control
                    placeholder="What time of the day?"
                    name="schedule"
                    id="schedule"
                    value={ destination.schedule }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default DestinationForm