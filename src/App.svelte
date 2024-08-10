<script>
  import { blur } from "svelte/transition";
  import Background from "./Components/Style Components/background.svelte";
  import Store from "./Components/Db Components/store.svelte";
  import Counter from "./Components/Timer Components/timer.svelte";
  import { catImage } from "./js/catApi.js";
  export let config;
  let objectAdd = async () => ({
    status: "Stop",
    seconds: 86400,
    time: { start: 0, end: 0, pause: 0 },
    img: await catImage(config),
    isActiveAutoRun: true,
  });
</script>

<Store
  let:edit
  let:del
  useLocalStorage
  on:mount={async ({ detail: { add, store } }) => {
    if (store().length === 0) add(await objectAdd());
  }}
  on:delete={({ detail: { add, store } }) =>
    setTimeout(async () => {
      if (store().length === 0 && document.hasFocus()) add(await objectAdd());
    }, 500)}
>
  <div slot="print" let:id let:data let:index>
    <Counter
      autoRun={data.isActiveAutoRun}
      seconds={data.seconds}
      status={data.status}
      time={data.time}
      let:formatTime
      let:btnStop
      on:state={({ detail: { data } }) => edit(id, data)}
      on:isStop={() => del(id)}
    >
      <div>
        <Background imageUrl={data.img} let:img>
          <div
            in:blur={{ duration: 1000 }}
            out:blur={{ duration: 250 }}
            class="center_element"
          >
            <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
              <img
                class="rounded-t-lg max-w-full h-auto items-center"
                src={img}
                alt="cat"
              />
              <span class="sm:text-sm md:text-2xl text-center text-white">
                Cat \(♥‿♥)/
              </span>
              <span class="text-sm text-center text-white">Delete in</span>
              <button on:click={() => btnStop()}>
                <span
                  class="sm:text-sm md:text-2xl text-4xl text-center text-white hover:text-red-600"
                >
                  {formatTime.Hours}:{formatTime.Minutes}:{formatTime.Seconds}
                </span><br />
                <span class="text-center text-red-600 text-sm"
                  >click here for new cat (TnT)</span
                >
              </button>
            </div>
          </div>
        </Background>
      </div>
    </Counter>
  </div>
</Store>

<style>
  .center_element {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
