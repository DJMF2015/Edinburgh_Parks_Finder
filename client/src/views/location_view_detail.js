const LocationViewDetail = function(container){
  this.container = container
}

LocationViewDetail.prototype.bindEvents= function () {
  PubSub.subscribe('Marker:marker-clicked', (event) => {
    this.renderLocationDetail(event.detail)
  })

};



LocationViewDetail.prototype.renderLocationDetail = function (park) {
  this.clearContent(this.container)

  const title = document.createElement('h1')
  title.innerText = park.name
  title.classList.add('location-info-header')
  this.container.appendChild(title)

  const infoDiv = document.createElement('div')
  infoDiv.classList.add('location-info-inner')
  this.container.appendChild(infoDiv)

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('location-img')
  infoDiv.appendChild(imageContainer)

  const image = document.createElement('img')
  image.src = park.image
  image.alt = park.name
  imageContainer.appendChild(image)

  const fact = document.createElement('section')
  fact.innerText = park.fact
  infoDiv.appendChild(fact)

  const addButton = this.createAddButton(park)
  this.container.appendChild(addButton)
};

LocationViewDetail.prototype.createAddButton = function (park) {
  const form = document.createElement('form')
  form.classList.add('btn', 'btn-add')
  form.innerText = 'Add to Itinerary'
  form.value = this.createItineraryItem(park)

  form.addEventListener('click', (evt) => {
    evt.preventDefault()
    PubSub.publish('Parks:add-btn-clicked', evt.target.value)
  })
  return form
}

LocationViewDetail.prototype.createItineraryItem = function (park) {
  const itineraryLocation = {
    name: park.name,
    fact: park.fact,
    image: park.image
  }
  return itineraryLocation
};

LocationViewDetail.prototype.clearContent = function (node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
};

module.exports = LocationViewDetail;
