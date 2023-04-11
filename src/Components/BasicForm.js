import React, { useState } from "react";
import HandleInput from "./HandleInput";

function BasicForm() {
  const [formData, setFormData] = useState([]);

  const [Image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Birthdate, setBirthDate] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [birthPlace, setbirthPlace] = useState("");
  const [MobileNum, setMobileNum] = useState("");

  const mobileNumberPattern = /^[0-9]{10}$/;
  const [mobileNumberIsValid, setMobileNumberIsValid] = useState(true);

  const [formIsValid, setfromIsValid] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  // Image Handler

  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // First name Handler & Validation

  const fnameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  // Last Name Handler & Validation

  const lnameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  // Address Line 1 and Address Line 2

  const address1ChangeHandler = (event) => {
    setAddress1(event.target.value);
  };

  const address2ChangeHandler = (event) => {
    setAddress2(event.target.value);
  };

  // BirhtDate Handler && Validation

  const BirthDateChangeHandler = (event) => {
    setBirthDate(event.target.value);
  };

  // Birth Place Handler

  const BirthPlaceChangeHandler = (event) => {
    setbirthPlace(event.target.value);
  };

  // Mobile Number Handler & Validation

  const MobileNumChangeHandler = (event) => {
    setMobileNum(event.target.value);
    const isValid = mobileNumberPattern.test(event.target.value);
    setMobileNumberIsValid(isValid);
  };

  // Submit Handler
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      address1.trim().length === 0 ||
      address2.trim().length === 0 ||
      birthPlace.trim().length === 0 ||
      MobileNum.trim().length < 10 ||
      new Date(Birthdate) < new Date()
    ) {
      setfromIsValid(true);
    }

    // Submit First and Last Name Validation

    if (
      firstName.trim().length > 2 &&
      lastName.trim().length > 2 &&
      address1.trim().length > 5 &&
      address2.trim().length > 5 &&
      birthPlace.trim().length > 5 &&
      MobileNum.trim().length === 10 &&
      new Date(Birthdate) < new Date()
    ) {
      setfromIsValid(false);
      if (editIndex !== null) {
        const updatedFormData = [...formData];
        updatedFormData[editIndex] = {
          Image,
          firstName,
          lastName,
          address1,
          address2,
          birthPlace,
          Birthdate,
          MobileNum,
        };
        setFormData(updatedFormData);
        setEditIndex(null);
      } else {
        setFormData([
          ...formData,
          {
            Image,
            firstName,
            lastName,
            address1,
            address2,
            birthPlace,
            Birthdate,
            MobileNum,
          },
        ]);
      }

      // reset the Value
      setImage(null);
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setBirthDate("");
      setbirthPlace("");
      setMobileNum("");
    }
  };

  // Delete Handler

  const handleDelete = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  // Edit Handler

  const handleEdit = (index) => {
    setImage(formData[index].Image);
    setFirstName(formData[index].firstName);
    // console.log("edit"+formData[index].firstName)
    setLastName(formData[index].lastName);
    setAddress1(formData[index].address1);
    setAddress2(formData[index].address2);
    setBirthDate(formData[index].Birthdate);
    setbirthPlace(formData[index].birthPlace);
    setMobileNum(formData[index].MobileNum);
    setEditIndex(index);
  };

  // const fnameInputIsValid = !fnameIsValid && fnameIsTouched;
  // const lnameInputIsValid = !lnameIsValid && lnameIsTouched;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="w-90 max-w-43rem p-4 rounded-lg bg-white  mx-auto">
          <label htmlFor="Profile_pic">Profile Picture</label>
          {(Image != ".png" || Image != ".jpg") && (
            <sub className="text-red-600 bold">
              Only .jpg or .png Files are uploades
            </sub>
          )}

          <input
            type="file"
            className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
            onChange={imageChangeHandler}
            accept=".jpg ,.png"
          />

          <div>
            <label>First Name:</label>
            <input
              type="text"
              className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={firstName}
              onChange={fnameChangeHandler}
            />
            {/* {NameInputIsValid && (
                <p className="text-red-600">
                  "First Name have aleast 2 Character"
                </p>
              )} */}

            <div>
              {formIsValid && firstName.trim().length === 0 ? (
                <p className="text-red-600  ">First Name is Required</p>
              ) : formIsValid && firstName.trim().length <= 2 ? (
                <p className="text-red-600  ">
                  First Name is too short! Please enter at least 2 characters
                </p>
              ) : (
                ""
              )}
            </div>
            <label>
              Last Name:
              <input
                type="text"
                className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
                value={lastName}
                onChange={lnameChangeHandler}
              />
            </label>
            {formIsValid && lastName.trim().length <= 0 ? (
              <p className="text-red-600  ">Last Name is Required</p>
            ) : formIsValid && lastName.trim().length <= 2 ? (
              <p className="text-red-600  ">
                Last Name is too short! Please enter at least 2 characters
              </p>
            ) : (
              ""
            )}
          </div>
          <br />
          <label>
            Birth Date:
            <input
              type="date"
              className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={Birthdate}
              onChange={BirthDateChangeHandler}
            />
            {formIsValid && (!Birthdate || (new Date(Birthdate) > new Date())) ? (
              <p className="text-red-600  ">
                {Birthdate
                  ? "Birth date cannot be in the future"
                  : "Birth date is required"}
              </p>
            ) : (
              ""
            )}
          </label>
          <br />
          <label>
            Address Line:1
            <textarea
              type="text"
              className=" resize-none block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={address1}
              onChange={address1ChangeHandler}
              rows={1}
              cols={20}
            ></textarea>
          </label>
          {formIsValid && address1.trim().length <= 0 ? (
            <p className="text-red-600  ">Address is Required</p>
          ) : formIsValid && address1.trim().length <= 5 ? (
            <p className="text-red-600  ">
              Address is too short! Please enter at least 5 characters
            </p>
          ) : (
            ""
          )}
          <br />
          <label>
            Address Line:2
            <textarea
              type="text"
              className=" resize-none block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={address2}
              onChange={address2ChangeHandler}
              rows={1}
              cols={20}
            ></textarea>
          </label>
          {formIsValid && address2.trim().length <= 0 ? (
            <p className="text-red-600  ">Address2 is Required</p>
          ) : formIsValid && address2.trim().length <= 5 ? (
            <p className="text-red-600  ">
              Address is too short! Please enter at least 5 characters
            </p>
          ) : (
            ""
          )}
          <br />
          <label>
            Birth Place
            <input
              type="text"
              className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={birthPlace}
              onChange={BirthPlaceChangeHandler}
            />
          </label>
          {formIsValid && birthPlace.trim().length <= 0 ? (
            <p className="text-red-600  ">Birth Place is Required</p>
          ) : formIsValid && birthPlace.trim().length <= 2 ? (
            <p className="text-red-600  ">
              Birth Place is too short! Please enter at least 2 characters
            </p>
          ) : (
            ""
          )}
          <br />
          <label>
            Mobile Number:
            <input
              type="text"
              className="block w-64 py-2 px-4 rounded-md border border-gray-300 max-w-full"
              value={MobileNum}
              onChange={MobileNumChangeHandler}
            />
          </label>
          {formIsValid && !mobileNumberIsValid ? (
            <p className="text-red-600">Invalid mobile number format</p>
          ) : formIsValid && MobileNum.trim().length === 0 ? (
            <p className="text-red-600">Mobile number is required</p>
          ) : formIsValid && MobileNum.trim().length < 10 ? (
            <p className="text-red-600">Mobile number must be 10 digits</p>
          ) : null}

          <br />
          <button
            className="font-inherit bg-purple-900 text-white border border-purple-900 py-2 px-4 rounded cursor-pointer hover:bg-purple-700"
            type="submit"
          >
            {editIndex !== null ? "Save" : "Submit"}
          </button>
        </div>
      </form>
      <br />
      <HandleInput
        formData={formData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
export default BasicForm;
