import { collection } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";
import { getDocs, addDoc } from "firebase/firestore";

export default async function InboxHandlerPage(req, res) {
  if (req.method === "PATCH") {
    try {
      let { userId } = req.body;
      let dbInstance = collection(db, `userInbox/${userId}/inbox`);
      let response = await getDocs(dbInstance);
      let data = [];
      response.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      let { userId, message, date, sendername } = req.body;
      let dbInstance = collection(db, `userInbox/${userId}/inbox`);
      let response = await addDoc(dbInstance, {
        userId: userId,
        message: message,
        date: date,
        sendername: sendername
      });
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
