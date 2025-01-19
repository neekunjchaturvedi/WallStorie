import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
    handleDelete,
  }) {
    const handleEdit = () => {
      // Log to verify the data we're setting
      console.log("Editing product:", product);
      
      setOpenCreateProductsDialog(true);
      setCurrentEditedId(product?._id);
      // Make sure we're setting the productName field correctly
      setFormData({
        productName: product?.productName || "",  // Keep this exactly as it appears in your database
        description: product?.description || "",
        productType: product?.productType || "",
        category: product?.category || "",
        collection: product?.collection || "",
        color: product?.color || "",
        material: product?.material || "",
        dimensions: product?.dimensions || "",
        price: product?.price || "",
        salePrice: product?.salePrice || "",
        stockQuantity: product?.stockQuantity || "",
        image: product?.image || null,
      });
    };
  
    return (
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.productName}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent>
            <h2 className="text-xl font-bold mb-2 mt-2">
              {product?.productName}
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">${product?.salePrice}</span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
          </CardFooter>
        </div>
      </Card>
    );
  }
  
  export default AdminProductTile;
