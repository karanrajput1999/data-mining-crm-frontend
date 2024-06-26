import { Modal, ModalBody, ModalHeader, Input, Label } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function InvoiceModal({
  modal_list,
  tog_list,
  invoiceData,
  totalCorrectIncorrectFieldsData,
  createInvoice,
}) {
  const [invoice, setInvoice] = useState({
    client: "",
    token: "",
    formRate: "",
    noOfUsers: "",
    totalForms: "",
    costPerField: "",
    correctFields: "",
    incorrectFields: "",
    totalAmount: "",
  });

  const [costPerField, setCostPerField] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    setInvoice({
      ...invoice,
      token: invoiceData?.token,
      client: invoiceData?.clientName,
      correctFields: totalCorrectIncorrectFieldsData?.correctFields,
      incorrectFields: totalCorrectIncorrectFieldsData?.incorrectFields,
      totalAmount,
      costPerField,
    });
  }, [invoiceData, costPerField, totalAmount]);

  function handleForRateChange(e) {
    setInvoice({
      ...invoiceData,
      formRate: parseInt(e.target.value),
    });

    const costPerFieldInForm = parseFloat(
      parseInt(e.target.value) / 14
    ).toFixed(2);

    setCostPerField(costPerFieldInForm);
    setTotalAmount(
      parseFloat(
        costPerFieldInForm * totalCorrectIncorrectFieldsData.correctFields
      ).toFixed(2)
    );
  }

  async function handleCreatePayment() {
    const response = await createInvoice(invoice);
    console.log("RESPONSE AFTER CREATING INVOICE ->", response);
  }

  return (
    <Modal
      isOpen={modal_list}
      toggle={() => {
        tog_list();
      }}
      centered
    >
      <ModalHeader
        className="bg-light p-3"
        toggle={() => {
          tog_list();
        }}
      >
        Create Invoice
      </ModalHeader>

      <ModalBody style={{ paddingTop: "0px" }}>
        <div className="table-responsive mt-2">
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Field</th>
                <th scope="col">Info</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Form Rate</td>
                <td>
                  <Input
                    id="form-rate"
                    name="form-rate"
                    className="form-control"
                    placeholder="Form rate"
                    type="number"
                    style={{ width: "auto" }}
                    onChange={handleForRateChange}
                  />
                </td>
              </tr>
              <tr>
                <td>No Of Users</td>
                <td>{invoiceData?.totalUsers}</td>
              </tr>
              <tr>
                <td>Total Forms</td>
                <td>{invoiceData?.totalForms}</td>
              </tr>
              <tr>
                <td>Total Fields In Single Form</td>
                <td>14</td>
              </tr>
              <tr>
                <td>Correct Fields</td>
                <td>{totalCorrectIncorrectFieldsData?.correctFields}</td>
              </tr>
              <tr>
                <td>Incorrect Fields</td>
                <td>{totalCorrectIncorrectFieldsData?.incorrectFields}</td>
              </tr>
              <tr>
                <td>Cost Per Field</td>
                <td>{costPerField ? costPerField : "--"}</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td> {totalAmount ? "₹" + totalAmount : "--"}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-sm btn-success mt-2"
            style={{ float: "right" }}
            onClick={handleCreatePayment}
          >
            Create Invoice
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default InvoiceModal;
