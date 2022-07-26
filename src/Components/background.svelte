<script>
  export let imageUrl;
</script>

<div class="container overflow-auto vh-full mx-auto grid items-center">
  <slot img={imageUrl} />
</div>
<div style="background-image: url('{imageUrl}')" bg />

<style>
  div[bg] {
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
