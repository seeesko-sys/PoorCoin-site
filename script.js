// ---- CONFIG ----
const CONTRACT = "0x6208384e2dda2ab804a5b75aebc1609ba9ce7336"; // NEW contract
const SYMBOL   = "POOR";
const DECIMALS = 18;
const LOGO_URL = "https://ipfs.io/ipfs/bafkreifvwdfzahh6ul2bseueh4427uea722o3m7zxlcnuc4m4orgn4i4ry";

// PancakeSwap + BscScan links (BSC mainnet)
const PCS_SWAP = `https://pancakeswap.finance/swap?outputCurrency=${CONTRACT}`;
const PCS_LIQ  = `https://pancakeswap.finance/add/BNB/${CONTRACT}`;
const BSCSCAN  = `https://bscscan.com/token/${CONTRACT}`;

// ---- RUNTIME WIRING ----
const short = (addr) => addr.slice(0,6) + "…" + addr.slice(-4);

document.getElementById("addr-short").textContent = CONTRACT;
document.getElementById("year").textContent = new Date().getFullYear();

// Top nav
document.getElementById("nav-swap").href = PCS_SWAP;
document.getElementById("nav-liq").href  = PCS_LIQ;
document.getElementById("nav-scan").href = BSCSCAN;

// Buttons
document.getElementById("btn-swap").href = PCS_SWAP;
document.getElementById("btn-liq").href  = PCS_LIQ;
document.getElementById("btn-scan").href = BSCSCAN;

// Links section
document.getElementById("lnk-swap").href = PCS_SWAP;
document.getElementById("lnk-liq").href  = PCS_LIQ;
document.getElementById("lnk-scan").href = BSCSCAN;

// Copy contract
document.getElementById("btn-copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONTRACT);
    toast("Address copied");
  } catch {
    toast("Copy failed");
  }
});

// Add to MetaMask
document.getElementById("btn-metamask").addEventListener("click", async () => {
  if (!window.ethereum) return toast("MetaMask not found");
  try {
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: { address: CONTRACT, symbol: SYMBOL, decimals: DECIMALS, image: LOGO_URL }
      }
    });
    toast(wasAdded ? "POOR added to MetaMask" : "Action cancelled");
  } catch (e) {
    toast("MetaMask error");
  }
});

// Tiny toast
function toast(msg){
  let n = document.createElement("div");
  n.textContent = msg;
  n.style.cssText = `
    position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
    background:#0b1220;color:#eaf3ff;border:1px solid rgba(255,255,255,.08);
    padding:10px 14px;border-radius:12px;z-index:9999;font:600 14px Inter,system-ui`;
  document.body.appendChild(n);
  setTimeout(()=>n.remove(), 1800);
}
