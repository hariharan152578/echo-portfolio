import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email!");
      return;
    }

    try {
      setLoading(true);

      // ✅ call backend API
      const res = await axios.post("http://localhost:5000/api/mail/subscribe", {
        email,
      });

      alert(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong!";
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl font-semibold text-gray-700 tracking-widest uppercase">
            SUBSCRIBE
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-3 leading-snug">
            Subscribe To Get The Latest
            <br />
            News About Us
          </h2>
          <p className="mt-2 text-gray-600">
            Please Drop Your Email To Get Daily Update About What We Do
          </p>
        </div>

        {/* ✅ Responsive Form Section */}
        <div className="mt-6 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row w-full sm:w-3/4 md:w-1/2 border-2 p-1 rounded-2xl border-gray-400"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border-0 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-3 sm:mt-0 sm:ml-2 bg-[#3D59BD] px-8 py-3 rounded-xl text-[1.1rem] font-medium text-white transition-all duration-200 hover:bg-[#2c47a3] disabled:opacity-70"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
