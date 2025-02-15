import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Truck, ShieldCheck } from "lucide-react";

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

const ProductDetailsextra = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 font-lato">
      <Card>
        <CardContent className="p-6">
          <Section title="Product Details" className="text-green-500">
            <div className="mb-4 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Quantity:</h4>
              <ul className="list-disc pl-10 flex flex-col mb-6">
                <li>Standard coverage: Custom</li>
                <li>Panels are customized based on wall dimensions.</li>
                <li>Wallpaper is delivered in multiple sections.</li>
              </ul>
            </div>
            <div className="mb-4 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Print:</h4>
              <ul className="list-disc pl-10 flex flex-col mb-6">
                <li>Color tones may vary depending on the chosen finish.</li>
                <li>High-quality digital printing ensures vibrant details.</li>
              </ul>
            </div>
            <div className="mb-8 flex flex-col text-left">
              <h4 className="font-semibold mb-4">Installation:</h4>
              <ul className="list-disc pl-10 ">
                <li>Requires professional installation for best results.</li>
                <li>
                  Walls should be primed at least 10 days before application.
                </li>
                <li>Ensures seamless alignment and a flawless finish.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold flex flex-col text-left mb-4">
                Care:
              </h4>
              <ul className="list-disc pl-10 text-left">
                <li>Clean with a soft, damp cloth only.</li>
                <li>Avoid harsh chemicals and abrasives.</li>
                <li>Preserves the wallpaper's texture and color.</li>
              </ul>
            </div>
          </Section>

          <Section title="Shipping & Delivery">
            <div className="gap-8 lg:flex justify-center">
              <div className="flex items-center gap-4 mb-2 ">
                <Truck size={24} className="text-green-600" />
                <div className="flex flex-col text-left">
                  <strong>Low-cost shipping:</strong> Delivery in 2-3 business
                  days across India.
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck size={24} className="text-green-600" />
                <div className="flex flex-col text-left">
                  <strong>Secure delivery:</strong> Orders with timely updates
                  via email or SMS.
                </div>
              </div>
            </div>
          </Section>

          <Section title="Sustainability Insights" className="text-green-500">
            <ul className="list-disc pl-10 text-left">
              <li>
                <strong>Eco-Materials:</strong> Made from sustainable fabrics.
              </li>
              <li>
                <strong>Energy-Saving:</strong> Improves insulation, cuts energy
                use.
              </li>
              <li>
                <strong>Low VOCs:</strong> Ensures healthier air quality.
              </li>
              <li>
                <strong>Green Packaging:</strong> Delivered in biodegradable
                packs.
              </li>
            </ul>
          </Section>

          <Section title="More Information" className="text-green-500">
            <p className="text-left">
              <strong>Get in Touch:</strong> wallstorie.com | +XXXXX
              <br />
              <strong>Sold By:</strong> Wallstorie Pvt. Ltd.
              <br />
              <strong>Reach Us At:</strong> Wall Vibes (HDVPL), 45 Green Acres,
              Sunset Avenue, Harmony Complex, Maple Street, Andheri East,
              Mumbai, 400059
            </p>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsextra;
