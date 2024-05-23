import React from "react";
import CoordinatorLayout from "../../../layout/coordinator/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next'




const SupervisorAccount = () => {

  const [t, i18n] = useTranslation('global');

  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      if (res.data) {
      
        console.log('user Added');
        return;
      }
      throw new Error(res.message);
      
    } catch (err) {
      console.error(err);
    }
  };    

  const formik = useFormik({
    initialValues: {
      supervisor: {
        firstName: "",
        lastName: "",
        email: "",
        CIN: "",
        address: "",
        role: "encadrant",
        password: "123456789",
        confirmPassword: "123456789"
      },
    },
    validationSchema: Yup.object({
      supervisor: Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        CIN: Yup.string().required("CIN is required"),
        address: Yup.string().required("Address is required"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      }),

    }),
    onSubmit: (values) => {
      console.log("Form Values:", values); // Handle form submission logic for both supervisor and student
      // Send a POST request to the server to create a new supervisor account
      registerAction(values.supervisor);
      // reset the form
      formik.resetForm();
      
    },
  });

  return (
    <CoordinatorLayout>
      <div className="p-4 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-[#103561]">
          { t('internships.add') }
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-16">
          <div className="bg-gray-200 p-10">
            <h1 className="text-2xl font-bold text-blue-900">Supervisor</h1>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label htmlFor="supervisor.firstName">{t('profile.fname')}</label>
                <input
                  id="supervisor.firstName"
                  name="supervisor.firstName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.firstName}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.firstName &&
                  formik.touched.supervisor?.firstName && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.firstName}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.lastName">{t('profile.lname')}</label>
                <input
                  id="supervisor.lastName"
                  name="supervisor.lastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.lastName}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.lastName &&
                  formik.touched.supervisor?.lastName && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.lastName}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.email">{t('profile.email')}</label>
                <input
                  id="supervisor.email"
                  name="supervisor.email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.email}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.email &&
                  formik.touched.supervisor?.email && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.email}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.CIN">{t('profile.cin')}</label>
                <input
                  id="supervisor.CIN"
                  name="supervisor.CIN"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.CIN}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.CIN &&
                  formik.touched.supervisor?.CIN && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.CIN}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.address">{t('profile.adr')}</label>
                <input
                  id="supervisor.address"
                  name="supervisor.address"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.address}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.address &&
                  formik.touched.supervisor?.address && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.address}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.password">Password</label>
                <input
                  id="supervisor.password"
                  name="supervisor.password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.password}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.password &&
                  formik.touched.supervisor?.password && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.password}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="supervisor.confirmPassword">Confirm Password</label>
                <input
                  id="supervisor.confirmPassword"
                  name="supervisor.confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.supervisor.confirmPassword}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.supervisor?.confirmPassword &&
                  formik.touched.supervisor?.confirmPassword && (
                    <div className="text-red-500">
                      {formik.errors.supervisor.confirmPassword}
                    </div>
                  )}
              </div>
            </div>
          </div>
        {
          /*
            <div className="bg-gray-200 p-10">
            <h1 className="text-2xl font-bold text-blue-900">Student</h1>
            <div className="mt-4 gap-5 grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="student.name">Name</label>
                <input
                  id="student.name"
                  name="student.name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.name}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.name &&
                  formik.touched.student?.name && (
                    <div className="text-red-500">
                      {formik.errors.student.name}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.regNo">Reg No</label>
                <input
                  id="student.regNo"
                  name="student.regNo"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.regNo}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.regNo &&
                  formik.touched.student?.regNo && (
                    <div className="text-red-500">
                      {formik.errors.student.regNo}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.surname">Surname</label>
                <input
                  id="student.surname"
                  name="student.surname"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.surname}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.surname &&
                  formik.touched.student?.surname && (
                    <div className="text-red-500">
                      {formik.errors.student.surname}
                    </div>
                  )}
              </div>
              <div className="col-span-1">
                <label htmlFor="student.email">Email</label>
                <input
                  id="student.email"
                  name="student.email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.student.email}
                  className="block w-full border-gray-300 rounded-full p-2"
                />
                {formik.errors.student?.email &&
                  formik.touched.student?.email && (
                    <div className="text-red-500">
                      {formik.errors.student.email}
                    </div>
                  )}
              </div>
            </div>
          </div>
          */
        }
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-[#103561] text-white rounded-full py-3 px-10 mt-4">
              Submit & Create Account
            </button>
          </div>
        </form>
      </div>
    </CoordinatorLayout>
  );
};

export default SupervisorAccount;
