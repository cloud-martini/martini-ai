# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install Yarn globally
RUN npm install -g yarn
# Install the project dependencies using Yarn
RUN yarn install
# Copy the rest of the application files to the container
COPY . .
# Expose the application port
EXPOSE 3000
# Command to run the application
CMD ["node", "brain.js"]