import { writable, derived} from "svelte/store";
import { CatApi } from './catApi';

export let configApi = writable({})

export let CatInfo = derived(configApi,async (e)=>{
  let cat = new CatApi("60213ae1-2505-46e8-8843-e72cc3b30468")
  let json = await cat.images().search(e);
  return json;
})

export let catImage = derived(CatInfo,async n=>{
  let [item] = await n;
  return item.url;
})