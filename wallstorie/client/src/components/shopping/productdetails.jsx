import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getproductinfo } from "@/store/shop/productslice";
import { addToCart } from "@/store/shop/cartslice";
import UserLayout from "../user/layout";
import { Share2, X } from "lucide-react";
import ProductDetailsextra from "./prodextradetails";
import Footer from "../home-components/Footer";
import { Bottomfoot } from "../home-components/Bottomfoot";
import { checkAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productdetails, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
    { id: 1, name: "Non woven", price: 99 },
    { id: 2, name: "Premium Texture", price: 139 },
    { id: 3, name: "Canvas", price: 249 },
  ];
  const materialsblinds = [
    { id: 1, name: "Normal Lining", price: 150 },
    { id: 2, name: "Blackout Lining", price: 220 },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getproductinfo(id));
      dispatch(checkAuth());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const basePrice = productdetails?.salePrice || productdetails?.price;
    if (basePrice) {
      if (height && width) {
        const calculatedArea = (height * width) / 144;
        setArea(calculatedArea.toFixed(2));
        const totalPriceCalc = (
          calculatedArea * basePrice * quantity +
          materialPrice
        ).toFixed(2);
        setTotalPrice(totalPriceCalc);
      } else if (length) {
        setArea(length);
        const totalPriceCalc = (
          length * basePrice * quantity +
          materialPrice
        ).toFixed(2);
        setTotalPrice(totalPriceCalc);
      } else {
        setTotalPrice((basePrice * quantity + materialPrice).toFixed(2));
      }
    }
  }, [height, width, length, productdetails, materialPrice, quantity]);

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material.name);
    setMaterialPrice(material.price);
    const basePrice = productdetails?.salePrice || productdetails?.price;
    if (!height && !width && basePrice) {
      setTotalPrice((basePrice * quantity + material.price).toFixed(2));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    // Validate inputs for custom size products
    if (
      productdetails.productType !== "wallpaperRolls" &&
      productdetails.productType !== "curtains"
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

    // For curtains and blinds, validate material selection
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
    if (
      (productdetails.productType === "curtains" ||
        productdetails.productType === "wallpaperRolls") &&
      !length
    ) {
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

      const cartItem = {
        userId: user.id,
        productId: productdetails._id,
        quantity,
        price: basePrice,
        totalPrice: parseFloat(totalPrice),
        productType: productdetails.productType,
        productName: productdetails.title || productdetails.productName,
        image: productdetails.image1,
        selectedMaterial,
        materialPrice,
      };

      // Handle different product types
      if (
        productdetails.productType === "curtains" ||
        productdetails.productType === "wallpaperRolls"
      ) {
        // For curtains and wallpaper rolls, use length as the area
        cartItem.area = parseFloat(length);
        cartItem.length = parseFloat(length);
      } else {
        // For wallpapers and other custom products
        cartItem.height = height ? parseFloat(height) : null;
        cartItem.width = width ? parseFloat(width) : null;
        cartItem.area = area ? parseFloat(area) : null;
      }

      const result = await dispatch(addToCart(cartItem)).unwrap();

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
    if (
      (productdetails.productType === "curtains" ||
        productdetails.productType === "wallpaperRolls") &&
      !length
    ) {
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

      const cartItem = {
        userId: user.id,
        productId: productdetails._id,
        quantity,
        price: basePrice,
        totalPrice: parseFloat(totalPrice),
        productType: productdetails.productType,
        productName: productdetails.title || productdetails.productName,
        image: productdetails.image1,
        selectedMaterial,
        materialPrice,
      };

      // Handle different product types
      if (
        productdetails.productType === "curtains" ||
        productdetails.productType === "wallpaperRolls"
      ) {
        // For curtains and wallpaper rolls, use length as the area
        cartItem.area = parseFloat(length);
        cartItem.length = parseFloat(length);
      } else {
        // For wallpapers and other custom products
        cartItem.height = height ? parseFloat(height) : null;
        cartItem.width = width ? parseFloat(width) : null;
        cartItem.area = area ? parseFloat(area) : null;
      }

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check this ${productdetails.productType}`,
          text: `Sold by WallStorie  ${productdetails.productName}.`,
          url: window.location.href,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      console.error("Web Share API not supported in this browser");
    }
  };

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

  const images = [
    productdetails.image1,
    productdetails.image2,
    productdetails.image3,
    productdetails.image4,
  ].filter(Boolean);

  return (
    <>
      <UserLayout />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden cursor-pointer">
              <img
                src={productdetails.image1 || "https://via.placeholder.com/500"}
                alt={productdetails.productName}
                className="w-full h-[500px] object-contain hover:scale-105 transition-transform duration-300"
                onClick={() => openModal(productdetails.image1)}
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openModal(img)}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex">
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
                        ₹{productdetails.salePrice || productdetails.price}
                      </span>
                      {productdetails.salePrice && (
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
                        ₹{productdetails.salePrice || productdetails.price}
                      </span>
                      {productdetails.salePrice && (
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
                productdetails.productType === "blinds") && (
                <div className="p-4">
                  <h3 className="text-green-700 font-medium mb-3 text-left">
                    Material :{" "}
                    <span className="text-black">{selectedMaterial}</span>
                  </h3>
                  <div className="flex gap-4">
                    {productdetails.productType === "wallpapers"
                      ? materials.map((material) => (
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
            </div>
            <a
              href={`https://wa.me/916302445751?text=I'm%20interested%20in%20buying%20${encodeURIComponent(
                productdetails.productName
              )}%20${encodeURIComponent(productdetails.productType)}`}
            >
              <button className="flex-1 bg-white text-green-700 py-3 px-6 border-2 border-green-500 transition duration-200 text-lg font-lato">
                Need Help? Order via Whatsapp
              </button>
            </a>
          </div>
        </div>
        <ProductDetailsextra
          producttype={productdetails.productType}
          category={productdetails.category}
        />

        {/* Image Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-h-[90vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
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
