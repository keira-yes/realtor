import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
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
import Loader from "../components/Loader";
import ApartmentPreview from "../components/ApartmentPreview";

const Category = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const listsRef = collection(db, "lists");
                const q = query(
                    listsRef,
                    where("type", "==", params.categoryName),
                    orderBy("timestamp", "desc"),
                    limit(10)
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
    }, [params.categoryName]);

    return (
        <div className="category">
            <div className="category__container container">
                <h1 className="category__title">{params.categoryName === "rent" ? "Rent" : "Sale"}</h1>
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
                </div>
            </div>
        </div>
    );
};

export default Category;