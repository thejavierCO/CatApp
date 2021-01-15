<script>
  import Bg from "./Components/bg.svelte";
  import { imageData ,count,timer} from "./js/app";
  timer.count(10);
</script>

<Bg let:img>
	<div class="container grid justify-items-center mx-auto">
		<div class="bg-black text-white p-7 grid justify-items-center md:m-3 sm:m-0 max-w-3xl rounded-xl">
		  <img class="border rounded-lg" src={img} alt="cat" /><br>
		  <span class="p-1 text-4xl animate-bounce">It's the cat today \(♥‿♥)/</span>
		</div>
		{#if $count}
			<div class="p-1">
			<button class="border border-gray-600 bg-white bg-opacity-25 text-white hover:bg-white hover:text-black p-3" on:click={()=>{imageData.clear;timer.count(10)}}>Not Like (╬ ಠ益ಠ)</button>
			</div>
		{/if}
	  </div>
</Bg>