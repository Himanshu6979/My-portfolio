const path = require("path");
const { sendEmail } = require('./emailController');  
const AppError = require('../utils/apierror');

// Sample portfolio data
const portfolioData = {
  name: "Himanshu Kumar Mohapatra",
  bio: "A passionate web developer skilled in React, Node.js, MongoDB, and more.",
  photo: "/images/my-image.jpg",  // ✅ Static path
  skills: ["React", "Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript", "Bootstrap"],
  projects: [
    {
      title: "Project 1",
      description: "Description of Project 1.",
      image: "/images/projectImage1.jpg",  // ✅ Relative path
      link: "https://github.com/username/project1",
      demoLink: "https://project1.com/demo"
    }
  ]
};

// Controller function to fetch portfolio data
exports.getPortfolioData = (req, res) => {
  res.json(portfolioData);
};

// Controller to handle contact form submission
exports.contactForm = async (req, res, next) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
      return next(new AppError('All fields are required.', 400));
  }

  try {
      // Send the email to the user (confirmation)
      const userMailData = await sendEmail(
          email,  // Sender's email
          'Himanshu kumar Mohapatra',  // Receiver's name
          'Your message has been received',  // Subject
          "",
          `<p>Thank you for reaching out, ${name}! We will get back to you as soon as possible.</p><p><strong>Your Message:</strong><br>${message}</p>`
      );

      // Send the email to the portfolio owner
      const adminEmail = "himanshukumarmohapatra123@gmail.com";  // Portfolio owner's email
      const adminEmailSubject = `New Contact Form Submission: ${name}`;
      const adminEmailBody = `<p>You have a new contact form submission:</p><p><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Message:</strong><br>${message}</p>`;

    await sendEmail(
          adminEmail,  // Admin email
          'New Contact Request',  // Email subject
          adminEmailSubject,  // Subject
          "",
          adminEmailBody  // HTML content
      );

      // Respond with success
      res.status(200).json({
          status: 'success',
          message: 'Your message has been sent successfully!',
          data: userMailData
      });
    } catch (error) {
      console.error('Error sending email:', error.message);  // Log the error message
      console.error(error.stack);  // Log the stack trace to pinpoint where it's failing
      return next(new AppError('Error sending email, please try again later.', 500));
  }
  
};

