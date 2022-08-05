import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ActivityForm from "../shared/ActivityForm";
import { createActivity } from "../../api/activities";
import Dropdown from "react-bootstrap/Dropdown";
import { Form,Button,Container 
} from 'react-bootstrap'
import RecommendedList from './RecommendedList'
import axios from "axios";
let bussin = {
    lat: 69,
    lon: 69
}



const SearchActivityModal = (props) => {
  const { user, destination, show, handleClose, msgAlert, triggerRefresh } =
    props;

  const [activity, setActivity] = useState({});
  const [recommendedListShow, setRecommendedListShow] = useState(false)

  const bussinFrFr = async () => {
    console.log(Dropdown.Toggle)
    let places = await axios.get(
      `https://api.tomtom.com/search/2/categorySearch/important%20tourist%20attraction.json?typeahead=true&lat=${destination.lat}&lon=${destination.lon}&view=Unified&relatedPois=off&key=9JyQb3r2IQDfXHOgwSTNBa8mkxAAuNAT`
    );
  
    console.log(places);
  };

  // console.log('destination in edit modal', destination)

  const handleChange = (e) => {
    setActivity((prevActivity) => {
      let value = e.target.value;
      const name = e.target.name;
      console.log(value);
      // console.log('this is the input type', e.target.type)

      const updatedActivity = {
        [name]: value,
      };
      return {
        ...prevActivity,
        ...updatedActivity,
      };
    });
  };

  const handleSubmit = (e) => {
    // e equals the event
    e.preventDefault();
    console.log(destination);
    createActivity(user, destination._id, activity)
      // if we're successful in the modal, we want the modal to close
      .then(() => handleClose())
      // send a success message to the user
      .then(() => {
        msgAlert({
          heading: "Oh Yeah!",
          message: "Great! This will be fun!",
          variant: "success",
        });
      })
      .then(() => triggerRefresh())
      // if there is an error, tell the user about it
      .catch(() =>
        msgAlert({
          heading: "Oh No!",
          message: "Something went wrong, please try again",
          variant: "danger",
        })
      );
  };

  return (
    <Modal  show={show} onHide={handleClose}>
        {<h3>Pick a Category</h3>}
      <Modal.Header  closeButton /> 
      <Modal.Body>
          <Form>
              
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">important tourist attraction</Dropdown.Item>
            <Dropdown.Item href="#/action-2">museum</Dropdown.Item>
            <Dropdown.Item href="#/action-3">parks</Dropdown.Item>
            <Dropdown.Item href="#/action-3">natural tourist attraction</Dropdown.Item>
            <Dropdown.Item href="#/action-3">statues</Dropdown.Item>
            <Dropdown.Item href="#/action-3">skateparks</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Amanda's rec: sushi</Dropdown.Item>
            <Dropdown.Item href="#/action-3">James' rec: mediterranean</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Dan's rec: breweries</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Form>
        {user && destination.owner === user._id ? (
              <>
              <Button onClick={() => bussinFrFr()}>Submit</Button>

              </>
            ) : null}
      </Modal.Body>
      
      <RecommendedList
  
      />
    </Modal>
  );
};

export default SearchActivityModal;
