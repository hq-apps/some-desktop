const array_of_windows = []

$(document).ready(() => {
    for (let i = 0; i < 10; i++) {
        const id = Date.now().toString()
        array_of_windows.push({
            id,
            html: `<div class="window template">
        <div class="title">
            <div class="actual-title">
                EPIC
            </div>
            <div class="window-action">
                <p class="close" onclick='close("${id}")'>X</p>
            </div>
        </div>
        <div class="window-content">
            <h1>LOL</h1>
        </div>
    </div>`
        })
    }

    reload()
    $(".window").draggable()
})

function reload() {
    $("#windows").empty()
    for (const window of array_of_windows) {
        $("#windows").append(window.html)
    }
}

function close(id) {
    console.log(`does it actually work ${id}`)
    // array_of_windows.splice(array_of_windows.indexOf(e => e.id === id), 1)
    // reload()
}
// // $(".close").on('click', close(id))
// function close(id) {
//     console.log("does it actually work")
//     array_of_windows.splice(array_of_windows.indexOf(e => e.id === id), 1)
//     reload()
// }
