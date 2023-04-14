<script>
	import { Diamonds } from 'svelte-loading-spinners';

	export let color = 'FF3E00';
</script>

<!-- <Chasing size="20" color="#FF3E00" unit="px" duration="2s" /> -->
<Diamonds size="50" {color} unit="px" duration="2s" />
