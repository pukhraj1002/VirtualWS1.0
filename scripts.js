const URL = "https://teachablemachine.withgoogle.com/models/DXbwDydIK/";

let model, webcam, labelContainer, maxPredictions;

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

    // Setup the webcam
    const flip = true; // whether to flip the webcam image
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Attach the webcam to the HTML
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

// Prediction loop for webcam
async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// Make predictions
async function predict() {
    const prediction = await model.predict(webcam.canvas);
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

// Event listener for the "Upload Image" link
document.getElementById('uploadLink').addEventListener('click', function(event) {
    stopWebcam(); // Stop the webcam when navigating to the upload page
});

// Load the model and start the webcam once the window is loaded
window.onload = loadModel;
