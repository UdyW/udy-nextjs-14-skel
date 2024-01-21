DOCKER_COMPOSE ?= docker-compose

NPM ?= ${DOCKER_COMPOSE} -f docker-compose.build.yml run --rm npm

# Dependencies
node_modules:
	${NPM} install

depend: node_modules

# Running
run_dev: DOCKER_COMPOSE := ${DOCKER_COMPOSE} -f docker-compose.dev.yml
run_dev:
	${DOCKER_COMPOSE} --env-file ./.env.dev up --remove-orphans --force-recreate app wiremock

# Cleaning
clean:
	rm -rf build
	rm -rf coverage

clean-vendor:
	rm -rf node_modules

clean-docker:
	-${DOCKER} stop $$(${DOCKER} ps -aq) && ${DOCKER} rm $$(${DOCKER} ps -aq)

clean-all: clean clean-vendor clean-docker