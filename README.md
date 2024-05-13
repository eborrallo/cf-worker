# CF-Worker Blockchain Auth API

This project, named `cf-worker`, is a Web API designed to be deployed on Cloudflare Workers. It's written in TypeScript and JavaScript, and uses SQL for database interactions. The project is managed with npm.

The API is specifically designed for blockchain authentication, providing endpoints to create messages and validate signatures, returning a token upon successful validation.

## Key Features

- **Cloudflare Workers**: The project is designed to be deployed on Cloudflare Workers, a serverless platform that allows you to create and deploy your applications globally.

- **Durable Objects (D1)**: The project uses Durable Objects for stateful serverless, providing a new approach for storing and managing state in a serverless environment.

- **KV Storage**: The project uses Cloudflare's KV storage for storing key-value pairs. This provides low-latency access to data from anywhere in the world.

- **Drizzle ORM**: The project uses Drizzle as an ORM for managing database operations in a more structured and efficient way.


## Configuration

The project's configuration is managed through the `wrangler.toml` file. This includes settings for KV namespaces, D1 databases, and other Cloudflare features.

## Getting Started

1. Clone the repository: `git clone https://github.com/eborrallo/cf-worker.git`
2. Install the dependencies: `npm install`
2. Init Db: `npm run generate`
3. Start the development server: `npm run dev`
4. Build the project: `npm run build`
5. Deploy the project: `npm run deploy`

## API Endpoints

- **Create Message**: Endpoint to create a new message for blockchain authentication.
- **Validate Signature**: Endpoint to validate the signature of a message. Returns a token upon successful validation.
