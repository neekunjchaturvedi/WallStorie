import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "@/store/shop/productslice";
import { addToCart } from "@/store/shop/cartslice";
import UserLayout from "../user/layout";
import {
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ProductDetailsextra from "./prodextradetails";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";
import { checkAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

import Review from "./review";
import { FaArrowLeft } from "react-icons/fa";

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

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // RTK Query hook - called directly as a hook
  const {
    data: productdetails,
    isLoading,
    error,
    isSuccess,
  } = useGetProductDetailsQuery(id, {
    skip: !id, // Skip the query if no id
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [area, setArea] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [materialPrice, setMaterialPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const materials = [
    { id: 1, name: "Non woven", price: 0 },
    { id: 2, name: "HD", price: 30 },
    { id: 3, name: "Canvas", price: 59 },
  ];
  const materialsblinds = [
    { id: 1, name: "Normal Lining", price: 150 },
    { id: 2, name: "Blackout Lining", price: 220 },
  ];

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Set initial main image when product details load
  useEffect(() => {
    if (productdetails && productdetails.image1) {
      setMainImage(productdetails.image1);
    }
  }, [productdetails]);

  // Update price calculation to add material price before multiplying by area
  useEffect(() => {
    const basePrice = productdetails?.salePrice || productdetails?.price;
    if (basePrice) {
      // Add material price to base price first
      const adjustedBasePrice = basePrice + materialPrice;

      if (height && width) {
        const calculatedArea = (height * width) / 144;
        setArea(calculatedArea.toFixed(2));
        // Multiply the adjusted base price by area and quantity
        const totalPriceCalc = (
          calculatedArea *
          adjustedBasePrice *
          quantity
        ).toFixed(2);
        setTotalPrice(totalPriceCalc);
      } else if (length) {
        setArea(length);
        // For curtains, special case
        if (productdetails.productType === "curtains") {
          // For curtains, add material price separately (not per unit length)
          const totalPriceCalc = (
            length * basePrice * quantity +
            materialPrice
          ).toFixed(2);
          setTotalPrice(totalPriceCalc);
        } else {
          // For other length-based products
          const totalPriceCalc = (
            length *
            adjustedBasePrice *
            quantity
          ).toFixed(2);
          setTotalPrice(totalPriceCalc);
        }
      } else {
        // Simple products with no dimensions
        setTotalPrice((adjustedBasePrice * quantity).toFixed(2));
      }
    }
  }, [height, width, length, productdetails, materialPrice, quantity]);

  // Get all valid images as an array
  const getImages = () => {
    if (!productdetails) return [];
    return [
      productdetails.image1,
      productdetails.image2,
      productdetails.image3,
      productdetails.image4,
    ].filter(Boolean);
  };

  const openModal = (image) => {
    const images = getImages();
    const index = images.indexOf(image);
    setSelectedImage(image);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const navigateImage = (direction) => {
    const images = getImages();
    let newIndex = currentImageIndex + direction;

    // Handle wrapping around
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material.name);
    setMaterialPrice(material.price);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Calculate cart item data with the correct price formula
  const calculateCartItemData = () => {
    const basePrice = productdetails?.salePrice || productdetails?.price || 0;
    const adjustedBasePrice = basePrice + materialPrice;

    if (productdetails.productType === "curtains") {
      // For curtains, use length as area and add material price separately
      const areaValue = parseFloat(length) || 0;
      return {
        price: basePrice,
        // For curtains, material price is added after calculation
        totalPrice: parseFloat(
          (length * basePrice * quantity + materialPrice).toFixed(2)
        ),
        area: areaValue,
        length: areaValue,
        height: null,
        width: null,
      };
    } else if (height && width) {
      // For custom size products (wallpapers)
      const areaValue = parseFloat(((height * width) / 144).toFixed(2));
      return {
        // Include material price in the unit price
        price: adjustedBasePrice,
        // Use adjusted base price (with material price added) before multiplying by area
        totalPrice: parseFloat(
          (areaValue * adjustedBasePrice * quantity).toFixed(2)
        ),
        area: areaValue,
        height: parseFloat(height),
        width: parseFloat(width),
        length: null,
      };
    } else {
      // For standard products (wallpaperRolls or any other)
      return {
        price: adjustedBasePrice,
        totalPrice: parseFloat((adjustedBasePrice * quantity).toFixed(2)),
        area: null,
        height: null,
        width: null,
        length: null,
      };
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    // Validate inputs for custom size products
    if (
      productdetails.productType !== "wallpaperRolls" &&
      productdetails.productType !== "curtains" &&
      productdetails.category !== "sheer"
    ) {
      if (!height || !width) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter both height and width",
        });
        return;
      }

      if (!selectedMaterial) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a material",
        });
        return;
      }
    }

    // For curtains, validate material selection
    if (
      (productdetails.productType === "curtains" ||
        productdetails.productType === "blinds") &&
      !selectedMaterial
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a material type",
      });
      return;
    }

    // For curtains, validate length
    if (productdetails.productType === "curtains" && !length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter the length",
      });
      return;
    }

    try {
      const basePrice = productdetails?.salePrice || productdetails?.price;
      if (!basePrice) {
        throw new Error("Price is not available.");
      }

      // Calculate price data with the correct formula
      const priceData = calculateCartItemData();

      const cartItem = {
        userId: user.id,
        productId: productdetails._id,
        quantity,
        price: priceData.price,
        totalPrice: priceData.totalPrice,
        productType: productdetails.productType,
        productName: productdetails.title || productdetails.productName,
        image: productdetails.image1,
        selectedMaterial,
        materialPrice,
        area: priceData.area,
        height: priceData.height,
        width: priceData.width,
        length: priceData.length,
      };

      const result = await dispatch(addToCart(cartItem)).unwrap();
      console.log(cartItem);

      if (result.success) {
        toast({
          title: "Success",
          description: "Product added to cart successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add to cart",
      });
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    // Validate inputs for custom size products
    if (
      productdetails.productType !== "wallpaperRolls" &&
      productdetails.productType !== "curtains" &&
      productdetails.category !== "sheer"
    ) {
      if (!height || !width) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter both height and width",
        });
        return;
      }

      if (!selectedMaterial) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a material",
        });
        return;
      }
    }

    // For curtains, validate material selection
    if (
      (productdetails.productType === "curtains" ||
        productdetails.productType === "blinds") &&
      !selectedMaterial
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a material type",
      });
      return;
    }

    // For curtains, validate length
    if (productdetails.productType === "curtains" && !length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter the length",
      });
      return;
    }

    try {
      const basePrice = productdetails?.salePrice || productdetails?.price;
      if (!basePrice) {
        throw new Error("Price is not available.");
      }

      // Calculate price data with the correct formula
      const priceData = calculateCartItemData();

      const cartItem = {
        userId: user.id,
        productId: productdetails._id,
        quantity,
        price: priceData.price,
        totalPrice: priceData.totalPrice,
        productType: productdetails.productType,
        productName: productdetails.title || productdetails.productName,
        image: productdetails.image1,
        selectedMaterial,
        materialPrice,
        area: priceData.area,
        height: priceData.height,
        width: priceData.width,
        length: priceData.length,
      };

      const result = await dispatch(addToCart(cartItem)).unwrap();

      navigate("/checkout");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to proceed to checkout",
      });
    }
  };

  const handleshare = async () => {
    if (!navigator.share) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Web Share API not supported in this browser",
      });
      return;
    }

    const productName = productdetails.productName;
    const url = window.location.href;
    const imageUrl = mainImage || productdetails.image1;

    try {
      // Try to fetch the image and create a File object
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "product-image.jpg", { type: blob.type });

      // Give user a choice, or prefer text over file
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // Some browsers ignore text when sharing files, so ask user
        if (
          window.confirm(
            "Do you want to share the product image only? Press Cancel to share product details instead."
          )
        ) {
          await navigator.share({
            files: [file],
          });
        } else {
          await navigator.share({
            title: productName,
            text: `Check out this product: ${productName}\nSold by WallStorie\n${url}`,
          });
        }
      } else {
        // Fallback: share with text, title, and url only
        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}\nSold by WallStorie\n${url}`,
        });
      }
      toast({
        title: "Success",
        description: "Content shared successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error sharing content: " + (error.message || ""),
      });
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <UserLayout />
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <>
        <UserLayout />
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-xl text-red-600">
            Error loading product: {error.message}
          </p>
        </div>
      </>
    );
  }

  // Handle case where product is not found
  if (!productdetails) {
    return (
      <>
        <UserLayout />
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </>
    );
  }

  const images = getImages();

  return (
    <>
      <UserLayout />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <FaArrowLeft
          className="cursor-pointer text-green-600 mb-4 text-2xl"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden cursor-pointer">
              <img
                src={
                  mainImage ||
                  productdetails.image1 ||
                  "https://via.placeholder.com/500"
                }
                alt={productdetails.productName}
                className="w-full h-[500px] object-contain hover:scale-105 transition-transform duration-300"
                onClick={() => openModal(mainImage || productdetails.image1)}
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden cursor-pointer ${
                      (mainImage || productdetails.image1) === img
                        ? "border-green-500 border-2"
                        : ""
                    }`}
                    onClick={() => handleThumbnailClick(img)}
                  >
                    <img
                      src={img}
                      alt={`${productdetails.productName} view ${index + 1}`}
                      className="w-full h-36 object-cover hover:opacity-75 transition"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex text-left">
              {productdetails.productName}
            </h2>

            {/* Price and Size Section */}
            <div className="space-y-6 mb-6">
              {productdetails.productType === "wallpaperRolls" ||
              productdetails.productType === "curtains" ? (
                <>
                  <div className="flex items-center justify-between gap-4 font-lato">
                    <div className="flex items-center gap-4 font-lato">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{productdetails.salePrice || productdetails.price}/{" "}
                        {productdetails.productType == "wallpaperRolls" ? (
                          <span className="text-2xl font-bold text-green-600">
                            50 sqft roll
                          </span>
                        ) : (
                          <span className="text-2xl font-bold text-green-600">
                            {" "}
                            per m
                          </span>
                        )}
                      </span>

                      {productdetails.salePrice &&
                        productdetails.price !== 0 && (
                          <span className="text-xl text-gray-500 line-through">
                            ₹{productdetails.price}
                          </span>
                        )}
                      {productdetails.discount && (
                        <span className="text-xl text-green-600">
                          {productdetails.discount}% off
                        </span>
                      )}
                    </div>

                    <div
                      className="text-green-600 bg-white hover:bg-white cursor-pointer"
                      onClick={handleshare}
                    >
                      <Share2 size={28} />
                    </div>
                  </div>

                  <div className="flex">
                    {productdetails.productType === "wallpaperRolls" ? (
                      <span className="text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-lg text-left playfair">
                        Size: Standard roll
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-lg text-left playfair">
                        Size: In meters
                      </span>
                    )}
                  </div>
                  {productdetails.productType === "curtains" && (
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        Length (meters)
                      </label>
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-1/3 p-3 border rounded-lg bg-white outline-none"
                        min="1"
                        placeholder="Enter length"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>

                    <span className="w-6 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncrease}
                      className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-6 font-lato">
                  <div className="flex items-center justify-between gap-4 font-lato">
                    <div className="flex items-center gap-4 font-lato">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{productdetails.salePrice || productdetails.price} per
                        sq.ft
                      </span>
                      {productdetails.salePrice &&
                        productdetails.price !== 0 && (
                          <span className="text-xl text-gray-500 line-through">
                            ₹{productdetails.price}
                          </span>
                        )}
                      {productdetails.discount && (
                        <span className="text-xl text-green-600">
                          {productdetails.discount}% off
                        </span>
                      )}
                    </div>

                    <div
                      className="text-green-600 bg-white hover:bg-white cursor-pointer"
                      onClick={handleshare}
                    >
                      <Share2 size={28} />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg">
                    <div className="mb-4 flex">
                      <span className="text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-lg text-left">
                        Size: Custom roll
                      </span>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                          Height (inches)
                        </label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-1/3 p-3 border rounded-lg bg-white outline-none"
                          min="1"
                          placeholder="Enter height"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                          Width (inches)
                        </label>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-1/3 p-3 border rounded-lg bg-white outline-none"
                          min="1"
                          placeholder="Enter width"
                        />
                      </div>
                    </div>
                    {area > 0 && (
                      <div className="mt-4 space-y-2 p-4 bg-white rounded-lg border">
                        <div className="text-sm text-gray-600">
                          Total Area: {area} sq.ft
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          Total Price: ₹{totalPrice}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>

                    <span className="w-6 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncrease}
                      className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              {(productdetails.productType === "wallpapers" ||
                productdetails.productType === "curtains" ||
                productdetails.productType === "blinds" ||
                productdetails.productType === "artist") && (
                <div className="p-4">
                  <h3 className="text-green-700 font-medium mb-3 text-left">
                    Material :{" "}
                    <span className="text-black">{selectedMaterial}</span>
                  </h3>
                  <div className="flex gap-4">
                    {productdetails.productType === "wallpapers" ||
                    productdetails.productType === "artist"
                      ? materials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => handleMaterialChange(material)}
                            className={`
                  relative w-32 h-32 border rounded-lg p-4 
                  flex flex-col items-center justify-center
                  transition-all duration-200
                  ${
                    !selectedMaterial && material.name === "Non woven"
                      ? "border-green-600 border-2"
                      : "null"
                  }
                  ${
                    selectedMaterial === material.name
                      ? "border-green-600 border-2"
                      : "border-gray-200 hover:border-green-200"
                  }
                `}
                          >
                            <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-sm rounded-tr-lg">
                              +₹{material.price}
                            </div>
                            <span className="text-center mt-4">
                              {material.name}
                            </span>
                          </button>
                        ))
                      : materialsblinds.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => handleMaterialChange(material)}
                            className={`
                  relative w-32 h-32 border rounded-lg p-4 
                  flex flex-col items-center justify-center
                  transition-all duration-200
                  ${
                    selectedMaterial === material.name
                      ? "border-green-600 border-2"
                      : "border-gray-200 hover:border-green-200"
                  }
                `}
                          >
                            <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-sm rounded-tr-lg rounded-bl-lg">
                              +₹{material.price}
                            </div>
                            <span className="text-center mt-4">
                              {material.name}
                            </span>
                          </button>
                        ))}
                  </div>
                  {selectedMaterial && !height && !width && (
                    <div className="mt-4 text-2xl font-bold text-green-600 font-lato">
                      Total Price: ₹{totalPrice}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="font-extralight text-xs text-gray-800 mb-6">
              All prices include tax. Shipping calculated at checkout
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 lg:mb-8 mb-8 lg:max-w-xl">
              {productdetails.stockQuantity !== 0 ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-3xl hover:bg-green-700 transition duration-200 text-lg font-semibold font-lato"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="flex-1 bg-white text-green-700 py-3 px-6 border-2 border-green-500 transition duration-200 text-lg font-semibold font-lato"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <>
                  <div>Out Of Stock</div>
                </>
              )}
            </div>
            <a
              href={`https://wa.me/916302644520?text=I'm%20interested%20in%20buying%20${encodeURIComponent(
                productdetails.productName
              )}%20${encodeURIComponent(
                productdetails.productType
              )}%20${encodeURIComponent(window.location.href)}`}
            >
              <button className="flex-1 bg-white text-green-700 py-3 px-6 border-2 border-green-500 transition duration-200 text-lg font-lato">
                Need Help? Order via Whatsapp
              </button>
            </a>
          </div>
        </div>
        {productdetails.productType === "artist" ? (
          <Section title="Artist Description" className="text-green-500">
            <div className="mb-4 flex flex-col text-left">
              <ul className="list-disc pl-10 flex flex-col mb-6">
                {productdetails.description}
              </ul>
            </div>
          </Section>
        ) : null}
        {productdetails.productType !== "artist" ? (
          <Section title="Product Description" className="text-green-500">
            <div className="mb-4 flex flex-col text-left">
              <ul className="list-disc pl-10 flex flex-col mb-6">
                {productdetails.description}
              </ul>
            </div>
          </Section>
        ) : null}

        <ProductDetailsextra
          producttype={productdetails.productType}
          category={productdetails.category}
        />
        <Review productDetails={productdetails} />

        {/* Image Modal with Navigation */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X size={24} />
              </button>

              {/* Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-30 p-2 rounded-full"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-30 p-2 rounded-full"
              >
                <ChevronRight size={32} />
              </button>

              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-h-[90vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Thumbnail navigation in modal */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 border-2 rounded overflow-hidden cursor-pointer transition-all ${
                      currentImageIndex === index
                        ? "border-white"
                        : "border-gray-500 opacity-70"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                      setSelectedImage(img);
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="absolute inset-0" onClick={closeModal}></div>
          </div>
        )}
      </div>
      <div className="max-w-full mx-auto">
        <Footer />
      </div>
      <Bottomfoot />
    </>
  );
};

export default ProductDetails;
