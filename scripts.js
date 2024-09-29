const URL = "https://teachablemachine.withgoogle.com/models/DXbwDydIK/";

let model, labelContainer, maxPredictions;

// Load the Teachable Machine model
async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    
    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup the label container
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

// Handle image upload and process it
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected.");
        return; // Exit if no file is selected
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
        const img = new Image();
        img.onload = async function () {
            const canvas = document.getElementById('uploaded-image-container');
            const context = canvas.getContext('2d');
            canvas.width = 320;
            canvas.height = 240;

            // Draw the uploaded image on the canvas
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Call the predict function to get predictions on the uploaded image
            await predict(canvas);
        };
        img.src = e.target.result; // Set the source of the image to the file URL
    };
    reader.readAsDataURL(file); // Read the image file as a data URL
}

// Predict function for the uploaded image
async function predict(canvas) {
    const prediction = await model.predict(canvas);
    
    // Update label container with prediction results
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

// Function to stop the webcam
function stopWebcam() {
    if (webcam && webcam.webcam) {
        const stream = webcam.webcam.stream;
        stream.getTracks().forEach(track => track.stop()); // Stop all webcam tracks
    }
}

// Load the model once the page is ready
window.onload = loadModel;
