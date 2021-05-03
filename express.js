const express = require("express");
const app = express();
const port = 9000;
const db = require("./db");
const shortenUrlSchema = require("./model");
const shortid = require("shortid");
const fs = require('fs');

db();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.urlencoded({ extended: false }));

app.post("/shortenUrls", async (req, res) => {
  //check original url if already exist
  const exist = await shortenUrlSchema.findOne({
    originalUrl: req.body.inputUrl,
  });
  if (exist) {
    fs.readFile(__dirname + '/result.html','utf8', (e, data)=> {
        const result = data.replace('<!-- SHORTURL PLACEHOLDER -->', exist.shortUrl).replace("<!-- URL PLACEHOLDER-->", exist.uniqueId);
        res.send(result);
    })
  } else {
    //if not, generate uniqueId
    let testId = shortid.generate();
    //check uniqueId if already exist
    let duplicateId = await shortenUrlSchema.findOne({ uniqueId: testId });
    if (!duplicateId) {
      //if not, save to db along with og & short urls
      const shortUrl = "http://localhost:9000/" + testId;
      await shortenUrlSchema.create({
        originalUrl: req.body.inputUrl,
        uniqueId: testId,
        shortUrl,
      });

      fs.readFile(__dirname + '/result.html','utf8', (e, data)=> {
          const result = data.replace('<!-- SHORTURL PLACEHOLDER -->', shortUrl).replace("<!-- URL PLACEHOLDER-->", testId);
          res.send(result);
      })

    } else {
      //re-generate until no duplicate - incomplete
      testId = shortid.genereate();
    }
  }
});

app.get('/:testId', async(req, res) => {
    const test = await shortenUrlSchema.findOne({uniqueId: req.params.testId})
    if(test) {
        res.redirect(test.originalUrl);
    } else {
        res.status(404).json('URL not found');
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;