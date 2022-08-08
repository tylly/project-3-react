import React, { useState, useEffect } from "react";
import { DropdownButton, Modal } from "react-bootstrap";
import ActivityForm from "../shared/ActivityForm";
import { createActivity } from "../../api/activities";
import Dropdown from "react-bootstrap/Dropdown";

import { Form, Button, Container } from "react-bootstrap";
import RecommendedList from "./RecommendedList";
import axios from "axios";

const SearchActivityModal = (props) => {
  const { user, destination, show, handleClose, msgAlert, triggerRefresh } =
    props;
  const [value, setValue] = useState("important tourist attraction");
  const [activity, setActivity] = useState({});
  const [recommendedListShow, setRecommendedListShow] = useState(false);
  const [places, setPlaces] = useState({
    data: {results: []}
  })
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  console.log(value);

  useEffect(/* (sync) effect function */ () => {
    const func = async () => {
      let newPlaces = await axios.get(
        `https://api.tomtom.com/search/2/categorySearch/${value}.json?typeahead=true&lat=${destination.lat}&lon=${destination.lon}&view=Unified&relatedPois=off&key=9JyQb3r2IQDfXHOgwSTNBa8mkxAAuNAT`
      );
      console.log(newPlaces);
      setPlaces(newPlaces)
    };
    func();
  }, /* dependencies */ [value]);

  //let places;
 
  //places = func();
  console.log(places.data.results);

  let items = places.data.results.map((i) => (
    <li>{i.poi.name}</li>
  ))

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

  let item = <h2>hey</h2>;
  return (
    <Modal show={show} onHide={handleClose}>
      {<h3>Search {value}</h3>}
      <Modal.Header closeButton />
      <Modal.Body>
        <Form>
          {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle> */}
          <DropdownButton onSelect={handleSelect}>
            <Dropdown.Item eventKey="important tourist attraction">
              important tourist attraction
            </Dropdown.Item>
            <Dropdown.Item eventKey="museum">museum</Dropdown.Item>
            <Dropdown.Item eventKey="parks">parks</Dropdown.Item>
            <Dropdown.Item eventKey="natural tourist attraction">
              natural tourist attraction
            </Dropdown.Item>
            <Dropdown.Item eventKey="statues">statues</Dropdown.Item>
            <Dropdown.Item eventKey="sushi">sushi</Dropdown.Item>
            <Dropdown.Item eventKey="donut">timms suggestion</Dropdown.Item>
            <Dropdown.Item eventKey="mediterranean">
              mediterranean
            </Dropdown.Item>
            <Dropdown.Item eventKey="breweries">breweries</Dropdown.Item>
          </DropdownButton>
          {/* </Dropdown> */}
        </Form>
        {/* {user && destination.owner === user._id ? (
          <>
            <Button onClick={() => 
            {
                setRecommendedListShow(true)
                
            
            }}
            
            >Submit</Button>
          </>
        ) : null} */}
        <ul>
          {items}
          {/* <RecommendedList  style={{display:"none"}} items={items} /> */}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default SearchActivityModal;
