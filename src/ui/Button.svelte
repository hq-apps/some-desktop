<button><slot /></button>

<style lang="scss">
    button {
        background-color: rgba($color: #FFF, $alpha: 0.6);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 8px;
        padding: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

        transition: all 250ms;
    }

    button:hover {
        background-color: rgba($color: #FFF, $alpha: 0.8);
        box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.3);
    }

    button:active {
        background-color: rgba($color: #FFF, $alpha: 0.2);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
</style>