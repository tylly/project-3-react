import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DestinationForm from '../shared/DestinationForm';


export default function EditDestinationModal(props) {
    const { user, show, handleClose, updateDestination, msgAlert, triggerRefresh } = props

    const [destination, setDestination] = useState(props.destination)

   
    const handleChange = (e) => {
        setDestination((prevDestination) => {
          let updatedValue = e.target.value;
          updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
          const updatedName = e.target.name;
          console.log(e.target.type);

          const updatedDestination = {
            [updatedName]: updatedValue,
          };
          return {
            ...prevDestination,
            ...updatedDestination,
          };
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        updateDestination(user, destination)
        .then(() => handleClose())
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: "success",
              variant: "success",
            })
          )
          .then(() => triggerRefresh())
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: "failure",
              variant: "danger",
            })
          );
      };

// const forms = destinations.map((destination) => (
//   <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton />
//   <Modal.Body>
//       <DestinationForm 
//       yp={console.log(destination)}
//       destination={destination}
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       heading="Update Destination"
//       />
//   </Modal.Body>
// </Modal>

// ))
//console.log(forms)
  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton />
        <Modal.Body> */}
            <DestinationForm 
            destination={destination}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Update Destination"
            />
        {/* </Modal.Body> */}
    </Modal>

    
    </>
    // <>
    // {forms}
    // </>
  )
}

