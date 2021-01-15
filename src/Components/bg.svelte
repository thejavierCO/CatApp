<script>
	import {CatBg} from "../js/app";
</script>

<slot img={$CatBg}></slot>
<div style="background-image: url('{$CatBg}')" bg/>

<style>
	div[bg]{
		position: fixed;
		top:0;
		left:0;
		width: 100vw;
		height: 100vh;
		filter:blur(50px);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		z-index:-1;
    }
</style>