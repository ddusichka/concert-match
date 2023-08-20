const Concert = require("../models/concertModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

async function getConcerts() {
  // markets: 11 (Boston), 18 (Philly), 35 (NY/tri-state)

  const apiKey = "DHEPUzMK1n5Wwwcc7U2MvfzKAFRD8OFN";
  const countryCode = "US";
  const marketId = 11;
  const classificationName = "music";
  const size = 100;

  // Create an object to hold the query parameters
  const params = new URLSearchParams({
    countryCode: countryCode,
    apikey: apiKey,
    marketId: marketId,
    classificationName: classificationName,
    size: size,
  });

  // Construct the URL with the base API endpoint and the query parameters
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`;

  // Make the API call using the constructed URL with params
  const response = await fetch(url, {
    method: "GET",
  });
  const concertsData = await response.json();

  if (response.ok) {
    // Access the 'events' array inside '_embedded'
    const eventsArray = concertsData._embedded.events;
    const customSort = (a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) ||
      a.name.length - b.name.length;

    const sortedEvents = eventsArray.slice().sort(customSort);

    const unique = sortedEvents.filter(
      (event, index) =>
        index ===
        sortedEvents.findIndex(
          (e) =>
            e._embedded.attractions[0].id === event._embedded.attractions[0].id
        )
    );

    const updates = await Concert.bulkWrite(
      unique.map((e) => ({
        updateOne: {
          filter: { event_id: e.id },
          update: {
            name: e.name,
            event_id: e.id,
            imageURL: e.images[0].url,
            localDate: e.dates.start.localDate,
            genre: e.classifications[0].genre.name,
            subgenre: e.classifications[0].subGenre.name,
            venue: e._embedded.venues[0].name,
            city: e._embedded.venues[0].city.name,
            state: e._embedded.venues[0].state.stateCode,
          },
          upsert: true,
        },
      }))
    );
    const all = await Concert.find({});
    return all;
  }
}

module.exports = {
  getConcerts,
};
