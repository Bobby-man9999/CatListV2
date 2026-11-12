getList().then(res => {
    for (let i = 0; i < res.length; i++) {
        const entry = document.getElementById("listentry").content.cloneNode(true).firstElementChild
        entry.querySelector(".title").innerText = `#${i+1}: ${res[i].Level}` // <h2>
        entry.querySelector(".desc").innerText = `Verified by: ${res[i].Verifier} | Created by: ${res[i].Creator}` // <p>
        entry.querySelector(".image").setAttribute("loading", "lazy");
        entry.querySelector(".image").setAttribute("decoding", "async");
        const thumbnailId = res[i].Thumbnail ? res[i].Thumbnail.trim() : "";

        if (thumbnailId) {
            // 1. Set the error handler FIRST
            entry.querySelector(".image").onerror = () => {
                entry.querySelector(".image").onerror = null; // Prevents infinite loop if fallback also breaks
                entry.querySelector(".image").src = "nothumb.png";
            };
            
            // 2. Set the actual source SECOND
            entry.querySelector(".image").src = `https://lh3.googleusercontent.com/d/${thumbnailId}`;
        } else {
            // 3. No Thumbnail ID in sheet: apply fallback directly
            entry.querySelector(".image").src = "nothumb.png";
        }
        entry.onclick = () => {
            document.getElementById('img').src = `${i+1}: ${res[i].Level}`
                    const thumbnailId = res[i].Thumbnail ? res[i].Thumbnail.trim() : "";

        if (thumbnailId) {
            // 1. Set the error handler FIRST
            document.getElementById('img').onerror = () => {
                document.getElementById('img').onerror = null; // Prevents infinite loop if fallback also breaks
                document.getElementById('img').src = "nothumb.png";
            };
            
            // 2. Set the actual source SECOND
            document.getElementById('img').src = `https://lh3.googleusercontent.com/d/${thumbnailId}`;
        } else {
            // 3. No Thumbnail ID in sheet: apply fallback directly
            document.getElementById('img').src = "nothumb.png";
        }
            document.getElementById('title').innerText = `${i+1}: ${res[i].Level}`
            document.getElementById('desc').innerText = `Verified by: ${res[i].Verifier} | Created by: ${res[i].Creator}`
            document.getElementById('id').innerText = `ID: ${res[i].ID}`
            document.getElementById('date').innerText = `Placed on: ${res[i]["Date Placed"]}`
            const victors = document.getElementById('victors')
            if (res[i].Victors.trim() == "") {
                victors.innerText = "No Victors"
            } else {
                victors.innerText = "Victors:\n"
                for (let j = 0; j < res[i].Victors.split(", ").length; j++) {
                    victors.innerText += `#${j+1}: ${res[i].Victors.split(", ")[j]}\n`
                }
            }
        }
        document.getElementById('list').appendChild(entry)
    }
})