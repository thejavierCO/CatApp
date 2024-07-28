<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Counter from "./countInterval.svelte";
  import { TimeView } from "../../js/data";
  let emit = createEventDispatcher();

  export let seconds = 1;
  export let time = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status = "Stop";
</script>

<Counter
  on:current_status_timer={({ detail }) => {
    if (status != detail.status) emit("state", detail);
  }}
  {autoRun}
  bind:status
  bind:seconds
  bind:time
  let:current_time
  let:actions
>
  <slot
    btnPause={() => actions.pause()}
    btnStop={() => actions.stop()}
    btnPlay={() => actions.play()}
    current_time={new TimeView(current_time)}
  />
</Counter>
