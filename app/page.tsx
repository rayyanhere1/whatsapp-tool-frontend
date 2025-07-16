"use client";
import React, { useState } from "react";

const initialState = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  message: "",
};

export default function Home() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    let formattedPhone = form.phone;
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+92" + formattedPhone.replace(/^0+/, "");
    }
   
    let msg = "";
    if (form.gender === "Female") {
      msg = `Assalam u Alaikum! \nDear user, I have found a suitable rishta for you. Here are the details:\n\nName: Muhammad Rayyan\nAge: 16\nEducation: matric in computer science (ongoing-still studying)\nProfession: Full stack developer\nLocation: Karachi\nHobbies: ['Coding', 'Cricket', 'Travelling']\nMarital Status: Single\n\nIf you're interested, reply back and we will discuss further. ❤️`;
    } else if (form.gender === "Male") {
      msg = `Assalam u Alaikum! \nDear user, I have found a suitable rishta for you. Here are the details:\n\nName: Hiba\nAge: 16\nEducation: matric in computer science (ongoing-still studying)\nProfession: Full stack developer\nLocation: Karachi\nHobbies: ['Coding', 'Cooking', 'Travelling']\nMarital Status: Single\n\nIf you're interested, reply back and we will discuss further. ❤️`;
    }
    try {
      const res = await fetch("https://whatsapp-tool-backend-oe3z.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formattedPhone,
          message: msg,
        }),
      });
      const data = await res.json();
      if (data.sent === "true" || data.message === "ok") {
        setResult("🎉 Rishta message sent on WhatsApp!");
        setForm(initialState);
      } else {
        setResult("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      setResult("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(120deg, #f9e7fe 0%, #e0c3fc 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
      <div style={{
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 32px 0 rgba(108,71,255,0.13)",
        maxWidth: 440,
        width: "100%",
        padding: "2.7rem 2.2rem 2.2rem 2.2rem",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        border: "1.5px solid #e0c3fc",
        boxSizing: "border-box",
        minWidth: 0,
      }}>
        <h1 style={{ textAlign: "center", color: "#a259c6", fontSize: "2.3rem", fontWeight: 900, letterSpacing: 1.5, marginBottom: 6, fontFamily: 'Segoe UI, sans-serif', lineHeight: 1.1 }}>
          💍 Rishta Finder Form
        </h1>
        <p style={{ textAlign: "center", color: "#5a5a5a", fontSize: "1.13rem", marginBottom: 18, fontWeight: 500 }}>
          Helping souls meet, one WhatsApp message at a time 😅
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <input
            name="name"
            type="text"
            placeholder="👤 Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="age"
            type="text"
            placeholder="🧓 Age"
            value={form.age}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            style={{ ...inputStyle, cursor: "pointer", marginBottom: 16, color: form.gender ? "#222" : "#7c6f98", fontStyle: form.gender ? "normal" : "italic" }}
          >
            <option value="" disabled>🧑‍🤝‍🧑 Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            name="phone"
            type="text"
            placeholder="📱 WhatsApp Number (e.g. 3061234567)"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="💬 Personal Message (optional)"
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #f472b6, #facc15)",
              color: "white",
              border: "none",
              fontWeight: 700,
              padding: "0.95rem 2.2rem",
              borderRadius: 12,
              fontSize: "1.18rem",
              boxShadow: loading ? "none" : "0 2px 12px 0 rgba(244,114,182,0.13)",
              transition: "0.2s",
              marginTop: 12,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.5,
              outline: "none",
            }}
            onMouseOver={e => (e.currentTarget.style.filter = "brightness(1.07)")}
            onMouseOut={e => (e.currentTarget.style.filter = "none")}
          >
            {loading ? "Sending..." : "✨ Send Rishta Message"}
          </button>
        </form>
        {result && (
          <div style={{ marginTop: 18, textAlign: "center", color: result.startsWith("🎉") ? "#16a34a" : "#dc2626", fontWeight: 600, fontSize: "1.08rem" }}>
            {result}
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  borderRadius: 8,
  border: "1.5px solid #b39ddb",
  padding: "0.8rem 1.1rem",
  fontSize: "1.07rem",
  marginBottom: 6,
  outline: "none",
  fontFamily: 'inherit',
  background: "#f7f6ff",
  boxShadow: "0 1px 4px 0 rgba(108,71,255,0.04)",
  transition: "border 0.2s, box-shadow 0.2s",
  color: "#222", 
};
