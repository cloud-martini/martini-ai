const express = require("express");
const bodyParser = require("body-parser");
const brain = require("brain.js");

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Initialize the neural network
const net = new brain.NeuralNetwork();

// Training data (formatted for the network)
const trainingData = [
  // Stable Builds
  {
    input: [0.9, 0.9, 0.9, 0.85],
    output: [1], // Stable
  },
  {
    input: [0.95, 0.95, 0.95, 0.9],
    output: [1], // Stable
  },
  {
    input: [0.85, 0.88, 0.9, 0.92],
    output: [1], // Stable
  },
  {
    input: [0.93, 0.92, 0.94, 0.88],
    output: [1], // Stable
  },
  {
    input: [0.91, 0.89, 0.93, 0.87],
    output: [1], // Stable
  },
  {
    input: [0.85, 0.87, 0.92, 0.9],
    output: [1], // Stable
  },
  {
    input: [0.9, 0.91, 0.89, 0.94],
    output: [1], // Stable
  },

  // Unstable Builds
  {
    input: [0.6, 0.5, 0.4, 0.7],
    output: [0], // Not stable
  },
  {
    input: [0.45, 0.35, 0.4, 0.6],
    output: [0], // Not stable
  },
  {
    input: [0.75, 0.6, 0.55, 0.65],
    output: [0], // Not stable
  },
  {
    input: [0.7, 0.5, 0.45, 0.6],
    output: [0], // Not stable
  },
  {
    input: [0.8, 0.7, 0.6, 0.75],
    output: [0], // Not stable
  },
  {
    input: [0.5, 0.6, 0.55, 0.6],
    output: [0], // Not stable
  },
  {
    input: [0.6, 0.45, 0.5, 0.65],
    output: [0], // Not stable
  },

  // Edge Cases - Mixture of Stable and Unstable
  {
    input: [0.8, 0.85, 0.8, 0.78],
    output: [0], // Not stable
  },
  {
    input: [0.78, 0.87, 0.88, 0.82],
    output: [1], // Stable
  },
  {
    input: [0.92, 0.85, 0.9, 0.79],
    output: [1], // Stable
  },
  {
    input: [0.7, 0.6, 0.7, 0.73],
    output: [0], // Not stable
  },
  {
    input: [0.85, 0.9, 0.85, 0.85],
    output: [1], // Stable
  },
  {
    input: [0.75, 0.8, 0.7, 0.76],
    output: [1], // Stable
  },
  {
    input: [0.6, 0.55, 0.58, 0.62],
    output: [0], // Not stable
  },

  // Extreme Edge Cases - Very High and Very Low Performance
  {
    input: [0.99, 0.99, 0.99, 0.99],
    output: [1], // Very stable
  },
  {
    input: [0.01, 0.01, 0.01, 0.01],
    output: [0], // Very unstable
  },
  {
    input: [0.99, 0.01, 0.99, 0.99],
    output: [1], // Stable
  },
  {
    input: [0.02, 0.02, 0.02, 0.03],
    output: [0], // Very unstable
  },
  {
    input: [0.95, 0.95, 0.93, 0.95],
    output: [1], // Very stable
  },
  {
    input: [0.98, 0.99, 0.96, 0.98],
    output: [1], // Very stable
  },

  // Varied Code Coverage
  {
    input: [0.7, 0.6, 0.8, 0.4],
    output: [0], // Not stable
  },
  {
    input: [0.9, 0.95, 0.92, 0.65],
    output: [1], // Stable
  },
  {
    input: [0.85, 0.86, 0.88, 0.79],
    output: [1], // Stable
  },
  {
    input: [0.9, 0.88, 0.91, 0.77],
    output: [1], // Stable
  },
  {
    input: [0.6, 0.65, 0.55, 0.72],
    output: [0], // Not stable
  },
  {
    input: [0.95, 0.85, 0.94, 0.8],
    output: [1], // Stable
  },
];

// Train the model
net.train(trainingData, {
  iterations: 20000, // Train for 20,000 iterations
  errorThresh: 0.005, // Target error
});

// API to calculate stability
app.post("/predict-stability", (req, res) => {
  try {
    const buildData = req.body;

    // Calculate test success rates
    const unitTestRate = buildData.unitTests.passed / buildData.unitTests.total;
    const integrationTestRate =
      buildData.integrationTests.passed / buildData.integrationTests.total;
    const e2eTestRate = buildData.e2eTests.passed / buildData.e2eTests.total;
    const codeCoverage = buildData.codeCoverage;

    // Prepare input for the neural network
    const inputData = [
      unitTestRate,
      integrationTestRate,
      e2eTestRate,
      codeCoverage,
    ];

    // Predict stability using the neural network
    const prediction = net.run(inputData);
    const stabilityScore = prediction[0];
    const isStable = stabilityScore > 0.5; // Threshold for stability

    // Send response
    res.send({
      stabilityScore: stabilityScore.toFixed(2),
      isStable,
      message: isStable
        ? "The build is stable and ready for deployment."
        : "The build is not stable enough for deployment.",
    });
  } catch (error) {
    console.error("Error in prediction:", error);
    res.status(500).send({ error: "Error in prediction." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
