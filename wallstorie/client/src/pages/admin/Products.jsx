import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  color: "",
  trend: "",
  space: "",
  price: "",
  salePrice: "",
  discount: "",
  stockQuantity: "",
  popularity: 0,
  createdAt: "",
  updatedAt: "",
  createdBy: "",
  updatedBy: "",
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

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    productType: "all",
    categoryType: "all", // <-- Added categoryType filter
    trend: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const currentUser = "22951a3363"; // Current user's login

  const getCurrentUTCDateTime = () => {
    return "2025-05-29 18:19:57";
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productList && productList.length > 0) {
      applyFilters();
    } else {
      setFilteredProducts([]);
    }
  }, [productList, filters]);

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

  const resetFilters = () => {
    setFilters({
      search: "",
      productType: "all",
      categoryType: "all",
      trend: "all",
      minPrice: "",
      maxPrice: "",
    });
  };

  const applyFilters = () => {
    let filtered = [...productList];

    if (filters.search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(filters.search.trim().toLowerCase())
      );
    }

    // Filter by product type
    if (filters.productType && filters.productType !== "all") {
      filtered = filtered.filter(
        (product) => product.productType === filters.productType
      );
    }

    // Filter by category type (matches category field in data)
    if (filters.categoryType && filters.categoryType !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.categoryType
      );
    }

    // Filter by trend
    if (filters.trend && filters.trend !== "all") {
      filtered = filtered.filter((product) => product.trend === filters.trend);
    }

    // Filter by price range
    if (filters.minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.salePrice >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.salePrice <= Number(filters.maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields = [
      "productName",
      "description",
      "productType",
      "salePrice",
      "stockQuantity",
      "image1",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      if (typeof value === "number") {
        return value !== null && !isNaN(value);
      }
      return value !== undefined && value !== null && value !== "";
    });
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

    const currentDateTime = getCurrentUTCDateTime();

    const processedFormData = {
      ...formData,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      discount: formData.discount ? Number(formData.discount) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      popularity: Number(formData.popularity || 0),
      updatedAt: currentDateTime,
      updatedBy: currentUser,
    };

    if (!currentEditedId) {
      processedFormData.createdAt = currentDateTime;
      processedFormData.createdBy = currentUser;
    }

    try {
      const response = await dispatch(
        currentEditedId
          ? editProduct({
              id: currentEditedId,
              formData: processedFormData,
            })
          : addNewProduct(processedFormData)
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

  // Extract unique product types from products, filtering out any empty values
  const uniqueProductTypes = productList
    ? [...new Set(productList.map((product) => product.productType))].filter(
        (type) => type && type.trim() !== ""
      )
    : [];

  // Extract unique category types from products (category field)
  const uniqueCategoryTypes = productList
    ? [...new Set(productList.map((product) => product.category))].filter(
        (cat) => cat && cat.trim() !== ""
      )
    : [];

  // Extract unique trends from products, filtering out any empty values
  const uniqueTrends = productList
    ? [...new Set(productList.map((product) => product.trend))].filter(
        (trend) => trend && trend.trim() !== ""
      )
    : [];

  // Calculate min and max prices for the range
  const priceRange = productList
    ? productList.reduce(
        (acc, product) => {
          if (product.salePrice) {
            if (product.salePrice < acc.min || acc.min === 0) {
              acc.min = product.salePrice;
            }
            if (product.salePrice > acc.max) {
              acc.max = product.salePrice;
            }
          }
          return acc;
        },
        { min: 0, max: 0 }
      )
    : { min: 0, max: 0 };

  return (
    <Fragment>
      {/* Product Filters */}
      <div className="mb-5 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-3">Filter Products</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/5">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by product name"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/5">
            <Label htmlFor="productType">Product Type</Label>
            <Select
              value={filters.productType}
              onValueChange={(value) =>
                handleFilterChange("productType", value)
              }
            >
              <SelectTrigger id="productType">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueProductTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Category Type Filter */}
          <div className="w-full md:w-1/5">
            <Label htmlFor="categoryType">Category Type</Label>
            <Select
              value={filters.categoryType}
              onValueChange={(value) =>
                handleFilterChange("categoryType", value)
              }
            >
              <SelectTrigger id="categoryType">
                <SelectValue placeholder="All Category Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category Types</SelectItem>
                {uniqueCategoryTypes.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/5">
            <Label htmlFor="trend">Trend</Label>
            <Select
              value={filters.trend}
              onValueChange={(value) => handleFilterChange("trend", value)}
            >
              <SelectTrigger id="trend">
                <SelectValue placeholder="All Trends" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trends</SelectItem>
                {uniqueTrends.map((trend) => (
                  <SelectItem key={trend} value={trend}>
                    {trend.charAt(0).toUpperCase() + trend.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/5">
            <Label htmlFor="minPrice">Min Price (₹)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder={`Min: ${priceRange.min}`}
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              min={priceRange.min}
              max={priceRange.max}
            />
          </div>

          <div className="w-full md:w-1/5">
            <Label htmlFor="maxPrice">Max Price (₹)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder={`Max: ${priceRange.max}`}
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              min={priceRange.min}
              max={priceRange.max}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button variant="outline" onClick={resetFilters} className="mr-2">
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="mb-5 w-full flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">
            Showing {filteredProducts.length} of{" "}
            {productList ? productList.length : 0} products
          </span>
        </div>
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div>Loading products...</div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((productItem) => (
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
