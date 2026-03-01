.PHONY: build run stop clean logs

build:
	docker build -t decoder-app-frontend .

run:
	docker run -d -p 3000:80 --name decoder-frontend decoder-app-frontend

stop:
	docker stop decoder-frontend || true
	docker rm decoder-frontend || true

clean: stop
	docker rmi decoder-app-frontend || true

logs:
	docker logs decoder-frontend