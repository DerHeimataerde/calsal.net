let typedKeys = "";

document.addEventListener("keydown", (event) => {
  typedKeys += event.key;

  const normalizedTypedKeys = typedKeys.replace(/\s+/g, "").slice(-20);

  if (normalizedTypedKeys.length === 20) {
    fetch("/validate-sequence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sequence: normalizedTypedKeys }),
    })
      .then((response) => response.json())
      .then((data) => {
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
