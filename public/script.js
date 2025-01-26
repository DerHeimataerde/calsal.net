let typedKeys = "";

const secretSequences = [
  "followthewhiterabbit",
  "follow the white rabbit"
];

document.addEventListener("keydown", (event) => {
  typedKeys += event.key;

  const normalizedTypedKeys = typedKeys.replace(/\s+/g, "").slice(-30);

  if (
    secretSequences.some((seq) =>
      seq.replace(/\s+/g, "") === normalizedTypedKeys
    )
  ) {
    const passkeyInput = document.getElementById("passkey");
    passkeyInput.value = "";
    passkeyInput.focus();

    const passkeyContainer = document.getElementById("passkey-container");
    passkeyContainer.style.display = "block";
  }
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const passkeyInput = document.getElementById("passkey").value.trim();

  if (passkeyInput === "first step" || passkeyInput === "firststep") {
    window.location.href = "meta-thinking.html";
  } else {
    const resultMessage = document.getElementById("result-message");
    resultMessage.textContent = "Incorrect. Try again!";
    resultMessage.style.color = "red";
  }
});
