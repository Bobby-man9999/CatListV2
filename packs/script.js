getListByID().then(list => {
    getPacks().then(packs => {
        for (let i = 0; i < packs.length; i++) {
            console.log(packs[i])
            console.log(list[packs[i].Levels.split(", ")[0]])
            let pack = `<div class="innercontainer" style="position: relative">`
            pack += `<h2 class="name">${packs[i].Name}</h2>`
            pack += `<p class="author">By ${packs[i].Author}</p>`
            pack += `<p class="desc">Description: "${packs[i].Description}"</p>`
            let points = 0
            for (let j = 0; j < packs[i].Levels.split(", ").length; j++) {
                pack += `<a href="../main/index.html?l=${packs[i].Levels.split(", ")[j]}" target="_blank">#${list[packs[i].Levels.split(", ")[j]].idx+1}: ${list[packs[i].Levels.split(", ")[j]].Level} (${packs[i].Levels.split(", ")[j]})</a>`
                points += Number(list[packs[i].Levels.split(", ")[j]].Points)
            }
            pack += `<p style="font-size: 10px; color: #9b88a5; position: absolute; top: 0px; right: 7px;">${Math.floor(points * 100)/100}p</p>`
            pack += "</div>"
            document.getElementById('packs').innerHTML += pack
        }
    })
})

function search() {
    const s = document.getElementById('search').value
    for (const pack of document.getElementById('packs').children) {
        pack.style.display = (pack.querySelector('.author').innerText.toLowerCase().includes(s.toLowerCase()) || pack.querySelector('.desc').innerText.toLowerCase().includes(s.toLowerCase()) || pack.querySelector('.name').innerText.toLowerCase().includes(s.toLowerCase())) ? 'block' : 'none'
    }
}