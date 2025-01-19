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
  image: null,
  productName: "",
  description: "",
  productType: "",
  category: "",
  collection: "",
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
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (!openCreateProductsDialog) {
      setFormData(initialFormData);
      setUploadedImageUrl("");
      setImageFile(null);
      setCurrentEditedId(null);
    }
  }, [openCreateProductsDialog]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentEditedId !== null) {
      try {
        const response = await dispatch(
          editProduct({
            id: currentEditedId,
            formData: {
              ...formData,
              image: uploadedImageUrl || formData.image,
            },
          })
        ).unwrap();

        if (response.success) {
          toast({
            title: "Success",
            description: "Product updated successfully!",
          });
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update product",
        });
      }
    } else {
      try {
        if (!uploadedImageUrl) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please upload a product image",
          });
          return;
        }

        const response = await dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).unwrap();

        if (response.success) {
          toast({
            title: "Success",
            description: "Product added successfully!",
          });
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add product",
        });
      }
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
    return Object.values(formData)
      .filter((_, index) => index !== 0) // Exclude image from validation
      .every((value) => value !== "");
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
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
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <Productimageupload
            file={imageFile}
            setFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Products;
