"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, Crown } from "lucide-react";

// Separate component for the content
function PrintContent({ searchParams }: { searchParams: URLSearchParams }) {
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = searchParams.get("guests");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const specialRequests = searchParams.get("specialRequests");

  useEffect(() => {
    // Auto-print when the page loads
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 print:p-0">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-light text-stone-800">Axum Restaurant</h1>
          </div>
          <p className="text-stone-600">Reservation Confirmation</p>
        </div>

        <Card className="border border-stone-200 shadow-none">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-stone-800">Reservation Details</p>
                  <p className="text-stone-600">Date: {date}</p>
                  <p className="text-stone-600">Time: {time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-stone-800">Guest Information</p>
                  <p className="text-stone-600">Name: {name}</p>
                  <p className="text-stone-600">Number of Guests: {guests}</p>
                  <p className="text-stone-600">Email: {email}</p>
                  <p className="text-stone-600">Phone: {phone}</p>
                </div>
              </div>

              {specialRequests && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <p className="font-medium text-stone-800">Special Requests</p>
                    <p className="text-stone-600">{specialRequests}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-stone-500">
          <p>Please present this confirmation upon arrival</p>
          <p className="mt-2">Thank you for choosing Axum Restaurant</p>
        </div>

        <div className="mt-8 text-center print:hidden">
          <Button
            onClick={() => window.print()}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Print Confirmation
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function PrintPage() {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    // Get search params on client side
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  return <PrintContent searchParams={searchParams} />;
}

// Add viewport metadata
export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
}; 