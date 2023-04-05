import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { register } from 'swiper/element/bundle';
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

register();

const Apartment = () => {
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(() => {
            setShareLinkCopied(false);
        }, 2000);
    }

    useEffect(() => {
        const fetchApartment = async () => {
            const docRef = doc(db, "lists", params.apartmentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setApartment(docSnap.data());
                console.log(docSnap.data())
            } else {
                toast.error("Could not get the apartment");
            }

            setLoading(false);
        }
        fetchApartment();
    }, [params.apartmentId]);

    if (loading) return <Loader />

    return (
        <main className="apartment">
            <div className="apartment__container container">
                <div className="apartment__slider">
                    <swiper-container pagination="true" loop="true">
                        {apartment.images.map((image, index) => (
                            <swiper-slide key={index}><img src={image} alt="Apartment"/></swiper-slide>
                        ))}
                    </swiper-container>
                </div>
                <h1 className="apartment__title">
                    {apartment.title}
                    {apartment.hotOffers &&
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M9.48438 34.4828C9.48438 43.0528 16.4317 50.0001 25.0017 50.0001C33.5716 50.0001 40.5189 43.0528 40.5189 34.4828C40.5189 25.8621 36.2086 18.9655 39.1006 12.9311C39.1006 12.9311 34.4844 13.7932 31.8982 20.6896C31.8982 20.6896 23.2775 12.0689 26.8793 0C26.8793 0 18.1052 3.44824 19.0228 14.6552C19.8097 24.2651 18.1052 25.8621 18.1052 25.8621C18.1052 18.1035 12.0393 14.6552 12.0393 14.6552C13.7947 24.138 9.48438 26.7242 9.48438 34.4828Z" fill="#FFB446"/>
                            <path d="M36.202 38.1577C36.202 44.6121 31.2183 50.1222 24.7651 49.9977C18.692 49.8807 14.1736 45.26 14.6565 39.2241C14.872 36.5302 16.9194 32.1659 20.2599 27.7479L22.4869 29.0948C22.415 23.6352 25.0012 16.3794 25.0012 16.3794C26.7 24.0242 36.202 26.0058 36.202 38.1577Z" fill="#FFDC64"/>
                            <path d="M20.6878 32.7585C19.8257 37.931 18.1016 39.8141 18.1016 43.1034C18.1016 46.5517 21.1894 50 24.9981 50C28.8345 50 31.9053 46.8655 31.8946 43.0291C31.8658 32.7256 25.8603 27.5862 25.8603 27.5862C26.7224 32.7586 24.1361 35.3448 24.1361 35.3448C23.0588 33.729 20.6878 32.7585 20.6878 32.7585Z" fill="white"/>
                        </g>
                    </svg>
                    }
                </h1>
                <div className="apartment__share">
                    <button type="button" className="apartment__share-btn" onClick={handleShare}>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.5302 24.0625C27.7298 24.0625 26.1363 24.9375 25.1409 26.2806L10.7384 18.9416C10.8631 18.4811 10.9364 18.0009 10.9364 17.5011C10.9364 16.8755 10.8259 16.2772 10.6334 15.7183L25.1169 8.68985C26.1111 10.0505 27.7145 10.9386 29.5302 10.9386C32.5511 10.9386 34.9989 8.48969 34.9989 5.46985C34.9989 2.45001 32.5511 0.00109863 29.5302 0.00109863C26.5092 0.00109863 24.0614 2.45001 24.0614 5.46985C24.0614 5.89422 24.115 6.30547 24.2069 6.70251L9.51562 13.8316C8.51484 12.728 7.07547 12.0313 5.46875 12.0313C2.44891 12.0313 0 14.4802 0 17.5C0 20.5199 2.44891 22.9688 5.46875 22.9688C7.20781 22.9688 8.75437 22.155 9.75625 20.8884L24.2178 28.2592C24.1194 28.6683 24.0625 29.0927 24.0625 29.5313C24.0625 32.5511 26.5103 35 29.5312 35C32.5522 35 35 32.5511 35 29.5313C35 26.5114 32.5511 24.0625 29.5302 24.0625ZM29.5302 2.18751C31.3425 2.18751 32.8114 3.65641 32.8114 5.46876C32.8114 7.2811 31.3425 8.75001 29.5302 8.75001C27.7178 8.75001 26.2489 7.2811 26.2489 5.46876C26.2489 3.65641 27.7178 2.18751 29.5302 2.18751ZM5.46766 20.7813C3.65531 20.7813 2.18641 19.3124 2.18641 17.5C2.18641 15.6877 3.65531 14.2188 5.46766 14.2188C7.28 14.2188 8.74891 15.6888 8.74891 17.5C8.74891 19.3113 7.28 20.7813 5.46766 20.7813ZM29.5302 32.8125C27.7178 32.8125 26.2489 31.3436 26.2489 29.5313C26.2489 27.7189 27.7178 26.25 29.5302 26.25C31.3425 26.25 32.8114 27.7189 32.8114 29.5313C32.8114 31.3436 31.3425 32.8125 29.5302 32.8125Z" fill="#4070F4"/>
                        </svg>
                    </button>
                    {shareLinkCopied && <span className="apartment__share-notification">Link copied!</span>}
                </div>
                <div className="apartment__labels">
                    <span className="apartment__label apartment__label--type">For {apartment.type}</span>
                    {apartment.hotOffers && <span className="apartment__label apartment__label--discount">${apartment.price - apartment.discountPrice} discount</span>}
                </div>
                <div className="apartment__address">
                    <svg className="apartment__address-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0018 0C5.96285 0 2.67499 3.28787 2.67499 7.32682C2.67499 14.4336 9.58875 19.8365 9.58875 19.8365C9.70677 19.9307 9.85328 19.9819 10.0043 19.9819C10.1552 19.9819 10.3018 19.9307 10.4198 19.8365C10.4198 19.8365 17.3336 14.4336 17.3335 7.32682C17.3335 3.28787 14.0408 0 10.0018 0V0ZM10.0018 1.3326C13.3207 1.3326 16.0009 4.00787 16.0009 7.32682C16.001 13.1408 10.7363 17.7342 10.0067 18.3564C9.28059 17.7373 4.00758 13.143 4.00758 7.32682C4.00758 4.00787 6.68286 1.3326 10.0018 1.3326Z" />
                        <path d="M10.0018 3.9978C8.17024 3.9978 6.6728 5.49525 6.67279 7.32683C6.67278 9.15844 8.17022 10.6608 10.0018 10.6608C11.8334 10.6608 13.3358 9.15844 13.3358 7.32683C13.3358 5.49525 11.8334 3.9978 10.0018 3.9978ZM10.0018 5.3304C11.1134 5.3304 12.0032 6.21526 12.0032 7.32683C12.0032 8.43841 11.1134 9.32818 10.0018 9.32818C8.89024 9.32818 8.00538 8.43841 8.00539 7.32683C8.00539 6.21526 8.89025 5.3304 10.0018 5.3304Z" />
                    </svg>
                    <strong className="apartment__address-title">{apartment.address} {apartment.city}, {apartment.postalCode}</strong>
                </div>
                <div className="apartment__price">
                    <strong className={`apartment__price-holder ${apartment.discountPrice && "sale"}`}>${apartment.price}</strong>
                    {apartment.discountPrice && <strong className="apartment__price-discount">${apartment.discountPrice}</strong>}
                </div>
                <ul className="apartment__options">
                    {apartment.deposit > 0 &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.13464 7.69995C8.84542 7.69995 8.55131 7.96194 8.55131 8.34996C8.55131 8.64377 8.61436 8.74973 8.64598 8.78999C8.68348 8.83774 8.7585 8.89726 8.95914 8.96886L11.4655 9.84317C11.4667 9.8436 11.468 9.84404 11.4692 9.84448C11.7629 9.949 12.0985 10.1131 12.3491 10.434C12.6053 10.7621 12.7096 11.1713 12.7096 11.6416C12.7096 12.6647 11.9178 13.5416 10.8763 13.5416H9.30964C8.1719 13.5416 7.29297 12.5853 7.29297 11.4583C7.29297 11.1131 7.57279 10.8333 7.91797 10.8333C8.26315 10.8333 8.54297 11.1131 8.54297 11.4583C8.54297 11.9479 8.91404 12.2916 9.30964 12.2916H10.8763C11.1681 12.2916 11.4596 12.0352 11.4596 11.6416C11.4596 11.3536 11.3973 11.2461 11.3639 11.2034C11.3251 11.1537 11.2485 11.0929 11.0518 11.0227L8.54544 10.1484C8.54474 10.1482 8.54404 10.1479 8.54334 10.1477C8.5428 10.1475 8.54226 10.1473 8.54172 10.1471C8.252 10.044 7.91485 9.88287 7.66288 9.56201C7.40492 9.23353 7.30131 8.82282 7.30131 8.34996C7.30131 7.33796 8.09051 6.44995 9.13464 6.44995H10.7013C11.839 6.44995 12.718 7.40625 12.718 8.53329C12.718 8.87847 12.4381 9.15829 12.093 9.15829C11.7478 9.15829 11.468 8.87847 11.468 8.53329C11.468 8.04365 11.0969 7.69995 10.7013 7.69995H9.13464Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 5.625C10.3452 5.625 10.625 5.90482 10.625 6.25V13.75C10.625 14.0952 10.3452 14.375 10 14.375C9.65482 14.375 9.375 14.0952 9.375 13.75V6.25C9.375 5.90482 9.65482 5.625 10 5.625Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0013 2.29175C5.74648 2.29175 2.29297 5.74526 2.29297 10.0001C2.29297 14.2549 5.74648 17.7084 10.0013 17.7084C14.2561 17.7084 17.7096 14.2549 17.7096 10.0001C17.7096 9.6549 17.9895 9.37508 18.3346 9.37508C18.6798 9.37508 18.9596 9.6549 18.9596 10.0001C18.9596 14.9453 14.9465 18.9584 10.0013 18.9584C5.05612 18.9584 1.04297 14.9453 1.04297 10.0001C1.04297 5.0549 5.05612 1.04175 10.0013 1.04175C10.3465 1.04175 10.6263 1.32157 10.6263 1.66675C10.6263 2.01193 10.3465 2.29175 10.0013 2.29175Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.168 1.875C14.5131 1.875 14.793 2.15482 14.793 2.5V5.20833H17.5013C17.8465 5.20833 18.1263 5.48815 18.1263 5.83333C18.1263 6.17851 17.8465 6.45833 17.5013 6.45833H14.168C13.8228 6.45833 13.543 6.17851 13.543 5.83333V2.5C13.543 2.15482 13.8228 1.875 14.168 1.875Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.7766 1.22481C19.0207 1.46888 19.0207 1.86461 18.7766 2.10869L14.6099 6.27536C14.3658 6.51943 13.9701 6.51943 13.726 6.27536C13.4819 6.03128 13.4819 5.63555 13.726 5.39147L17.8927 1.22481C18.1368 0.980729 18.5325 0.980729 18.7766 1.22481Z" />
                        </svg>
                        <strong className="apartment__option-title">Deposit ${apartment.deposit}</strong>
                    </li>
                    }
                    {apartment.bedrooms &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.30297 2.90002V2.90821H9.83119V4.17674H9.83136V5.52422C9.68823 5.5 9.54313 5.48457 9.39695 5.4775C8.2437 5.42177 7.02879 5.8541 6.24574 6.0533L5.92107 6.13605L5.94612 6.37585C5.92632 6.36826 5.90666 6.36051 5.88643 6.35322L5.85609 6.34219L5.82425 6.33637C5.64795 6.30418 5.46838 6.28495 5.28721 6.27646C4.01877 6.21733 2.66943 6.68431 1.79416 6.90238L1.46661 6.98393L1.50258 7.3201C1.52861 7.56335 1.55499 7.81961 1.62195 8.07402C1.16401 8.63741 1.18828 8.86488 1.25975 9.24562L10.3455 12.4313V15.6229C6.90301 14.1923 3.55609 12.4416 0.0847293 11.0909V3.76415H0.859299V3.76954H1.39177V5.26808L8.52849 4.34517V2.90002H9.30297ZM9.21312 6.25504C9.26489 6.25448 9.31597 6.25504 9.36649 6.25677C9.48775 6.26086 9.60338 6.27383 9.71461 6.29297C10.2976 6.51695 10.588 6.83761 10.7581 7.21795C9.75743 7.6336 8.85725 7.80009 8.06801 7.89615C7.84093 7.84659 7.65908 7.78987 7.511 7.72833C7.3474 7.41379 7.11584 7.11443 6.80004 6.85946C6.791 6.81291 6.78261 6.76525 6.77491 6.71594C7.52426 6.51639 8.43653 6.26323 9.21308 6.255L9.21312 6.25504ZM5.15309 7.05358C5.21247 7.05297 5.27112 7.05358 5.32908 7.05556C5.46756 7.0603 5.60001 7.07478 5.72756 7.0965C6.40561 7.35035 6.74078 7.71863 6.93253 8.15354C5.79477 8.62116 4.77148 8.807 3.87879 8.91294C3.12918 8.75382 2.79801 8.52548 2.62355 8.2809C2.49136 8.09549 2.42888 7.86056 2.38559 7.56899C3.22449 7.35018 4.26263 7.06245 5.15313 7.05353L5.15309 7.05358ZM11.5405 7.72083L12.6768 8.04204C10.1296 8.4907 7.29378 9.28036 5.56886 10.0145L4.38794 9.61928C5.30172 9.4837 6.35814 9.24204 7.51066 8.72085L7.7383 8.61784C7.81231 8.63681 7.88891 8.65461 7.96852 8.67094L8.02962 8.68344L8.09159 8.67611C9.01944 8.56664 10.153 8.36175 11.4115 7.78043L11.5405 7.72083ZM14.501 8.55772L16.7101 9.18222L10.3455 10.8362V11.5948L6.79461 10.4248L6.71845 10.3993C8.83457 9.63575 12.0732 8.83472 14.501 8.55772H14.501ZM20 9.14731V13.0508L11.1915 15.7299V11.4365L20 9.14731ZM0 11.865L1.60181 12.5783V13.2107L0.704299 13.5751L4.3008e-05 13.1196L0 11.865ZM19.9348 13.9873V15.4955L18.992 15.9056L18.2877 15.5867V14.4882L19.9348 13.9873ZM9.84595 16.2495L10.3455 16.4719L10.7518 16.6528L11.5841 16.3567V18.1172L10.6071 18.55L9.84599 18.0033L9.84595 16.2495Z"/>
                        </svg>
                        <strong className="apartment__option-title">{apartment.bedrooms} {apartment.bedrooms > 1 ? "bedrooms" : "bedroom"}</strong>
                    </li>
                    }
                    {apartment.floor &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 1.6709V2.87085H12.8801V7.20865H8.5601V12.0091H4.08002V16.3291H0V15.129H2.87998V10.8092H7.36006V6.0087H11.68V1.6709H18ZM6.87646 3.38228L3.59015 3.81188C3.5421 3.81798 3.50471 3.85562 3.49805 3.9034C3.49126 3.9511 3.51715 3.9975 3.56133 4.01685L4.88084 4.58907L2.69132 6.77834C2.64961 6.82054 2.64937 6.88826 2.69132 6.93026L3.44928 7.68821C3.49099 7.73016 3.55899 7.72992 3.6009 7.68821L5.79046 5.49865L6.36268 6.81796C6.38176 6.86202 6.4282 6.88826 6.4759 6.88148C6.49988 6.87796 6.52102 6.86681 6.53684 6.85099C6.55302 6.83494 6.56404 6.81336 6.56729 6.78909L6.99692 3.50267C7.00124 3.46964 6.99022 3.43669 6.96643 3.41302C6.943 3.38978 6.90961 3.37828 6.87646 3.38228Z" />
                        </svg>
                        <strong className="apartment__option-title">{apartment.floor} floor</strong>
                    </li>
                    }
                    {apartment.houseroom &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H4.65139L7.77735 2.08397L7.22265 2.91602L4.34861 0.999998H0.999998V14H6V8.00003H4V7H9V8.00003H7V14H14V8.00003H12V7H14V0.999998H9.99997V0H15V15H0V0Z" />
                        </svg>
                        <strong className="apartment__option-title">{apartment.houseroom} м²</strong>
                    </li>
                    }
                    {apartment.furniture &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5918 8.97959H12.2449V0.408163C12.2449 0.182776 12.0622 0 11.8367 0H0.408163C0.182735 0 0 0.182776 0 0.408163V19.5918C0 19.8172 0.182735 20 0.408163 20H11.2245C11.4499 20 11.6327 19.8172 11.6327 19.5918V18.3673H16.5306V19.5918C16.5306 19.8172 16.7133 20 16.9388 20H18.3673C18.5928 20 18.7755 19.8172 18.7755 19.5918V18.3673H18.9796C19.205 18.3673 19.3878 18.1846 19.3878 17.9592V11.2245H19.5918C19.8173 11.2245 20 11.0417 20 10.8163V9.38775C20 9.16237 19.8173 8.97959 19.5918 8.97959ZM5.71429 19.1837H0.816327V15.7143H5.71429V19.1837ZM5.71429 14.898H0.816327V0.816327H5.71429V14.898ZM9.38775 19.1837H6.53061V0.816327H11.4286V8.97959H8.36735C8.14192 8.97959 7.95918 9.16237 7.95918 9.38775V10.8163C7.95918 11.0417 8.14192 11.2245 8.36735 11.2245H8.77551V17.9592C8.77551 18.1846 8.95824 18.3673 9.18367 18.3673H9.38775V19.1837ZM10.8163 19.1837H10.2041V18.3673H10.8163V19.1837ZM17.9592 19.1837H17.3469V18.3673H17.9592V19.1837ZM18.5714 17.551H9.59184V14.6939H18.5714V17.551ZM18.5714 13.8776H9.59184V11.2245H18.5714V13.8776ZM19.1837 10.4082H8.77551V9.79592H19.1837V10.4082Z" />
                            <path d="M14.6932 12.0408H13.4688V12.8571H14.6932V12.0408Z" />
                            <path d="M14.6932 15.5103H13.4688V16.3266H14.6932V15.5103Z" />
                            <path d="M8.16398 6.53052H7.34766V8.16317H8.16398V6.53052Z" />
                            <path d="M4.89836 6.53052H4.08203V8.16317H4.89836V6.53052Z" />
                            <path d="M3.87683 16.9387H2.65234V17.755H3.87683V16.9387Z" />
                        </svg>
                        <strong className="apartment__option-title">Furniture</strong>
                    </li>
                    }
                    {apartment.parking &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0002 18.2774C8.36302 18.2774 6.76265 17.7919 5.40143 16.8824C4.0402 15.9729 2.97925 14.6801 2.35275 13.1676C1.72624 11.6551 1.56232 9.99073 1.88171 8.38506C2.2011 6.77938 2.98945 5.30447 4.14708 4.14684C5.30471 2.98921 6.77962 2.20085 8.3853 1.88147C9.99098 1.56208 11.6553 1.726 13.1678 2.3525C14.6803 2.97901 15.9731 4.03995 16.8826 5.40118C17.7922 6.76241 18.2777 8.36278 18.2777 9.99991C18.2752 12.1945 17.4024 14.2985 15.8506 15.8503C14.2987 17.4021 12.1947 18.275 10.0002 18.2774ZM10.0002 2.55575C8.52784 2.55575 7.08859 2.99234 5.8644 3.81032C4.64022 4.62829 3.68608 5.79091 3.12265 7.15116C2.55922 8.5114 2.4118 10.0082 2.69903 11.4522C2.98627 12.8962 3.69525 14.2227 4.73634 15.2637C5.77742 16.3048 7.10385 17.0138 8.54787 17.301C9.9919 17.5883 11.4887 17.4409 12.8489 16.8774C14.2092 16.314 15.3718 15.3599 16.1898 14.1357C17.0077 12.9115 17.4443 11.4722 17.4443 9.99991C17.4421 8.02628 16.6571 6.13411 15.2615 4.73853C13.866 3.34296 11.9738 2.55795 10.0002 2.55575Z" />
                            <path d="M10.474 7.08325H9.01563C8.93352 7.08314 8.8522 7.09923 8.77632 7.1306C8.70044 7.16197 8.6315 7.20801 8.57344 7.26607C8.51538 7.32412 8.46935 7.39307 8.43798 7.46895C8.40661 7.54482 8.39052 7.62615 8.39063 7.70825V12.4916C8.39063 12.6021 8.43452 12.7081 8.51266 12.7862C8.5908 12.8644 8.69679 12.9083 8.80729 12.9083C8.9178 12.9083 9.02378 12.8644 9.10192 12.7862C9.18006 12.7081 9.22396 12.6021 9.22396 12.4916V11.2499H10.474C11.0265 11.2499 11.5564 11.0304 11.9471 10.6397C12.3378 10.249 12.5573 9.71912 12.5573 9.16659C12.5573 8.61405 12.3378 8.08415 11.9471 7.69345C11.5564 7.30275 11.0265 7.08325 10.474 7.08325ZM10.474 10.4166H9.22396V7.91659H10.474C10.8055 7.91659 11.1234 8.04828 11.3578 8.2827C11.5923 8.51712 11.724 8.83507 11.724 9.16659C11.724 9.49811 11.5923 9.81605 11.3578 10.0505C11.1234 10.2849 10.8055 10.4166 10.474 10.4166Z" />
                        </svg>
                        <strong className="apartment__option-title">Parking</strong>
                    </li>
                    }
                    {apartment.terrace &&
                    <li className="apartment__option">
                        <svg className="apartment__option-icon" width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.4375 10.9375H17.8125H5.31578C5.31516 10.9375 5.31453 10.9375 5.31391 10.9375H2.1875H1.5625C1.04555 10.9375 0.625 11.3581 0.625 11.875C0.625 12.0476 0.764922 12.1875 0.9375 12.1875C1.11008 12.1875 1.25 12.0476 1.25 11.875C1.25 11.7027 1.3902 11.5625 1.5625 11.5625H1.81859L1.09309 15.9157C0.98332 16.5745 1.11207 17.2527 1.45566 17.8253L1.875 18.5241V19.6484C1.875 19.8423 2.03273 20 2.22656 20H17.7734C17.9673 20 18.125 19.8423 18.125 19.6484V18.5241L18.5443 17.8253C18.8879 17.2527 19.0167 16.5745 18.9069 15.9157L18.1814 11.5625H18.4375C18.6098 11.5625 18.75 11.7027 18.75 11.875C18.75 12.0476 18.8899 12.1875 19.0625 12.1875C19.2351 12.1875 19.375 12.0476 19.375 11.875C19.375 11.3581 18.9545 10.9375 18.4375 10.9375ZM16.4459 17.5037L16.0731 18.125H15.1491L15.3699 17.573C15.5412 17.1448 15.6048 16.6762 15.5539 16.2178L15.0366 11.5625H15.9853L16.7279 16.0185C16.8133 16.5309 16.7131 17.0583 16.4459 17.5037ZM13.5392 18.125L13.7476 17.3949C13.8401 17.071 13.8735 16.7365 13.8468 16.4005L13.4632 11.5625H14.4078L14.9327 16.2868C14.9723 16.6434 14.9229 17.0079 14.7896 17.3409L14.4759 18.125H13.5392ZM11.8931 18.125L11.9574 16.9823C11.9611 16.9155 11.9625 16.8476 11.9614 16.7805L11.8799 11.5625H12.8363L13.2238 16.45C13.2445 16.7112 13.2186 16.9714 13.1466 17.2233L12.8892 18.125H11.8931ZM10.3125 18.125V11.5625H11.2548L11.3365 16.7902C11.3373 16.8425 11.3363 16.8953 11.3334 16.9473L11.2671 18.125H10.3125ZM8.73105 18.125L8.65793 16.9553C8.65434 16.8973 8.65301 16.8387 8.65402 16.7808L8.74465 11.5625H9.6875V18.125H8.73105ZM3.92691 18.125L3.5541 17.5037C3.28688 17.0584 3.18672 16.5309 3.27207 16.0185L4.01473 11.5625H4.96336L4.44609 16.2178C4.39516 16.6762 4.45879 17.1448 4.63008 17.573L4.85086 18.125H3.92691ZM5.52406 18.125L5.21039 17.3409C5.07715 17.0079 5.02766 16.6434 5.06727 16.2869L5.59223 11.5625H6.53656L6.15047 16.3973C6.12348 16.7355 6.1573 17.0723 6.25105 17.3983L6.46 18.125H5.52406ZM7.11031 18.125L6.85172 17.2256C6.77879 16.972 6.75246 16.7101 6.77348 16.447L7.16355 11.5625H8.11953L8.02914 16.77C8.02781 16.8443 8.02953 16.9197 8.03418 16.9943L8.10488 18.125H7.11031ZM1.70957 16.0185L2.45223 11.5625H3.38113L2.65559 15.9157C2.54582 16.5745 2.67457 17.2527 3.01816 17.8253L3.19801 18.125H2.36441L1.9916 17.5037C1.72438 17.0583 1.62422 16.5309 1.70957 16.0185ZM17.5 19.375H2.5V18.75H3.74969C3.74988 18.75 3.75008 18.75 3.75027 18.75C3.75047 18.75 3.75066 18.75 3.75086 18.75H5.31156C5.31191 18.75 5.31223 18.7501 5.31258 18.7501C5.31312 18.7501 5.31367 18.75 5.31422 18.75H6.87391C6.87422 18.75 6.87453 18.7501 6.87484 18.7501C6.8752 18.7501 6.87559 18.75 6.87594 18.75H13.1241C13.1244 18.75 13.1248 18.7501 13.1252 18.7501C13.1255 18.7501 13.1258 18.75 13.1261 18.75H14.6858C14.6863 18.75 14.6869 18.7501 14.6874 18.7501C14.6878 18.7501 14.6881 18.75 14.6884 18.75H16.2491C16.2493 18.75 16.2495 18.75 16.2497 18.75C16.2499 18.75 16.2501 18.75 16.2503 18.75H17.5V19.375ZM18.0084 17.5037L17.6356 18.125H16.802L16.9818 17.8253C17.3254 17.2527 17.4542 16.5745 17.3444 15.9157L16.6189 11.5625H17.5478L18.2904 16.0185C18.3758 16.5309 18.2756 17.0583 18.0084 17.5037Z" />
                            <path d="M4.0625 10.3125C4.23508 10.3125 4.375 10.1726 4.375 10V0.625H15.625V10C15.625 10.1726 15.7649 10.3125 15.9375 10.3125C16.1101 10.3125 16.25 10.1726 16.25 10V0.625C16.25 0.280391 15.9696 0 15.625 0H4.375C4.03039 0 3.75 0.280391 3.75 0.625V10C3.75 10.1726 3.88992 10.3125 4.0625 10.3125Z" />
                            <path d="M14.6875 10.3125C14.8601 10.3125 15 10.1726 15 10V1.5625C15 1.38992 14.8601 1.25 14.6875 1.25H5.3125C5.13992 1.25 5 1.38992 5 1.5625V10C5 10.1726 5.13992 10.3125 5.3125 10.3125C5.48508 10.3125 5.625 10.1726 5.625 10V5.3125H8.74996C8.92254 5.3125 9.06246 5.17258 9.06246 5C9.06246 4.82742 8.92254 4.6875 8.74996 4.6875H5.625V1.875H9.6875V10C9.6875 10.1726 9.82742 10.3125 10 10.3125C10.1726 10.3125 10.3125 10.1726 10.3125 10V5.3125H14.375V10C14.375 10.1726 14.5149 10.3125 14.6875 10.3125ZM10.3125 4.6875V1.875H14.375V4.6875H10.3125Z" />
                        </svg>
                        <strong className="apartment__option-title">Terrace</strong>
                    </li>
                    }
                </ul>
                {apartment.description && <div className="apartment__description">{apartment.description}</div>}
                {auth.currentUser?.uid !== apartment.userID && (
                    <Link to={`/contact/${apartment.userID}?apartmentId=${params.apartmentId}&apartmentTitle=${apartment.title}`} className="apartment__owner button button--accent">Contact House Owner</Link>
                )}
                <div className="apartment__map">
                    <MapContainer center={[apartment.coordinates.lat, apartment.coordinates.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[apartment.coordinates.lat, apartment.coordinates.lng]}>
                            <Popup>{apartment.address}<br/>{apartment.city}<br/>{apartment.postalCode}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </main>
    );
};

export default Apartment;