import { addDoc, collection } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";

export default async function HandleMailsPage(req, res) {
  if (req.method === "POST") {
    try {
      let { senderId, message, fromId, date, sendername } = req.body;

      let dbInstance = collection(db, `userInbox/${senderId}/inbox`);

      let response = await addDoc(dbInstance, {
        message: message,
        senderId: fromId,
        userId: senderId,
        date: date,
        sendername: sendername
      });

      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
