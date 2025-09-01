const btn = document.querySelector("#btn");
const output = document.querySelector("#output");

btn.addEventListener("click", async(e) =>{
    e.preventDefault();
    
    output.innerHTML = "<p>Loading...</p>";

    try{
       const res = await fetch(
         `https://official-joke-api.appspot.com/jokes/random`
       );
       if(!res.ok) throw new Error("Joke not found");
       const data = await res.json();
       console.log(data);
       output.innerHTML = `<p>${data.setup}</p>
       <p>${data.punchline}</p>`;

    }catch(error){
        output.innerHTML = `<p style="color:red";> ❌ Joke not found. Try Again.</p>`;
    }

})

