import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ShopDetails.module.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";

const ShopDetails = () => {
    const state = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const allImages = [...state?.state?.StorePhotos, state?.state?.CoverImage];

    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentImageList, setCurrentImageList] = useState([]);

    const handleImageClick = (image, index, imageList) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        setCurrentImageList(imageList);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setCurrentIndex(null);
        setCurrentImageList([]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % currentImageList.length;
        setSelectedImage(currentImageList[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    console.log(state?.state)

    const handlePrev = (e) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + currentImageList.length) % currentImageList.length;
        setSelectedImage(currentImageList[prevIndex]);
        setCurrentIndex(prevIndex);
    };

    return ( 
        <div className={styles.main}>
            <Header />
            <SideBar />
            
            <div className={styles.shop}>
                <div className={styles.serviceButton}>
                    <button onClick={() => navigate(`/services/${id}`)}>Upload Services</button>
                </div>
                <div className={styles.artists}>
                    <h2>Artists</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.state?.Artists.map((artist) => (
                                    <tr key={artist._id}>
                                        <td>{artist?.ArtistName}</td>
                                        <td>{artist?.PhoneNumber}</td>
                                        <td>{artist?.ArtistType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                <div className={styles.services}>
                    <h2>Services</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Gender</th>
                                    <th>Time</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.state?.Services.map((service) => (
                                    <tr key={service._id}>
                                        <td>{service?.ServiceName}</td>
                                        <td>{service?.ServiceType}</td>
                                        <td>{service?.ServiceGender}</td>
                                        <td>{service?.ServiceTime}</td>
                                        <td>{service?.ServiceCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                <div className={styles.offers}>
                    <h2>Offers</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Discount (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.state?.offers.map((offer) => (
                                    <tr key={offer._id}>
                                        <td>{offer?.OfferName}</td>
                                        <td>{offer?.OfferDiscountinPercentage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>

                <div className={styles.reviews}>
                    <h2>Reviews</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.state?.Reviews.map((review) => (
                                    <tr key={review._id}>
                                        <td>{review?.name}</td>
                                        <td>{review?.Rating}</td>
                                        <td>{review?.Review}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                <div className={styles.photos}>
                    <h2>Photos</h2>
                    <div className={styles.images}>
                        {state?.state?.StorePhotos.map((photo, index) => (
                            <div key={index} className={styles.photo}>
                                <img 
                                    src={photo} 
                                    alt="salon" 
                                    onClick={() => handleImageClick(photo, index, state?.state?.StorePhotos)} 
                                />
                            </div>
                        ))}
                        <div className={styles.photo}>
                            <img 
                                src={state?.state?.CoverImage} 
                                alt="salon cover" 
                                onClick={() => handleImageClick(state?.state?.CoverImage, state?.state?.StorePhotos.length, allImages)} 
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.brocher}>
                    <h2>Brochure</h2>
                    <div className={styles.brocherImage}>
                        {state?.state?.Brochure.map((brochure, index) => (
                            <div key={index} className={styles.photo}>
                                <img 
                                    key={index} 
                                    src={brochure} 
                                    alt="brochure" 
                                    onClick={() => handleImageClick(brochure, index, state?.state?.Brochure)} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className={styles.modal} onClick={handleCloseModal}>
                    <span className={styles.close} onClick={handleCloseModal}>&times;</span>
                    <div className={styles.modalContentWrapper} onClick={(e) => e.stopPropagation()}>
                        <img className={styles.modalContent} src={selectedImage} alt="Full Size" />
                        <button className={styles.prev} onClick={handlePrev}>&#10094;</button>
                        <button className={styles.next} onClick={handleNext}>&#10095;</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShopDetails;
