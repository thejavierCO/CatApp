<script>
  import { blur } from "svelte/transition";
  import Background from "./Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/timer.svelte";
  import { catImage } from "./js/store";
  // export let config;
  let objectAdd = async () => ({
    status: "Stop",
    seconds: 5, //86400,
    time: { start: 0, end: 0, pause: 0 },
    img: "#", //await catImage(config),
    isActiveAutoRun: true,
  });
</script>

<Store
  let:add
  let:edit
  let:del
  useLocalStorage
  on:mount={async ({ detail: { add, store } }) => {
    if (store().length === 0) add(await objectAdd());
  }}
>
  <div slot="print" let:id let:data let:index>
    <Counter
      autoRun={data.isActiveAutoRun}
      seconds={data.seconds}
      status={data.status}
      time={data.time}
      let:formatTime
      on:state={({ detail: { data } }) => edit(id, data)}
      on:isStop={() => del(id)}
    >
      <div>
        <Background imageUrl={data.img} let:img>
          <div
            in:blur={{ duration: 1000 }}
            out:blur={{ duration: 250 }}
            class="flex justify-center"
          >
            <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
              <img
                class="rounded-t-lg max-w-full h-auto items-center"
                src={img}
                alt="cat"
              />
              <span class="sm:text-sm md:text-2xl text-center text-white">
                #{index + 1} Cat \(♥‿♥)/
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
