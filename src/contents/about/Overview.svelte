<script>
    import { read, write } from "../../lib/PersistantStorage";

    function makeid(length) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    const serial =
        read("mecos", "serialnumber") || write("mecos", "serialnumber", makeid(4)+"CUM"+makeid(5));
</script>

<h1>MEC OS XXX Compooper</h1>
<div class="about">
    <img src="/mecos.png" alt="mec OS icon">
<pre>
    <span>MEC OwOS XXX</span>
    <b>iCwoud PC</b>
    CPU: 42x Intol sPermtium 6,9 Ghz
    RAM: -1 MB
    GPU: NoVidiu DiVORCE 6090 rtx 13gb
    Startup Disk: /homework
    Serial Number: {serial}
</pre>
</div>

<style lang="scss">
    .about {
        display: flex;
        flex-direction: row;
        img {
            max-width: 30%;
        }
        span {
            font-size: 1.5rem;
        }
}
</style>