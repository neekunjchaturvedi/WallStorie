import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/orders-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(updateOrderStatus({ id: orderDetails?._id, status })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllOrdersForAdmin());
          setFormData(initialFormData);
          toast({
            title: data?.payload?.message,
          });
        }
      }
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>
              {new Date(orderDetails?.createdAt).toLocaleDateString()}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.status === "Delivered"
                    ? "bg-green-700 hover:bg-green-700"
                    : orderDetails?.status === "Cancelled"
                    ? "bg-red-600 hover:bg-red-600"
                    : orderDetails?.status === "Shipped"
                    ? "bg-green-500 hover:bg-green-500"
                    : "bg-black hover:bg-black"
                }`}
              >
                {orderDetails?.status}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>

            {orderDetails?.items && orderDetails?.items.length > 0
              ? orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="border p-4 rounded-md flex items-center"
                    onClick={() => navigate(`/products/${item.productId}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{item.productName}</h2>
                      <p className="text-gray-600 font-lato">
                        {item.productType}
                      </p>
                      {item.productType === "curtains" && (
                        <>
                          <p className="text-gray-600 font-lato">
                            Length: {item.area}m
                          </p>
                          <p className="text-gray-600 font-lato">
                            Material: {item.selectedMaterial}
                          </p>
                        </>
                      )}
                      {(item.productType === "wallpapers" ||
                        item.productType === "blinds" ||
                        item.productType === "artist") && (
                        <>
                          <p className="text-gray-600 font-lato">
                            Width: {item.width}
                          </p>
                          <p className="text-gray-600 font-lato">
                            Height: {item.height}
                          </p>
                          <p className="text-gray-600 font-lato">
                            Area: {item.area}
                          </p>
                          <p className="text-gray-600 font-lato">
                            Material: {item.selectedMaterial}
                          </p>
                        </>
                      )}
                      {item.category ? (
                        <p className="text-gray-600 font-lato">
                          Category: {item.category}
                        </p>
                      ) : null}
                    </div>
                    {item.totalPrice ? (
                      <p className="text-green-600 font-bold font-lato">
                        ₹{item.totalPrice}
                      </p>
                    ) : (
                      <p className="text-green-600 font-bold">₹{item.price}</p>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.shippingAddress?.address}</span>
              <span>{orderDetails?.shippingAddress?.city}</span>
              <span>{orderDetails?.shippingAddress?.pincode}</span>
              <span>{orderDetails?.shippingAddress?.phone}</span>
              <span>{orderDetails?.shippingAddress?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending" },
                  { id: "Processing", label: "Processing" },
                  { id: "Shipped", label: "Shipped" },
                  { id: "Delivered", label: "Delivered" },
                  { id: "Cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
