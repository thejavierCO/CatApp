<script>
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Timer from "./Components/Timer Components/timer.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  configApi.set(config || {});
</script>
<Store let:add let:del useLocalStorage>
  <div slot="input">
    {#await $catImage}
      <Background
        imageUrl="https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif"
        let:img
      >
        <div class="flex justify-center">
          <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
            <img
              class="rounded-t-lg max-w-full h-auto items-center"
              src={img}
              alt="cat"
            />
            <h1 class="text-white">Loading...</h1>
          </div>
        </div>
      </Background>
    {:then Image}
      {Image}
    {/await}
  </div>
  <div slot="print" let:data>
    <Timer
    on:state={({detail})=>{
      console.log(detail)
    }}
    seconds={3600}
    autoRun
    >

    </Timer>
    <Background
      imageUrl={data.img}
      let:img
    >
      <div class="flex justify-center">
        <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
          <img
            class="rounded-t-lg max-w-full h-auto items-center"
            src={img}
            alt="cat"
          />
          <h1 class="text-white">Cat Today :3</h1>
        </div>
      </div>
    </Background>
  </div>
</Store>