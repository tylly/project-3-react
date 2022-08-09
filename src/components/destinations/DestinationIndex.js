import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getAllDestinations,
  getOneDestination,
  updateDestination,
  removeDestination,
} from "../../api/destinations";
import messages from "../shared/AutoDismissAlert/messages";
import "../../style.css";
import EditDestinationModal from "./EditDestinationModal";

// style for our card container
const cardContainerStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  marginTop: "-3.5%",
};

const DestinationsIndex = (props) => {
  const [destinations, setDestinations] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { triggerRefresh } = props;

  //const { id } = useParams()
  const navigate = useNavigate();
  // const { msgAlert } = props

  console.log("Props in DestinationsIndex", props);

  useEffect(() => {
    console.log(props);
    getAllDestinations()
      .then((res) => setDestinations(res.data.destinations))
      .catch((err) => {
        msgAlert({
          heading: "Error Getting destinations",
          message: messages.getDestinationsFailure,
          variant: "danger",
        });
        setError(true);
      });
  }, []);

  const { user, msgAlert } = props;
  console.log("user in props", user);

  // If snowboards haven't been loaded yet, show a loading message
  if (!destinations) {
    return <LoadingScreen />;
  } else if (destinations.length === 0) {
    {
      navigate("/addDestination");
    }
    // return <p>No destinations yet. Better add some.</p>;
  }

  if (!user) {
    navigate("/sign-up");
  }

  const destinationCards = destinations.map((destination) => (
    <Card
      className="cards"
      style={{
        width: "18rem",
        margin: "15px",
        borderRadius: "8px",
        marginTop: "8%",
      }}
      key={destination.id}
    >
      <Card.Img
        style={{
          borderRadius: "8px 8px 0 0",
          width: "17.90rem",
          height: "10rem",
          objectFit: "cover",
        }}
        variant="top"
        src={destination.images}
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{destination.name}</Card.Title>
        <Card.Text>{destination.schedule}</Card.Text>
        <Link to={`/destinations/${destination._id}`}>
          <button type="button" class="btn btn-outline-dark" size="sm">
            View
          </button>
        </Link>
      </Card.Body>
    </Card>
  ));

  return <div style={cardContainerStyle}>{destinationCards}</div>;
};

export default DestinationsIndex;
