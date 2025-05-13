import React, { useEffect, useState, useContext } from "react";
import { Formik, Field } from "formik";
import { Button, Tab, Table, Form, Alert } from "react-bootstrap";
import axiosInstance from "../../../utils/axios";
import { AuthUser } from "../../../types/auth";
import { Firm } from "../../../types/firm";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import { useFirm } from "../../../hooks/useFirm";

const UserRoleForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [usersFromFirm, setUsersFromFirm] = useState<AuthUser[]>();
  const [firms, setFirms] = useState<Firm[]>();
  const { selectedFirm, handleSelectedFirm } = useFirm();
  const { t } = useTranslation();
  const [roles, setRoles] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const toggleForm = () => setShowForm((prev) => !prev);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    submit: false,
    roleId: 0,
  };

  const fetchUsers = async () => {
    try {
      console.log("fetchign users");
      const response = await axiosInstance.get("/auth/users");
      let users: AuthUser[] = response.data;
      setUsersFromFirm(users);
      console.log(users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const fetchRoles = async () => {
    try {
      console.log("fetchign roles");
      const response = await axiosInstance.get("/auth/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles", error);
    } finally {
    }
  };

  useEffect(() => {
    if (!selectedFirm?.id) return;

    const fetchData = async () => {
      console.log(
        "Firm updated, fetching users and roles for:",
        selectedFirm.name
      );
      await fetchUsers();
      await fetchRoles();
    };
    fetchData();
  }, [selectedFirm?.id]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required").max(100),
    lastName: Yup.string().required("Required").max(100),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required(`password`)
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    roleId: Yup.number().required("Required"),
  });

  return (
    <React.Fragment>
      <div className="my-4">
        <Button onClick={toggleForm}>{showForm ? "Cancel" : "Users"}</Button>
        {showForm && (
          <div className="mt-4">
            <h4> CreateUser</h4>
            <div className="d-flex gap-5 align-start">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  try {
                    //   const fixedValues = {
                    //     ...values,
                    //     userRole: Number(values.userRole),
                    //   };
                    console.log("submitting", values);
                    await axiosInstance.post("/auth/users", values);
                  } catch (error: any) {
                    const message = error.message || "Something went wrong";
                    setStatus({ success: false });
                    setErrors({ submit: message });
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {errors.submit && (
                      <Alert className="my-3" variant="danger">
                        {errors.submit}
                      </Alert>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>{t("username")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        value={values.username}
                        isInvalid={Boolean(touched.username && errors.username)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.username && (
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("FirstName")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={values.firstName}
                        isInvalid={Boolean(
                          touched.firstName && errors.firstName
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.firstName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("LastName")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={values.lastName}
                        isInvalid={Boolean(touched.lastName && errors.lastName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.lastName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("email")}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={values.email}
                        isInvalid={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("Password")}</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        isInvalid={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>UserRole</Form.Label>
                      <Form.Control
                        as="select"
                        name="roleId"
                        value={values.roleId}
                        onChange={handleChange}
                      >
                        {roles.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.name}-{x.description}
                          </option>
                        ))}
                      </Form.Control>
                      {!!touched.roleId && (
                        <Form.Control.Feedback type="invalid">
                          {errors.roleId}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <div className="d-grid gap-2 mt-3">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        CreateUser
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
              <div>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Fullname</th>
                      <th>roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersFromFirm?.map((user) => (
                      <tr key={user?.id}>
                        <td>{user?.id}</td>
                        <td>{user?.username}</td>
                        <td>{user?.email}</td>
                        <td>{user?.fullName}</td>
                        <td>{user?.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserRoleForm;
