const API_KEY = "AIzaSyDYfvp1hoHyD4KIlJzdlBge4_k-M1iPRj0"; // <--- put your Google API key here
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
                                    { text: "Look at this picture of my fridge. Suggest a simple recipe I can make. Explain it step by step in simple words. " +
                                            "Number the steps clearly. Return the output in plaintext format. DO NOT USE MARKDOWN." },
                                    { inline_data: { mime_type: file.type, data: base64Image } }
                                ]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();
            document.getElementById("loading").style.display = "none";

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
    document.getElementById("nextBtn").innerText = currentStep < steps.length - 1 ? "Next ➡" : "🎉 Done!";
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
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    }
});
