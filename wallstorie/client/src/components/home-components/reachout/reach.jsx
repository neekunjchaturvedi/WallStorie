import React from "react";

export default function ContactSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-lato">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-600 mb-2 playfair">
          Reach us out
        </h2>
        <p className="text-gray-600">We'd Love to Hear from You!</p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Contact Card */}
        <div className="bg-green-50 rounded-xl p-8 flex justify-center items-center shadow-md">
          <div className="text-center">
            <p className="text-gray-700 italic mb-2">
              Have questions or need assistance?
              <br />
              We're always happy to help! Feel free
              <br />
              to reach out to us
            </p>
            <div className="mt-6">
              <p className="font-medium text-green-600">
                Email Us:{" "}
                <span className="text-gray-700">
                  <a
                    href="mailto:contact@wallstorie.in"
                    className="text-green-600"
                  >
                    {" "}
                    contact@wallstorie.in{" "}
                  </a>
                </span>
              </p>
              <p className="font-medium text-green-600">
                Contact us:{" "}
                <span className="text-gray-700">
                  <a href="tel:+916302644520" className="text-green-600">
                    {" "}
                    +91 6302644520{" "}
                  </a>
                </span>
              </p>
              
            </div>
          </div>
        </div>

        {/* Store Card */}
        <div className="bg-green-50 rounded-lg p-8 shadow-md">
          <div className="text-center">
            <p className="font-medium text-gray-700 mb-4">VISIT OUR STORE</p>
            <p className="mb-2">
              <span className="font-medium text-green-600">Address: </span>
              <span className="text-gray-700">WALLSTORIE,</span>
            </p>
            <p className="text-gray-700 mb-1">  
              1st floor, Hanuman plywood complex,
            </p>
            <p className="text-gray-700 mb-1">
              beside PSR CONVENTION CENTRE, Ruby Block,
            </p>
            <p className="text-gray-700 mb-4">
              Brundavan Colony, Kompally, Hyderabad, Secunderabad, Telangana
              500014
            </p>
            <a
              href="https://maps.app.goo.gl/cJ7LLnRjDV5qVK6t5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-green-600 hover:underline mb-4"
            >
              View on Maps
            </a>
            <p className="font-medium text-green-600 mb-1">Store Timings:</p>
            <p className="text-gray-700">
              Monday to Saturday: 11:00 AM - 8:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Career Section */}
      <div className="max-w-5xl flex flex-col md:flex-row gap-48 items-center text-left px-12 justify-center">
        <div className="max-w-lg">
          <p className="mb-4">
            At <span className="text-green-600 font-medium">WallStorie</span>,
            we're always looking for creative minds and passionate individuals
            to join our team. Whether you're a designer, artist, or industry
            professional, we welcome collaborations that bring fresh
            perspectives and innovative ideas.
          </p>

          <p className="font-medium mt-6 mb-2">How to Apply:</p>
          <p className="mb-2">
            To be considered, please ensure your application includes:
          </p>
          <ul className="list-disc pl-6 mb-6 flex flex-col">
            <li>A CV detailing your experience</li>
            <li>A portfolio (preferably a link) showcasing your work</li>
            <li>A strong dose of enthusiasm!</li>
          </ul>

          <p>
            Send your application to:{" "}
            <a href="mailto:contact@wallstorie.in" className="text-green-600">
              contact@wallstorie.in
            </a>
          </p>
        </div>

        <div className="flex justify-center playfair">
          <h3 className="text-4xl font-bold text-green-600 text-center">
            WORK
            <br />
            WITH US
          </h3>
        </div>
      </div>
    </div>
  );
}
