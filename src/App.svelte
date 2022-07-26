<script>
  import Background from "./Components/background.svelte";
  import { configApi, catImage } from "./js/store";
  export let config;
  configApi.set(config || {});
</script>

{#await $catImage}
  <Background imageUrl="https://c.tenor.com/RVvnVPK-6dcAAAAM/reload-cat.gif">
    <h1 class="text-white">Loading...</h1>
  </Background>
{:then Image}
  <Background imageUrl={"https://cdn2.thecatapi.com/images/cpt.gif"} let:img>
    <div class="flex justify-center">
      <div class="rounded-lg shadow-lg bg-white max-w-sm grid">
        <img
          class="rounded-t-lg max-w-full h-auto items-center"
          src={img}
          alt="cat"
        />
        <div class="p-6 mx-auto grid items-center">
          <span class="sm:text-sm md:text-2xl text-center">New Cat \(♥‿♥)/</span
          >
          <!-- <button
            type="button"
            class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Button</button
          >
          <button
            type="button"
            class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Button</button
          > -->
        </div>
      </div>
    </div>
    <!-- <div class="container overflow-auto vh-full mx-auto grid items-center">
      <div
        class="bg-black text-white border-radius grid items-center justify-self-center p-2"
      >
        <img class="border-radius border" src={img} alt="cat" />
        <span class="sm:text-sm md:text-2xl text-center p-3 animate-bounce"
          >New Cat \(♥‿♥)/</span
        >
      </div>
    </div> -->
  </Background>
{/await}
