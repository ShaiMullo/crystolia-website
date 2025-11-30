"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col items-center">

      {/* Hero Section */}
      <section className="w-full max-w-3xl mt-10 p-6 text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/crystolia-logo.png"
            alt="Crystolia Logo"
            width={180}
            height={180}
            className="rounded-full shadow-lg"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          ייבוא ושיווק שמן חמניות איכותי
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          איכות גבוהה • מחיר נמוך • משלוחים מהירים לכל הארץ
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <a
            href="https://wa.me/972544936067"
            target="_blank"
            className="bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
          >
            שליחת הודעת WhatsApp
          </a>

          <a
            href="tel:+972544936067"
            className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 transition"
          >
            התקשר עכשיו
          </a>

          <a
            href="#lead-form"
            className="bg-yellow-600 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-700 transition"
          >
            השאר פרטים
          </a>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="w-full max-w-3xl mt-16 p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          למה לבחור ב-Crystolia?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-800">
          <p className="bg-white p-4 rounded-xl shadow">✔ ייבוא ישיר — בלי מתווכים</p>
          <p className="bg-white p-4 rounded-xl shadow">✔ איכות גבוהה וברמה בינלאומית</p>
          <p className="bg-white p-4 rounded-xl shadow">✔ מחיר שובר שוק</p>
          <p className="bg-white p-4 rounded-xl shadow">✔ משלוחים מהירים לכל הארץ</p>
          <p className="bg-white p-4 rounded-xl shadow">✔ אמינות ושירות אישי</p>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="w-full max-w-3xl mt-20 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          השאר פרטים ונחזור אליך
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const name = formData.get("name");
            const phone = formData.get("phone");
            const message = formData.get("message");

            const res = await fetch("/api/send-lead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, phone, message }),
            });

            const data = await res.json();

            if (data.success) {
              alert("הפרטים נשלחו בהצלחה!");
              form.reset();
            } else {
              alert("שגיאה בשליחת הפרטים. נסה שוב.");
            }
          }}
          className="bg-white p-6 rounded-xl shadow grid grid-cols-1 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            className="border px-4 py-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="טלפון"
            className="border px-4 py-3 rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="הודעה"
            className="border px-4 py-3 rounded-lg h-28"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-600 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-700 transition"
          >
            שליחה
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full text-center mt-16 p-4 text-gray-700">
        © {new Date().getFullYear()} Crystolia – כל הזכויות שמורות.
      </footer>
    </div>
  );
}
