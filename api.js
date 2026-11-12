const listurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhnLyFxmnmKICXDLAxQU1kzIqdmRAhcir3mVHp3OCZ_1xqcjYPBL825NmkygoyzmBQzerK_vRwa50k/pub?gid=0&single=true&output=csv"

const ext = 25
const leg = 50

function getList() {
    return fetch(listurl)
        .then((res) => {return res.text()})
        .then((res) => {
            return Papa.parse(res, {
                header: true
            }).data
        })
}

function getFromPlace(place) {
    return getList()
        .then(res => {
            return res[place-1]
        })
}

function getFromName(name) {
    return getList()
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].Level.toLowerCase() == name.toLowerCase()) {
                    return res[i]
                }
            }
            return null
        })
}

function getFromNameCreator(name, creator) {
    return getList()
        .then(res => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].Level.toLowerCase() == name.toLowerCase() && res[i].Creator.toLowerCase() == creator.toLowerCase()) {
                    return res[i]
                }
            }
            return null
        })
}

