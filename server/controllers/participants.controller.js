import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase.js";


export const getParticipants = async (req, res) => {
    const { eventId } = req.params; // Extract eventId from URL parameters

    console.log("Trying to get participants for event:", eventId);

    try {
        // Construct the query to get participants for the specified event
        const q = query(
            collection(db, 'participants'),
            where('eventId', '==', eventId)
        );

        // Execute the query
        const data = await getDocs(q);

        // Map through the documents and extract necessary fields
        const participants = data.docs.map((doc) => ({
            id: doc.id,
            fullName: doc.data().fullName,
            email: doc.data().email,
            dateOfBirth: doc.data().dateOfBirth,
            referralSource: doc.data().referralSource,
            eventId: doc.data().eventId,
            createdAt: doc.data().createdAt.toDate() // Convert Firestore timestamp to JS Date
        })).sort((a, b) => a.createdAt - b.createdAt); // Sort participants by createdAt

        // Send the participants data as a response
        return res.status(200).json(participants);
    } catch (error) {
        // Handle any errors that occur during the query
        res.status(500).json({ error: error.message });
    }
};
export const addParticipants = async (req, res) => {
    console.log("req.body = ", req.body);
    const { fullName, email, dateOfBirth, referralSource, eventId } = req.body;
    console.log("a = ", fullName, email, dateOfBirth, referralSource, eventId);

    try {
        // Check if the participant already exists in the "participants" collection
        const participantsRef = collection(db, 'participants');
        const q = query(participantsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return res.status(400).json({ error: 'Participant already exists' });
        }

        const result = {
            fullName,
            email,
            dateOfBirth,
            referralSource,
            eventId,
            createdAt: new Date(),
        };

        // Add a new document with a generated id to the "participants" collection
        const docRef = await addDoc(participantsRef, result);

        console.log('----docRef: ', docRef);

        // Send a success response
        res.status(200).json({
            ...result,
            id: docRef.id
        });

    } catch (error) {
        // Send an error response
        res.status(500).json({ error: error.message });
    }
};