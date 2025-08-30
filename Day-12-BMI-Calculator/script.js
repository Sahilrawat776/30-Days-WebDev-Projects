const form = document.querySelector(".sub-container");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const age = Number(form.age.value);
    const height = Number(form.height.value) / 100;
    const weight = Number(form.weight.value);
    const gender = form.gender.value;

    const BMI = (weight / (height * height)).toFixed(1);

    document.getElementById("MyBMI").textContent = `Your BMI: ${BMI}`;

    let Status = "";
    if (age < 18) {
        Status = "⚠️ For children under 18, BMI is interpreted using growth charts by age and gender. Please consult a pediatric reference.";
    } else {

        if(BMI < 18.5){
            Status = "Underweight";
        }
        else if(BMI > 18.5 && BMI < 24.9){
            Status = "Normal Weight";
        }
        else if(BMI > 24.9 && BMI < 29.9){
            Status = "Overweight";
        }
        else{
            Status = "Obese";
        }
    }
    document.getElementById("Category").textContent = `Status: ${Status}`;
})
