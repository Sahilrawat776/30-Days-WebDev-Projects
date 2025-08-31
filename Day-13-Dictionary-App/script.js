const form = document.querySelector("#dictionary-form");
const input = document.querySelector("#word");
const output = document.querySelector("#output");


form.addEventListener("submit", async(e) =>{
    e.preventDefault();
    const word = input.value.trim();
    if(!word) return;

    output.innerHTML = "<p>Loading...</p>";

    try{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if(!res.ok) throw new Error("Word not found");
    const data  = await res.json()
    
    const entry = data[0];
    const phonetic = entry.phonetics[0]?.text || "";
    const meaning = entry.meanings[0].definitions[0].definition;

    output.innerHTML = `
        <h2>${entry.word}</h2>
        <p><strong>Phonetic :</strong> ${phonetic}</p>
        <p><strong>Meaning :</strong> ${meaning}</p>`;

    }catch(error){
        output.innerHTML = `<p style="color:red";> ❌ Word not found. Try Again.</p>`;
    }
})
