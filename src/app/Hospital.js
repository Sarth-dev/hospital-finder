/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useMemo, useEffect } from "react";

const HOSPITAL_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";

function HospitalCard({ hospital, disease }) {
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

        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          <span className="inline-flex items-center gap-1">
            <svg
              width={16}
              height={16}
              viewBox="0 0 20 20"
              fill="currentColor"
              className="inline"
            >
              <path d="M10 2a7 7 0 015.51 11.51L10 18l-5.51-4.49A7 7 0 0110 2zm0 2a5 5 0 00-4.5 7.92l4.5 3.68 4.5-3.68A5 5 0 0010 4z" />
            </svg>
            {hospital.distance || hospital.city || "N/A"}
          </span>
        </div>

        <span className="text-gray-800 font-medium text-base mb-2">
          {hospital.address || "Address not available"}
        </span>

        <span className="text-lg text-green-700 font-bold mt-2">
          Estimated Price: ₹{hospital.diseases?.[disease.toLowerCase()] ?? "N/A"}
        </span>


        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Rating: {hospital.rating || "N/A"}</span>
          <span>City: {hospital.city || "N/A"}</span>
        </div>

        <div className="mt-1 text-xs text-green-600 font-semibold">
          Scheme: {hospital.govtScheme || "N/A"}
        </div>
      </div>
    </div>
  );
}

export default function HospitalFinder() {
  const [disease, setDisease] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [schemeFilter, setSchemeFilter] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [schemesOptions, setSchemesOptions] = useState([]);

  async function searchHospitals(e) {
    e.preventDefault();
    setError(null);
    setResults([]);
    setLoading(true);

    if (!disease.trim()) {
      setError("Please enter a disease to search");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://hospitalfinder-backend.onrender.com/hospitals?disease=${encodeURIComponent(disease.toLowerCase())}`
      );
      if (!response.ok) {
        const errRes = await response.json();
        setError(errRes.error || "Failed to fetch hospitals");
        setLoading(false);
        return;
      }
      const data = await response.json();
console.log("Fetched data:", data);


      const formattedResults = data.map((hospital) => ({
        // Preserve all fields and full diseases object
        name: hospital.name,
        image: hospital.image || HOSPITAL_IMG,
        specialists: hospital.specialists ?? 0,
        distance: hospital.distance || hospital.city || "N/A",
        address: hospital.address || "Address not available",
        diseases: hospital.diseases, // <-- Keep the full diseases object
        city: hospital.city || "N/A",
        rating: hospital.rating ?? "N/A",
        govtScheme: hospital.govtScheme || "N/A",
      }));

      setResults(formattedResults);

      // Populate filter options from results
      setCitiesOptions(
        Array.from(new Set(formattedResults.map((h) => h.city))).filter(
          (c) => c !== "N/A"
        )
      );
      setSchemesOptions(
        Array.from(new Set(formattedResults.map((h) => h.govtScheme))).filter(
          (s) => s !== "N/A"
        )
      );
      setLoading(false);
    } catch (err) {
      setError("Error fetching data from server");
      setLoading(false);
    }
  }



  const filteredResults = useMemo(() => {
    return results.filter((hospital) => {
      if (cityFilter && hospital.city !== cityFilter) return false;
      if (
        ratingFilter &&
        hospital.rating !== "N/A" &&
        Number(hospital.rating) < Number(ratingFilter)
      )
        return false;
      if (schemeFilter && hospital.govtScheme !== schemeFilter) return false;
      return true;
    });
  }, [results, cityFilter, ratingFilter, schemeFilter]);

  const ratingOptions = [5, 4.5, 4, 3.5, 3, 2.5];

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          Find Affordable Hospital Near You
        </h1>
        <form
          onSubmit={searchHospitals}
          className="flex flex-wrap text-gray-900 justify-center gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Enter disease (flu, diabetes, covid...)"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 w-64 focus:outline-none focus:border-blue-400"
          />

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 w-48 focus:outline-none focus:border-blue-400"
          >
            <option value="">All Cities</option>
            {citiesOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 w-32 focus:outline-none focus:border-blue-400"
          >
            <option value="">Min Rating</option>
            {ratingOptions.map((r) => (
              <option key={r} value={r}>
                {r}+
              </option>
            ))}
          </select>

          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 w-48 focus:outline-none focus:border-blue-400"
          >
            <option value="">All Schemes</option>
            {schemesOptions.map((scheme) => (
              <option key={scheme} value={scheme}>
                {scheme}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-700">Loading...</p>}
        {error && <p className="text-center text-red-600 font-bold mb-6">{error}</p>}
        {!error && !loading && filteredResults.length === 0 && (
          <p className="text-center text-gray-900 italic">
            No hospitals found for this filter combination
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            filteredResults.map((hospital, idx) =>
              hospital.diseases?.[disease.toLowerCase()] && (
                <HospitalCard key={idx} hospital={hospital} disease={disease.toLowerCase()} />
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

