import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";

function ConcertCards() {
  const [concerts, setConcerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(concerts.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(concerts.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < concerts.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < concerts.length) {
      await childRefs[currentIndex]?.current?.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const getConcerts = async () => {
    const concertsResponse = await axios.get(
      "http://localhost:4000/api/concerts"
    );
    setConcerts(concertsResponse.data);
    setCurrentIndex(concertsResponse.data.length - 1);
  };

  useEffect(() => {
    getConcerts();
  }, []);

  return (
    <div>
      <div className="cardContainer">
        {concerts &&
          concerts.map((concert, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={concert._id}
              onSwipe={(dir) => swiped(dir, concert.name, index)}
              onCardLeftScreen={() => outOfFrame(concert.name, index)}
            >
              <div
                style={{ backgroundImage: "url(" + concert.imageURL + ")" }}
                className="card"
              >
                <h3>{concert.name}</h3>
              </div>
            </TinderCard>
          ))}
      </div>
      <div className="buttons">
        <button
          style={{ backgroundColor: canSwipe && "#ff6961" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: canSwipe && "#77dd77" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default ConcertCards;
