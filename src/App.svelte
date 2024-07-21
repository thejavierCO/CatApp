<script>
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/countInterval.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  configApi.set(config || {});
</script>

<Store let:add let:edit let:del useLocalStorage let:store>
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
      {add({
        status: "Stop",
        seconds: 3600,
        time: { start: 0, end: 0, pause: 0 },
        img: Image,
      })}
    {/await}
  </div>
  <div slot="print" let:data let:id>
    <Counter
      on:current_status_timer={({ detail: { status } }) => edit(id, { status })}
      seconds={data.seconds}
      status={data.status}
      time={data.time}
      let:current_time
    >
      <div let:actions>
        {data.status == "Stop" ? actions.Play() : ""}
        <Background imageUrl={data.img} let:img>
          <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
              <img
                class="rounded-t-lg max-w-full h-auto items-center"
                src={img}
                alt="cat"
              />
              <h1 class="text-white">{current_time}</h1>
            </div>
          </div>
        </Background>
      </div>
    </Counter>
  </div>
</Store>
