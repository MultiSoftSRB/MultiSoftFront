import React, { createContext, useContext, useState, useEffect } from "react";
import { Firm } from "../types/firm";
import FirmContext from "./FirmContext";
import axiosInstance from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

const FirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);

  useEffect(() => {
    const storedFirm = localStorage.getItem("selectedFirm");

    if (storedFirm) {
      setSelectedFirm(JSON.parse(storedFirm));
    }
  }, []);

  const handleSelectedFirm = async (
    firm: Firm | null,
    apiCall: boolean = false
  ) => {
    let currentFirm = localStorage.getItem("selectedFirm");
    if (currentFirm != null) localStorage.removeItem("selectedFirm");
    setSelectedFirm(firm);
    localStorage.setItem("selectedFirm", JSON.stringify(firm));

    if (apiCall && firm != null) {
      try {
        var response = await axiosInstance.post("/auth/switch-company", {
          companyId: firm.id,
        });
        console.log(response);
        setSession(response.data.accessToken);
      } catch (error) {
        console.error("Error switching company:", error);
      }
    }
  };

  return (
    <FirmContext.Provider value={{ selectedFirm, handleSelectedFirm }}>
      {children}
    </FirmContext.Provider>
  );
};

export default FirmProvider;
