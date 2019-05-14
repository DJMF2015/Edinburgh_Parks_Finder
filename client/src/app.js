const MapWrapper = require('./models/mapwrapper.js');
const Parks = require('./models/parks.js');
const Review = require('./models/review.js');
const MarkerRender = require('./views/marker_render.js');
const ReviewDetailView = require('./views/review_detail_view.js');
const RenderView = require('./views/review_render_location.js');
const ReviewView = require('./views/review_view.js');

document.addEventListener('DOMContentLoaded', () => {
  map = new MapWrapper('map', 55.951998, -3.189970, 13);
  const parks = new Parks() //locations
  parks.getData();

  const review = new Review()
  review.getData()
  review.bindEvents()

  const markerRender = new MarkerRender()
  markerRender.addMarkers()

  const locationContainer = document.getElementById('location-info')
  const reviewDetailView = new ReviewDetailView(locationContainer)
  reviewDetailView.bindEvents()

  const itineraryContainer = document.getElementById('itinerary-container')
  const renderView = new RenderView(itineraryContainer)
  renderView.bindEvents()

  const form = document.getElementById('review-form')
  const reviewView = new ReviewView(form)
  reviewView.bindEvents()
})
