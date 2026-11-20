async function getDailyQuote() {
  const today = new Date().toISOString().slice(0, 10);
  const cacheKey = "catlist_daily_quote";

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
    if (cached && cached.date === today) {
      return cached.data;
    }
  } catch (_) {
    // Ignore storage access errors (e.g., private browsing)
  }

  const response = await fetch("https://quoteslate.vercel.app/api/quotes/random?tags=motivation,inspiration");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json(); // { id, quote, author, length, tags }

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ date: today, data }));
  } catch (_) {
    // Ignore storage quota/access errors
  }

  return data;
}

getDailyQuote().then(res => {
    document.getElementById('quote').innerHTML = `<strong>QUOTE OF THE DAY:</strong><br><br>"${res.quote}" - ${res.author}`
})

getList().then(res => {
  if (!res || res.length === 0) return;

  document.getElementById('topl').innerText = `Top 1: ${res[0].Level}`;

  const choices = res.map(item => encodeURIComponent(item.Level)).join(',');
  document.getElementById('wheel').href = `https://pickerwheel.com/emb/?choices=${choices}`;
});

getChanges().then(res => {
  document.getElementById('changes').innerText = `${res[res.length-1]}\n${res[res.length-2]}\n${res[res.length-3]}\n${res[res.length-4]}\n${res[res.length-5]}`
})