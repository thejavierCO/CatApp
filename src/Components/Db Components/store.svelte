<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { dbStore, dbStoreUseLocalStorage } from "../../js/store";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let db = new dbStoreUseLocalStorage();

  const store = db.store;
  onMount(() =>
    emit("mount", {
      add: (data) => db.add(data),
      del: (id) => db.del(id),
      edit: (id, data) => db.edit(id, data),
      store: () => get(store),
    })
  );
</script>

<slot
  add={(data) => db.add(data)}
  del={(id) => db.del(id)}
  edit={(id, data) => db.edit(id, data)}
  store={$store}
/>

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
