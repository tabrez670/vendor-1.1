import React, { useState } from "react";
import { storage, fs } from "../Config/Config";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const FarmerRegister = () => {
  const [title, setTitle] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [Address, setAddress] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleFarmerRegister = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`Farmer-images/${images.name}`).put(images);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("Farmer-images")
          .child(images.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("FarmerRegister")
              .add({
                Name,
                 Email,
                 PhoneNum,
             Address,
                url,
              })
              .then(() => {
                alert("Are you sure you want to submit?");
                setSuccessMsg("Profile added successfully");
                setName("");
                setPhoneNum("");
                setEmail("");
                setAddress("");
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 3000);
              })
              .catch((error) => {
                alert("error");
              });
          });
      }
    );
  };



  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Vendor Register</h1>
      <hr></hr>
      {successMsg && (
        <>
          <div className="success-msg">{successMsg}</div>
          <br></br>
        </>
      )}
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleFarmerRegister}
      >
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setName(e.target.value)}
          value={Name}
        />
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <label>Phone No.</label>

        <input
          type="tel"
          className="form-control"
          pattern="[0-9]{10}"
          required
          onChange={(e) => setPhoneNum(e.target.value)}
          value={PhoneNum}
        />

        <label>Upload Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImg}
        ></input>

        <label>Address</label>

        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setAddress(e.target.value)}
          value={Address}
        />

     

        {imageError && (
          <>
            <br></br>
            <div className="error-msg">{imageError}</div>
          </>
        )}
        <br></br>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link to="/" className="link">
              <button className="btn m-3 btn-success btn-md">back</button>
            </Link>
            <button type="submit" className="btn btn-success btn-md">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
      {uploadError && (
        <>
          <br></br>
          <div className="error-msg">{uploadError}</div>
        </>
      )}
    </div>
  );
};

  // console.log(title, description, price);
  // console.log(image);
  // const uploadTask = storage.ref(`Farmer-images/${image.name}`).put(image);
  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     const progress =
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log(progress);
  //   },
  //   (error) => setUploadError(error.message),
  //   () => {
  //     storage
  //       .ref("Farmer-images")
  //       .child(image.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         fs.collection("FarmerRegister")
  //         .add({
  //             Name,
  //             Email,
  //             PhoneNum,
  //             Address,
  //             url,
  //         })
  //   .add({
  //     title,
  //     description,
  //     price: Number(price),
  //     url,
  //   })
  //           .then(() => {
  //             setSuccessMsg("Product added successfully");
  //             setTitle("");
  //             setDescription("");
  //             setPrice("");
  //             document.getElementById("file").value = "";
  //             setImageError("");
  //             setUploadError("");
  //             setTimeout(() => {
  //               setSuccessMsg("");
  //             }, 3000);
  //           })
  //           .catch((error) => setUploadError(error.message));
  //       });
  //   }
  // );
  // };

   {/* <label>Product Title</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <br></br>
        <label>Product Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <br></br>
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
        <br></br>
        <label>Upload Product Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImg}
        ></input> */}