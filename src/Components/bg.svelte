<script>
  import { onMount } from "svelte";
  export let useImage;
  export let useColor;
  if (useImage && !useColor) {
    onMount(() => {
      useImage.subscribe((e) => {
        let [image] = e;
        document.querySelector(
          "div.bg"
        ).style.backgroundImage = `url(${image})`;
      });
    });
  } else if (!useImage && useColor) {
    onMount(() => {
      console.log(document.querySelector("div.bg"));
    });
  } else if (!useImage && !useColor)
    throw "not defined type content background";
</script>

<slot />
<div class="bg" />

<style>
  div.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    filter: blur(50px);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
</style>
