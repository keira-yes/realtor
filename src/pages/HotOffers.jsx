import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import ApartmentPreview from "../components/ApartmentPreview";
import Loader from "../components/Loader";

const HotOffers = () => {
    const [lists, setLists] = useState([]);
    const [lastFetchedApartment, setLastFetchedApartment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const listsRef = collection(db, "lists");
                const q = query(
                    listsRef,
                    where("hotOffers", "==", true),
                    orderBy("timestamp", "desc"),
                    limit(2)
                );
                const querySnap = await getDocs(q);
                const lastVisibleApartment = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedApartment(lastVisibleApartment);

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

    const fetchMoreLists = async () => {
        try {
            const listsRef = collection(db, "lists");
            const q = query(
                listsRef,
                where("hotOffers", "==", true),
                orderBy("timestamp", "desc"),
                startAfter(lastFetchedApartment),
                limit(2)
            );
            const querySnap = await getDocs(q);
            const lastVisibleApartment = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedApartment(lastVisibleApartment);

            const lists = [];

            querySnap.forEach(doc => {
                return lists.push({
                    id: doc.id,
                    data: doc.data()
                })
            });

            setLists(prevState => [...prevState, ...lists]);
            setLoading(false);

        } catch (error) {
            toast.error("Something went wrong...")
        }
    }

    return (
        <div className="category">
            <div className="category__container container">
                <h1 className="category__title">Hot offers</h1>
                <div className="category__holder">
                    {loading && <Loader />}
                    {lists.length === 0 ?
                        <div>No items</div> :
                        <div className="category__list">
                            {lists.map(item => (
                                <ApartmentPreview key={item.id} id={item.id} data={item.data} />
                            ))}
                        </div>
                    }
                    {lastFetchedApartment &&
                    <div className="category__more">
                        <button type="button" className="category__more-btn" onClick={fetchMoreLists}>Load more</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HotOffers;