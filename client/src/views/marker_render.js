const PubSub = require('../helpers/pub_sub.js')

const MarkerRender = function(){

}


MarkerRender.prototype.addMarkers = function () {
  PubSub.subscribe('Parks:parks-ready', (event) => {
    event.detail.forEach(function(location, index) {
      map.addMarker(location)
    })
  })
};


module.exports = MarkerRender;











module.exports = MarkerRender;
