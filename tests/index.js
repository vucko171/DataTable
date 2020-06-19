import React, { useState, useEffect } from "react"
import DataTable from "../"
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function Test() {
  function handleTestClick(state) {
    console.log(state)
  }
  const columns = [
    {
      header: 'Copy',
      sortable: false,
      customCellString: '<input value={dataItem.SO_ID==="123"?"hello":"hiiiiii"} type="button" />',
      clickCallback: (state) => { console.log("this is a button"); console.log(state) },
      width: '70px',
      helper: 'TEST',
    },
    {
      header: 'Copy2',
      sortable: false,
      customCell: <input value="test" type="button" />,
      clickCallback: (state) => { console.log("this is a button"); console.log(state) },
      width: '70px',
      helper: 'TEST2',
    },
    {
      header: 'SO#',
      dataID: 'SO_ID',
      clickCallback: (state) => { handleTestClick(state) },
      isLink: true,
      sortable: true,
      width: '80px',
    },
    {
      header: 'Customer ID',
      dataID: 'CUSTOMER_ID',
      sortable: true,
      width: '80px',
      isVisible: false,
    },
    {
      header: 'Short Name',
      dataID: 'CUSTOMER_SHORT_NAME',
      sortable: true,
      width: '100px',
    },
    {
      header: 'Customer Name',
      dataID: 'CUSTOMER_NAME',
      align: 'left',
      sortable: true,
      width: '300px',
    },
    {
      header: 'Order Type',
      dataID: 'ORDER_TYPE_DESC',
      sortable: true,
    },
    {
      header: 'Order Status',
      dataID: 'ORDER_STATUS_DESC',
      sortable: true,
    },
    {
      header: 'Created By',
      dataID: 'EMAIL_ADDRESS',
      sortable: true,
      width: '250px',
    },
    {
      header: 'Customer Service Rep',
      dataID: 'CSR_CONTACT',
      sortable: true,
    },
    {
      header: 'Sales Rep Location',
      dataID: 'SALES_REP_LOCATION',
      sortable: true,
    },
    {
      header: 'Care Received Date',
      dataID: 'REQUEST_SUBMIT_DATE_TIME',
      sortable: true,
      width: '170px',
    },
  ];
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit() {
    setIsLoading(true)
    const resp = await fakeApiCall()
    setData(resp)
    setIsLoading(false)
  }
  async function fakeApiCall() {
    await sleep(2000)
    return [
      {
        SO_ID: "123",

        CUSTOMER_ID: "123",

        CUSTOMER_SHORT_NAME: "123",

        CUSTOMER_NAME: "123",

        ORDER_TYPE_DESC: "123",

        ORDER_STATUS_DESC: "123",

        EMAIL_ADDRESS: "123",

        CSR_CONTACT: "123",

        SALES_REP_LOCATION: "123",

        REQUEST_SUBMIT_DATE_TIME: "123",
      },
      {
        SO_ID: "235",

        CUSTOMER_ID: "456",

        CUSTOMER_SHORT_NAME: "123",

        CUSTOMER_NAME: "123",

        ORDER_TYPE_DESC: "123",

        ORDER_STATUS_DESC: "123",

        EMAIL_ADDRESS: "123",

        CSR_CONTACT: "123",

        SALES_REP_LOCATION: "123",

        REQUEST_SUBMIT_DATE_TIME: "123",
      },
      {
        SO_ID: "235",

        CUSTOMER_ID: "123",

        CUSTOMER_SHORT_NAME: "123",

        CUSTOMER_NAME: "123",

        ORDER_TYPE_DESC: "123",

        ORDER_STATUS_DESC: "123",

        EMAIL_ADDRESS: "123",

        CSR_CONTACT: "123",

        SALES_REP_LOCATION: "123",

        REQUEST_SUBMIT_DATE_TIME: "123",
      },
    ]
  }
  return (
    <>
      <input type="button" value="submit" onClick={handleSubmit} />
      <DataTable columns={columns} data={data} headerStyle={{ color: "purple" }} isLoading={isLoading} />
    </>
  )
}
export default Test;
