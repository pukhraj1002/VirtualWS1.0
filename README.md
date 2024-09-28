# Virtual Workshop 1.0

## Overview
This virtual workshop walks you through the process of building and deploying a simple machine learning model using [Teachable Machine](https://teachablemachine.withgoogle.com/) and TensorFlow.js. We will create a model, export it, and host the final solution using GitHub and Netlify.

## Steps

### 1. Create a Teachable Machine Model
- **Sample Insert**: Upload a set of sample images or videos for each class to train the model.
- **Train Model**: Once the samples are uploaded, click on the "Train Model" button to begin training.

### 2. Save and Export the Model
- **Save the Model**: Once the model is trained, save it to your Google Drive for future use.
- **Export Model**: Export the model for use in web applications. Select the option to export it as a TensorFlow.js model.

### 3. Upload Model to Cloud
Upload the model files (including `model.json` and weights) to a cloud storage service such as Google Drive, GitHub, or any other cloud platform that allows public file hosting.

### 4. Add the Code
- **Get TensorFlow.js Code**: Copy the generated TensorFlow.js code snippet from the Teachable Machine export.
- **Create an `index.html` File**: In your local project folder, create an `index.html` file. Paste the copied TensorFlow.js code into this file.

  You can add the following line to display predictions as a percentage:
  ```javascript
  const classPrediction = prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
### 5. Upload to GitHub
- **Create a new repository** on GitHub.
- **Push the index.html** file along with the model files to this repository.
### 6. Deploy with Netlify
- **Go to Netlify.**
- **Connect your GitHub** repository to Netlify.
- **Deploy** the project by following Netlify's step-by-step deployment instructions.
