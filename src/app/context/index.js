"use client";

import { toast } from "react-toastify";
import { allCardData } from "../../../public/assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cardData, setCardData] = useState();
  const [allData, setAllData] = useState();
  const [token, setToken] = useState();
  const [currUser, setCurrUser] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterOption, setFilterOption] = useState("");
  const [searchedData, setSearchedData] = useState();

  const router = useRouter();
  const DEBOUNCE_DELAY = 1000;

  const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (checkToken) {
      setToken(checkToken);
    }
    if (token) {
      fetchUserData();

      fetchAllData();
    }
  }, [token, isLoggedIn]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/getAllData", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;

      setAllData(data);
      setSearchedData(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
      } else if (error.response && error.response.status === 404) {
        console.error("Data not found for the given user ID.");
      } else {
        console.error("Error fetching user data:", error.message);
      }
    }
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const response = await axios.post("/api/auth/sign-up", {
        name,
        email,
        password,
      });

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      toast("Error While Creating Account");
    }
  };

  const logIn = async ({ email, password }) => {
    try {
      const response = await axios.post("/api/auth/log-in", {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      document.cookie = `token=${response.data.token}; path=/;`;
      setCurrUser(response.data.user);
      toast.success("Logged In Successfully");
      router.push("/");
    } catch (error) {
      toast.error("Log In Error");
    }
  };

  const addNewCard = async (data) => {
    data.userId = currUser?._id;
    data.isKnown = false;

    if (!isLoggedIn) {
      router.push("/log-in");
      toast.error("User is not Logged In");
    }

    try {
      await axios.post("/api/newCard", data);

      fetchAllData();
      toast.success("New Flash Card Created.");
    } catch (error) {
      toast("Error While Creating New Card");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCurrUser(response.data.user);

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Fetch error in User Data:", error);
    }
  };

  const deleteCard = async (id) => {
    try {
      const response = await axios.delete(`/api/deleteCard/${id}`);
      fetchAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const knownCard = async (id, isKnown) => {
    try {
      await axios.patch(`/api/updateCard`, {
        id,
        isKnown: !isKnown,
      });
      fetchAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce(async (query) => {
    if (!query) {
      setSearchedData(allData);
      setFilteredData(allData);
      return;
    }

    try {
      const response = await axios.get(`/api/search`, {
        params: { searchquery: query, limit: 20, userid: currUser._id },
      });
      const results = response.data.results;
      setSearchedData(response.data.results);
      const filteredResults = filterOption
        ? results.filter((item) => String(item.isKnown) === filterOption)
        : results;

      setFilteredData(filteredResults);
    } catch (error) {
      console.error(
        "Error during search:",
        error.response?.data || error.message
      );
    }
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    if (filterOption) {
      const temp = (searchedData || allData).filter(
        (item) => String(item.isKnown) === filterOption
      );
      setFilteredData(temp);
    } else {
      setFilteredData(searchedData || allData); // Immediate update
    }
  }, [filterOption, searchedData, isLoggedIn]);

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setFilteredData(allData); // Reset to all data when search query is empty
    }
  }, [searchQuery, isLoggedIn]);

  return (
    <StateContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cardData,
        setCardData,
        signUp,
        logIn,
        currUser,
        setCurrUser,
        addNewCard,
        allData,
        setAllData,
        deleteCard,
        searchQuery,
        setSearchQuery,
        filteredData,
        filterOption,
        setFilterOption,
        knownCard,
        searchedData,
        setToken,
        fetchUserData,
        fetchAllData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
