<script>
	import SideBarNavTemplate from '../ui/SideBarNavTemplate.svelte';
    import WelcomePage1 from './WelcomePage1.svelte';
    import WelcomePage2 from './WelcomePage2.svelte';
	let pages = [
		{value: 1, displayTitle: "Page 1", content: WelcomePage1},
		{value: 2, displayTitle: "Page 2", content: WelcomePage2}
	]
</script>

<SideBarNavTemplate title="Test" {pages} />
