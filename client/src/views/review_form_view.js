const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const ReviewFormView = function(form){
  this.form = form;
  this.parklocation = ''
}
ReviewFormView.prototype.bindEvents = function () {
  this.storeLocation();
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  })
};

ReviewFormView.prototype.storeLocation = function () {
  PubSub.subscribe('Review:review-btn-clicked', (evt) => {
    this.parklocation = evt.detail
  })
};

ReviewFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const review = this.createReview(evt.target, this.parklocation)
  PubSub.publish('Review-submit:review-submitted', review)
  evt.target.reset();
  const modal = document.getElementById('modal');
  modal.style.display = "none";
};

ReviewFormView.prototype.createReview = function (form, parklocation) {
  const review = {
    id: parklocation,
    payload: {
      review: form.review.value
    }
  }
  return review
};

module.exports = ReviewFormView;
