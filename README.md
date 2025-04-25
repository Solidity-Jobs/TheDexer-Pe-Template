Below is an improved version of the documentation:

---

# TheDexer-PE Documentation

This guide explains how to set up and run the TheDexer-PE private endpoint. It covers installing the required software, setting up the environment, running Docker containers, and details on the project's API endpoints and CLI commands.

---

## Prerequisites

Before starting, ensure that you have the following installed on your local machine or server:

- **Docker & Docker Compose**  
  - **Docker Engine Installation:**  
    [Install Docker Engine](https://docs.docker.com/engine/install/)
  - **Docker Compose Installation:**  
    [Install Docker Compose](https://docs.docker.com/compose/install/)

- **Node.js & npm**  
  Install using:
  ```bash
  sudo apt-get install nodejs npm
  ```

---

## Update Node.js Version

If you need to update Node.js to a specific version (for example, `v20.18.3`), follow these steps:

1. **Clean the npm cache:**
   ```bash
   npm cache clean -f
   ```
2. **Install the `n` package globally:**
   ```bash
   sudo npm install -g n
   ```
3. **Install the desired Node.js version:**
   ```bash
   sudo n v20.18.3
   ```
   _Replace `20.18.3` with the version you require._

---

## Project Setup

1. **Install Project Dependencies**

   Navigate to the project's root directory and run:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   In the project's root directory, create a `.env` file and add the following fields:
   ```dotenv
   MONGODB_URI="mongodb://localhost:64335/private"
   MONGODB_NAME="private"
   AUTH_SECRET="YourClientsAuthenticationSecret"
   JWT_SECRET="YourClientsJwtSecret"
   ```
   > **Note:** The `MONGODB_URI` and `MONGODB_NAME` values might change depending on your setup.

---

## Running with Docker Compose

1. **Update Ports (Optional)**  
   If needed, modify the ports in your `docker-compose.yml` file:
   - MongoDB: `64335` (or your preferred port)

2. **Build and Run Containers**

   Execute the following commands from the project root:
   ```bash
   docker-compose build
   docker-compose up
   ```
   This builds all containers defined in the `docker-compose.yml` file and then starts them.

---

## API Endpoints & Functions

### 1. Mnemonics
- **File:** `src/mnemonic.js`  
- **Endpoints:**
  - **POST Request:** Saves a mnemonic with a unique identifier and associated seed phrase.
  - **GET Request:** Generates wallet addresses based on the given mnemonic ID and the number of wallets specified.
  
  [Create Mnemonic Example](https://user-images.githubusercontent.com/23663250/190505933-fe28e642-927b-48db-9ded-625197519db5.png)

### 2. Validators
- **Directory:** `src/validators`  
- **Description:** Contains scripts that validate inputs and throw appropriate errors if validation fails.

### 3. Authentication Middleware
- **File:** `auth/auth.js`  
- **Middlewares:**
  - **Auth:** Verifies the token header (`x-dexer-token`) for GET requests.

> **Testing Authentication:**  
> Run:
> ```bash
> npm run generate
> ```
> Then test the Create Mnemonic (POST) and Query Mnemonic (GET) endpoints.

### 6. Encryption Utilities
- **File:** `src/utils/encryption.js`  
- **Functions:**
  - **Encryption:** Encrypts provided data using a randomly generated secret key and initialization vector.
  - **Decryption:** Decrypts data by validating the initialization vector and secret key.

## CLI Commands

The project includes several CLI commands to interact with mnemonics and wallet addresses:

1. **Create Mnemonic**
   ```bash
   npm run create-mnemonic
   ```
   _Prompts the user to input a mnemonic from the terminal and saves it._

2. **Update Mnemonic**
   ```bash
   npm run update-mnemonic
   ```
   _Prompts the user to input a new mnemonic, updating the previously saved mnemonic._

3. **Delete Mnemonic**
   ```bash
   npm run delete-mnemonic
   ```
   _Deletes all mnemonics saved in the database._

4. **Generate Wallet Addresses**
   ```bash
   npm run generate-address
   ```
   _Prompts the user to input the number of wallet addresses to generate for a given mnemonic._

---

## Final Notes

- Ensure your environment variables are correctly set in the `.env` file.
- Adjust Docker Compose port settings as necessary.
- Review the API endpoints for further integration or testing.
- For additional support or customizations, refer to the corresponding source files listed in the documentation.