<script>
    import { read, write } from "../lib/PersistantStorage";

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
<pre>
    <b>iCwoud PC</b>
    CPU: 42x Intol sPermtium 6,9 Ghz
    RAM: -1 MB
    GPU: NoVidiu DiVORCE 6090 rtx 13gb
    Startup Disk: /homework
    Serial Number: {serial}
</pre>
<iframe
    width="853"
    height="480"
    src="https://hqapps.tk/"
    title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
    frameborder="0"
/>
