"use client";
import React, { useRef } from "react";

// Example: get reservation data from query params or props
// For demo, using static data. Replace with your actual data source.
const reservation = {
  confirmationNumber: "AXM005492",
  date: "Thursday, June 19th, 2025",
  time: "6:00 PM",
  guests: 4,
  firstName: "Eyobiel",
  lastName: "Gootom",
  email: "eyobielgoitom10@gmail.com",
  phone: "+31687033774",
  specialRequests: "BBV",
};

export default function ReservationConfirmationPage() {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={printRef} style={{ maxWidth: 600, margin: "0 auto", fontFamily: "Segoe UI, sans-serif", background: "#fff", padding: 32 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <img src="/images/axum-logo.jpg" alt="Axum Restaurant Logo" style={{ width: 80, borderRadius: "50%" }} />
        <h1 style={{ margin: "16px 0 8px", color: "#fbbf24" }}>Reservation Confirmed</h1>
        <p>Thank you for your reservation. We look forward to serving you an extraordinary dining experience.</p>
      </div>
      <h2 style={{ borderBottom: "2px solid #fbbf24", paddingBottom: 8, marginBottom: 16 }}>Reservation Details</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Confirmation Number:</strong> <span>{reservation.confirmationNumber}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Date & Time:</strong> <span>{reservation.date} at {reservation.time}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Party Size:</strong> <span>{reservation.guests} guests</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Guest Name:</strong> <span>{reservation.firstName} {reservation.lastName}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Contact Information:</strong>
        <div>{reservation.email}</div>
        <div>{reservation.phone}</div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Special Requests:</strong>
        <div>{reservation.specialRequests || "None"}</div>
      </div>
      <button style={{ marginTop: 24, padding: "12px 32px", background: "#fbbf24", color: "#1a1a2e", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
        Close
      </button>
      <style>{`
        @media print {
          button { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
} 