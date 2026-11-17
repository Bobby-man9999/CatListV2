function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function getTotalPoints(n) {
  let total = 0;

  for (let place = 1; place <= n; place++) {
    total += Math.floor((100 / place) * 100) / 100;
  }

  // Fixes JavaScript floating-point quirks (like 183.32999999999998)
  return Number(total.toFixed(2));
}

const p = GetURLParameter("p")
getList().then(list => {
    let plr = {
        'name': p,
        'comp': [],
        'ucomp': [],
        'create': [],
        'verif': [],
        'points': 0,
    }
    for (let i = 0; i < list.length; i++) {
        const lvl = list[i]
        lvl.Completions = [...lvl.Verifier.split(", "), ...lvl.Victors.split(", ")]
        if (lvl.Completions.find(comp=>comp==p) != undefined) {plr.comp.push(lvl.Level);plr.points+=Number(lvl.Points)} else {plr.ucomp.push(lvl.Level)}
        if (lvl.Verifier.split(", ").find(v=>v==p)) {plr.verif.push(lvl.Level)}
        if (lvl.Creator == p) {plr.create.push(lvl.Level)}
    }
    return {'p': plr, 'l': list}
}).then(res => {
    const plr = res.p
    if (plr != null && plr != undefined) {
        document.getElementById('name').innerText = `${plr.name}'s profile`
        document.getElementById('score').innerText = `Points: ${Math.floor(plr.points*100)/100}/${getTotalPoints(res.l.length)} (${Math.floor((Math.floor(plr.points*100)/100)/(getTotalPoints(res.l.length))*1000)/10}%)`
        document.getElementById('completions').innerText = `Completions (${plr.comp.length}, ${Math.floor(plr.comp.length/res.l.length*1000)/10}%): ${plr.comp.join(", ")}`
        document.getElementById('uncompleted').innerText = `Uncompleted (${plr.ucomp.length}, ${Math.floor(plr.ucomp.length/res.l.length*1000)/10}%): ${plr.ucomp.join(", ")}`
        document.getElementById('verifications').innerText = `Verifications (${plr.verif.length}, ${Math.floor(plr.verif.length/res.l.length*1000)/10}%): ${plr.verif.join(", ")}`
        document.getElementById('creations').innerText = `Creations (${plr.create.length}, ${Math.floor(plr.create.length/res.l.length*1000)/10}%): ${plr.create.join(", ")}`
    }
})