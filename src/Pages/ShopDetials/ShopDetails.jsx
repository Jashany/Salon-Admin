import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./ShopDetails.module.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";

const ShopDetails = () => {
    const state = useLocation();
    const allImages = [...state?.state?.StorePhotos, state?.state?.CoverImage];

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
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
                    {allImages.map((photo, index) => {
                        return (
                            <div key={index} className={styles.photo}>
                                <img 
                                    src={photo} 
                                    alt="salon" 
                                    onClick={() => handleImageClick(photo)} 
                                />
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.brocher}>
                    <h2>Brochure</h2>
                    <div className={styles.brocherImage}>
                        <img src={state?.state?.Brochure} alt="brochure" />
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div className={styles.modal} onClick={handleCloseModal}>
                    <span className={styles.close}>&times;</span>
                    <img className={styles.modalContent} src={selectedImage} alt="Full Size" />
                </div>
            )}
        </div>
    );
}
 
export default ShopDetails;
