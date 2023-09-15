import React, { useState, useEffect } from "react";
import { FaRegObjectUngroup } from "react-icons/fa";
import "./Browse.css";
import Select from "react-select";
import avi from "../images/avi.png";
import star from "../images/star.png";
import { getDatabase, ref, onValue } from "firebase/database";
// import app from "../App";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const customStylesBrowse = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    padding: "10px",
    border: "none",
    flex: "1 1 0%",
    borderRight: "1px solid grey",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontSize: "15px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    cursor: "pointer",
  }),
};

export async function getTemplatesWithId(db, id, setState) {
  console.log("with id", id);
  return db
    .collection("templates")
    .get()
    .then((data) => {
      console.log("data", data);
      if (data) {
        const dataToLoad = data.docs.find((doc) => {
          return doc.data().author === id;
        });
        if (dataToLoad) {
          console.log(dataToLoad.data(), "LOAD with ID", id);
          setState(dataToLoad.data());
          return dataToLoad.data();
        }
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
}

const Browse = () => {
  const location = useLocation();
  const { searchTerm: initialSearchTerm, location: initialLocationSearchTerm } =
    location.state || {};
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [locationSearchTerm, setLocationSearchTerm] = useState(
    initialLocationSearchTerm || ""
  );
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Call your asynchronous function to fetch all data (no need for a user ID filter)
    getTemplatesWithId(db, null, setTemplates); // Pass null as the user ID
  }, []);

  // const filterUsers = (users, searchTerm, location) => {
  //   return users.filter((user) => {
  //     if (user.title) {
  //       const titleMatch = user.title
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());

  //       // If location is not provided, return based on title match only
  //       if (!location) {
  //         return titleMatch;
  //       }

  //       // If location is provided, check for location match
  //       if (user.location) {
  //         const userLocationString = [
  //           user.location.country,
  //           user.location.city,
  //           user.location.suburb,
  //           user.location.zipcode,
  //         ]
  //           .join(" ")
  //           .toLowerCase();

  //         const locationMatch = userLocationString.includes(
  //           location.toLowerCase()
  //         );

  //         return titleMatch && locationMatch;
  //       }
  //     }
  //   });
  // };

  const filterFeaturedContractors = (users) => {
    return users.filter((user) => user.featured);
  };

  // useEffect(() => {
  //   const dataRef = ref(db, "/");
  //   onValue(dataRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const featuredContractors = filterFeaturedContractors(
  //       Object.values(data)
  //     );
  //     setFeaturedUsers(featuredContractors);
  //     if (searchTerm) {
  //       const filteredUsers = filterUsers(
  //         Object.values(data),
  //         searchTerm,
  //         locationSearchTerm
  //       );
  //       const sortedUsers = filteredUsers.sort((a, b) => b.rating - a.rating);
  //       setUsers(sortedUsers);

  //       // Check if no results were found
  //       if (sortedUsers.length === 0) {
  //         console.log("Oh no, check back soon as more businesses join!");
  //       }
  //     } else {
  //       setUsers(featuredContractors);
  //     }
  //   });
  // }, [searchTerm, locationSearchTerm]);

  // // Options for search bar dropdown
  // useEffect(() => {
  //   const dataRef = ref(db, "/");
  //   onValue(dataRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const titles = new Set();
  //     const options = Object.values(data)
  //       .filter((user) => {
  //         if (!user.title || titles.has(user.title)) {
  //           return false;
  //         } else {
  //           titles.add(user.title);
  //           return true;
  //         }
  //       })
  //       .map((user) => ({
  //         value: user.id,
  //         label: user.title,
  //       }));
  //     setOptions(options);
  //   });
  // }, []);

  return (
    <div>
      <div className="browse-container">
        <div className="browse-header">
          <div className="browse-search-wrapper">
            <div className="browse-search">
              <div className="browse-search-bar">
                <Select
                  className="search-bar-browse"
                  placeholder="Search for a business, contractor, or service"
                  options={options}
                  styles={customStylesBrowse}
                  onChange={(option) => setSelectedOption(option)}
                  value={selectedOption}
                />

                <div className="browse-search-divider"></div>
                <input
                  className="browse-zipcode-input"
                  type="text"
                  placeholder="Enter City, Suburb or Zipcode"
                  value={locationSearchTerm || ""}
                  onChange={(e) => setLocationSearchTerm(e.target.value)}
                />
                <button
                  className="browse-search-button"
                  onClick={() => {
                    setSearchTerm(selectedOption.label);
                    setLocationSearchTerm(
                      document.querySelector(".browse-zipcode-input").value
                    );
                    console.log(
                      `.browse-zipcode-input: ${
                        document.querySelector(".browse-zipcode-input").value
                      }`
                    );
                  }}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="clear-button-wrapper">
              <button
                className="clear-button"
                onClick={() => {
                  setSearchTerm(null);
                  setSelectedOption(null);
                  setUsers(featuredUsers);
                  setLocationSearchTerm(null);
                }}
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>
        <div className="browse-title">
          {users.length > 0 ? (
            searchTerm ? (
              <>
                <h2>{searchTerm}</h2>
                <p>List of popular {searchTerm}s in your area.</p>
              </>
            ) : (
              <>
                <h2>Monthly Showcase</h2>
                <p>Check out some of the top-rated contractors of this month</p>
              </>
            )
          ) : (
            <h2>Oh no, check back soon as more businesses join!</h2>
          )}
        </div>

        <div className="browse-results">
          <div>
            <h1>Templates</h1>
            {templates.map((template, index) => (
              <div key={index} className="browse-card">
                {template.name} console.log(template)
              </div>
            ))}
          </div>
          {users.map((user) => (
            <div key={user.id} className="browse-card">
              <div className="card-image">
                <img src={avi} alt="random" style={{ width: "100px" }} />
              </div>
              <div className="card-details">
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <h3>{user.title}</h3>
                <p style={{ margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>Location: </span>
                  {user.location.city}, {user.location.country}
                </p>
                <div className="browse-rating">
                  <img src={star} alt="star" style={{ width: "20px" }} />
                  <p style={{ fontWeight: "600" }}>{user.rating}</p>{" "}
                  <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {user.num_reviews} Reviews
                  </p>
                </div>
                <button
                  className="card-button"
                  onClick={() => {
                    setModalIsOpen(true);
                    setSelectedUser(user);
                  }}
                >
                  View{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="modal-details">
          <div className="profile-details">
            <img src={avi} alt="random" style={{ width: "100px" }} />
            <div>
              <h2>
                {selectedUser?.first_name} {selectedUser?.last_name}
              </h2>
              <p style={{ fontWeight: "bold" }}>{selectedUser?.title}</p>
              <span style={{ fontWeight: "bold" }}>Location: </span>
              {selectedUser?.location.suburb}, {selectedUser?.location.city},{" "}
              {selectedUser?.location.country}, {selectedUser?.location.zipcode}
            </div>
          </div>
          <div>
            <p>
              "Here will be a short description of the contractor and the
              services they offer, and a prompt to find out more the user can
              view their website or book below!"
            </p>
            <h3>Website Link:</h3>
            <h3>Book Now:</h3>
          </div>
        </div>

        <div className="modal-secondary">
          <div className="review-details">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "2px",
                justifyContent: "center",
              }}
            >
              <img
                src={star}
                alt="star"
                style={{ width: "20px", objectFit: "cover", height: "20px" }}
              />
              <h4 style={{ margin: "0" }}>Overall Rating</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ fontSize: "40px" }}>{selectedUser?.rating}</h1>
              <p style={{ margin: "0" }}>
                {" "}
                {selectedUser?.num_reviews} Verified User Reviews
              </p>
            </div>
          </div>
          <div className="reviews">
            <div className="review-card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              nostrum maxime magni, tenetur, itaque veritatis ex officia soluta
              eum fuga quibusdam blanditiis veniam saepe porro rerum
              reprehenderit non aperiam qui. <br />
              <br /> - User
            </div>
            <div className="review-card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              nostrum maxime magni, tenetur, itaque veritatis ex officia soluta
              eum fuga quibusdam blanditiis veniam saepe porro rerum
              reprehenderit non aperiam qui.
              <br />
              <br /> - User
            </div>
            <div className="review-card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              nostrum maxime magni, tenetur, itaque veritatis ex officia soluta
              eum fuga quibusdam blanditiis veniam saepe porro rerum
              reprehenderit non aperiam qui.
              <br />
              <br /> - User
            </div>
            <div className="review-card">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              nostrum maxime magni, tenetur, itaque veritatis ex officia soluta
              eum fuga quibusdam blanditiis veniam saepe porro rerum
              reprehenderit non aperiam qui.
              <br />
              <br /> - User
            </div>
          </div>
        </div>
        {/* <button className="modal-button" onClick={() => setModalIsOpen(false)}>
          Close
        </button> */}
      </Modal>
    </div>
  );
};

export default Browse;
