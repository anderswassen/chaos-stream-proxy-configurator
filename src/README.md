# Chaos Stream Proxy Configurator

The **Chaos Stream Proxy Configurator** is a web-based tool that allows users to generate a URL with custom delays applied to specific segments of an HLS stream. This tool is particularly useful when you want to simulate network issues or delays in a stream by modifying its segments through a chaos-proxy.

## Features

- Input the HLS stream URL.
- Input a custom chaos-proxy URL.
- Specify delay times in milliseconds.
- Define which segments to apply the delay to, or apply the delay to all segments using the `*` symbol.
- Automatically appends `https://` to URLs if not provided.
- Generates the final URL with the required delay settings.

## Getting Started

### Prerequisites

Before running the app, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Includes npm)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
   
2. Navigate to the project folder:
    ```bash
    cd chaos-stream-proxy-configurator
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the App

To run the app locally, use the following command:
```bash
npm start

## Docker

To run the Chaos Stream Proxy Configurator using Docker:

1. Build the Docker image:
   ```bash
   docker build -t chaos-stream-proxy-configurator .
