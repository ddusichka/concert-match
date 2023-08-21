import { useEffect, useState } from "react";
// import ChatContainer from "../components/ChatContainer";
import ConcertCards from "../components/ConcertCards";
import { useCookies } from "react-cookie";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${userId}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMatches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/${userId}/interests`
      );
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getMatches();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:4000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>
      {user && (
        <div className="dashboard">
          {/* <ChatContainer user={user} /> */}
          <div className="swipe-container">
            <div className="card-container">
              <ConcertCards userId={userId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
