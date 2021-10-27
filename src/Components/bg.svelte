<script>
  //   import { CatBg } from "../js/app";
  export let useImage;
  export let useColor;
  let use = undefined;
  if (useImage && !useColor) use = useImage;
  else if (!useImage && useColor) use = useColor;
  else if (!useImage && !useColor) throw "not defined type content background";
</script>

<slot />
<!-- <div class="bg" style="background-image: url('{$CatBg}')" /> -->

<!-- <style>
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
</style> -->
