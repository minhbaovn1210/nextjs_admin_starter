const express = require("express");
const helmet = require("helmet");
const { parse } = require("url");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/dist/commonjs/middlewares/next-i18next-middleware")
  .default;

const gatewayRouter = require("./routes/gateway");

const i18n = require("../i18n");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(helmet());
  server.use("/gateway", gatewayRouter);

  server.use(nextI18NextMiddleware(i18n));

  server.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);

    res.set("Content-Security-Policy", `frame-ancestors 'none';`);
    res.set("X-Content-Security-Policy", `frame-ancestors 'none';`);
    res.set("X-Content-Type-Options", "nosniff");
    res.set("X-Frame-Options", "SAMEORIGIN");
    res.set("Referrer-Policy", "no-referrer");

    return handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
