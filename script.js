document.addEventListener("contextmenu", (e) => e.preventDefault());
document.onkeydown = (e) => {
  if (
    event.keyCode === 123 ||
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
    (e.ctrlKey && e.keyCode === 85)
  ) {
    // Ctrl+U
    return false;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".generate_qr")
  .addEventListener("click", function () {
    let number = document.querySelector(".number").value.trim();
    if (!number) {
      alert("Please enter a valid phone number");
      return;
    }

    let upiLink = `upi://pay?pa=7000234217@ybl%26pn=Rohit%20Chornele%26mc=0000%26mode=02%26am=1&%26tn=${number}`;
    let qrCodeUrl = `https://quickchart.io/chart?cht=qr&chs=300x300&chl=${upiLink}`;

    document.querySelector(".get_qr").src = qrCodeUrl;
    document.querySelector(".form").style.display = "none";
    document.querySelector(".qr_code").style.display = "block";
  });

  document
    .querySelector(".download_now")
    .addEventListener("click", function () {
      let id = document.querySelector(".id").value.trim();
      if (!id || id.length != 12) {
        alert("Please enter a valid transaction ID");
        return;
      }
      alert("Download started!");
    });
});
