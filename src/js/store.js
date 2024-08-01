import { CatApi } from './catApi';

export let catImage = async (configApi) => {
  let cat = new CatApi("60213ae1-2505-46e8-8843-e72cc3b30468");
  let json = await cat.images().search(configApi);
  let [item] = await json;
  return item.url
}