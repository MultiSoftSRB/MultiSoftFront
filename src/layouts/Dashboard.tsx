import React, { Suspense, ReactNode, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Loader from "../components/Loader";
import FirmSelection from "../components/FirmSelection";

import useDashboardItems from "../../src/components/sidebar/useDashboardItems";
import useAuth from "../hooks/useAuth";
import { Firm, LicenseType } from "../types/firm";
import { useFirm } from "../hooks/useFirm";

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const items = useDashboardItems();
  const { signIn, user, isInitialized } = useAuth();
  const { selectedFirm, handleSelectedFirm } = useFirm();
  const [firms, setFirms] = useState<Firm[]>([]);
  //
  useEffect(() => {
    if (user && !selectedFirm) {
      setFirms(user.userCompanies);
      console.log("user", user);
    }
  }, [user]);

  // useEffect(() => {
  //   if (!selectedFirm) {
  //     handleSelectedFirm(firms[0]); // Auto-select firm if only one is available
  //     console.log("Auto-selected firm:", firms[0]);
  //   }
  // }, [firms, selectedFirm]);

  if (user && !selectedFirm && user.username != "superadmin") {
    console.log(selectedFirm);
    return <FirmSelection firms={firms} show={true} />;
  }

  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar items={items} />
        <Main>
          <Navbar />
          <Content>
            <Suspense fallback={<Loader />}>
              {children}
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Main>
      </Wrapper>
      <Settings />
    </React.Fragment>
  );
};

export default Dashboard;
