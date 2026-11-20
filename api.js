const listurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhnLyFxmnmKICXDLAxQU1kzIqdmRAhcir3mVHp3OCZ_1xqcjYPBL825NmkygoyzmBQzerK_vRwa50k/pub?gid=0&single=true&output=csv"
const packurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhnLyFxmnmKICXDLAxQU1kzIqdmRAhcir3mVHp3OCZ_1xqcjYPBL825NmkygoyzmBQzerK_vRwa50k/pub?gid=1378214317&single=true&output=csv"
const changeurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhnLyFxmnmKICXDLAxQU1kzIqdmRAhcir3mVHp3OCZ_1xqcjYPBL825NmkygoyzmBQzerK_vRwa50k/pub?gid=1263886573&single=true&output=csv"

function getList() {
    return fetch(listurl)
        .then((res) => {return res.text()})
        .then((res) => {
            return Papa.parse(res, {
                header: true
            }).data
        })
        .catch(reason => {
            alert(`Could not get list.\n\nReason:\n${reason}`)
        })
}

function getRawChanges() {
    return fetch(changeurl)
        .then((res) => {return res.text()})
        .then((res) => {
            return Papa.parse(res, {
                header: true
            }).data
        })
        .catch(reason => {
            alert(`Could not get list.\n\nReason:\n${reason}`)
        })
}

function formatChange(change) {
    switch (change.Type) {
        case "Movement":
            return `(${change.Date}): Moved ${change.Level} from #${change.From} to #${change.To}`
        case "Placement":
            return `(${change.Date}): Placed ${change.Level} at #${change.To}`
        case "Removal":
            return `(${change.Date}): Removed ${change.Level}`
    }
    return ""
}

function getChanges() {
    return getRawChanges().then(res => {
        let ls = []
        for (let i = 0; i < res.length; i++) {
            ls.push(formatChange(res[i]))
        }
        return ls
    })
}

function getPacks() {
    return fetch(packurl)
        .then((res) => {return res.text()})
        .then((res) => {
            return Papa.parse(res, {
                header: true
            }).data
        })
        .catch(reason => {
            alert(`Could not get packs.\n\nReason:\n${reason}`)
        })
}

function getListByID() {
    return getList().then(res => {
        let list = {}
        for (let i = 0; i < res.length; i++) {
            list[res[i].ID] = res[i]
            list[res[i].ID].idx = i
        }
        return list
    })
}