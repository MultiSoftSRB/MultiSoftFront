import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Navbar, Nav, Form, InputGroup } from "react-bootstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  UserPlus,
  Search,
} from "lucide-react";

import useSidebar from "../../hooks/useSidebar";

import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import NavbarLanguages from "./NavbarLanguages";
import NavbarThemeToggle from "./NavbarThemeToggle";
import NavbarUser from "./NavbarUser";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import useAuth from "../../hooks/useAuth";
import AuthGuard from "../guards/AuthGuard";

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago",
  },
];

const messages = [
  {
    name: "Ashley Briggs",
    avatar: avatar1,
    description: "Nam pretium turpis et arcu. Duis arcu tortor.",
    time: "15m ago",
  },
];

const NavbarComponent = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useSidebar();
  const { signIn } = useAuth();

  return (
    <React.Fragment>
      <Navbar variant="light" expand className="navbar-bg">
        <span
          className="sidebar-toggle d-flex"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <i className="hamburger align-self-center" />
        </span>

        <AuthGuard>
          <Form className="d-none d-sm-inline-block">
            <InputGroup className="input-group-navbar">
              <Form.Control
                placeholder={t("Search") as string}
                aria-label="Search"
              />
              <Button variant="">
                <Search className="lucide" />
              </Button>
            </InputGroup>
          </Form>
        </AuthGuard>

        <Navbar.Collapse>
          <Nav className="navbar-align">
            <NavbarDropdown
              header="New Messages"
              footer="Show all messages"
              icon={MessageCircle}
              count={messages.length}
              showBadge
            >
              {messages.map((item, key) => {
                return (
                  <NavbarDropdownItem
                    key={key}
                    icon={
                      <img
                        className="avatar img-fluid rounded-circle"
                        src={item.avatar}
                        alt={item.name}
                      />
                    }
                    title={item.name}
                    description={item.description}
                    time={item.time}
                    spacing
                  />
                );
              })}
            </NavbarDropdown>
            <AuthGuard>
              <NavbarDropdown
                header="New Notifications"
                footer="Show all notifications"
                icon={BellOff}
                count={notifications.length}
              >
                {notifications.map((item, key) => {
                  let icon = <Bell size={18} className="text-warning" />;

                  if (item.type === "important") {
                    icon = <AlertCircle size={18} className="text-danger" />;
                  }

                  if (item.type === "login") {
                    icon = <Home size={18} className="text-primary" />;
                  }

                  if (item.type === "request") {
                    icon = <UserPlus size={18} className="text-success" />;
                  }

                  return (
                    <NavbarDropdownItem
                      key={key}
                      icon={icon}
                      title={item.title}
                      description={item.description}
                      time={item.time}
                    />
                  );
                })}
              </NavbarDropdown>
            </AuthGuard>

            <NavbarThemeToggle />
            <NavbarLanguages />
            <NavbarUser />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavbarComponent;
