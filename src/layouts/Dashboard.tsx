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

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const items = useDashboardItems();
  const { signIn, user, isInitialized } = useAuth();
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [firms, setFirms] = useState<Firm[]>([]);

  //
  useEffect(() => {
    if (user) {
      setFirms(user.firms);

      if (firms.length === 1) {
        setSelectedFirm(firms[0]);
      }
    }
  }, [user]);

  if (!selectedFirm) {
    return (
      <FirmSelection firms={firms} onFirmSelect={setSelectedFirm} show={true} />
    );
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
