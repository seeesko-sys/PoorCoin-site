function copyAddress() {
  const copyText = document.getElementById("contractAddress");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("Copied: " + copyText.value);
}
