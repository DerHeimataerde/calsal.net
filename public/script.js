let typedKeys = "";

document.addEventListener("keydown", (event) => {
  typedKeys += event.key;
  
  //Get last 20 characters user has pressed on the page, ignoring spaces
  const normalizedTypedKeys = typedKeys.replace(/\s+/g, "").slice(-20);

  //Validate sequence if 20 characters are entered
  if (normalizedTypedKeys.length === 20) {
    fetch("/validate-sequence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sequence: normalizedTypedKeys }),
    })
      .then((response) => response.json())
      .then((data) => {
        //Show element if correct sequence is entered
        if (data.valid) {
          const passkeyContainer = document.getElementById("passkey-container");
          passkeyContainer.style.display = "block";

          const passkeyInput = document.getElementById("passkey");
          passkeyInput.value = "";
          passkeyInput.focus();
        }
      })
      .catch((error) => {
        console.error("Error validating sequence:", error);
      });
  }
});
