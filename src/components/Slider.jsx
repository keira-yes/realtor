import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ApartmentPreview from "./ApartmentPreview";
import Loader from "./Loader";

const Slider = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const listsRef = collection(db, "lists");
                const q = query(
                    listsRef,
                    orderBy("timestamp", "desc"),
                    limit(5)
                );
                const querySnap = await getDocs(q);
                const lists = [];

                querySnap.forEach(doc => {
                    return lists.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });

                setLists(lists);
                setLoading(false);

            } catch (error) {
                toast.error("Something went wrong...")
            }
        }
        fetchLists();
    }, []);

    if (loading) return <Loader/>

    return (
        <div className="slider">
            <div className="slider__container container">
                <h2 className="slider__title">Recommended</h2>
                <div className="slider__holder">
                    <swiper-container pagination={{clickable: true}} loop="true">
                        {lists.map(({data, id}) => (
                            <swiper-slide key={id}>
                                <ApartmentPreview data={data} id={id} />
                            </swiper-slide>
                        ))}
                    </swiper-container>
                </div>
            </div>
        </div>
    );
};

export default Slider;