export default function handler(lambda) {
  return function (event, context) {
    return Promise.resolve()
    // run the lambda
    .then(() => lambda(event, context))
    // on success
    .then((responseBody) => [200, responseBody])
    // catch error
    .catch(e => {
      console.log(e);
      return [500, { error: e.message }];
    })
    .then(([statusCode, body]) => ({
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(body)
    }));
  };
};