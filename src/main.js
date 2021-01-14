import App from './App.svelte';
import { catApi } from './js/catapi';

const app = new App({
	target: document.body,
	props: {
		api:new catApi()
	}
});

export default app;