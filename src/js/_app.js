import { catApi } from "./catapi";
import dayjs from "dayjs"
import { writable , readable , derived , get} from "svelte/store";

let api = new catApi();

let backgroundCat = ()=>{
    const get = async (set)=>{
        let data = await api.images({
            format:"jpg"
        });
        localStorage.setItem("todayCat",JSON.stringify(data))
        localStorage.setItem("expire",JSON.stringify(dayjs().add(1,"day").day()))
        set(data);
    }
    const now = dayjs().day();
    const {subscribe,update,set} = writable([],async (set)=>{
        if(localStorage.getItem("todayCat")!==null&&localStorage.getItem("expire")!==null){
            set(JSON.parse(localStorage.getItem("todayCat")))
            let expire = localStorage.getItem("expire");
            if(+expire===now)get(set);
        }else get(set);
    });
    return {subscribe,clear:()=>get(set)}
}

export let imageData = backgroundCat();

export let CatBg = derived(imageData,$imageBg=>$imageBg.map(e=>e.url));

export let CatBreed = derived(imageData,$imageBg=>$imageBg.map(e=>e.breeds))
