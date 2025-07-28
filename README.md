# Arus Boards

Arus Boards is a public transport departure board web app that uses the swedish Trafiklabs ResRobot API to fetch departure information. It is designed to run locally in a kiosk configuration.

Multiple departure boards can be displayed for different stops and types of transport. The time that you need to start walking to the stop to make it in time for the departure is displayed and alarms can be set so that you are notified when it is time to go. Basic time and weather information is displayed in the header.
<img width="1512" height="852" alt="Screenshot 2025-07-28 at 14 11 44" src="https://github.com/user-attachments/assets/85a122c2-7b8d-4b53-89c7-e2a9bd3065b8" />

# Setup

A config file named `config.json` must be put inte the `public` folder. The format of this file and general information about its contents can be found in `config-schema.json`.

You must use your own ResRobot API key, which can be acquired at https://www.trafiklab.se. Since the config file that is fetched when the page loads will contain this API key this app is currently not suitable for public hosting and should strictly be used locally. An example setup would be an android tablet hosting the web app locally by running `yarn preview` through Termux and displaying the web page in a kiosk browser like Fully Kiosk.

# Development

```
yarn install
yarn dev
```
