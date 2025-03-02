import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Width</TableHead>
                  <TableHead>Height</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Material</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails?.items && orderDetails?.items.length > 0
                  ? orderDetails.items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.productType}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.totalPrice}</TableCell>
                        <TableCell>{item.width}</TableCell>
                        <TableCell>{item.height}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.selectedMaterial}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
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
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
