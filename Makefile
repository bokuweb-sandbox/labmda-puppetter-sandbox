curdir := $(CURDIR)

build:
	-docker stop amazonlinux-neon
	docker run --rm --name amazonlinux-neon -d -it -v $(curdir):/work bokuweb/amazonlinux-neon
	-docker exec amazonlinux-neon rm deployment.zip && rm -rf node_modules
	docker exec amazonlinux-neon npm run setup
	docker exec amazonlinux-neon zip -r deployment.zip * -x "*.log" "makefile"
