const renderView = require('./itinerary_location_view.js')

const RenderView = function(container){
  this.container = container
}

RenderView.prototype.bindEvents = function () {
  PubSub.subscribe('Itinerary:locations-ready', (evt) => {
    this.render(evt.detail)
  })
};

RenderView.prototype.render = function (locations) {
  this.clearContent(this.container)
    const itineraryLocation = new ItineraryLocationView(this.container)
    locations.forEach((location) => itineraryLocation.render(location))
};

RenderView.prototype.clearContent = function (node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};


module.exports = RenderView;
