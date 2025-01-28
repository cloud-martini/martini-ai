export default [
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
      input: [0.95, 0.85, 0.94, 0.80],
      output: [1], // Stable
    },
  ];