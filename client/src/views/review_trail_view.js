const reviewLocationView = require('./review_location_view.js')

const ReviewTrailView = function(container){
  this.container = container;
}

ReviewTrailView.prototype.bindEvents = function(){
  PubSub.subscribe('Review:locations-ready', (evt) => {
    this.render(evt.detail)
  });
}

ReviewTrailView.prototype.render = function(parks){
this.clearContent(this.container)
const reviewLocationView = new ReviewLocationView(this.container)
     parks.forEach((park) => reviewLocationView.render(park))
}
ReviewTrailView.prototype.clearContent = function(node){
   while (node.hasChildNodes()){
     node.removeChild(node.lastChild);
   }
};

module.exports = ReviewTrailView;
