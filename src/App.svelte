<script>
  import Background from "./Components/background.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  configApi.set(config || {});
</script>

{#await $catImage}
  <Background
    imageUrl="https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif"
    let:img
  >
    <div class="flex justify-center">
      <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
        <img
          class="rounded-t-lg max-w-full h-auto items-center"
          src={img}
          alt="cat"
        />
        <h1 class="text-white">Loading...</h1>
      </div>
    </div>
  </Background>
{:then Image}
  <Background imageUrl={Image} let:img>
    <div class="flex justify-center">
      <div class="rounded-lg shadow-lg bg-black max-w-sm grid">
        <img
          class="rounded-t-lg max-w-full h-auto items-center"
          src={img}
          alt="cat"
        />
        <div class="p-6 mx-auto grid items-center">
          <span class="sm:text-sm md:text-2xl text-center text-white"
            >New Cat \(♥‿♥)/</span
          >
        </div>
      </div>
    </div>
  </Background>
{/await}
