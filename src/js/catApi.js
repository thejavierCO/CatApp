export class CatError{
  constructor(message){
    this.message = message|"Error";
  }
}

export class images{
  constructor(catApi){
    this.api = catApi;
  }
  search(options){
    return this.api.call("images","search",options)
  }
  myimages(){
    return this.api.call("images")
  }
  id(imagen_id){
    return this.api.call("images",imagen_id)
  }
  del(imagen_id){
    return this.api.call("images",imagen_id,{},{method:"POST"})
  }
}

export class favourites{}

export class votes{}

export class categories{}

export class breeds{}

export class sources{}

export class CatApi{
  constructor(token){
    this._version = "v1";
    this._url = `https://api.thecatapi.com/`;
    this._options = {
      method:"GET",
      headers:{}
    }
    if(typeof token === "string")this._options["headers"]["x-api-key"] = token;
  }
  call(path,method,options){
    if(!options)options = {}
    let url = Object
      .keys(options)
      .map(k=>encodeURIComponent(k) + '=' + encodeURIComponent(options[k]))
      .join('&')
    return fetch(`${this._url}${this._version}/${path}/${method||""}?${url}`,this._options)
    .then(e=>e
      .json()
      .catch(err=>new CatError(err.message))
    ).catch(e=>new CatError(e.message));
  }
  // images
  images(){
    return new images(this);
  }
  // favourites
  // votes
  // categories
  // breeds
  // sources
  // version
  version(){
    return fetch(this._url).then(e=>e.json())
  }
}