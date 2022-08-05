import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import "../../style.css";

import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getOneDestination,
  updateDestination,
  removeDestination,
} from "../../api/destinations";
import messages from "../shared/AutoDismissAlert/messages";
import EditDestinationModal from "./EditDestinationModal";
import NewActivityModal from "../activities/NewActivityModal";
import SearchActivityModal from "../activities/SearchActivityModal";
import ShowActivity from "../activities/ShowActivity";
import axios from "axios";
const Amadeus = require("amadeus");

let bussin;
let amadeus = new Amadeus({
  clientId: "GwYuf8jB0JRp1bTKSbXy5GHgdQ8ly8JT",
  clientSecret: "eFzStO9lvuEChUZJ",
});

const bussinFrFr = async () => {
  let places = await axios.get(
    `https://api.tomtom.com/search/2/categorySearch/important%20tourist%20attraction.json?typeahead=true&lat=${bussin.lat}&lon=${bussin.lon}&view=Unified&relatedPois=off&key=9JyQb3r2IQDfXHOgwSTNBa8mkxAAuNAT`
  );

  console.log(places);
};

// We need to get the destination's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
  display: "flex",
  justifyContent: "center",
};

const ShowDestination = (props) => {
  const [destination, setDestination] = useState(null);
  const [activityModalShow, setActivityModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [searchActivityModalShow, setSearchActivityModalShow] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  // useNavigate returns a function
  // we can call that function to redirect the user wherever we want to

  const { user, msgAlert } = props;
  console.log("user in props", user);
  console.log("the destination in showDestination", destination);
  // destructuring to get the id value from our route parameters

  useEffect(() => {
    getOneDestination(id)
      .then((res) => {
        setDestination(res.data.destination);
        bussin = res.data.destination;
      })
      .catch((err) => {
        msgAlert({
          heading: "Error getting destination",
          message: messages.getDestinationsFailure,
          variant: "danger",
        });
        navigate("/");
        //navigate back to the home page if there's an error fetching
      });
  }, [updated]);

  // here we'll declare a function that runs which will remove the destination
  // this function's promise chain should send a message, and then go somewhere

  const removeTheDestination = () => {
    removeDestination(user, destination._id)
      // on success send a success message
      .then(() => {
        msgAlert({
          heading: "Success",
          message: messages.removeDestinationSuccess,
          variant: "success",
        });
      })
      // then navigate to index
      .then(() => {
        navigate("/");
      })
      // on failure send a failure message
      .catch((err) => {
        msgAlert({
          heading: "Error removing destination",
          message: messages.removeDestinationFailure,
          variant: "danger",
        });
      });
  };
  //   let activityCards;
  //   if (destination) {
  //     if (destination.activities.length > 0) {
  //       activityCards = destination.activities.map((activity) => (
  //         <ShowActivity
  //           key={activity._id}
  //           activity={activity}
  //           destination={destination}
  //           user={user}
  //           msgAlert={msgAlert}
  //           triggerRefresh={() => setUpdated((prev) => !prev)}
  //         />
  //       ));
  //     }
  //   }

  if (!destination) {
    return <LoadingScreen />;
  }

  // const activityList = activity.map(activity => (
  // <Link to={`/activities/${activity._id}`}> { activity.name }</Link>))
  const actList = destination.activities.map((i) => (
    <li>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/${destination._id}/${i._id}`}
      >
        {i.name}
      </Link>
    </li>
  ));
  console.log(actList);

  return (
    <>
      <Container className="fluid">
        <Card
          style={{ width: "30rem", zIndex: "2" }}
          className="mx-auto mt-4"
          id="card"
        >
          <Card.Img
            id="card-img"
            variant="top"
            src="https://images.unsplash.com/photo-1549041050-386c1c99d655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlcyUyMHNreWxpbmV8ZW58MHx8MHx8&w=1000&q=80"
          />
          <Card.Body>
            <Card.Text>
              <h2 style={cardContainerLayout}>{destination.name}</h2>
              <h4 style={cardContainerLayout}>{destination.schedule}</h4>
            </Card.Text>
          </Card.Body>
          <hr />
          <Card.Body>
            <Card.Text>
              <h3 style={cardContainerLayout}>Activities</h3>
              <h6 style={cardContainerLayout}>(Click below to view)</h6>
              {/* <h3>{destination.activities[0].name}</h3> */}
              <br />
              <ul style={{ listStyle: "none", marginLeft: "25%" }}>
                {actList}
              </ul>
              {/* <div key={ activity._id }> 
                        { activityList }
                    </div> */}
            </Card.Text>
            <span>
              <Button
                onClick={() => setActivityModalShow(true)}
                className="m-2"
                variant="info"
              >
                Plan An Activity
              </Button>

              <Button
                onClick={() => setSearchActivityModalShow(true)}
                className="m-2"
                variant="info"
              >
                View Suggested Activities
              </Button>
            </span>
            {user && destination.owner === user._id ? (
              <>
                <Button
                  onClick={() => setEditModalShow(true)}
                  className="m-2"
                  variant="warning"
                  size="sm"
                >
                  Edit Destination
                </Button>
                <Button
                  onClick={() => removeTheDestination()}
                  className="m-2"
                  variant="danger"
                >
                  Delete
                </Button>
              </>
            ) : null}
          </Card.Body>
        </Card>
      </Container>

      {/* <Container style={cardContainerLayout}>
                {activityCards}
            </Container>  */}
      <EditDestinationModal
        user={user}
        destination={destination}
        show={editModalShow}
        updateDestination={updateDestination}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setEditModalShow(false)}
      />
      <NewActivityModal
        user={user}
        destination={destination}
        show={activityModalShow}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setActivityModalShow(false)}
      />
      <SearchActivityModal
        user={user}
        destination={destination}
        show={searchActivityModalShow}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setSearchActivityModalShow(false)}
      />
    </>
  );
};

export default ShowDestination;
// show={activityModalShow}
// handleClose={() => setActivityModalShow(false)}
