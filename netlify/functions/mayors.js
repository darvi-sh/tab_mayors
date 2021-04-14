const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async function (event, context, callback) {
  const channel = event.headers["nightbot-channel"]
    ? event.headers["nightbot-channel"].split("&")[0].split("=")[1]
    : "default";

  return client
    .query(q.Get(q.Ref(q.Collection("mayors"), "101")))
    .then((response) => {
      const jj = response.data[channel] || [];
      console.log("response", jj);

      return {
        statusCode: 200,
        body: jj,
      };
    })
    .catch((error) => {
      console.log("error", error);

      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
