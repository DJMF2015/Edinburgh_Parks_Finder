const PubSub = require('../helpers/pub_sub.js')

ReviewLocationView = function(container){
  this.container = container;
}

ReviewLocationView.prototype.render = function(park){
  const reviewContainer = document.createElement('div')
  reviewContainer.classList.add('review-card', `visited-${park.visited}`)

  const parkname = document.createElement('h4')
  parkname.innerText = park.name
  parkname.classList.add('review-name')
  reviewContainer.appendChild(parkname)

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('review-img')
  reviewContainer.appendChild(imageContainer)

  const image = document.createElement('div')
  image.src = park.image
  image.alt = park.name
  imageContainer.appendChild(image)

  const icon = document.createElement('i')
  icon.classList.add('fa','fa-check-circle')
  reviewContainer.appendChild(icon)

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('itinerary-options-container')
  reviewContainer.appendChild(buttonContainer)

  const deleteBtn = this.createDeleteButton(park._id)//lodash supported
  buttonContainer.appendChild(deleteBtn)

  const visitedBtn = this.createVisitedButton(park._id)
  buttonContainer.appendChild(visitedBtn)

  const reviewBtn = this.createReviewButton(park._id)
  buttonContainer.appendChild(reviewBtn)

  const ratingContainer = document.createElement('div')
  ratingContainer.classList.add('rating-container')
  reviewContainer.appendChild(ratingContainer)

  const rating = this.renderRatings(park.review)
  ratingContainer.appendChild(rating)

  this.container.appendChild(reviewContainer);
};

ReviewLocationView.prototype.createDeleteButton = function (locationId) {
  const button = document.createElement('button')
  button.classList.add('btn','btn-remove')
  button.value = locationId
  button.innerText = 'Remove'

  button.addEventListener('click', (evt) => {
    PubSub.publish('Review:delete-btn-clicked', evt.target.value)
  })
  return button
};

ReviewLocationView.prototype.createVisitedButton = function (locationId) {
  const form = document.createElement('form')
  form.classList.add('btn', 'btn-visited')
  form.innerText = 'Visited'
  form.value = {
    id: locationId,
    payload: {
      visited: true
    }
  }

  form.addEventListener('click', (evt) => {
    PubSub.publish('Review:visited-btn-clicked', evt.target.value)
  });
  return form
};

ReviewLocationView.prototype.createReviewButton = function (parkId) {
  const button = document.createElement('button')
  button.classList.add('btn','btn-review')
  button.value = parkId
  button.innerText = 'Review'

  const modal = document.getElementById('modal')

  button.addEventListener('click', (evt) => {
    PubSub.publish('Review-submit:review-submitted', evt.target.value)
    modal.style.display = 'block'
  })
  return button
};

ReviewLocationView.prototype.renderRatings = function (parkLocationRating) {
  const para = document.createElement('p')
  para.classList.add('rating')
  para.innerText = 'Rating: ' + this.rating(parkLocationRating)

  return para
};

ReviewLocationView.prototype.rating = function (parkLocationRating) {
  review = '⭐'.repeat(parkLocationRating)
  return !parkLocationRating ? 'No Review Yet' : review
};

module.exports = ReviewLocationView;
