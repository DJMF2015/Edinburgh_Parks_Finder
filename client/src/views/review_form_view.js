const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const ReviewFormView = function(form){
  this.form = form;
  this.location = ''
}

ReviewFormView.prototype.bindEvents = function () {
  this.storeLocation();
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  })
};

ReviewFormView.prototype.storeLocation = function () {
  PubSub.subscribe('Review:review-btn-clicked', (evt) => {
    this.location = evt.detail
  })
};

ReviewFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const review = this.createReview(evt.target, this.location)
  PubSub.publish('Review:review-submitted', review)
  evt.target.reset();
  const modal = document.getElementById('modal');
  modal.style.display = "none";
};

ReviewFormView.prototype.createReview = function (form, location) {
  const review = {
    id: location,
    payload: {
      review: form.review.value
    }
  }
  return review
};

module.exports = ReviewFormView;
