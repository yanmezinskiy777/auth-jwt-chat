const notifyConnection = (ws, msg, aWss) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "connection",
          message: `${msg.name} is connected`,
        })
      );
    }
  });
};

const connection = (ws, msg, aWss) => {
  console.log(msg);
  ws.id = `${msg.id}sss`; // id to socket
  notifyConnection(ws, msg, aWss);
};

const send = (ws, msg, aWss) => {
  aWss.clients.forEach((client) => {
    client.send(
      JSON.stringify({ method: "send", name: msg.name, message: msg.message })
    );
  });
};

const chatController = (ws, req, aWss) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connection(ws, msg, aWss);
        break;
      case "send":
        send(ws, msg, aWss);
        break;
      default:
        connection(ws, msg);
    }
  });
};

module.exports = chatController;
