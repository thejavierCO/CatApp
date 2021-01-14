export class catApi{
    constructor(token){
        this.version = "v1"
        this.url = `https://api.thecatapi.com/${this.version}`;
        this.options = {method:"GET"}
        if(typeof token === "string")this.options["x-api-key"] = token;
    }
    /**
     * @param {{
     *      limit:number,
     *      page:number
     * }} options 
     */
    async categorys(options){
        if(!options)options = {}
        let url = Object.keys(options).map(k=>encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
        return await fetch(`${this.url}/categories?${url}`,this.options)
        .then(e=>e.json())
    }
    /**
     * @param {{
     *      attach_breed:string,
     *      page:number,
     *      limit:number
     * }} options 
     */
    async breeds(options){
        if(!options)options = {}
        let url = Object.keys(options).map(k=>encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
        return await fetch(`${this.url}/breeds?${url}`,this.options)
        .then(e=>e.json())
    }
    /**
     * @param {{
     *      size:number
     *      mime_types:string
     *      order:string
     *      limit:number
     *      page:number
     *      category_ids:number||Array<number>
     *      format:string
     *      breed_id:number
     * }} options
     */
    async images(options){
        if(!options)options = {}
        let url = Object.keys(options).map(k=>encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
        return await fetch(`${this.url}/images/search?${url}`,this.options)
        .then(e=>e.json())
    }
}