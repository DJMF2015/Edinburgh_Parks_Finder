const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Parks = function(){

}

Parks.prototype.getData = function () {
  const request = new Request('/api/parks');
  request.get()
  .then((data) => {
    this.sendData(data)
  })
  .catch(console.error)
};

Parks.prototype.sendData = function (data) {
  PubSub.publish('Parks:parks-ready', data)
};



module.exports = Parks;
