/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";



// Initialize socket connection
const socket: Socket = io("http://localhost:1000", {
  extraHeaders: {
    "x-access-token": "mock-token",
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

export default function Home() {
  const token = localStorage.getItem("token") || ''
  const [accessToken, setAccessToken] = useState(token)
  const [loading, setLoading] = useState(true)
  const [currentUserLoadedSuccessfully, setCurrentUserLoadedSuccessfully] = useState(false)
  const [usersLoadedSuccessfully, setUsersLoadedSuccessfully] = useState(false)
  const [groupsLoadedSuccessfully, setGroupsLoadedSuccessfully] = useState(false)
  const [validUser, setValidUser] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)


  const router = useRouter()

  const checkUser = async () => {
    if (accessToken) {
      const response = await fetch("http://localhost:1000/api/checkUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 400) setAccessToken(data.token)
      else if (response.status === 200) setValidUser(true)

    }
    else {
      router.push("/login")
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/fetchAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        sessionStorage.setItem("users", JSON.stringify(data.users))
        setUsersLoadedSuccessfully(true)
      }
      else if (response.status === 400) setAccessToken(data.token)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/fetchCurrentUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(data.userDetails))
        setCurrentUserLoadedSuccessfully(true)
      }
      else if (response.status === 400) setAccessToken(data.token)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllGroups = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/fetchAllGroups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accessToken: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        sessionStorage.setItem("groups", JSON.stringify(data.groups))
        setGroupsLoadedSuccessfully(true)
      }
      else if (response.status === 400) setAccessToken(data.token)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setAccessToken(token)
    checkUser()
    fetchCurrentUser()
    fetchUsers()
    fetchAllGroups()
    socket.on('connect_error', () => setSocketConnected(false))
    socket.on('connect', () => setSocketConnected(true))
    return () => {
      socket.off('connect_error')
      socket.off('connect')
    }
  }, []);


  useEffect(() => {
    if (
      currentUserLoadedSuccessfully &&
      usersLoadedSuccessfully &&
      groupsLoadedSuccessfully &&
      socketConnected &&
      validUser
    ) {
      setLoading(false);
      router.push("/dashboard");
    }
  }, [
    currentUserLoadedSuccessfully,
    usersLoadedSuccessfully,
    groupsLoadedSuccessfully,
    socketConnected,
    validUser,
  ]);

  useEffect(() => {
    if (socketConnected && loading) {
      checkUser()
      fetchCurrentUser()
      fetchUsers()
      fetchAllGroups()
    }
  }, [socketConnected])




  return (
    <div className="flex h-screen justify-center bg-gradient-to-r from-purple-300 to-purple-400 ">
      {loading && <div className="flex flex-col  justify-center items-center">
        <div className="font-bold text-3xl">Chat App</div>
        <span className="loading loading-bars text-3xl text-black ">Loading</span>
      </div>}
    </div>
  );
}
