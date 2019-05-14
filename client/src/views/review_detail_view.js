const ReviewDetailView = function(container){
  this.container = container
}

ReviewDetailView.prototype.bindEvents= function () {
  PubSub.subscribe('Marker:marker-clicked', (event) => {
    this.renderLocationDetail(event.detail)
  })

};

ReviewDetailView.prototype.renderLocationDetail = function (location) {
  this.clearContent(this.container)

  const title = document.createElement('h1')
  title.innerText = location.name
  title.classList.add('location-info-header')
  this.container.appendChild(title)

  const infoDiv = document.createElement('div')
  infoDiv.classList.add('location-info-inner')
  this.container.appendChild(infoDiv)

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('location-img')
  infoDiv.appendChild(imageContainer)

  const image = document.createElement('img')
  image.src = location.image
  image.alt = location.name
  imageContainer.appendChild(image)

  const fact = document.createElement('section')
  fact.innerText = location.fact
  infoDiv.appendChild(fact)

  const src = document.createElement('a')
  src.innerText = location.track
  infoDiv.appendChild(src)

  const addButton = this.createAddButton(location)
  this.container.appendChild(addButton)
};

ReviewDetailView.prototype.createAddButton = function (location) {
  const form = document.createElement('form')
  form.classList.add('btn', 'btn-add')
  form.innerText = 'Add to Itinerary'
  form.value = this.createItineraryItem(location)

  form.addEventListener('click', (evt) => {
    evt.preventDefault()
    PubSub.publish('Location:add-btn-clicked', evt.target.value)
  })
  return form
}

ReviewDetailView.prototype.createItineraryItem = function (location) {
  const itineraryLocation = {
    name: location.name,
    fact: location.fact,
    image: location.image,
    // track: location.track
  }
  return itineraryLocation
};

ReviewDetailView.prototype.clearContent = function (node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

module.exports = ReviewDetailView;
