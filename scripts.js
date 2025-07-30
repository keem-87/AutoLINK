// Client-side JS for The Shelter‑Stead website

/*
 * handleFormSubmit is attached to the contact form in index.html.  Its only
 * purpose is to prevent the default form submission so that the page
 * doesn't reload.  Once the user clicks Send Message, we build a mailto
 * link using the form fields and open it using window.location.href.  This
 * approach relies on the visitor's email client to send the actual
 * message, which keeps the site static and avoids the need for a back‑end.
 */

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  // Construct the subject and body of the email.  We encode URI
  // components to ensure special characters are handled properly.
  const subject = encodeURIComponent(`New inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  const mailtoLink = `mailto:theshelterstead@gmail.com?subject=${subject}&body=${body}`;
  // Open the mailto link in the same window.  Most email clients
  // will intercept this and open a compose window.
  window.location.href = mailtoLink;
  // Provide some user feedback that the message has been handed off.
  alert('Thank you for your message! Your email client should open shortly.');
}
