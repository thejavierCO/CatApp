<script>
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/timer.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  let store = [];
  configApi.set(config || {});
</script>

<Store
  let:edit
  let:del
  useLocalStorage
  on:mount={async ({ detail: { add, store: db } }) => {
    db.subscribe((data) => {
      if (data.length === 0) {
        catImage.subscribe(async (data) => {
          add({
            status: "Stop",
            seconds: 2,
            time: { start: 0, end: 0, pause: 0 },
            img: await data,
          });
        });
      } else {
        store = data;
      }
    });
  }}
>
  {#each store as { id, seconds, status, time, img }}
    <Counter
      autoRun
      {seconds}
      bind:status
      bind:time
      let:status
      let:formatTime
      on:state={({ detail }) => {
        edit(id, detail);
      }}
    >
      <div>
        <Background imageUrl={img} let:img>
          <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
              <img
                class="rounded-t-lg max-w-full h-auto items-center"
                src={img}
                alt="cat"
              />
              <h1 class="text-white">
                Delete in {formatTime.Hours}:{formatTime.Minutes}:{formatTime.Seconds}
              </h1>
              <h1 class="text-white">
                Status: {status}
              </h1>
            </div>
          </div>
        </Background>
      </div>
    </Counter>
  {/each}
</Store>
