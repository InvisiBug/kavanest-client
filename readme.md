# KavaNest Client
![Cover Image](https://i.imgur.com/ythrYHa.png)


[![Live pipeline](https://github.com/InvisiBug/kavanest-client/actions/workflows/live.yaml/badge.svg)](https://github.com/InvisiBug/kavanest-client/actions/workflows/live.yaml)
[![Test pipeline](https://github.com/InvisiBug/kavanest-client/actions/workflows/test.yaml/badge.svg)](https://github.com/InvisiBug/kavanest-client/actions/workflows/test.yaml)

This is the `Client` microservice of my KavaNest home automation system which is made up of the following components
* Client
* [API](https://github.com/InvisiBug/kavanest-api)
* [Controller (Skippy)](https://github.com/InvisiBug/kavanest-controller)
* [Device Listener (Scraper)](https://github.com/InvisiBug/kavanest-scraper)
* [Devices](https://github.com/InvisiBug/Devices)

## Components
### Technologies used

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Emotion](https://img.shields.io/badge/Emotion-DB7093?logo=styled-components&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/ApolloClient-311C87?logo=apollo-graphql)
![Socket.io](https://img.shields.io/badge/Socket.io-black?logo=socket.io&badgeColor=010101)

### Dev tech used

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)
![TypeScript](https://img.shields.io/badge/Typescript-007ACC?logo=typescript&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?logo=helm)
![Docker](https://img.shields.io/badge/Docker-0db7ed?logo=docker&logoColor=white)


# What is this part (Client)
The client is the primary way of interacting with the system that has been built for both mobile and desktop use.

## The client app
Heating|Lights|Computer|Heated Blanket
:-:|:-:|:-:|:-:
<img src="readmeImages/heating.png" height="280" />|<img src="readmeImages/lights.png" height="280" />|<img src="readmeImages/computer.png" height="280" />|<img src="readmeImages/blanket.png" height="280" />

<!-- ![](client/readmeImages/4.png =100x200)![](client/readmeImages/1.png =100x200)![](client/readmeImages/3.png =100x200)![](client/readmeImages/4.png =100x200) -->

# What is KavaNest
The system, I’m calling KavaNest is a zone based heating system that controls my house. It allows me to control the temperature of each room independently of the others, meaning I can heat just my office during the day and turn the heating on in the living room in the evening so it’s nice and warm when people get in from work.

## The aim of the system
- Every room can be heated independently of the others
- A central place to control various lights around my house
- Act as a timer for my heated matress in the winter
- Historical data viewable in Grafana
- A way to access my computer when I'm away from home
- All built and run internally to my home network, no phoning home to nasty companies that will sell your data

## How the system works
Each room has a temperature sensor and a thermostatic radiator valve which allows the system to monitor the temperature of the rooms and direct hot water to specific radiators independently of the others. A schedule controller looks at the desired temperature versus the actual temperature and activates the heating if it's needed. At this point, the boiler switches on, the radiator valves in there rooms that don't need heat all close, and the valve in the room that requires heat opens.

## The components of the system

* Physical devices like temperature sensors and radiator valves connect to my home wifi and communicate via MQTT.

* A Node.js app listens to the MQTT messages and updates a mongo store thats keeps track of the state of the system, this node app also sends push messages to the client when something changes.

* A GraphQL API is used to interface with the system which reads and updates the data in the mongo store along with communicating with the physical devices via the MQTT network.

* Another Node.js app acts at the automation controller for the system. It uses the GraphQL API to read the current system state and update anything that needs changing like radiator valves.

* A React client app is used to interact with the system, which has been designed for mobile and desktop use. The client app mainly uses the GraphQL API, along with push messages that are sent to the client, via a web socket connection, every time something changes with the system.

* There is a Grafana dashboard that trends various data points like room temperatures and radiator valve states. This historical data has proven useful for optimizing the system, and diagnosing issues if anything strange is happening. Prometheus is used to monitor the different Raspberry Pi’s in my cluster as well as some other devices all of which have their own status dashboard.

* Along side all of this is a test environment with a simulator that replicates the physical devices. This test environment is used when I want to try out new features, this way my house mates don’t have to go without heating when I break something.

* The system is fully dockerized and is capable of being run on pretty much any platform. I have it running on my K3s cluster consisting of 3 Raspberry Pi 4Bs. Running things locally means that everything will work so long as the wifi signal is present, with no need for internet access and no company selling your data.