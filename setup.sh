#bash
npx wrangler d1 create cf-worker-d1

## Copy the console result to the wrangler.toml file
#	[[d1_databases]]
#		binding = "DB" # i.e. available in your Worker on env.DB
#		database_name = "cf-worker-d1"
#		database_id = "xxxxxxx-xxx-x-x-xx-xx"


wrangler kv:namespace create cf-worker-kv
## Copy the console result to the wrangler.toml file
#	{ binding = "cf_worker_kv", id = "xxxxxxxxx" }

npm run generate
## Run the next code with your sql file generated
# npx wrangler d1 execute cf-worker-d1 --local --file=./drizzle/*
