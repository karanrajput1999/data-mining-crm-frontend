import {
  Alert,
  Input,
  Label,
  Form,
  FormFeedback,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Flatpickr from "react-flatpickr";

import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddClientFormModal({
  modal_list,
  tog_list,
  formHandleSubmit,
  validation,
  isEditingClient,
  alreadyRegisteredError,
  roles,
}) {
  const [imageFile, setImageFile] = useState([]);
  const [agreementTalkFile, setAgreementTalkFile] = useState([]);

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
      className="modal-xl"
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        Add Client
      </ModalHeader>
      <Form className="tablelist-form" onSubmit={(e) => formHandleSubmit(e)}>
        <ModalBody style={{ paddingTop: "0px" }}>
          {alreadyRegisteredError && (
            <Alert color="danger" style={{ marginBlock: "10px" }}>
              {alreadyRegisteredError}
            </Alert>
          )}

          <Row>
            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="roleId" className="form-label">
                  Role
                </Label>
                <Input
                  id="roleId"
                  name="roleId"
                  className="form-control"
                  type="select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.roleId || ""}
                  invalid={
                    validation.touched.roleId && validation.errors.roleId
                      ? true
                      : false
                  }
                >
                  <option value="" disabled>
                    Select Role
                  </option>

                  {roles?.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Input>

                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="companyName" className="form-label">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  className="form-control"
                  placeholder="Enter Company Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.companyName || ""}
                  invalid={
                    validation.touched.companyName &&
                    validation.errors.companyName
                      ? true
                      : false
                  }
                />

                {validation.touched.companyName &&
                validation.errors.companyName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.companyName}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="name" className="form-label">
                  Address
                </Label>

                <Input
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="Enter Address"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                />

                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="agreementDate" className="form-label">
                  Agreement Date
                </Label>

                <Flatpickr
                  name="date"
                  id="datepicker-publish-input"
                  className="form-control"
                  placeholder="Select a date"
                  onChange={(date) => {
                    const formattedDate = new Date(date).toLocaleDateString(
                      "en-GB"
                    );
                    validation.setFieldValue("agreementDate", formattedDate);
                  }}
                  onBlur={validation.handleBlur}
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  value={validation.values.agreementDate || ""}
                />

                {validation.touched.agreementDate &&
                validation.errors.agreementDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.agreementDate}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="email" className="form-label">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />

                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="contactNo" className="form-label">
                  Contact No
                </Label>

                <Input
                  id="contactNo"
                  name="contactNo"
                  className="form-control"
                  placeholder="Enter Contact No"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contactNo || ""}
                  invalid={
                    validation.touched.contactNo && validation.errors.contactNo
                      ? true
                      : false
                  }
                />

                {validation.touched.contactNo && validation.errors.contactNo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contactNo}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="noOfUsers" className="form-label">
                  No of users
                </Label>

                <Input
                  id="noOfUsers"
                  name="noOfUsers"
                  className="form-control"
                  placeholder="Enter No Of Users"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.noOfUsers || ""}
                  invalid={
                    validation.touched.noOfUsers && validation.errors.noOfUsers
                      ? true
                      : false
                  }
                />

                {validation.touched.noOfUsers && validation.errors.noOfUsers ? (
                  <FormFeedback type="invalid">
                    {validation.errors.noOfUsers}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="userIdDemo" className="form-label">
                  User Id (Demo)
                </Label>

                <Input
                  id="userIdDemo"
                  name="userIdDemo"
                  className="form-control"
                  placeholder="Enter Demo User Id"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.userIdDemo || ""}
                  invalid={
                    validation.touched.userIdDemo &&
                    validation.errors.userIdDemo
                      ? true
                      : false
                  }
                />

                {validation.touched.userIdDemo &&
                validation.errors.userIdDemo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.userIdDemo}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="userIdLive" className="form-label">
                  User Id (Live)
                </Label>

                <Input
                  id="userIdLive"
                  name="userIdLive"
                  className="form-control"
                  placeholder="Enter Live User Id"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.userIdLive || ""}
                  invalid={
                    validation.touched.userIdLive &&
                    validation.errors.userIdLive
                      ? true
                      : false
                  }
                />

                {validation.touched.userIdLive &&
                validation.errors.userIdLive ? (
                  <FormFeedback type="invalid">
                    {validation.errors.userIdLive}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>

                <Input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />

                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-2">
                <Label htmlFor="timing" className="form-label">
                  Timing
                </Label>

                <Input
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  placeholder="Enter start time"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.startTime || ""}
                  invalid={
                    validation.touched.startTime && validation.errors.startTime
                      ? true
                      : false
                  }
                />

                {validation.touched.startTime && validation.errors.startTime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.startTime}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2" style={{ marginTop: "1.8rem" }}>
                <Input
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  placeholder="Enter end time"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.endTime || ""}
                  invalid={
                    validation.touched.endTime && validation.errors.endTime
                      ? true
                      : false
                  }
                />

                {validation.touched.endTime && validation.errors.endTime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.endTime}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-2">
                <Label htmlFor="image" className="form-label">
                  Image
                </Label>

                <FilePond
                  files={imageFile}
                  onupdatefiles={setImageFile}
                  allowMultiple={false}
                  maxFiles={1}
                  name="imagefile"
                  className="filepond"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-2">
                <Label htmlFor="image" className="form-label">
                  Agreement Talk
                </Label>

                <FilePond
                  files={agreementTalkFile}
                  onupdatefiles={setAgreementTalkFile}
                  allowMultiple={false}
                  maxFiles={1}
                  name="agreementTalkfile"
                  className="filepond"
                />
              </div>
            </Col>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                {isEditingClient ? "Update Client" : "Save Client"}
              </button>
            </div>
          </Row>
        </ModalBody>
      </Form>
    </Modal>
  );
}

export default AddClientFormModal;
