import React, { useState } from "react";

import { Button, Input, Modal, Select, Table } from "antd";
import { auditData } from "./data/data";
import "./importExport.css"
import { CSVLink, CSVDownload } from "react-csv";
import { SearchOutlined } from "@ant-design/icons";

const Audits = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState(auditData);
  const [apiData, setApiData] = useState();   
   const onDialog = (data) => {
    console.log(data, "data");
    setDialogData(data);
    setOpen(true);
  };
  const options = [];
 
 const handleChange = (e) => {
  setSearchQuery(e.target.value);
 }

 const filteredPersons = filterData.filter((person) => {
   return person.barcode.toLowerCase().includes(searchQuery.toLowerCase());
 });

 
  
  console.log(dialogData, "dialogData");
  const columns = [
    
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data) => {
        console.log(data, "data");
        return (
          <>
            <>
              <div>
                <img src={data} style={{ width: "50px", height: "50px" }} />
              </div>
            </>
          </>
        );
      },
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "name",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Master Category",
      dataIndex: "masterCategory",
      key: "masterCategory",
    },
    {
      title: "Action",
      dataIndex: "guidedBy",
      key: "guidedBy",
      //   render: (data) => (
      //     <>
      //       <Button onClick={() => onDialog(data)}>Edit</Button>{" "}
      //     </>
      //   ),
    },
  ];
  const dialogTemplate = (label, value) => {
    return (
      <>
        <div>
          <strong>{label}</strong>
          <div>{value}</div>
        </div>
      </>
    );
  };
  return (
    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
      <Modal
        title="Update"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div>
          <div className="mainWrp">
            <img
              src={dialogData?.image}
              style={{ width: "150px", height: "90px" }}
            />
            {dialogTemplate("Barcode", dialogData?.barcode)}
            {dialogTemplate("Item Name", dialogData?.itemName)}
            {dialogTemplate("Brand Name", dialogData?.brandName)}
            {dialogTemplate("Product Type", dialogData?.productType)}
            {dialogTemplate("Master Category", dialogData?.masterCategory)}
            <div>
              <strong>Errors</strong>
              {/* <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={["a10", "c12"]}
                onChange={handleChange}
                options={options}
              /> */}
            </div>
          </div>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button>Import</Button>
        {/* <Button>Export</Button> */}
        <input
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => handleChange(e)}
        />
        <div
          style={{ backgroundColor: "red", color: "black" }}
          className="btn btn-primary"
        >
          <CSVLink data={auditData} filename={"my-file.csv"} target="_blank">
            Download me
          </CSVLink>
        </div>
      </div>
      <Table
        dataSource={filteredPersons}
        columns={columns}
        rowClassName={() => "rowClassName2"}
      />
    </div>
  );
};

export default Audits;
