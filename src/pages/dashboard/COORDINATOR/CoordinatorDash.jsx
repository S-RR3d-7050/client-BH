import React, { useEffect } from "react";
import styles from "../student/styles.module.css";
import Header from "../../../components/ELEMENTS/Header/Header";
import CoordinatorLayout from "../../../layout/coordinator/layout";
import ReusableTable from "../../../components/ELEMENTS/Table/Table";
import Calendar from "../../../components/CONTAINERS/Calendar/Calendar";
import Cookies from "js-cookie";

const CoordinatorDash = () => {

  useEffect(() => {
    getStudents();
  }, []);

  const tableData = [
    {
      Name: "Alice",
      Company: "Company A",
      Field: "IT",
      Phone: "123-456-7890",
      Email: "alice@example.com",
      ActiveIntern: "Inactive", // Using a string to represent the status instead of a boolean
    },
    {
      Name: "Bob",
      Company: "Company B",
      Field: "Marketing",
      Phone: "987-654-3210",
      Email: "bob@example.com",
      ActiveIntern: "Active",
    },
    {
      Name: "Charlie",
      Company: "Company C",
      Field: "Finance",
      Phone: "111-222-3333",
      Email: "charlie@example.com",
      ActiveIntern: "Inactive",
    },
    {
      Name: "David",
      Company: "Company D",
      Field: "Sales",
      Phone: "444-555-6666",
      Email: "david@example.com",
      ActiveIntern: "Active",
    },
    {
      Name: "David",
      Company: "Company D",
      Field: "Sales",
      Phone: "444-555-6666",
      Email: "david@example.com",
      ActiveIntern: "Active",
    },
    {
      Name: "David",
      Company: "Company D",
      Field: "Sales",
      Phone: "444-555-6666",
      Email: "david@example.com",
      ActiveIntern: "Active",
    },
    // Add more objects as needed
  ];

  const tableColumns = [
    "Name",
    "Company",
    "Field",
    "Phone",
    "Email",
    "ActiveIntern",
  ];

  


  const getSupervisors = () => {
    const url = 'http://localhost:8080/v1/supervisor/all';
    fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				})
					.then((res) => {
						console.log("Supervisors -> ", res);
					})
					.catch((error) => {
						console.error(error);
		});
  }

    const getStudents = () => {
      const url = 'http://localhost:8080/v1/student/all';
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then((res) => {
          console.log("Students -> ", res);
        })
        .catch((error) => {
          console.error(error);
    });
  }

  return (
    <CoordinatorLayout>
      <div className="grid grid-cols-5 p-5 gap-y-16">
        <div className="col-span-5 lg:col-span-3 flex flex-col gap-3">
          <Header
            text={"Overview"}
            fontSize={"20px"}
            fontWeight={"900"}
            color={"#103561"}
          />
          <Header
            text={"Supervisors"}
            fontSize={"16px"}
            fontWeight={"900"}
            color={"#103561"}
          />
          <ReusableTable data={tableData} columns={tableColumns} />
        </div>
        <div className="col-span-5 lg:col-span-2">
          <section className={styles.calendar}>
          <Header
            text={"Calendar"}
            fontSize={"16px"}
            fontWeight={"900"}
            color={"#103561"}
          />
            <Calendar />
          </section>
        </div>
        <div className="col-span-5">
          <Header
            text={"Internships"}
            fontSize={"16px"}
            fontWeight={"900"}
            color={"#103561"}
          />
          <ReusableTable data={tableData} columns={tableColumns} />
        </div>
        <div className="col-span-5">
          <Header
            text={"Students"}
            fontSize={"16px"}
            fontWeight={"900"}
            color={"#103561"}
          />
          <ReusableTable data={tableData} columns={tableColumns} />
        </div>
      </div>
    </CoordinatorLayout>
  );
};

export default CoordinatorDash;
