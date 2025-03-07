import React from "react";

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-left font-lato">
      <h1 className="text-3xl font-semibold text-green-600 text-center mb-6 playfair">
        Shipping policy
      </h1>

      <div className="mb-6">
        <p className="mb-2">
          At WallStorie, we are dedicated to providing a seamless and efficient
          shipping experience.
        </p>
        <p className="mb-4">
          Our policy outlines delivery timelines, associated charges, and
          essential shipping details to ensure clarity and transparency for our
          customers.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            1. SHIPPING COVERAGE
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                We currently offer shipping services across India only.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            2. PROCESSING TIME
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Orders are processed within 2-3 business days after payment
                confirmation.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Custom or made-to-order wallpapers may take additional
                processing time.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            3. DELIVERY TIME & CHARGES
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Low-Cost Standard Delivery: Estimated delivery time is 2-3
                business days across India.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Shipping charges are calculated at checkout based on location
                and weight.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            4. ORDER STATUS UPDATES
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                You will receive an order confirmation and dispatch notification
                via WhatsApp or your user profile.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                For any shipping inquiries, please contact our support team.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            5. DELIVERY PARTNERS
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                We partner with reliable courier services to ensure timely and
                secure delivery.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Delays caused by unforeseen circumstances (weather, strikes,
                etc.) are beyond our control.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            6. ADDRESS & DELIVERY ISSUES
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                Ensure you provide a complete and accurate address to avoid
                delays.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                If an incorrect address is provided, re-shipping charges may
                apply.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                If you are unavailable at the time of delivery, the courier may
                attempt a second delivery or hold the package for pickup.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            7. DAMAGED OR MISSING ITEMS
          </h2>
          <ul className="list-none pl-6 space-y-1">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                If you receive a damaged package, please report it within 48
                hours of delivery.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                If an item is missing from your order, contact us immediately.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-green-700 mb-2">
          CONTACT US
        </h2>
        <p className="mb-1">
          For any shipping-related inquiries, feel free to reach out:
        </p>
        <p className="mb-4">
          Email:{" "}
          <a href="mailto:care@wallstorie.in" className="text-green-600">
            care@wallstorie.in
          </a>
          <br />
          Phone:{" "}
          <span className="text-green-600">
            <a href="tel:+916302644520"> +91 6302644520</a>
          </span>
        </p>

        <p className="mt-6 text-gray-700">
          Thank you for choosing WallStorie. We value your business and are
          committed to ensuring a smooth and reliable shipping experience.
        </p>
      </div>
    </div>
  );
}
