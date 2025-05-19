import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Truck, ShieldCheck } from "lucide-react";
import productDetails from "@/config/proddetails";

// Helper for map action
const openInNewTab = (url) => window.open(url, "_blank");
const openMap = (address) =>
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`,
    "_blank"
  );
const callPhone = (phone) => (window.location.href = `tel:${phone}`);

const Section = ({ title, children, className }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4">
      <div
        className={`flex justify-between items-center cursor-pointer py-2 border-b ${className}`}
        onClick={() => setOpen(!open)}
      >
        <h3 className={`text-xl font-semibold text-green-800 mb-4`}>{title}</h3>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {open && <div className="mt-2 text-gray-700">{children}</div>}
    </div>
  );
};

const renderMoreInfoItem = (item) => {
  // If string, just display as text (fallback)
  if (typeof item === "string") {
    return (
      <span key={item}>
        {item}
        <br />
      </span>
    );
  }
  // If object, render clickable
  switch (item.type) {
    case "website":
      return (
        <span
          key={item.value}
          className="text-green-700 underline cursor-pointer"
          onClick={() => openInNewTab(item.value)}
        >
          {item.label}
        </span>
      );
    case "phone":
      return (
        <span
          key={item.value}
          className="text-green-700 underline cursor-pointer"
          onClick={() => callPhone(item.value)}
        >
          {item.label}
        </span>
      );
    case "address":
      return (
        <span
          key={item.value}
          className="text-green-700 underline cursor-pointer"
          onClick={() => openMap(item.value)}
        >
          {item.label}
        </span>
      );
    default:
      return (
        <span key={item.label}>
          {item.label}
          <br />
        </span>
      );
  }
};

const ProductDetailsextra = ({ producttype, category }) => {
  const details =
    producttype === "blinds" || producttype === "curtains"
      ? productDetails[producttype][category]
      : productDetails[producttype];

  if (!details) {
    return <div>Product details not available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-lato">
      <Card>
        <CardContent className="p-6">
          <Section title="Product Details" className="text-green-500">
            <div className="mb-4 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Quantity:</h4>
              <ul className="list-disc pl-10 flex flex-col mb-6">
                {details.details.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Print:</h4>
              <ul className="list-disc pl-10 flex flex-col mb-6">
                {details.print
                  ? details.print.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  : details.material.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
              </ul>
            </div>
            <div className="mb-8 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Installation:</h4>
              <ul className="list-disc pl-10 ">
                {details.installation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold flex flex-col text-left mb-4">
                Care:
              </h4>
              <ul className="list-disc pl-10 text-left">
                {details.care.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Shipping & Delivery">
            <div className="gap-8 lg:flex justify-center">
              {details.shipping.map((item, index) => (
                <div className="flex items-center gap-4 mb-2" key={index}>
                  {item.icon === "Truck" && (
                    <Truck size={24} className="  text-green-600" />
                  )}
                  {item.icon === "ShieldCheck" && (
                    <ShieldCheck size={24} className="text-green-600" />
                  )}
                  <div className="flex flex-col text-left">
                    <strong>{item.title}</strong> {item.description}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Sustainability Insights" className="text-green-500">
            <ul className="list-disc pl-10 text-left">
              {details.sustainability.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="More Information" className="text-green-500">
            <div className="text-left flex flex-col gap-2">
              {details.moreInfo.map((item, index) => (
                <span key={index}>{renderMoreInfoItem(item)}</span>
              ))}
            </div>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsextra;
