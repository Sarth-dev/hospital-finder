import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

export default function AboutUs() {
  return (
   <>
   <Navbar/>
     <main className="min-h-screen text-gray-800 bg-gray-50 p-8">
      <section className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
          About Us
        </h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our hospital, where compassionate care meets the latest in medical innovation.
          We are dedicated to providing exceptional healthcare services to our community, combining expertise,
          advanced technology, and a patient-first approach.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our team of experienced doctors, nurses, and support staff work collaboratively to ensure that every patient
          receives personalized treatment tailored to their unique needs. We believe in treating not just the illness,
          but caring for the whole person.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Founded on the principles of integrity, excellence, and innovation, our hospital strives to be a beacon of
          hope and healing. With 24/7 service hours and a commitment to accessibility, we aim to make quality healthcare
          available to everyone.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for trusting us with your health. Together, we pursue a healthier tomorrow.
        </p>
      </section>
    </main>
    <Footer/>
   </>
  );
}
