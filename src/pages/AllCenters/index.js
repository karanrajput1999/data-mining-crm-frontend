import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import AddCenterModal from "./AddCenterModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import CenterRemoveModal from "./CenterRemoveModal";
import {
  getCenters,
  createCenter,
  removeCenter,
  updateCenter,
} from "../../slices/Centers/thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRoles } from "../../slices/Mapping/thunk";

const AllCenters = () => {
  const [modal_list, setmodal_list] = useState(false);

  const [modal_delete, setmodal_delete] = useState(false);

  const [isEditingCenter, setIsEditingCenter] = useState(false);

  const [listCenterId, setListCenterId] = useState(null);

  const dispatch = useDispatch();

  const { centers } = useSelector((state) => state.Centers);
  const { roles } = useSelector((state) => state.Mapping);

  function tog_list() {
    setmodal_list(!modal_list);
  }

  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    dispatch(getCenters());
    dispatch(getRoles());
  }, [dispatch]);

  const validation = useFormik({
    initialValues: {
      centerName: "",
      ownerName: "",
      mobileNumber: "",
      emailId: "",
      location: "",
      branchId: "",
      userType: "",
      password: "",
    },
    validationSchema: Yup.object({
      centerName: Yup.string().required("Please enter center name"),
      ownerName: Yup.string().required("Please enter owner name"),
      mobileNumber: Yup.string().required("Please enter mobile number"),
      emailId: Yup.string().required("Please enter email id"),
      location: Yup.string().required("Please enter location"),
      branchId: Yup.string().required("Please enter branch id"),
      userType: Yup.string(),
      password: Yup.string().required("Please enter password id"),
    }),
    onSubmit: (values) => {
      isEditingCenter
        ? dispatch(updateCenter({ values, centerId: listCenterId }))
        : dispatch(createCenter(values));
    },
  });

  const centersData = [
    {
      id: 1,
      centerName: "Ascent Bpo",
      ownerName: "Arhaan Rajak",
      mobileNumber: "9999999999",
      emailId: "arhaanji@live.com",
      password: "132112",
      branchId: "ABSABSCC",
      status: "Activate",
    },
    {
      id: 2,
      centerName: "Credit Rupay",
      ownerName: "Vipin Tomar",
      mobileNumber: "1111111111",
      emailId: "creditrupay@gmail.com",
      password: "tomar@13211	",
      branchId: "CRNABSCC",
      status: "Deactivate",
    },
  ];

  function formHandleSubmit(e) {
    e.preventDefault();

    validation.handleSubmit();

    setmodal_list(false);
    return false;
  }

  //   function handleEditUser(userData) {
  function handleEditCenter(centerData) {
    setIsEditingCenter(true);
    setmodal_list(!modal_list);
    setListCenterId(centerData.id);

    // setting the value of role according to roleId because in select element roleId is used as value
    validation.setValues({
      centerName: centerData.centerName,
      ownerName: centerData.ownerName,
      mobileNumber: centerData.mobileNumber,
      location: centerData.location,
      branchId: centerData.branchId,
      status: centerData.status,
      emailId: centerData.emailId,
      password: centerData.password,
    });
  }

  document.title = "All Centers";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Centers" pageTitle="Centers" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a center</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="userList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto w-100 d-flex justify-content-between">
                        <div className="search-box">
                          <input
                            type="text"
                            className="form-control bg-light border-light"
                            autoComplete="off"
                            id="searchList"
                            placeholder="Search center"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                        <Button
                          color="primary"
                          className="add-btn me-1"
                          onClick={tog_list}
                          id="create-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Center
                        </Button>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="userTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="sort" data-sort="id">
                              ID
                            </th>
                            <th className="sort" data-sort="center_name">
                              Center Name
                            </th>
                            <th className="sort" data-sort="owner_name">
                              Owner Name
                            </th>
                            <th className="sort" data-sort="phone_number">
                              Phone Number
                            </th>
                            <th className="sort" data-sort="email_id">
                              Email ID
                            </th>
                            <th className="sort" data-sort="phone_number">
                              Password
                            </th>
                            <th className="sort" data-sort="phone_number">
                              Branch Id
                            </th>
                            <th className="sort" data-sort="phone_number">
                              Status
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {centers?.map((center) => (
                            <tr key={center?.id}>
                              <td className="id">
                                <Link to="#" className="fw-medium link-primary">
                                  {center?.id}
                                </Link>
                              </td>
                              <td className="center_name">
                                {center?.centerName}
                              </td>
                              <td className="owner_name">
                                {center?.ownerName}
                              </td>
                              <td className="phone_number">
                                {center?.mobileNumber}
                              </td>
                              <td className="email_id">{center?.emailId}</td>
                              <td className="password">{center?.password}</td>
                              <td className="password">{center?.branchId}</td>
                              <td className="password">
                                {center?.status === 1 ? (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-success waves-effect waves-light"
                                  >
                                    {" "}
                                    Activate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-ghost-danger waves-effect waves-light"
                                  >
                                    {" "}
                                    Deactivate
                                  </button>
                                )}
                              </td>

                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditCenter(center);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListCenterId(center.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />

      <AddCenterModal
        validation={validation}
        isEditingCenter={isEditingCenter}
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        roles={roles}
      />

      <CenterRemoveModal
        modal_delete={modal_delete}
        setmodal_delete={setmodal_delete}
        tog_delete={tog_delete}
        handleDeleteCenter={() => {
          dispatch(removeCenter({ centerId: listCenterId }));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default AllCenters;