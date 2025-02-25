import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "@/store/auth-slice";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Navbar from "@/components/home-components/Navbar";
import { Hheader } from "@/components/home-components/header";
import Orders from "@/components/shopping/orders";
import Address from "@/components/shopping/address";
import Userorders from "./Userorders";

const Accounts = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutuser());
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your account details.</div>;
  }

  return (
    <>
      <Hheader />
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Account Details</h1>
        <div className="flex flex-1 justify-end mb-4">
          <Button
            onClick={handleLogout}
            className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-green-600 text-white hover:bg-green-700"
          >
            <LogOut />
            Logout
          </Button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4 flex">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div className="mb-4 flex">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-8 py-8 text-left mx-auto">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">{<Userorders />}</TabsContent>
            <TabsContent value="address">{<Address />}</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Accounts;
