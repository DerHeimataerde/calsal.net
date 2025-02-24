const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "secure-session-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files
app.use(express.static("public"));

// Route to validate the secret sequence and grant session access
app.post("/validate-sequence", (req, res) => {
  const validSequences = ["followthewhiterabbit", "follow the white rabbit"];
  const { sequence } = req.body;

  console.log("Received sequence:", sequence); // Debug log

  if (validSequences.includes(sequence)) {
    req.session.passkeyAccess = true; // Grant session access
    console.log("Sequence validated. Access granted.");
    res.json({ valid: true });
  } else {
    console.log("Invalid sequence entered.");
    res.json({ valid: false });
  }
});


// Route to validate the passkey, but only if session access is granted
app.post("/validate-passkey", (req, res) => {
  if (!req.session.passkeyAccess) {
    return res.redirect("/index.html?error=1"); // Prevent access if session is not set
  }

  const validPasskeys = ["first step", "firststep"];
  const { passkey } = req.body;

  if (validPasskeys.includes(passkey)) {
    res.redirect("/meta-thinking.html");
  } else {
    res.redirect("/index.html?error=1");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
