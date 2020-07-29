# Backend Developer – Assessment

## SOLUTION NOTES

#### WHAT CAN BE IMPROVED

- configuration values could be moved to .env file with corresponding
configuration class
- shared files like schema definitions, constants, common services, etc could be moved into shared folder
- git submodules could be used instead of mono-repository
- mongo, rabbitmq could be configured to store data into docker volumes or host system
- in docker-compose add wait-for-rabbitmq.sh script for node-js services to avoid Disconnected from RMQ. Trying to reconnect 

## INSTALLATION

```
git clone https://github.com/slyder/FSM-assessment

cd FSM-assessment
docker-compose build
docker-compose up -d
docker-compose logs -f fleet-api drive-simulation-service drive-penalty-service
```

Wait until you see:
```
drive-penalty-service_1     | Driver Penalty Matching started
drive-simulation-service_1  | Driver Simulation started
```

Check if api is working. Create car and driver.
```
curl http://127.0.0.1:3000/cars

curl -d "name=Mazda&buildYear=2018" -X POST http://127.0.0.1:3000/cars

>>> {"_id":"5f21367b3c25dbdbace74792","name":"Mazda","buildYear":2018,"__v":0}

curl -d "name=John" -X POST http://127.0.0.1:3000/drivers

>>> {"_id":"5f2136be3c25db64b0e74793","name":"John","__v":0}

```

Take carId and driverId to make trip record:
```
curl -d "carId=[CARID]&driverId=[DRIVERID]" -X POST http://127.0.0.1:3000/trips

>>> {"_id":"5f2137233c25dbb90de74794","carId":"5f21367b3c25dbdbace74792","driverId":"5f2136be3c25db64b0e74793","__v":0}
```


After as trip created you should see similar log records:
```
fleet-api_1                 | emit trip-created 5f2137233c25dbb90de74794
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 13
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 9
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 6
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 18
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 18
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 19
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 23
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 26
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 30
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 33
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 38
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 41
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 53
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 64
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 2 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 70
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 2 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 71
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 2 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 68
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 2 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 72
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 2 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 82
drive-penalty-service_1     | penalty for driver 5f2136be3c25db64b0e74793 with 5 points
drive-simulation-service_1  | runMoveHeartbeat::movement updated, driverId: 5f2136be3c25db64b0e74793, speed: 36
```

You could see penalty points for drivers 
```
curl http://127.0.0.1:3000/drivers

>>> [{"_id":"5f2136be3c25db64b0e74793","name":"John","__v":0,"penaltyPoints":115}]
```


## TASK

#### You are required to develop 3 microservices (using NodeJs) for a fictitious Fleet Management System (FMS) as follows:
1. Microservice_A: exposes an HTTP Restful API, that allows performing CRUD operations for the management of Fleet entities (i.e: Driver, Trip, Trip, etc). Also provides endpoints for assigning a Driver to a Trip
2. Microservice_B: simulates a Trip that is driven about a city. This microservice generates heartbeats on frequent time intervals that encapsulate the state of the car (car_id, geo-coordinates, speed, etc) and driver identity.
3. Microservice_C: consumes heartbeats to apply penalty points to drivers that are not driving in a behaved manner. 2 Penalty points are added for every Km over 60Km/h, 5 points for over 80Km/h.. Driver/Penalty point map is stored in a NoSQL store
4. Microservices should communicate amongst themselves using a simple message bus. Choose any bus of your choice.

#### Bonus Points
5. Use docker-compose to orchestrate the set up of your final project. Upload your project to GitHub/GitLab and include a link when responding.