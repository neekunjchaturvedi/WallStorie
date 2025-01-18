import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";

const initialformdata = {
  image: null,
  title: "",
  description: "",
  producttype: "",
  category: "",
  collection: "",
  color: "",
  material: "",
  dimension: "",
  price: "",
  saleprice: "",
  stock: null,
};
export default function Products() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formdata, setformdata] = useState(initialformdata);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-green-300 text-black hover:bg-green-200"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={(isOpen) => setOpenCreateProductsDialog(isOpen)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <CommonForm
                form
                data={formdata}
                setFormData={setformdata}
                buttonText="Add"
                formControls={addProductFormElements}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
