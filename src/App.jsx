import React from 'react'
import { useState } from 'react'

const App = () => {

  const [formData, setFormData] = useState({
    name : '',
    phoneNumber: '',
    email : '',
    service: '',
    message : '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://smtp-formsubmission.onrender.com/api/contact',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await res.json();
      alert(result.message || 'Message sent!');
    } catch (error) {
      console.log(error);
      alert('Error Sending Message')
    }
  }

  const items = ['Smart Solutions', 'AI Transformation', 'Digital Marketing', 'Creative Design', 'LMS Development', 'Visual Stories'];

  return (
    <div className="App">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} name="name" required />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id='phoneNumber' value={formData.phoneNumber} onChange={handleChange} name='phoneNumber' />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" required />

        <label htmlFor="service">Select Service:</label>
        <select name="service" value={formData.service} onChange={handleChange}  required>
          <option value="" hidden disabled>Select Service</option>
          {
              items.map((item, index) => (
                  <option key={index} value={item} >{item}</option>
              ))
          }
        </select>

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App