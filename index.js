// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const axios= require('axios');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
function PlanetOverviewIntent(agent) {
    const planet = agent.parameters.Planetname;
    const details = agent.parameters.Details.toLowerCase(); // Convert to lowercase to ensure case-insensitive comparison
    const apiUrl = `https://api.api-ninjas.com/v1/planets?name=${planet}&x-api-key=048iJIor2P72ucck5zvymQ==PyIC2mpkxkKI9GNr`;

    return axios.get(apiUrl)
        .then(response => {
            if (response.data.length > 0) {
                const planetData = response.data[0];
                let responseText = '';

                if (details === 'temperature') {
                    const temperature = planetData.temperature;
                    responseText = `The average temperature on ${planet} is around ${temperature} Kelvin, which is extremely cold by Earth standards.`;
                } else if (details === 'mass') {
                    const mass = planetData.mass;
                    responseText = `The mass of ${planet} is approximately ${mass} times that of Earth.`;
                } else if (details === 'orbital period') {
                    const orbitalPeriod = planetData.orbital_period;
                    responseText = `The orbital period of ${planet} is about ${orbitalPeriod} Earth days.`;
                } else if (details === 'far' || details === 'distance') {
                    const distance = planetData.distance_light_year;
                    responseText = `The distance of ${planet} from the Sun is roughly ${distance} million kilometers.`;
                } else if (details === 'radius') {
                    const radius = planetData.radius;
                    responseText = `The radius of ${planet} is approximately ${radius} * 10^27 kilometers.`;
                } else {
                    responseText = `Sorry, I don't have information on that detail for ${planet}.`;
                }

                agent.add(responseText);
            } else {
                agent.add(`I couldn't find information on the planet ${planet}. Please check the planet name and try again.`);
            }
        })
        .catch(error => {
            console.error('Error fetching information:', error);
            agent.add(`Sorry, I couldn't fetch information for ${planet} at the moment. Please try again later.`);
        });
}
	const axios = require('axios');

function GravityIntent(agent) {
        const planet = agent.parameters.Planetname;
        const apiUrl = `https://api.api-ninjas.com/v1/planets?name=${planet}&x-api-key=048iJIor2P72ucck5zvymQ==PyIC2mpkxkKI9GNr`;

        return axios.get(apiUrl)
            .then(response => {
                const radius = response.data[0].radius;
                let responseText = '';
                const earthGravity = 9.80665;
                if (planet == 'Earth' || planet =='Venus') {
                    const radiusInKm = radius * 100000;
                    responseText = `The gravity on ${planet} is ${earthGravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else if (planet == 'Jupiter') {
                    const gravity = earthGravity * 2.5;
                    const radiusInKm = radius * 100000;
                    responseText = `The gravity on ${planet} is ${gravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else if (planet == 'Mercury' || planet == 'Mars') {
                    const gravity = earthGravity / 3;
                    const radiusInKm = radius * 100000;
                    responseText = `The gravity on ${planet} is ${gravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else if (planet == 'Saturn') {
                    const gravity = earthGravity + 1.25;
                    const radiusInKm = radius * 100000;
                    responseText = `The gravity on ${planet} is ${gravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else if (planet == 'Uranus') {
                    const gravity = earthGravity - 1.02;
                    const radiusInKm = radius *100000;
                    responseText = `The gravity on ${planet} is ${gravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else if (planet == 'Neptune') {
                    const gravity = earthGravity + 2.99;
                    const radiusInKm = radius *100000;
                    responseText = `The gravity on ${planet} is ${gravity} m/s² with a radius of ${radiusInKm} kilometers.`;
                } else {
                    responseText = `The gravity on Earth is ${earthGravity} m/s².`;
                }

                agent.add(responseText);
            })
            .catch(error => {
                console.error('Error fetching information:', error);
                agent.add(`Sorry, I couldn't fetch information for ${planet} at the moment. Please try again later.`);
            });
    }

function PlanetpositionIntent(agent) {
    const position = agent.parameters.pos;
    let response='';
    switch (position) {
        case 'first':
            response=`Mercury is first and closest planet to the sun.`;
            break;
        case 'second':
            response=`Venus is the second planet from the sun.`;
            break;
        case 'third':
            response=`Earth is the third planet from the sun.`;
            break;
        case 'fourth':
            response=`Mars is the fourth planet from the sun.`;
            break;
        case 'fifth':
            response=`Jupiter is the fifth planet from the sun and also the largest planet in the solar system.`;
            break;
        case 'sixth':
            response=`Saturn is the sixth planet from the sun.`;
            break;
        case 'seventh':
            response=`Uranus is the seventh planet from the sun.`;
            break;
        case 'eighth':
            response=`Neptune is the eighth planet from the sun.`;
            break;
        case 'ninth':
            response=`Pluto was once considered the ninth planet from the sun but has since been reclassified as a dwarf planet.`;
            break;
        default:
            response=`I'm sorry, I couldn't understand which planet you're referring to.`;
            break;
    }
    agent.add(response);
}

       

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('PlanetOverviewIntent', PlanetOverviewIntent);
  intentMap.set('GravityIntent', GravityIntent);
  intentMap.set('PlanetpositionIntent', PlanetpositionIntent);

  agent.handleRequest(intentMap);
});
