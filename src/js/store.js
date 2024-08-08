import { writable, get as getStoreData } from "svelte/store"
import { v4 as uuidv4 } from "uuid";
import { CatApi } from './catApi';

export let catImage = async (configApi) => {
  let cat = new CatApi("60213ae1-2505-46e8-8843-e72cc3b30468");
  let json = await cat.images().search(configApi);
  let [item] = await json;
  return item.url
}
export class dbStore extends EventTarget {
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
    this.on("Item", ({ detail: { type, data } }) => {
      this.store.update(e => {
        this.emit(type, data)
        switch (type) {
          case "add": return [...e, data];
          case "del": return e.filter(e => e.id != data.id);
          case "edit":
            return e.map(e => {
              let { id, data: item } = data;
              if (e.id == id) Object.keys(item).forEach((k) => (e[k] != item[k]) ? e[k] = item[k] : "");
              return e;
            })
          case "clear": return [];
          case "insert":
            if (Array.isArray(data)) return data;
            else throw "require array for insert data"
          default: return e;
        }
      })
    })
  }
  get() {
    return getStoreData(this.store)
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("Item", { type: "add", data });
    return this;
  }
  del(id) {
    this.emit("Item", { type: "del", data: { id } });
    return this;
  }
  edit(id, data) {
    this.emit("Item", { type: "edit", data: { id, data } });
    return this;
  }
  clear() {
    this.emit("Item", { type: "clear", data: null });
    return this;
  }
  insert(data) {
    this.emit("Item", { type: "insert", data });
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data, cancelable: true }))
    else return this.dispatchEvent(new Event(name, { cancelable: true }))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class localStorageDb {
  constructor() {
    this.keys = [];
    this.storageChange(({ key, newValue, oldValue }) => {
      if (key != null) {
        try {
          if (oldValue != "[]") this.get(key).start({ type: "updateStorage", data: newValue });
        } catch (e) {
          console.error(e)
        }
      } else this.keys.forEach(({ start }) => start({ type: "clear", data: null }))
    })
  }
  storageChange(fns) {
    window.addEventListener("storage", fns);
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start({ type: "init", data: localStorage.getItem(key) })
    this.keys = [...this.keys, { key, start }]
    return this;
  }
  get(key) {
    let item = this.keys.find(e => e.key == key);
    if (item) return item
    else throw "not exist elemment"
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super((set)=>{
      if(localStorage.getItem("store")==null)localStorage.setItem("store","[]");
      else set(JSON.parse(localStorage.getItem("store")))
      if(fnsUnsuscribe)return fnsUnsuscribe()
    });
    this.keys = new localStorageDb();
    this.keys.use("store", ({ type, data }) => {
      let set = (data) => localStorage.setItem("store", data);
      switch (type) {
        case "init":
          console.log("init")
          break;
        case "updateStorage":
          this.insert(JSON.parse(data))
          break;
        case "updateStore":
          set(data);
          break;
        case "clear":
          this.clear();
          break;
      }
    })
    this.Destroy = this.store.subscribe((data) => {
      if (JSON.stringify(data) != localStorage.getItem("store")) {
        this.keys.get("store")
          .start({
            type: "updateStore",
            data: JSON.stringify(data)
          })
      }
    })
  }
}