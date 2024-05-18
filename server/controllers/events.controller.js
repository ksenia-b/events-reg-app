import { db } from '../firebase.js';

import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const sortEvents = (events, sortKey, sortOrder) => {
    if (sortKey && sortOrder) {
        events.sort((a, b) => {
            const valueA = typeof a[sortKey] === 'string' ? a[sortKey].toLowerCase() : a[sortKey];
            const valueB = typeof b[sortKey] === 'string' ? b[sortKey].toLowerCase() : b[sortKey];

            if (sortOrder === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
    }
    return events;
};

export const events = async (req, res) => {
    let { offset = 0, limit = 10, sortKey, sortOrder } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);

    let allEvents = [];
    console.log("trying to get events...")
    try {
        const data = await getDocs(collection(db, "events"));
        data.forEach((doc) => {
            const result = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                date: doc.data().date,
                organizer: doc.data().organizer
            };
            allEvents = [...allEvents, result]
        });

        const events = sortEvents(allEvents, sortKey, sortOrder);

        // Apply offset and limit
        const paginatedEvents = events.slice(offset, offset + limit);

        res.status(200).json(paginatedEvents);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getEventById = async (req, res) => {
    const { id } = req.params;
    console.log('get for id: ', id);

    try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
            //   return docSnap.data();
        } else {
            throw new Error("Event not found");
        }
    } catch (error) {
        console.log('err: ', error)
        res.status(500).json(error);
    }

    // res.status(500).json('Some error');
    // res.status(200).json({ d: 'asdf' });
}
