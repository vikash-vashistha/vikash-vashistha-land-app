export const users = [
  {
    id: 1,
    name: "Aman",
  },
  {
    id: 2,
    name: "Albert",
  },
  {
    id: 3,
    name: "Nrupul",
  },
  {
    id: 4,
    name: "Bicky",
  },
  {
    id: 5,
    name: "Nihal",
  },
];

function createConnection(user) {
  console.log(`started lisening to `, user);
  let id;
  function listen(callback) {
    id = setInterval(() => {
      let message = `new Message from ${
        user.name
      } at ${new Date().toTimeString()}`;
      callback(message);
    }, 1000);
  }
  function unsubscribe() {
    console.log(`stopped listening to ${user.name}`);
    clearInterval(id);
  }
  return { listen, unsubscribe };
}

export default createConnection;
