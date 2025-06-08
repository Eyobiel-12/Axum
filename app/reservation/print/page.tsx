"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReservationPrintPage() {
  const searchParams = useSearchParams();

  // Get data from query params, fallback to demo data
  const reservation = {
    confirmationNumber: searchParams.get("confirmationNumber") || "AXM915337",
    date: searchParams.get("date") || "Friday, June 20th, 2025 at 7:00 PM",
    guests: searchParams.get("guests") || 4,
    name: searchParams.get("name") || "Eyobiel Gootom",
    email: searchParams.get("email") || "eyobielgoitom10@gmail.com",
    phone: searchParams.get("phone") || "+31687033774",
    specialRequests: searchParams.get("specialRequests") || "eferferf",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "Segoe UI, sans-serif", background: "#fff", padding: 32 }}>
      <div style={{ color: "#b91c1c", fontWeight: 700, marginBottom: 16 }}>DEBUG: This page is rendering and ready to print.</div>
      <h1 style={{ color: "#fbbf24", textAlign: "center", marginBottom: 24 }}>Reservation Confirmed</h1>
      <p style={{ textAlign: "center", marginBottom: 32 }}>Thank you for your reservation. We look forward to serving you an extraordinary dining experience.</p>
      <h2 style={{ borderBottom: "2px solid #fbbf24", paddingBottom: 8, marginBottom: 16 }}>Reservation Details</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Confirmation Number:</strong> <span>{reservation.confirmationNumber}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Date & Time:</strong> <span>{reservation.date}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Party Size:</strong> <span>{reservation.guests} guests</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Guest Name:</strong> <span>{reservation.name}</span>
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
      <style>{`
        @media print {
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
} 