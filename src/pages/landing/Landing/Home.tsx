import React, { useContext, useEffect, useState } from "react";

import {
  Badge,
  Col,
  Container,
  Row,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

import { useTranslation } from "react-i18next";
import Navbar from "../../../components/navbar/Navbar";
import useDashboardItems from "../../../components/sidebar/useDashboardItems";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import FirmSelection from "../../../components/FirmSelection";
import useAuth from "../../../hooks/useAuth";
import { useFirm } from "../../../hooks/useFirm";
import { Firm } from "../../../types/firm";

const Home = () => {
  const { t } = useTranslation();

  const items = useDashboardItems();

  const { signIn, user, isInitialized, signOut } = useAuth();
  const { selectedFirm, handleSelectedFirm } = useFirm();
  const [firms, setFirms] = useState<Firm[]>([]);
  const [show, setShow] = useState<boolean>(false);
  //
  useEffect(() => {
    if (user && !selectedFirm) {
      setFirms(user.userCompanies);
      console.log("user", user);
    }
  }, [user]);

  const handleModalCancel = () => {
    console.log("cancel");
    setShow(false);
    signOut();
  };

  if (user && !selectedFirm && user.userType !== 1) {
    console.log(selectedFirm);
    return (
      <FirmSelection firms={firms} show={show} onCancel={handleModalCancel} />
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <section className="landing-intro pt-5 pt-lg-6 pb-5 pb-lg-7">
        <Container className="landing-intro-content">
          <Row className="align-items-center">
            <Col lg={5} className="mx-auto">
              {!user && (
                <div>
                  <Link to="/auth/sign-in">{t("SignIn")}</Link>
                  <br></br>
                  <Link to="/auth/sign-up">{t("SignUp")}</Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
