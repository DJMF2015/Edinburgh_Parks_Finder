const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Review = function(){
  this.url = 'api/reviews'
  this.reviews = []
}

Review.prototype.bindEvents = function(){
  PubSub.subscribe('Parks:add-btn-clicked', (evt)=>{
    this.postParkLocation(evt.detail)
  })
  PubSub.subscribe('Review:delete-btn-clicked', (evt) => {
    this.removeParkLocation(evt.detail)
  })
  PubSub.subscribe('Review:visited-btn-clicked', (evt) => {
    this.markVisited(evt.detail.id, evt.detail.payload)
  })
  PubSub.subscribe('Review-submit:review-submitted', (evt) => {
    this.addRatingReview(evt.detail.id, evt.detail.payload)
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
  PubSub.publish('Review:locations-ready', data)
};

Review.prototype.postParkLocation = function (location) {
  const request = new Request(this.url);
  request.post(location)
  .then((locations) => {
    PubSub.publish('Review:locations-ready', locations);
  })
  .catch(console.error);
};

Review.prototype.removeParkLocation = function (location) {
  const request = new Request(this.url);
  request.delete(location)
  .then((locations) => {
    PubSub.publish('Review:locations-ready', locations)
  })
  .catch(console.error)
};

Review.prototype.markVisited = function (location, update) {
  const request = new Request(this.url);
  request.patch(location, update)
  .then((locations) => {
    PubSub.publish('Review:locations-ready', locations)
  })
  .catch(console.error)
};

Review.prototype.addRatingReview = function (location, update) {
  const request = new Request(this.url);
  request.patch(location, update)
  .then((locations) => {
    PubSub.publish('Review:locations-ready', locations)
  })
  .catch(console.error)
};


module.exports = Review;
