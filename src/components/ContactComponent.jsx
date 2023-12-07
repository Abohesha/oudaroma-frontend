import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Result = () => {
  return (
    <p>Your message has been successfully sent</p>
  );
}

function ContactComponent(props) {
  const [result, showResult] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_9ka7b79', 'template_91oiyos', e.target, '9UOykoz13rCZyuXA4')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    e.target.reset();
    showResult(true);
  };

  return (
    <div className="contact-container">
      <form action="" onSubmit={sendEmail} className="form-container">
        <div className="formWord">
          <br />
          <br />
          <br />
          <h2>Send us a message</h2>
          <span>Full Name</span>
          <br />
          <input className="input100" type="text" name="fullname" required />
          <br />
          <span >Phone Number</span>
          <br />
          <input placeholder="+36" className="input100" type="text" name="phone" required />
          <br />
          <span>Enter Email</span>
          <br />
          <input className="input100" type="text" name="email" required />
          <br />
          <span>Message</span>
          <br />
          <textarea name="message" required></textarea>
          <br />
          <button>Submit</button>
          <div className="row">
            {result ? <Result /> : null}
          </div>
        </div>
      </form>

      <div className="maps">
        <iframe
          title="Location"
          width="300"
          height="250"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.0848632737534!2d21.628708200000002!3d47.527210799999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47470ffdcb05be4d%3A0x23a77658c3bc0f7!2sOud%20Aroma%20Kft.!5e0!3m2!1sen!2shu!4v1701933133111!5m2!1sen!2shu%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactComponent;
