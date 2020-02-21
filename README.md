# The Dotcom Services Waffle Timer

## Rationale

At my job, every Friday we take turns bring breakfast for our team. I wanted to wow everyone by setting up a waffle-making stand, but to my chagrin the waffle maker I bought doesn't make any sound when the waffle is done. I was presented with several options:

1. Bring something more reasonable for breakfast.
2. Buy a waffle maker that makes a sound when the waffle is done.
3. Build an app to serve as a real-time waffle timer for the team.

Naturally, I chose the third option.

## Technologies

The frontend of this app was bootstrapped with `create-react-app`. The graphic waffle timer makes use of an svg and a vector graphic of a waffle I made in Inkscape. The app is updated in real time via a subscription to a serverless AWS AppSync GraphQL API bootstrapped with AWS Amplify. I used [this video](https://www.youtube.com/watch?v=SnqABG8e9Zk) from AWS as a guide for creating the serverless backend.