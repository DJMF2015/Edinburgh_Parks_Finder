const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Review = function() {
  this.url = '/api/reviews'
  this.locations = []
}

Review.prototype.bindEvents = function () {
  PubSub.subscribe('Location:add-btn-clicked', (evt) => {
    this.postLocation(evt.detail)
  })
  PubSub.subscribe('Itinerary:delete-btn-clicked', (evt) => {
    this.removeLocation(evt.detail)
  })
  PubSub.subscribe('Itinerary:visited-btn-clicked', (evt) => {
    this.markVisited(evt.detail.id, evt.detail.payload)
  })
  PubSub.subscribe('Review:review-submitted', (evt) => {
    this.addReview(evt.detail.id, evt.detail.payload)
  })
};

Review.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
  .then((data) => {
    this.handleData(data)
  })
  .catch(console.error)
};

Review.prototype.handleData = function (data) {
  this.locations = data
  PubSub.publish('Itinerary:locations-ready', data)
};

Review.prototype.postLocation = function (location) {
  const request = new Request(this.url);
  request.post(location)
  .then((locations) => {
    PubSub.publish('Itinerary:locations-ready', locations);
  })
  .catch(console.error);
};

Review.prototype.removeLocation = function (location) {
  const request = new Request(this.url);
  request.delete(location)
  .then((locations) => {
    PubSub.publish('Itinerary:locations-ready', locations)
  })
  .catch(console.error)
};

Review.prototype.markVisited = function (location, update) {
  const request = new Request(this.url);
  request.patch(location, update)
  .then((locations) => {
    PubSub.publish('Itinerary:locations-ready', locations)
  })
  .catch(console.error)
};

Review.prototype.addReview = function (location, update) {
  const request = new Request(this.url);
  request.patch(location, update)
  .then((locations) => {
    PubSub.publish('Itinerary:locations-ready', locations)
  })
  .catch(console.error)
};

module.exports = Review
