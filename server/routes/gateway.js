const express = require("express");

const gatewayRouter = express.Router();

gatewayRouter.get("*", (req, res, next) => {
  // Call API and response to client

  res.json({
    message: "Get Gateway",
  });
});

gatewayRouter.post("*", (req, res, next) => {
  // Call API and response to client

  res.json({
    message: "Post Gateway",
  });
});

gatewayRouter.put("*", (req, res, next) => {
  // Call API and response to client

  res.json({
    message: "Put Gateway",
  });
});

gatewayRouter.delete("*", (req, res, next) => {
  // Call API and response to client

  res.json({
    message: "Delete Gateway",
  });
});

module.exports = gatewayRouter;
