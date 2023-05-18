<script>
    export let name = "";
    export let on = false;
</script>

<div class="switch-wrapper">
    <label for="switch"><slot /></label>
    <input type="checkbox" name={name} id="switch" bind:checked={on}>
</div>
<style lang="scss">
    .switch-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    input {
        position: relative;
        width: 40px;
        height: 20px;
        appearance: none;
        background-color: rgba($color: #FFF, $alpha: 0.6);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 100px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

        transition: all 250ms;
    }

    input::after {
        content: "";
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: rgba($color: #FFF, $alpha: 1);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 100px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);
        transition: all 250ms;
    }
    
    input:checked::after {
        left: 75%;
    }
</style>