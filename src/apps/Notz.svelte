<script lang="ts">
    import TextInput from "../ui/TextInput.svelte";
    import { write, read } from "../lib/PersistantStorage";
    import { onMount } from "svelte";
    import SubmitButton from "../ui/SubmitButton.svelte";

    let notes = [];
    let noteText = "";

    onMount(() => {
        notes = JSON.parse(read("notz", "notes")) || [];
        console.log(notes);
    });

    function addNote() {
        if (noteText.trim() == "") return;
        notes = [...notes, noteText];
        noteText = "";
        write("notz", "notes", JSON.stringify(notes));
    }

    function removeNote(i: number) {
        notes.splice(i, 1);
        notes = notes; // totally the best way of triggering reactivity
        write("notz", "notes", JSON.stringify(notes));
    }
</script>

<div>
    <ul>
        {#each notes as n, i}
            <li on:click={() => removeNote(i)} on:keyup={() => removeNote(i)}>
                {n}
            </li>
        {/each}
    </ul>

    <form on:submit|preventDefault={addNote}>
        <TextInput bind:value={noteText} />
        <SubmitButton value="Add Note" />
    </form>
</div>

<style>
    li:hover {
        text-decoration: line-through;
    }

    form {
        margin: 8px;
    }
</style>
