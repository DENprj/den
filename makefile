run:
	deno run  --allow-read --allow-net  ./src/app.ts --f ./test_data/normal.yaml
test:
	deno test  --allow-read