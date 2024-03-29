const Request = function(url){
  this.url = url;
}

//READ
Request.prototype.get = function(){
  return fetch(this.url).then((response)=> response.json())
}

Request.prototype.post = function(payload){
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })
  .then((response) => response.json())
}


Request.prototype.delete = function(id){
  return fetch(`${this.url}/${id}`,{
    method: 'DELETE'
  })
  .then((response)=> response.json())
};

//UPDATE
Request.prototype.patch = function (id, payload){
  return fetch(`${this.url}/${id}`,{
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json'}
  })
  .then((response) => response.json())
}


module.exports = Request;
