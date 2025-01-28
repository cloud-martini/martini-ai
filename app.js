const tf = require("@tensorflow/tfjs-node");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Load the TensorFlow.js model
let model;
const loadModel = async () => {
  try {
    model = await tf.loadGraphModel("file://./build_stability_model_js/model.json");
    console.log("Model loaded successfully.");
  } catch (err) {
    console.error("Error loading model:", err);
  }
};

// API Endpoint to predict stability
app.post("/predict-stability", async (req, res) => {
  if (!model) {
    return res.status(500).send({ error: "Model not loaded yet." });
  }

  try {
    const buildData = req.body;

    // Extract and normalize features
    const unitTestRate = buildData.unitTests.passed / buildData.unitTests.total;
    const integrationTestRate =
      buildData.integrationTests.passed / buildData.integrationTests.total;
    const e2eTestRate = buildData.e2eTests.passed / buildData.e2eTests.total;
    const codeCoverage = buildData.codeCoverage;

    const input = tf.tensor2d([[unitTestRate, integrationTestRate, e2eTestRate, codeCoverage]]);

    // Predict using the model
    const prediction = model.predict(input);
    const stabilityScore = prediction.dataSync()[0]; // Extract the predicted score
    const isStable = stabilityScore > 0.5; // Threshold for stability

    res.send({
      stabilityScore: stabilityScore.toFixed(2),
      isStable,
      message: isStable
        ? "The build is stable and ready for deployment."
        : "The build is not stable enough for deployment.",
    });
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).send({ error: "Error during prediction." });
  }
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await loadModel();
});