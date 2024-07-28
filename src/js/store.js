import { writable, derived, get } from "svelte/store";
import { v4 as uuidv4 } from "uuid";
import { CatApi } from './catApi';

export let configApi = writable({})

export let CatInfo = derived(configApi, async (e) => {
  let cat = new CatApi("60213ae1-2505-46e8-8843-e72cc3b30468")
  let json = await cat.images().search(e);
  return json;
})

export let catImage = derived(CatInfo, async n => {
  let [item] = await n;
  return item.url;
})

export class Store extends EventTarget {
  constructor(useLocalStorage = false) {
    super();
    this.store = writable([]);
    if (useLocalStorage) {
      let name = typeof useLocalStorage == "string" ? useLocalStorage : "store";
      if (localStorage.getItem(name) == null) localStorage.setItem(name, "[]");
      else this.store.update((_) => JSON.parse(localStorage.getItem(name)));
      this.store.subscribe((data) => {
        let oldData = localStorage.getItem(name);
        if (JSON.stringify(data) != oldData)
          localStorage.setItem(name, JSON.stringify(data));
      });
      window.addEventListener("storage", ({ key, newValue }) =>
        key == name ? this.store.update((_) => JSON.parse(newValue)) : ""
      );
    }
  }
  get genId() {
    return uuidv4();
  }
  get() {
    return get(this.store)
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = this.genId;
    emit("add", data);
    this.store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) e.push(data);
      else emit("error", "exist element");
      return e;
    });
  }
  del(id) {
    emit("del", { id });
    this.store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) return e.filter((e) => e.id != id);
      else emit("error", "not exist element");
      return e;
    });
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
                  emit("edit", {
                    id,
                    data: {
                      newData: data,
                      oldData: e,
                    },
                  });
                  e[k] = data[k];
                } else emit("error", "element is update");
              });
              return e;
            })(e)
            : e
        );
      else emit("error", "not exist element");
      return db;
    });
  }
}