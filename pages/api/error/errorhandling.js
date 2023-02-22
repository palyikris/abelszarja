import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";

export default async function ErrorHandlingPage(req, res) {
  if (req.method === "POST") {
    try {
      let { userId, date, name, email, error } = req.body;
      let dbInstance = collection(db, "errors");

      let response = await addDoc(dbInstance, {
        userId: userId,
        date: date,
        name: name,
        email: email,
        error: error,
        status: "pending"
      });
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      let dbInstance = collection(db, "errors");
      let response = await getDocs(dbInstance);

      let data = [];

      response.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
