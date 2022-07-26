<script>
  import Background from "./Components/background.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  configApi.set(config || {});
</script>

{#await $catImage}
  <h1 class="text-white">Loading...</h1>
{:then Image}
  <Background imageUrl={Image} let:img>
    <div
      class="bg-black text-white border-radius grid items-center justify-self-center p-2"
    >
      <img class="border-radius border" src={img} alt="cat" />
      <span class="sm:text-sm md:text-2xl text-center p-3 animate-bounce"
        >New Cat \(♥‿♥)/</span
      >
    </div>
  </Background>
{/await}
