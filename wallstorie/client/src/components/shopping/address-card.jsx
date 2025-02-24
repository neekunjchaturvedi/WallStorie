import React from "react";
import { Button } from "../ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <div
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border p-4 rounded-md ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-4"
          : "border-black"
      }`}
    >
      <div className="grid gap-4 text-left">
        <h3 className="text-left font-medium">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </h3>
        <h3 className="text-left font-medium">
          City: <span className="font-normal">{addressInfo?.city}</span>
        </h3>
        <h3 className="text-left font-medium">
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </h3>
        <h3 className="text-left font-medium">
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </h3>
        <h3 className="text-left font-medium">
          Notes: <span className="font-normal">{addressInfo?.notes}</span>
        </h3>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </div>
    </div>
  );
}

export default AddressCard;
