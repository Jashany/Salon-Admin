import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./ShopDetails.module.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";

const ShopDetails = () => {
    const state = useLocation();
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
                <div className={styles.artists}>
                    <h2>Artists</h2>
                    <div className={styles.box}>
                    {state?.state?.Artists.map((artist) => {
                        return (
                            <div key={artist._id} className={styles.artist}>
                                <h2>{artist?.ArtistName}</h2>
                                <h3>{artist?.phoneNumber}</h3>
                                <h3>{artist?.ArtistType}</h3>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.services}>
                    <h2>Services</h2>
                    <div className={styles.box}>
                    {state?.state?.Services.map((service) => {
                        return (
                            <div key={service._id} className={styles.service}>
                                <h2>{service?.ServiceName}</h2>
                                <h3>{service?.ServiceType}</h3>
                                <h3>{service?.ServiceTime}</h3>
                                <h3>{service?.ServiceCost}</h3>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.offers}>
                    <h2>Offers</h2>
                    <div className={styles.box}>
                    {state?.state?.offers.map((offer) => {
                        return (
                            <div key={offer._id} className={styles.offer}>
                                <h2>{offer?.OfferName}</h2>
                                <h3>{offer?.OfferDiscountinPercentage}</h3>
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.photos}>
                    <h2>Photos</h2>
                    <div className={styles.images}>
                    {state?.state?.StorePhotos.map((photo, index) => {
                        return (
                            <div key={index} className={styles.photo}>
                                <img 
                                    src={photo} 
                                    alt="salon" 
                                    onClick={() => handleImageClick(photo, index, state?.state?.StorePhotos)} 
                                />
                            </div>
                        )
                    })}
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
                        {state?.state?.Brochure.map((brochure, index) => {
                            return (
                                <div key={index} className={styles.photo}>
                                <img key={index} src={brochure} alt="brochure" onClick={()=>{
                                    handleImageClick(brochure, index, state?.state?.Brochure)
                                }} />
                                </div>
                            )
                        })}
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
