<script>
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/timer.svelte";
  import { configApi, catImage } from "./js/store";
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
    } else console.log("first");
  }}
>
  <div slot="print" let:id let:data let:index>
    <Counter
      autoRun
      seconds={data.seconds}
      status={data.status}
      time={data.time}
      let:formatTime
      on:state={({ detail }) => {
        if (detail.status == "Stop") del(id);
        edit(id, detail);
      }}
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
              <span class="sm:text-sm md:text-2xl text-center text-white">
                New Cat \(♥‿♥)/
              </span>
              <span class="text-center text-white">Delete in</span>
              <span class="sm:text-sm md:text-2xl text-center text-white">
                {formatTime.Hours}:{formatTime.Minutes}:{formatTime.Seconds}
              </span>
            </div>
          </div>
        </Background>
      </div>
    </Counter>
  </div>
</Store>
