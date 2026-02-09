build:
	docker build -t daily-mood-backend .

run:
	docker run -p 4000:4000 daily-mood-backend

deploy:
	gcloud run deploy daily-mood-backend \
		--image gcr.io/PROJECT_ID/daily-mood-backend \
		--platform managed \
		--region asia-southeast1 \
		--allow-unauthenticated

git-status:
	git status

git-log:
	git log --oneline

