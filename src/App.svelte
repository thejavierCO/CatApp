<script>
  import { stringify } from "uuid";
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/timer.svelte";
  import { configApi, catImage } from "./js/store";
  import { detach } from "svelte/internal";
  export let config;
  configApi.set(config || {});
</script>

<Store
  let:edit
  let:del
  useLocalStorage
  on:mount={async ({ detail: { add, store } }) => {
    if (store().length === 0) {
      catImage.subscribe(async (data) => {
        add({
          status: "Stop",
          seconds: 10,
          time: { start: 0, end: 0, pause: 0 },
          img: await data,
        });
      });
    }
  }}
>
  <div slot="print" let:data let:id>
    <Counter
      autoRun
      seconds={data.seconds}
      status={data.status}
      time={data.time}
      on:state={({ detail }) => edit(id, detail)}
    >
      <div>
        <Background imageUrl={data.img} let:img>
          <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
              <img
                class="rounded-t-lg max-w-full h-auto items-center"
                src={img}
                alt="cat"
              />
              <h1 class="text-white">New cat</h1>
            </div>
          </div>
        </Background>
      </div>
    </Counter>
  </div>
</Store>
