getList().then(res => {
    for (let i = 0; i < res.length; i++) {
        const entry = document.getElementById("listentry").content.cloneNode(true).firstElementChild
        entry.querySelector(".title").innerText = `#${i+1}: ${res[i].Level}` // <h2>
        entry.querySelector(".desc").innerText = `Uploaded by: ${res[i].Uploader}` // <p>
        entry.querySelector(".points").innerText = `Points on completion: ${res[i].Points}` // <p>
        entry.querySelector(".victors").innerText = `${res[i].Victors == "" ? "No victors" : `${res[i].Victors.split(", ").length} victor${res[i].Victors.split(", ").length == 1 ? "" : "s"}`}` // <p>
        //entry.querySelector(".image").setAttribute("loading", "lazy");
        //entry.querySelector(".image").setAttribute("decoding", "async");
        const thumbnailId = res[i].Thumbnail ? res[i].Thumbnail.trim() : "";

        if (thumbnailId) {
            entry.querySelector(".image").onerror = () => {
                entry.querySelector(".image").onerror = null;
                entry.querySelector(".image").src = "nothumb.png";
            };
            
            entry.querySelector(".image").src = `https://lh3.googleusercontent.com/d/${thumbnailId}`;
        } else {
            entry.querySelector(".image").src = "nothumb.png";
        }
        entry.onclick = () => {
            const view = document.getElementById('view');
            view.style.opacity = "0";
            view.style.transform = "translateX(20px)";
            setTimeout(() => {
                view.style.opacity = "1";
                view.style.transform = "";
                document.getElementById('view').scrollTop = 0
                document.getElementById('img').src = `${i+1}: ${res[i].Level}`
                const thumbnailId = res[i].Thumbnail ? res[i].Thumbnail.trim() : "";

                if (thumbnailId) {
                    // 1. Set the error handler FIRST
                    document.getElementById('img').onerror = () => {
                        document.getElementById('img').onerror = null; // Prevents infinite loop if fallback also breaks
                        document.getElementById('img').style.display = "none"
                    };
                    
                    // 2. Set the actual source SECOND
                    document.getElementById('img').style.display = "block"
                    document.getElementById('img').src = `https://lh3.googleusercontent.com/d/${thumbnailId}`;
                } else {
                    // 3. No Thumbnail ID in sheet: apply fallback directly
                    document.getElementById('img').style.display = "none"
                }
                document.getElementById('title').innerText = `${i+1}: ${res[i].Level}`
                document.getElementById('desc').innerText = `Verified by: ${res[i].Verifier}\nCreated by: ${res[i].Creator}\nUploaded by: ${res[i].Uploader}`
                document.getElementById('id').innerText = `ID: ${res[i].ID}`
                document.getElementById('points').innerText = `Points on completion: ${res[i].Points}`
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
            }, 500);
        }
        document.getElementById('list').appendChild(entry)
    }
})