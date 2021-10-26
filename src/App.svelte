<script>
  import Bg from "./Components/bg.svelte";
</script>

<Bg let:img>
  <div class="container overflow-auto vh-full mx-auto grid items-center">
    <div
      class="bg-black text-white border-radius grid items-center justify-self-center p-2"
    >
      <img class="border-radius border" src={img} alt="cat" />
      <span class="sm:text-sm md:text-2xl text-center p-3 animate-bounce"
        >It's the cat today \(♥‿♥)/</span
      >
    </div>
  </div>
</Bg>

<style global>
  .vh-full {
    height: 100vh;
    width: 100vw;
  }
  .border-radius {
    border-radius: 1%;
  }
</style>
