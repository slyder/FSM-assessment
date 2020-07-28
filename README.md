# Backend Developer – Assessment

## TODO
- add docker-compose run
- add driver-penalty data
- replace TS-ANY type 

## SOLUTION NOTES

#### WHAT CAN BE IMPROVED

- configuration values could be moved to .env file with corresponding
configuration class
- shared files like schema definitions, constants, common services, etc could be moved into shared folder
- mongo, rabbitmq could be configured to store data into docker volumes or host system
- git submodules could be used instead of mono-repository
- in docker-compose add wait-for-rabbitmq.sh script for node-js services 

## INSTALLATION

```
git clone https://github.com/slyder/FSM-assessment

cd FSM-assessment
docker-compose build
docker-compose up -d
docker-compose logs -f fleet-api drive-simulation-service drive-penalty-service


```

## TASK

#### You are required to develop 3 microservices (using NodeJs) for a fictitious Fleet Management System (FMS) as follows:
1. Microservice_A: exposes an HTTP Restful API, that allows performing CRUD operations for the management of Fleet entities (i.e: Driver, Trip, Trip, etc). Also provides endpoints for assigning a Driver to a Trip
2. Microservice_B: simulates a Trip that is driven about a city. This microservice generates heartbeats on frequent time intervals that encapsulate the state of the car (car_id, geo-coordinates, speed, etc) and driver identity.
3. Microservice_C: consumes heartbeats to apply penalty points to drivers that are not driving in a behaved manner. 2 Penalty points are added for every Km over 60Km/h, 5 points for over 80Km/h.. Driver/Penalty point map is stored in a NoSQL store
4. Microservices should communicate amongst themselves using a simple message bus. Choose any bus of your choice.

#### Bonus Points
5. Use docker-compose to orchestrate the set up of your final project. Upload your project to GitHub/GitLab and include a link when responding.