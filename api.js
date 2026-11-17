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