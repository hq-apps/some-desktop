<script>
    export let checked = false;
</script>
<div class="checkbox-wrapper">
    <label for="checkbox"><slot /></label>
    <input type="checkbox" bind:checked={checked} id="checkbox">
</div>
<style lang="scss">
    .checkbox-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    input {
        background-color: rgba($color: #FFF, $alpha: 0.6);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 8px;
        padding: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        width: 25px;
        height: 25px;
        appearance: none;

        transition: all 250ms;
    }

    input:hover, input:focus {
        background-color: rgba($color: #FFF, $alpha: 0.8);
        box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.3);
    }

    input:checked {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hlY2siPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIj48L3BvbHlsaW5lPjwvc3ZnPg==");
    }
</style>