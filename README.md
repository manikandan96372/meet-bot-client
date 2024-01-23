# Meet bot client

A meet bot client that could assist a user in meetings with various functionalities

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Prerequisites

1. Node version 18
2. NPM version 9.5.1

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manikandan96372/meet-bot-client.git
   cd meet-bot-client

2. npm install

3. cp .env.example .env

4. npm start


## Usage

1. The meet bot client is now running at http://localhost:3000. You can use tools like Postman or cURL to interact with the endpoints.
2. It can automatically join a meeting when a meeting link is provided via an API
3. It can automatically mute and unmute microphone afterwards
4. It can automatically change the layout of the meeting afterwards
5. It can automatically send messages to other participants in the meeting
6. It can send the name of participants who joined the meeting as well as the presence of host of the meeting to meet bot server
7. It can automatically end a meeting
8. This client handles one meeting session at a time.

## Endpoints

1. Kindly refer to meet_bot_client.postman_collection.json at the root folder of the application.

2. It consists of all API endpoints and a sample request and response for API usage