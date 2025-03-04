import AdminOrders from "@/components/admin/AdminOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Orders() {
  return (
    <div className="container grid grid-cols-1 gap-8 py-8 text-left mx-auto">
      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">{<AdminOrders />}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
