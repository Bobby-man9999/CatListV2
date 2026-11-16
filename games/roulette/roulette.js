let list
let percent = 0
let lvls = 0

function start() {
    document.getElementById('levels').innerHTML = ""
    getList().then(l=>{list=l;lvls=0;percent=0;next(0)})
}

function end() {
    if (document.getElementById('controls')) document.getElementById('controls').remove();
    document.getElementById('levels').insertAdjacentHTML('beforeend', `
        ${percent >= 100 ? "<h1>You Win!</h1>" : "<h1>Game Over!</h1>"}
        <p>Levels: ${lvls}/100</p>
        <p>Highest percent: ${percent}%</p>
    `)
}

function next(p) {
    if (Math.floor(p) >= 100) {
        percent = p
        end()
        return
    }
    if (Math.floor(p) >= Math.floor(percent)) {
        if (document.getElementById('controls')) document.getElementById('controls').remove();
        percent = p
        lvls += 1
        const idx = Math.floor(Math.random()*list.length)
        addLvl(idx)
    } else {
        alert("Get the precent requirement before continuing!")
    }
}

function addLvl(idx) {
    if ((list != null) && (list != undefined)) {
        console.log(list[idx])
        document.getElementById('levels').insertAdjacentHTML('beforeend', `
            <div class="level">
                <h1>${idx + 1}: ${list[idx].Level}</h1>
                <p class='id'>ID: ${list[idx].ID}</p>
                <p class='preq'>You need: ${Math.floor(Number(percent)+1)}</p>
                <div id="controls">
                    <input id='percent' type="number"></input>
                    <button onclick="next(Number(document.getElementById('percent').value));">Next</button>
                    <button onclick="end()">Give Up</button>
                </div>
            </div>
        `);
    }
}