<script>
	import Checkbox from './../ui/Checkbox.svelte';
	import Switch from './../ui/Switch.svelte';
	import TextInput from './../ui/TextInput.svelte';
    import Button from "../ui/Button.svelte";
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
<TextInput placeholder="test"></TextInput>
<Switch>Test</Switch>
<Checkbox>Test</Checkbox>