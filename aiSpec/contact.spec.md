# Page Spec — Contact (contact.html)

## Page goal
Allow visitors to contact me easily using a simple form.

## Important technical note
This website is hosted on GitHub Pages (static hosting).
There is NO backend server.
The contact form must use a client-side solution only.

## Accepted solution
- Use JavaScript with a `mailto:` link
- Opening the user's default email application is acceptable

## Sections

### 1) Header
- Reuse the global header (logo, name, navigation links)

### 2) Page title
- Title: "Contact"
- Short explanatory text explaining how the form works
  (ex: opens the default email application)

### 3) Contact form
The form must contain:
- Email input
  - Required
  - Type: email
- Message textarea
  - Required
- Send button

### 4) Form behavior (JavaScript)
When the user clicks "Send":
- Prevent default form submission
- Validate that all fields are filled
- Generate a `mailto:` URL with:
  - Destination email = site owner email
  - Subject containing the sender email
  - Body containing the message
- Redirect the browser to the generated `mailto:` link

### 5) Footer
- Reuse the global footer
- Social links: LinkedIn, GitHub, Email

## Content constraints
- Clear instructions
- Simple wording
- No advanced validation or spam protection

## Styling requirements
- Form displayed inside a card
- Inputs stacked vertically
- Mobile-friendly spacing