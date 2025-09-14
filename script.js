// Contract address
const contractAddress = "0x6208384e2dda2ab804a5b75aebc1609ba9ce7336";

// Copy to clipboard
function copyAddress() {
  navigator.clipboard.writeText(contractAddress).then(() => {
    alert("Contract address copied!");
  });
}

// Add token to MetaMask
async function addToMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: contractAddress,
            symbol: "POOR",
            decimals: 18,
            image: "https://raw.githubusercontent.com/seeesko-sys/PoorCoin-site/main/PoorCoin.png",
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("MetaMask not detected!");
  }
}
