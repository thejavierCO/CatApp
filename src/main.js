import App from './App.svelte';

const app = new App({
	target: document.body,
	props:{
		config:{
			size:"med",
			mime_types:"jpg"
		}
	}
});

export default app;