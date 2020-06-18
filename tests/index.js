import React from 'react';
import DataTable from '..';

function Test() {
  function handleTestClick(state) {
    console.log(state);
  }
  const columns = [
    {
      header: 'Copy',
      sortable: false,
      customCell: <input type="button" value="test" />,
      clickCallback: (state) => {
        console.log('this is a button');
        console.log(state);
      },
      headerStyle: {
        color: 'green',
      },
      cellStyle: {
        color: 'red',
      },
      width: '70px',
      helper: 'TEST',
    },
    {
      header: 'SO#',
      dataID: 'SO_ID',
      clickCallback: (state) => {
        handleTestClick(state);
      },
      isLink: true,
      sortable: true,
      width: '80px',
    },
    {
      header: 'Customer ID',
      dataID: 'CUSTOMER_ID',
      sortable: true,
      width: '80px',
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
  const data = [
    {
      SO_ID: '123',

      CUSTOMER_ID: '123',

      CUSTOMER_SHORT_NAME: '123',

      CUSTOMER_NAME: '123',

      ORDER_TYPE_DESC: '123',

      ORDER_STATUS_DESC: '123',

      EMAIL_ADDRESS: '123',

      CSR_CONTACT: '123',

      SALES_REP_LOCATION: '123',

      REQUEST_SUBMIT_DATE_TIME: '123',
    },
    {
      SO_ID: '235',

      CUSTOMER_ID: '456',

      CUSTOMER_SHORT_NAME: '123',

      CUSTOMER_NAME: '123',

      ORDER_TYPE_DESC: '123',

      ORDER_STATUS_DESC: '123',

      EMAIL_ADDRESS: '123',

      CSR_CONTACT: '123',

      SALES_REP_LOCATION: '123',

      REQUEST_SUBMIT_DATE_TIME: '123',
    },
    {
      SO_ID: '235',

      CUSTOMER_ID: '123',

      CUSTOMER_SHORT_NAME: '123',

      CUSTOMER_NAME: '123',

      ORDER_TYPE_DESC: '123',

      ORDER_STATUS_DESC: '123',

      EMAIL_ADDRESS: '123',

      CSR_CONTACT: '123',

      SALES_REP_LOCATION: '123',

      REQUEST_SUBMIT_DATE_TIME: '123',
    },
  ];
  return (
    <DataTable
      customClassName="search-result-heading"
      columns={columns}
      data={data}
    />
  );
}
export default Test;
