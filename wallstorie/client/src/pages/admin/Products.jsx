import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import Productimageupload from "@/components/admin/imageupload";

import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAllProducts,
  addNewProduct,
  deleteProduct,
  editProduct,
} from "@/store/admin/products-slice";
import AdminProductTile from "@/components/admin/product-tile";

const initialFormData = {
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  productName: "",
  description: "",
  productType: "",
  category: "",
  collections: "",
  color: "",
  material: "",
  dimensions: "",
  price: "",
  salePrice: "",
  stockQuantity: "",
};

function Products() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(["", "", "", ""]);
  const [imageLoadingStates, setImageLoadingStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (uploadedImageUrls.some((url) => url)) {
      setFormData((prev) => ({
        ...prev,
        image1: uploadedImageUrls[0] || prev.image1,
        image2: uploadedImageUrls[1] || prev.image2,
        image3: uploadedImageUrls[2] || prev.image3,
        image4: uploadedImageUrls[3] || prev.image4,
      }));
    }
  }, [uploadedImageUrls]);

  const resetForm = () => {
    setFormData(initialFormData);
    setUploadedImageUrls(["", "", "", ""]);
    setImageFiles([null, null, null, null]);
    setCurrentEditedId(null);
    setImageLoadingStates([false, false, false, false]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageLoadingStates.some((state) => state)) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: "Images are still uploading...",
      });
      return;
    }

    if (!formData.image1) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Primary image is required",
      });
      return;
    }

    try {
      const response = await dispatch(
        currentEditedId
          ? editProduct({
              id: currentEditedId,
              formData: {
                ...formData,
              },
            })
          : addNewProduct(formData)
      ).unwrap();

      if (response.success) {
        toast({
          title: "Success",
          description: `Product ${
            currentEditedId ? "updated" : "added"
          } successfully!`,
        });
        dispatch(fetchAllProducts());
        resetForm();
        setOpenCreateProductsDialog(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${currentEditedId ? "update" : "add"} product`,
      });
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await dispatch(deleteProduct(productId)).unwrap();
      if (response.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        });
        dispatch(fetchAllProducts());
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "productName",
      "description",
      "productType",
      "category",
      "price",
      "stockQuantity",
    ];

    return requiredFields.every(
      (field) =>
        formData[field] !== undefined &&
        formData[field] !== null &&
        formData[field] !== ""
    );
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-green-300 text-black hover:bg-green-200"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div>Loading products...</div>
        ) : productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
          }
          setOpenCreateProductsDialog(open);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full max-w-2xl">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            {[0, 1, 2, 3].map((index) => (
              <Productimageupload
                key={index}
                imageNumber={index + 1}
                file={imageFiles[index]}
                setFile={(newFile) => {
                  const newFiles = [...imageFiles];
                  newFiles[index] = newFile;
                  setImageFiles(newFiles);
                }}
                uploadedImageUrl={
                  formData[`image${index + 1}`] || uploadedImageUrls[index]
                }
                setUploadedImageUrl={(url) => {
                  const newUrls = [...uploadedImageUrls];
                  newUrls[index] = url;
                  setUploadedImageUrls(newUrls);
                }}
                setImageLoadingState={(state) => {
                  const newStates = [...imageLoadingStates];
                  newStates[index] = state;
                  setImageLoadingStates(newStates);
                }}
                imageLoadingState={imageLoadingStates[index]}
              />
            ))}
          </div>
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Update Product" : "Add Product"
              }
              formControls={addProductFormElements}
              isBtnDisabled={
                !isFormValid() || imageLoadingStates.some((state) => state)
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Products;
