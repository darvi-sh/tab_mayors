# They Are Billions mayors API

This is the code to create endpoints for Twitch bots to communicate between a databse to maintain the mayors.

<br>

# Installation

You will need 3 services:

- A bot for Twitch like Nightbot or Streamlabs.

- Serverless services like Netlify or Vercel.

- A database like FaunaDB, DynamoDB or Firebase.

<br>

## Steps

1. Fork this repo.

2. Create Netlify account.

3. In Netlify, create a new site with the forked repo. It automatically builds it and gives you a URL. Keep it for the last step.

4. Create FaunaDB account.

   In FaunaDB create a database and name it `mayors`. Create a collection called `mayors` as well.

   Under **Indexes**, create `mayors_by_channel` index and fill the inputs as:

   Source Colletion: `mayors`, Index Name: `mayors_by_channel`, Terms: `data.channel`. Save.

   Under the same database, go to **Security** and create a **key**. Keep it for the next step.

5. Connect Netlify to FaunaDB

   In Netlify, go to **Site Settings** > **Build &amp; Deploy** > **Environment** > **Environment Variables**

   Create a new variable `FAUNADB_SERVER_SECRET` and assign the FaunaDB secret to it.

6. Setup custom commands in Nightbot

   ⚠ REPLACE your Netlify site URL in each command! ⚠

   <br>

   👉 Command `!addmayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/addmayor?mayor=$(querystring)); api)`

   <br>

   👉 Command `!deletemayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/deletemayor?mayor_index=$(querystring)); api)`

   <br>

   👉 Command `!editmayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/editmayor?mayor_index_mayor_name=$(querystring)); api)`

   <br>

   👉 Command `!mayors`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/mayors); api)`

   <br>

   👉 Command `!resetmayors`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/deletemayors); api)`

7. Test the commands 🎉 They should work. They work on my machine 😉

   Open an issue if they didn't 😕 I'll try to figure it out 👍

<br>

# Modifying the Bot Responses

Although it is possible to have the messages managed by the bots, but it's better to have it managed by the code. There are different scenarios where the bot custom command string gets too long and hard to maintain.

To change them, you can search and modify in github or locally in your code editor.

All 5 important files are under [./netlify/functions](./netlify/functions)

Example:

`body: JSON.stringify(["Mayor bucket is empty already."]),` in [./netlify/functions/deletemayor.js:44](netlify/functions/deletemayor.js#L44)
