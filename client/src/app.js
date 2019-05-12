const MapWrapper = require('./models/mapwrapper.js');
const Parks = require('./models/parks.js');
const Review = require('./models/review.js');

const MarkerRender = require('./views/marker_render.js');
const ReviewView = require('./views/review_trail_view.js');
const LocationDetail = require('./views/location_view_detail.js');
const ReviewFormView = require('./views/review_form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  map = new MapWrapper('map', 55.951998, -3.189970, 13);
  const parks = new Parks() //locations
  parks.getData();

  const review = new Review()
  review.getData()
  review.bindEvents()

  const markerRender = new MarkerRender()
  markerRender.addMarkers()

  const parkContainer = document.getElementById('location-info')
  const parkDetail= new LocationDetail(parkContainer)
  parkDetail.bindEvents();

  const reviewContainer = document.getElementById('itinerary-container')
  const reviewView = new ReviewView(reviewContainer)
  reviewView.bindEvents()

  const form = document.getElementById('review-form')
  const reviewForm = new ReviewFormView(form)
  reviewForm.bindEvents();

})
