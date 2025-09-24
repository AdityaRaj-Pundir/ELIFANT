const API_KEY = "AIzaSyAJezQIX3ZGvss53jlUL8s3uWis-MACxHY";
let steps = [];
let currentStep = 0;

document.getElementById("findRecipeBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fridgeFile");
    if (!fileInput.files.length) {
        alert("Please select a fridge picture!");
        return;
    }
    const element = document.getElementById("landing");
    element.remove();
    const file = fileInput.files[0];
    document.getElementById("loading").style.display = "block";
    document.getElementById("recipeContainer").style.display = "none";

    const reader = new FileReader();

    reader.onload = async function(e) {
        const base64Image = e.target.result.split(",")[1];

        if (e.target.result[0]) {
             // Create an Object URL
            document.getElementById('preview').src = e.target.result; // Set <img> src
        }

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: "DO NOT USE MARKDOWN WHEN GENERATING TEXT. Look at this picture of my fridge. List out all the ingredients in the fridge in a comma separated list all at once in this format: 'The ingredients in your fridge are: a, b, c...'. Suggest a simple recipe I can make. Explain it step by step in simple words. " +
                                            "If you want to suggest recipes that have ingredients not in the fridge, give the user an instacart link to buy that ingredient. Number the steps clearly. Return the output in plaintext format." },
                                    { inline_data: { mime_type: file.type, data: base64Image } }
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();
            document.getElementById("loading").style.display = "none";
            document.getElementById('preview').style.display = "block";

            if (!data.candidates || !data.candidates[0].content.parts[0].text) {
                alert("⚠️ No recipe returned. Try again.");
                return;
            }

            const recipeText = data.candidates[0].content.parts[0].text;
            steps = recipeText.split(/\n\d+\.|\n-\s*/).filter(s => s.trim() !== "");
            currentStep = 0;

            if (steps.length > 0) {
                document.getElementById("recipeContainer").style.display = "block";
                showStep();
            }
        } catch (err) {
            document.getElementById("loading").style.display = "none";
            alert("⚠️ Error talking to Gemini API.");
            console.error(err);
        }
    };

    reader.readAsDataURL(file);
});

function showStep() {
    document.getElementById("stepText").innerText = steps[currentStep].trim();

    document.getElementById("prevBtn").style.display = currentStep > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").innerText = currentStep < steps.length - 1 ? "Next" : "🎉 Done!";
    document.getElementById("nextBtn").style.background = currentStep < steps.length - 1 ? "linear-gradient(135deg, #ff914d, #ff6f3c)" : "linear-gradient(135deg, #7016bc, #f35821)";
}

document.getElementById("prevBtn").addEventListener("click", function() {
    if (currentStep > 0) {
        currentStep--;
        showStep();
    }
});

document.getElementById("nextBtn").addEventListener("click", function() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep();
    } else {
        document.getElementById("stepText").innerText = "🎉 Yay! You finished cooking!";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    }
});
