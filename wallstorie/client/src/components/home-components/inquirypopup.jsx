import { useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { addUserinfo } from "@/store/shop/userinfoslice";
// You need to import your toast library here

export default function InquiryPopup({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ phone: "", email: "" });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { phone, email }); // Debugging

    // Simple validation
    const newErrors = { phone: "", email: "" };
    let isValid = true;

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Dispatching addUserinfo with:", { phone, email }); // Debugging

      // Dispatch the addUserinfo thunk
      dispatch(addUserinfo({ phone, email }))
        .then(() => {
          
          onClose();
          // Reset form
          setPhone("");
          setEmail("");
        })
        .catch((error) => {
          console.error("Failed to add user info:", error);
        });
    }
  };

  // The rest of your component remains the same...
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-green-700 text-center mb-2 playfair">
            First Time Here? We'd Love to Know You!
          </h2>
          <p className="text-gray-600 text-center mb-6 font-lato">
            Let's make your space stunning! Share a few details, and we'll help
            you find the perfect match.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-green-700 font-medium mb-1 text-left font-lato"
              >
                Phone<span className="text-green-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className={`w-full p-2 border rounded-md bg-white outline-none font-lato ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-green-700 font-medium mb-1 text-left font-lato"
              >
                Email address<span className="text-green-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={`w-full p-2 border rounded-md bg-white outline-none font-lato ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E8B57] hover:bg-green-700 text-white py-2 px-4 transition-colors font-lato"
            >
              Start Your Style Journey!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
