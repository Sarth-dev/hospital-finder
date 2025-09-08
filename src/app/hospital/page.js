"use client";
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const HOSPITAL_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

function HospitalCard({ hospital }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col">
      <div className="relative">
        <img
          src={hospital.image || HOSPITAL_IMG}
          alt={hospital.name}
          className="h-48 w-full object-cover"
        />
        {hospital.specialists > 0 && (
          <div className="absolute top-4 left-4 bg-black/80 text-white rounded-full px-4 py-1 text-sm font-semibold">
            {hospital.specialists} Specialists Available
          </div>
        )}
      </div>
      <div className="px-6 py-4 flex flex-col justify-between grow">
        <span className="text-blue-700 font-bold text-lg mb-1">{hospital.name}</span>
        <p className="text-gray-800 font-medium text-base mb-1">{hospital.address}</p>
        <p className="text-gray-600 text-sm mb-2">City: {hospital.city || "N/A"}</p>
        <p className="text-green-700 font-bold mb-2">
          Rating: {hospital.rating || "N/A"}
        </p>
        <p className="text-gray-600 text-sm">
          Service Hours: {hospital.serviceHours || "N/A"}
        </p>
        <p className="text-gray-600 text-sm">
          Government Scheme: {hospital.govtScheme || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default function AllHospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHospitals() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/hospitals/all"); // Adjust endpoint as per your backend
        if (!res.ok) {
          const err = await res.json();
          setError(err.error || "Failed to fetch hospitals");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setHospitals(data);
      } catch {
        setError("Server error while fetching hospitals");
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, []);

  return (
  <>
  <Navbar/>
      <main className="min-h-screen py-10 px-4 bg-yellow-50">
      <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-10">
        All Hospitals
      </h1>

      {loading && <p className="text-center text-gray-700">Loading hospitals...</p>}
      {error && <p className="text-center text-red-600 font-bold">{error}</p>}
      {!loading && !error && hospitals.length === 0 && (
        <p className="text-center text-gray-600 italic">No hospitals found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {hospitals.map((hospital, idx) => (
          <HospitalCard key={idx} hospital={hospital} />
        ))}
      </div>
    </main>
    <Footer/>
  </>
  );
}
