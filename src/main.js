import App from './App.svelte';
import { CatApi } from './js/catApi';

const app = new App({
	target: document.body,
	props: {
		api:new CatApi("60213ae1-2505-46e8-8843-e72cc3b30468")
	}
});

export default app;