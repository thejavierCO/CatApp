import { writable } from "svelte/store"
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
    this.on("error", ({ detail: msg }) => console.error(msg))
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("addItem", data);
    this.store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) e.push(data);
      else this.emit("error", "exist element");
      return e;
    });
    return this;
  }
  del(id) {
    this.emit("delItem", { id });
    this.store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) return e.filter((e) => e.id != id);
      else this.emit("error", "not exist element");
      return e;
    });
    return this;
  }
  edit(id, data) {
    this.store.update((db) => {
      let [item] = db.filter((e) => e.id == id);
      if (typeof item != "undefined")
        return db.map((e) =>
          e.id == item.id
            ? ((e) => {
              Object.keys(data).forEach((k) => {
                if (e[k] != data[k]) {
                  this.emit("editItem", {
                    id,
                    data: {
                      newData: data,
                      oldData: e,
                    },
                  });
                  e[k] = data[k];
                } else this.emit("error", "element is update");
              });
              return e;
            })(e)
            : e
        );
      else this.emit("error", "not exist element");
      return db;
    });
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data }))
    else return this.dispatchEvent(new Event(name))
  }
  on(name, callback) {
    this.addEventListener(name, callback)
  }
}

export class localStorageDb {
  constructor() {
    this.keys = [];
    this.storageChange(({ key, newValue }) => {
      if (key != null) this.keys.forEach(({ key: item, start }) => {
        if (key == item) start(newValue)
        else throw "not use key:" + key;
      });
      else this.keys.forEach(({ start }) => start(null))
    })
  }
  storageChange(fns) {
    window.addEventListener("storage", fns);
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start(localStorage.getItem(key))
    this.keys.push({ key, start })
    return this;
  }
  get(key) {
    return { start: (data) => ((this.keys.filter(e => e.key == key))[0].start(data)) };
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super(fnsUnsuscribe);
    this.keysStore = new localStorageDb();
    this.keysStore.use("store", (data) => {
      if (data == null) this.store.update((_) => {
        localStorage.setItem("store", "[]")
        return []
      })
      else if (typeof data == "string") return localStorage.setItem("store", data)
      else throw "require string"
    })
    this.Destroy = this.store.subscribe((data) => this.keysStore.get("store").start(JSON.stringify(data)))
  }
}