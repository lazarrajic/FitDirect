import React, { useState, useEffect } from "react";
import { FaCity, FaRegObjectUngroup } from "react-icons/fa";
import "./Browse.css";
import Select from "react-select";
import avi from "../images/avi.png";
import star from "../images/star.png";
import { getDatabase, ref, onValue } from "firebase/database";
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

// export async function getAllTemplates(db) {
//   try {
//     const querySnapshot = await db.collection("templates").get();
//     const templates = [];
//     querySnapshot.forEach((doc) => {
//       templates.push({ id: doc.id, ...doc.data() });
//     });
//     // console.log("All templates:", templates);
//     return templates;
//   } catch (error) {
//     console.error("Error getting templates:", error);
//   }
// }

// isLive flag check version
export async function getAllTemplates(db) {
  try {
    const querySnapshot = await db.collection("templates").get();
    const templates = [];
    querySnapshot.forEach((doc) => {
      const templateData = doc.data();
      console.log("Raw Template Data:", templateData);
      if (templateData.isLive === true) {
        templates.push({ id: doc.id, ...templateData });
      }
    });
    console.log("Filtered templates:", templates);
    return templates;
  } catch (error) {
    console.error("Error getting templates:", error);
  }
}

// export async function getTemplatesWithId(db, id, setState) {
//   // console.log("with id", id);
//   return db
//     .collection("templates")
//     .doc("t-" + id)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         // console.log(doc.data(), "LOAD with ID", id);
//         setState(doc.data());
//         return doc.data();
//       }
//     })
//     .catch((e) => {
//       console.log("e", e);
//     });
// }

// isLive flag check version
export async function getTemplatesWithId(db, id, setState) {
  // console.log("with id", id);
  return db
    .collection("templates")
    .doc("t-" + id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const templateData = doc.data();
        if (templateData.isLive) {
          setState(templateData);
          return templateData;
        }
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
}

function capitalizeFirstLetterOfEachWord(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  // useEffect(() => {
  //   const fetchTemplates = async () => {
  //     try {
  //       const ordersSnapshot = await db.collection("orders").get();

  //       const promises = ordersSnapshot.docs.map(async (orderDoc) => {
  //         const code = orderDoc.data().code;
  //         // console.log("Fetching template for code:", code);

  //         const templateSnapshot = await db
  //           .collection("templates")
  //           .doc("t-" + code)
  //           .get();

  //         if (templateSnapshot.exists) {
  //           console.log("Fetched template:", templateSnapshot.data());
  //           return templateSnapshot.data();
  //         } else {
  //           console.error("Template for code", code, "does not exist.");
  //           return null;
  //         }
  //       });

  //       const templateData = await Promise.all(promises);
  //       setTemplates(templateData);
  //     } catch (error) {
  //       console.error("Error fetching templates:", error);
  //     }
  //   };

  //   fetchTemplates();
  // }, []);

  // getAllTemplates(db);

  //isLive version
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const ordersSnapshot = await db.collection("orders").get();

        const promises = ordersSnapshot.docs.map(async (orderDoc) => {
          const code = orderDoc.data().code;

          const templateSnapshot = await db
            .collection("templates")
            .doc("t-" + code)
            .get();

          const data = templateSnapshot.data();
          if (templateSnapshot.exists && data.isLive) {
            // Ensure it's live here
            console.log("Fetched template:", data);
            return data;
          } else {
            console.error(
              "Template for code",
              code,
              "does not exist or is not live."
            );
            return null;
          }
        });

        const templateData = await Promise.all(promises);
        setTemplates(templateData);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  const filterFeaturedContractors = (users) => {
    return users.filter((user) => user.featured);
  };

  // useEffect(() => {
  //   const fetchServiceTypes = async () => {
  //     const templatesSnapshot = await db.collection("templates").get();
  //     const serviceTypesLookup = {};

  //     templatesSnapshot.forEach((doc) => {
  //       let serviceType = doc.data().content?.serviceType;
  //       if (serviceType) {
  //         serviceType = serviceType.trim();
  //         const normalized = serviceType.toLowerCase();
  //         if (!serviceTypesLookup[normalized]) {
  //           serviceTypesLookup[normalized] = serviceType;
  //         }
  //       }
  //     });
  //     const dropdownOptions = Object.keys(serviceTypesLookup).map(
  //       (normalized) => ({
  //         value: normalized,
  //         label: serviceTypesLookup[normalized],
  //       })
  //     );

  //     setOptions(dropdownOptions);
  //   };

  //   fetchServiceTypes();
  // }, []);

  //isLive version
  useEffect(() => {
    const fetchServiceTypes = async () => {
      const templatesSnapshot = await db
        .collection("templates")
        .where("isLive", "==", true)
        .get();
      const serviceTypesLookup = {};

      templatesSnapshot.forEach((doc) => {
        let serviceType = doc.data().content?.serviceType;
        if (serviceType) {
          serviceType = serviceType.trim();
          const normalized = serviceType.toLowerCase();
          if (!serviceTypesLookup[normalized]) {
            serviceTypesLookup[normalized] = serviceType;
          }
        }
      });
      const dropdownOptions = Object.keys(serviceTypesLookup).map(
        (normalized) => ({
          value: normalized,
          label: serviceTypesLookup[normalized],
        })
      );

      setOptions(dropdownOptions);
    };

    fetchServiceTypes();
  }, []);

  //isLive version
  useEffect(() => {
    const filterTemplates = async () => {
      let filteredTemplates = [];
      const serviceTypeQueries = [searchTerm];
      if (searchTerm && options.length) {
        const selectedDropdownOption = options.find(
          (option) => option.value === searchTerm
        );
        if (selectedDropdownOption) {
          serviceTypeQueries.push(...selectedDropdownOption.label.split(" / "));
        }
      }
      if (serviceTypeQueries.length > 1) {
        const promises = serviceTypeQueries.map((type) =>
          db
            .collection("templates")
            .where("content.serviceType", "==", type)
            .get()
        );
        const querySnapshots = await Promise.all(promises);
        querySnapshots.forEach((snapshot) => {
          snapshot.forEach((doc) => {
            filteredTemplates.push({ id: doc.id, ...doc.data() });
          });
        });
      } else if (searchTerm) {
        const filteredTemplatesSnapshot = await db
          .collection("templates")
          .where("content.serviceType", "==", searchTerm)
          .where("isLive", "==", true)
          .get();
        filteredTemplatesSnapshot.forEach((doc) => {
          filteredTemplates.push({ id: doc.id, ...doc.data() });
        });
      } else {
        const allTemplatesSnapshot = await db
          .collection("templates")
          .where("isLive", "==", true)
          .get();
        allTemplatesSnapshot.forEach((doc) => {
          filteredTemplates.push({ id: doc.id, ...doc.data() });
        });
      }

      setTemplates(filteredTemplates);
    };

    filterTemplates();
  }, [searchTerm, locationSearchTerm, options]);

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  useEffect(() => {
    if (openModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModalIndex]);

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
                  key={options.value}
                  value={options.value}
                  styles={customStylesBrowse}
                  onChange={(option) => setSearchTerm(option.value)}
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
                    if (selectedOption) {
                      setSearchTerm(selectedOption.label);
                    }
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
          {templates.length > 0 ? (
            searchTerm ? (
              <>
                <h2>{capitalizeFirstLetterOfEachWord(searchTerm)}</h2>
                <p>
                  List of popular {capitalizeFirstLetterOfEachWord(searchTerm)}{" "}
                  businesses in your area.
                </p>
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
          {templates.map((template, index) => (
            <div key={index} className="browse-card">
              <div className="card-image">
                <img
                  src={template?.content?.imageURLArray?.[1] || avi}
                  alt="template image"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-details">
                <h3 style={{ margin: "0" }}>
                  {template?.content.firstName}{" "}
                  {template?.content.lastName || " "}
                </h3>
                <h2>
                  {capitalizeFirstLetterOfEachWord(
                    template?.content.businessName || "Default Title"
                  )}
                </h2>

                <p style={{ margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>Location: </span>
                  {template?.content.contactAddress
                    ? (() => {
                        const parts =
                          template?.content.contactAddress.split(",");
                        const city = parts[1]?.trim() || "";
                        const zip = parts[2]?.split(" ")[1] || "";
                        const country = parts[3]?.trim() || "";
                        return `${city}, ${zip}, ${country}`;
                      })()
                    : null}
                </p>
                <div className="browse-rating">
                  <img
                    src={star}
                    alt="rating for template"
                    style={{ width: "20px" }}
                  />
                  <p style={{ fontWeight: "600" }}>{/* rating number */}</p>{" "}
                  <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {/* rating text */}
                  </p>
                </div>
                <button
                  className="card-button"
                  onClick={() => {
                    // setModalIsOpen(true);
                    openModal(index);
                    setSelectedUser(template);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {templates.map((template, index) => (
        <Modal
          key={index}
          className="modal"
          isOpen={openModalIndex === index}
          onRequestClose={() => setOpenModalIndex(null)}
        >
          <div className="modal-details">
            <div className="profile-details">
              <img
                src={template?.content?.imageURLArray?.[1] || avi}
                alt="template image"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h2>
                  {template?.content.firstName || "Name"}{" "}
                  {template?.content.lastName || " "}
                </h2>
                <p style={{ fontWeight: "bold" }}>
                  {" "}
                  {capitalizeFirstLetterOfEachWord(
                    template?.content.businessName || "Default Title"
                  )}
                </p>
                <span style={{ fontWeight: "bold" }}>Location: </span>
                {template?.content.contactAddress || " "}
                <p>
                  <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                  {template?.content.contactEmail || ""}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
                  {template?.content.contactPhone || ""}
                </p>
              </div>
            </div>
            <div>
              <p>{template?.content.titleBlurb || "Book with us below! "}</p>
              <p>
                <span style={{ fontWeight: "bold" }}>Website Link:</span>{" "}
                {template?.content.preferredDomain || ""}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Book Now:</span> Calendly
                Link
              </p>
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
                <h1 style={{ fontSize: "40px" }}>
                  {selectedUser?.rating || "0.0"}
                </h1>

                <p style={{ margin: "0" }}>
                  {" "}
                  {selectedUser?.num_reviews || "0"} Verified User Reviews
                </p>
              </div>
            </div>

            <div className="reviews">
              <div className="review-card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                nostrum maxime magni, tenetur, itaque veritatis ex officia
                soluta eum fuga quibusdam blanditiis veniam saepe porro rerum
                reprehenderit non aperiam qui. <br />
                <br /> - User
              </div>
              <div className="review-card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                nostrum maxime magni, tenetur, itaque veritatis ex officia
                soluta eum fuga quibusdam blanditiis veniam saepe porro rerum
                reprehenderit non aperiam qui.
                <br />
                <br /> - User
              </div>
              <div className="review-card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                nostrum maxime magni, tenetur, itaque veritatis ex officia
                soluta eum fuga quibusdam blanditiis veniam saepe porro rerum
                reprehenderit non aperiam qui.
                <br />
                <br /> - User
              </div>
              <div className="review-card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                nostrum maxime magni, tenetur, itaque veritatis ex officia
                soluta eum fuga quibusdam blanditiis veniam saepe porro rerum
                reprehenderit non aperiam qui.
                <br />
                <br /> - User
              </div>
            </div>
          </div>
        </Modal>
      ))}
    </div>
  );
};

export default Browse;
