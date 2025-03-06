import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserinfo, fetchAllUsers } from "@/store/shop/userinfoslice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo.userinfo);
  const allUsers = useSelector((state) => state.userinfo.allUsers);
  const status = useSelector((state) => state.userinfo.status);
  const error = useSelector((state) => state.userinfo.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserinfo());
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  return (
    <div className="font-lato  ">
      <div className="mb-8 w-1/2 border-2 rounded-lg">
        <h2 className="mb-4 mt-3">Contacts(Pop up)</h2>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-left">
              {userinfo.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="w-1/2 border-2 rounded-lg">
        <h2 className="mb-4 mt-3">All Registered Users</h2>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-left">
              {allUsers.map((user) => (
                <TableRow key={user._id}>
                  {user.role == "admin" ? null : (
                    <>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
