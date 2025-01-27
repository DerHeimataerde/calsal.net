const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/validate-sequence", (req, res) => {
  const validSequences = ["followthewhiterabbit", "follow the white rabbit"];
  const { sequence } = req.body;

  if (validSequences.includes(sequence)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.post("/validate-passkey", (req, res) => {
  const validPasskeys = ["first step", "firststep"];
  const { passkey } = req.body;

  if (validPasskeys.includes(passkey)) {
    res.redirect("/meta-thinking.html");
  } else {
    res.redirect("/index.html?error=1");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
