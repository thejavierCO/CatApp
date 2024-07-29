<script>
  import {
    createEventDispatcher,
    onMount,
    beforeUpdate,
    onDestroy,
  } from "svelte";
  import { Temporizador } from "../../js/data";
  let emit = createEventDispatcher();

  export let seconds = 1;
  export let time = { start: 0, pause: 0, end: 0 };
  export let autoRun = false;
  export let status = "Stop";

  let Counter = new Temporizador(seconds * 1000, time, status);

  let posicion = Counter.formatTime;

  Counter.on("current_status_timer", ({ detail }) => {
    if (status != detail.status) emit("state", detail);
    if (status == "Play") posicion = Counter.formatTime;
  });
  onMount(() => {
    if (autoRun) Counter.play();
  });
  onDestroy(() => console.log(Counter.Destroy(), "unsus"));
</script>

<slot
  btnPause={() => Counter.pause()}
  btnStop={() => Counter.stop()}
  btnPlay={() => Counter.play()}
  {status}
  formatTime={posicion}
/>
