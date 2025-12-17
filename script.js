function setupContactForm(){
  const form = document.querySelector("#contactForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if(!email || !message){
      alert("Please fill in both fields.");
      return;
    }

    const to = "YOUR_EMAIL_HERE@example.com";
    const subject = encodeURIComponent(`Portfolio contact from ${email}`);
    const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);

    // Opens the user's default email app
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", setupContactForm);