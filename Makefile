UID := $(shell id -u)
GID := $(shell id -g)
CONTAINER := "node-api-users"

build:
	$(info Make: Building environment image.)
	UID=$(UID) GID=$(GID) docker-compose build --no-cache
	@make -s clean
 
up:
	$(info Make: Starting environment containers.)
	UID=$(UID) GID=$(GID) docker-compose up -d

down:
	$(info Make: Stopping environment containers.)
	@docker-compose stop
 
restart:
	$(info Make: Restarting environment containers.)
	@make -s down
	@make -s up

init:
	$(info Make: Initializing environment.)
	@docker exec -u www-data $(CONTAINER) cp .env.example .env
	@docker exec -u www-data $(CONTAINER) npm install

test:
	$(info Make: Starting environment tests.)

shell:
	$(info Make: Starting environment shell.)
	@docker exec -it $(CONTAINER) sh

clean:
	@docker system prune --volumes --force
