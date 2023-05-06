const windowTemplate = `<div class="window" id="win-{id}">
<div class="title">
    <div class="actual-title">
        EPIC
    </div>
    <div class="window-action">
        <p class="close">X</p>
    </div>
</div>
<div class="window-content">
    <h1>LOL</h1>
</div>
</div>`

const array_of_windows = []

$(document).ready(() => {
    for (let i = 0; i < 10; i++) {
        array_of_windows.push(new Window)
        /*const id = Date.now().toString()
        array_of_windows.push({
            id,
            html: `<div class="window" id="win-${id}">
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
        })*/
    }

    //reload()
    //$(".window").draggable()
})

function reload() {
    $("#windows").empty()
    for (const window of array_of_windows) {
        $("#windows").append(window.html)
    }
}

function close(id) {
    console.log(`does it actually work ${id}`)
    array_of_windows.forEach(e => {if(e.id === id){e.kms()}})
    // reload()
}
// // $(".close").on('click', close(id))
// function close(id) {
//     console.log("does it actually work")
//     array_of_windows.splice(array_of_windows.indexOf(e => e.id === id), 1)
//     reload()
// }

class Window {
    constructor() {
        this.id = (Date.now().toString() + (Math.random()*100).toString()).replace(".", "")
        this.html = windowTemplate.replaceAll("{id}", this.id)
        $("#windows").append(this.html)
        $(`#win-${this.id}`).draggable()
        
        setTimeout($(`#win-${this.id} .close`).on("click", this.kms), 10) // Wait until DOM has updated
    }
    
    kms() {
        $(`#win-${this.id}`).remove()
        array_of_windows.splice(array_of_windows.indexOf(this), 1)
    }
    test() {
        $(`#win-${this.id} .close`).on("click", () => close(this.id))
        return $(`#win-${this.id} .close`)
    }
}
