getList().then(res => {
    let players = {}
    for (let i = 0; i < res.length; i++) {
        const lvl = res[i]
        // Check verifier(s)
        {
            const plrs = lvl.Verifier.split(", ")
            for (let j = 0; j < plrs.length; j++) {
                if (players[plrs[j]] == undefined) {players[plrs[j]] = Number(lvl.Points)} else {players[plrs[j]] += Number(lvl.Points)}
            }
        }
        // Check completions
        {
            const plrs = lvl.Victors.split(", ")
            for (let j = 0; j < plrs.length; j++) {
                if (players[plrs[j]] == undefined) {players[plrs[j]] = Number(lvl.Points)} else {players[plrs[j]] += Number(lvl.Points)}
            }
        }
    }
    return players
}).then(res => {
    const players = Object.entries(res).filter(([player]) => player.trim() !== "").sort(([, a], [, b]) => b - a);
    players.forEach(([player, score], idx) => {
        document.getElementById('leaderboard').innerHTML += `<a href="player/index.html?p=${player}">#${idx+1}: ${player} (${Math.floor(score*100)/100})</a>` 
    });
})