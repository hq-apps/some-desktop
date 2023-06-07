<script>
    import TabView from "../ui/TabView.svelte";
    import Displays from "./about/Displays.svelte";
    import Memory from "./about/Memory.svelte";

    import Overview from "./about/Overview.svelte";
    import Resources from "./about/Resources.svelte";
    import Storage from "./about/Storage.svelte";
    import Support from "./about/Support.svelte";

    let items = [
		{ label: "Overview", value: 1, component: Overview },
        { label: "Displays", value: 2, component: Displays },
        { label: "Storage", value: 3, component: Storage },
        { label: "Memory", value: 4, component: Memory },
        { label: "Support", value: 5, component: Support },
        { label: "Resources", value: 6, component: Resources },
	];
</script>

<TabView {items} />