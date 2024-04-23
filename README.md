# Chandler Voice Assistant

Chandler is a voice application developed using Dialogflow, designed to provide information about celestial bodies, focusing primarily on planets within our solar system. This README serves as a guide to understand the project structure, functionalities, and future enhancements.

## Table of Contents

1. Description
2. Interaction Model
3. Fulfillment
4. User Testing
5. Demo

## Description

Chandler is a voice application created by Sai Sindhu Muppaneni for the Winter 2024 final project. It aims to satisfy curiosity about the solar system by providing information about planets, including details such as temperature, mass, gravity, and orbital positions.

## Interaction Model

Chandler consists of three main intents:

1. **PlanetOverviewIntent**: Provides detailed information about specific planets, such as temperature, mass, orbital period, and distance from the Sun.
2. **GravityIntent**: Offers insights into the gravitational pull on different planets compared to Earth.
3. **PlanetpositionIntent**: Answers questions about the position of planets in relation to the Sun.

Entities used:
- `@Planetname`: Represents the name of a celestial body.
- `@Details`: Denotes specific characteristics associated with a celestial body.
- `@pos`: Indicates the position or rank of a celestial body.

## Fulfillment

Chandler's fulfillment logic involves retrieving data from an external source via API calls. Each intent follows a similar pattern:

1. **PlanetOverviewIntent**: Constructs an API URL using the provided planet name and requested detail. Retrieves data from the API and formulates a response based on the available information.
2. **GravityIntent**: Constructs an API URL using the planet name to fetch relevant data. Calculates gravity based on the planet's characteristics and formulates a response.
3. **PlanetpositionIntent**: Formulates a response based on the provided position, indicating the planet's name and its position relative to the Sun.

## User Testing

User testing was conducted to assess Chandler's usability, accuracy, promptness, and overall satisfaction. Tasks were completed efficiently, and Likert scale testing indicated positive feedback across various aspects. Open-ended questions provided insights into users' experiences and suggestions for future improvements.


## Demo and Presentation

- [Demo Link](https://bot.dialogflow.com/e46ba9fb-005c-4201-ab57-fb1f3a98d7e1)

---

