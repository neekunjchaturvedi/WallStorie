import React from "react";
import { Button } from "../ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const handleSelectAddress = () => {
    if (setCurrentSelectedAddress) {
      setCurrentSelectedAddress(addressInfo);
    }
  };

  return (
    <div
      onClick={handleSelectAddress}
      className={`cursor-pointer border p-4 rounded-md ${
        selectedId === addressInfo._id
          ? "border-red-500 border-2"
          : "border-gray-300"
      }`}
    >
      <div className="grid gap-4 text-left">
        <h3 className="text-left font-medium">
          Name: <span className="font-normal">{addressInfo?.name}</span>
        </h3>
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
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
