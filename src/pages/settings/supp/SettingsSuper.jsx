import React, { useState } from "react";
import SuppLayout from "../../../layout/supp/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../../hooks/AuthProvider"

const Badge = ({ heading, subheading }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    // Add logic here for handling the toggle state change
  };

  return (
    <div className="bg-white w-full flex justify-between items-center py-4 px-6 rounded-xl shadow-md">
      <div className="flex-grow">
        <h2 className="text-lg text-[#103561] font-semibold">{heading}</h2>
        <p className="text-sm text-[#103561]">{subheading}</p>
      </div>
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          id="toggleSwitch"
          className="hidden"
          checked={isSwitchOn}
          onChange={toggleSwitch}
        />
        <label
          htmlFor="toggleSwitch"
          className={`block overflow-hidden h-6 rounded-full ${
            isSwitchOn
              ? "bg-blue-900 border border-blue-900"
              : "bg-white border border-blue-900"
          } cursor-pointer`}>
          <span
            className={`block h-full w-6 rounded-full transform transition-transform duration-300 ease-in-out ${
              isSwitchOn ? "translate-x-6" : ""
            } bg-white shadow-md`}
          />
        </label>
      </div>
    </div>
  );
};

const SettingsSuper = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const auth = useAuth();
  const id = user.id;

  

  const handleDeleteAccount = () => {
    // Handle the delete account functionality here
    console.log("Account deleted");
  };
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values, { resetForm }) => {
      // Handle form submission logic here
      console.log(values);
      // pâss only the newPassword as password into the updateAction 
      if (values.currentPassword !== '0000') {
        return;
      }
      auth.updatePass(id, values.newPassword);

      resetForm();
    },
  });

  return (
    <SuppLayout>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-2 p-10 gap-10">
        <div className="col-span-1 flex flex-col gap-y-10">
          <h1 className="text-3xl font-bold text-[#103561]">Settings</h1>
          <h1 className="text-xl font-bold text-[#103561]">Change Password</h1>
          <div className="bg-[#F2F5F8] p-10">
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 font-semibold mb-1">
                Security Code
              </label>
              <input
                type="text"
                id="currentPassword"
                name="currentPassword"
                placeholder="Security Code"
                className={`border rounded-full w-full py-2 px-3 text-gray-700 ${
                  formik.errors.currentPassword &&
                  formik.touched.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("currentPassword")}
              />
              {formik.errors.currentPassword &&
                formik.touched.currentPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.currentPassword}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                className={`border rounded-full w-full py-2 px-3 text-gray-700 ${
                  formik.errors.newPassword && formik.touched.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("newPassword")}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.newPassword}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`border rounded-full w-full py-2 px-3 text-gray-700 ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-start gap-y-10">
          <button
            className="bg-red-600 hover:bg-red-700 self-end text-white font-semibold py-2 px-4 rounded-md flex items-center"
            onClick={handleDeleteAccount}>
            <FaTrash className="mr-2" />
            Delete Account
          </button>
          <h1 className="text-xl font-bold text-[#103561]">
            Notification Settings
          </h1>
          <div className="bg-[#F2F5F8] flex flex-col gap-y-5 p-10 w-full">
            <Badge
              heading="Allow notifications"
              subheading={"Allow notifications"}
            />
            <Badge
              heading="Allow notifications"
              subheading={"Allow notifications"}
            />
            <Badge
              heading="Allow notifications"
              subheading={"Allow notifications"}
            />
            <Badge
              heading="Allow notifications"
              subheading={"Allow notifications"}
            />
          </div>
          <button
            type="submit"
            className="bg-[#e2001a] text-white text-2xl font-semibold py-3 px-5 rounded-full">
            Save changes
          </button>
        </div>
      </form>
    </SuppLayout>
  );
};

export default SettingsSuper;
