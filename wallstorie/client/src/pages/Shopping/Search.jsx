import { Hheader } from "@/components/home-components/header";
import Navbar from "@/components/home-components/Navbar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cartslice";
import { getSearchResults, resetSearchResults } from "@/store/shop/searchslice";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchProducts() {
  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      const delayDebounceFn = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword))
          .unwrap()
          .then((response) => {
            console.log("Search Results:", response);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      }, 100);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword, dispatch, setSearchParams]);

  return (
    <>
      <Hheader />
      <Navbar />
      <div className="container max-w-5xl mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full flex items-center justify-center gap-4">
            <FaSearch size={24} className="font-extralight" />
            <Input
              value={keyword}
              name="keyword"
              onChange={(event) => setKeyword(event.target.value)}
              className="py-6 max-w-6xl"
              placeholder="Search Products..."
            />
          </div>
        </div>
        {isLoading ? (
          <h1 className="text-xl font-extrabold font-lato">Loading...</h1>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-md flex items-center"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <img
                  src={product.image1}
                  alt={product.productName}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{product.productName}</h2>
                  <p className="text-gray-600 font-lato">
                    {capitalizeFirstLetter(product.productType)}
                  </p>
                  {product.category ? (
                    <p className="text-gray-600 font-lato">
                      Category: {capitalizeFirstLetter(product.category)}
                    </p>
                  ) : null}
                </div>
                {product.salePrice ? (
                  <p className="text-green-600 font-bold font-lato">
                    ₹{product.salePrice}
                  </p>
                ) : (
                  <p className="text-green-600 font-bold">₹{product.price}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-extrabold font-lato">No result found!</h1>
        )}
      </div>
    </>
  );
}

export default SearchProducts;
