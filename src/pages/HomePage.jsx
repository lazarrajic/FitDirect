import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaHammer } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { MdPlumbing } from "react-icons/md";
import { BiMath } from "react-icons/bi";
import Book from "../images/Book.png";
import searchImage from "../images/searchImage.png";
import reviewImage from "../images/reviewImage.png";
import bookingImage from "../images/bookingImage.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    padding: "20px",
    border: "none",
    flex: "1 1 0%",
    borderRight: "1px solid grey",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontSize: "20px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    cursor: "pointer",
  }),
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(`Searching for ${searchTerm} in ${location}`);

    navigate("/browse", { state: { searchTerm, location } });
  };

  useEffect(() => {
    const dataRef = ref(db, "/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      // Map users to options
      const titles = new Set();
      const options = Object.values(data)
        .filter((user) => {
          if (titles.has(user.title)) {
            return false;
          } else {
            titles.add(user.title);
            return true;
          }
        })
        .map((user) => ({
          value: user.id,
          label: user.title,
        }));
      setOptions(options);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-description">
          <h1 style={{ fontWeight: 500, fontSize: "60px" }}>
            Book local contractors and businesses <br /> all in one place.
          </h1>
        </div>
        <div className="search-wrapper">
          <div className="home-search">
            <div className="search-bar">
              <Select
                className="search-bar-home"
                // type="text"
                placeholder="Search for a business, contractor, or service"
                options={options}
                styles={customStyles}
                onChange={(option) => setSearchTerm(option.label)}
                value={
                  searchTerm ? { label: searchTerm, value: searchTerm } : null
                }
              />

              <div className="search-divider"></div>
              <input
                className="zipcode-input"
                type="text"
                placeholder="Enter City, Suburb or Zipcode"
                onChange={(event) => setLocation(event.target.value)}
              />

              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-featured">
        <h1 style={{ fontWeight: 500, fontSize: "36px" }}>Top-Searched</h1>
        <div className="featured-container">
          <div
            className="featured-card"
            onClick={() => setSearchTerm("Personal Trainer")}
          >
            <GiWeightLiftingUp size={50} />
            <h2>Personal Trainers</h2>
          </div>
          <div
            className="featured-card"
            onClick={() => setSearchTerm("Builder")}
          >
            <FaHammer size={50} />
            <h2>Builders</h2>
          </div>
          <div
            className="featured-card"
            onClick={() => setSearchTerm("Electrician")}
          >
            <GiElectric size={50} />
            <h2>Electricians</h2>
          </div>
          <div
            className="featured-card"
            onClick={() => setSearchTerm("Plumber")}
          >
            <MdPlumbing size={50} />
            <h2>Plumbers</h2>
          </div>
          <div className="featured-card" onClick={() => setSearchTerm("Tutor")}>
            <BiMath size={50} />
            <h2>Tutors</h2>
          </div>
        </div>
      </div>
      <div className="home-details">
        <h1 style={{ textAlign: "center", fontSize: "55px" }}>
          Find exactly what you need.
        </h1>
        <div className="home-details-content">
          <div className="home-details-card">
            <img src={searchImage} style={{ width: "200px" }} />
            <h2>Search for a service.</h2>
          </div>
          <div className="home-details-card">
            <img src={reviewImage} style={{ width: "200px" }} />
            <h2>Read verified user reviews.</h2>
          </div>
          <div className="home-details-card">
            <img src={bookingImage} style={{ width: "200px" }} />
            <h2>Book them today.</h2>
          </div>
        </div>
      </div>
      <div className="app-download">
        <div className="app-download-text">
          <h1 style={{ fontSize: "40px", fontWeight: "400" }}>
            Find the right fit for you. Direct on your phone.
          </h1>
          <h3 style={{ fontSize: "40px", fontWeight: "400" }}>
            Download the app today.
          </h3>
          <p style={{ lineHeight: "2rem", fontSize: "20px" }}>
            The FitDirect App is the easiest and most convinient way to <br />{" "}
            find the perfect solution to anything you need. <br /> Donwload it
            now!
          </p>
        </div>
        <div className="app-download-image">
          <img src={Book} style={{ width: "500px" }} />
        </div>
      </div>
      {/* <div className="homepage-join">
        <div className="homepage-join-text">
          <h1 style={{ fontSize: "40px", fontWeight: "400" }}>
            Are you interested in reaching new customers?
          </h1>
          <h3 style={{ fontSize: "40px", fontWeight: "400" }}>
            Join FitDirect today.
          </h3>
          <p style={{ fontSize: "20px" }}>
            - FitDirect opens you up to a whole new market of customers. <br />{" "}
            - We provide you with a platform to showcase your business. <br />-
            Boost your online presence with authenticated reviews.
          </p>
          <button className="join-button">Join Now</button>
        </div>
        <div className="homepage-join-image">
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
