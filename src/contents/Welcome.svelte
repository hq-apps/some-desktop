<script>
	import Checkbox from "./../ui/Checkbox.svelte";
	import Switch from "./../ui/Switch.svelte";
	import TextInput from "./../ui/TextInput.svelte";
	import Button from "../ui/Button.svelte";
	import TabView from "../ui/TabView.svelte";

	import WelcomeTab1 from "./WelcomeTab1.svelte";
	import WelcomeTab2 from "./WelcomeTab2.svelte";

	// List of tab items with labels, values and assigned components
	let items = [
		{ label: "Tab 1", value: 1, component: WelcomeTab1 },
		{ label: "Tab 2", value: 2, component: WelcomeTab2 },
	];
</script>

<img src="/notz.png" alt="icon" width="100" height="100" />
<p>UI test</p>
<input id="button" type="button" value="SAFF" />
<input id="checkbox" type="checkbox" title="a" />
<input id="color" type="color" />
<input type="number" />
<input type="radio" />
<input type="range" />

<Button>Test</Button>
<TextInput placeholder="test" />
<Switch>Test</Switch>
<Checkbox>Test</Checkbox>
<TabView {items} />
