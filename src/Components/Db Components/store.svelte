<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { writable, get } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { v4 as uuidv4 } from "uuid";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();
  const store = writable([], (_) => () => {
    console.warn("unsus");
  });

  export function add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    emit("addItem", data);
    store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) e.push(data);
      else emit("error", "exist element");
      return e;
    });
  }
  export function del(id) {
    emit("delItem", { id });
    store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) return e.filter((e) => e.id != id);
      else emit("error", "not exist element");
      return e;
    });
  }
  export function edit(id, data) {
    store.update((db) => {
      let [item] = db.filter((e) => e.id == id);
      if (typeof item != "undefined")
        return db.map((e) =>
          e.id == item.id
            ? ((e) => {
                Object.keys(data).forEach((k) => {
                  if (e[k] != data[k]) {
                    emit("editItem", {
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

  if (useLocalStorage) {
    let name = typeof useLocalStorage == "string" ? useLocalStorage : "store";
    if (localStorage.getItem(name) == null) localStorage.setItem(name, "[]");
    else store.update((_) => JSON.parse(localStorage.getItem(name)));
    let unsus = store.subscribe((data) =>
      JSON.stringify(data) != localStorage.getItem(name)
        ? localStorage.setItem(name, JSON.stringify(data))
        : ""
    );
    window.addEventListener("storage", ({ key, newValue }) => {
      if (key == name)
        store.update((db) => {
          if (JSON.stringify(db) != newValue) return JSON.parse(newValue);
          else return db;
        });
      else if (key == null) store.update((_) => []);
    });
    onDestroy(() => unsus());
  }
  onMount(() => emit("mount", { add, del, edit, store: () => get(store) }));
</script>

<slot {add} {del} {edit} store={$store} />

<LayoutGrid>
  {#if $$slots.print}
    {#each $store as data, index}
      <Cell>
        <slot name="print" id={data.id} {index} {data} />
      </Cell>
    {/each}
  {/if}
  <slot name="input" />
</LayoutGrid>
