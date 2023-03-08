import { updateDoc, doc } from "firebase/firestore";
import { AddZero } from './../../lib/AddZero';
import { db } from './../../firebaseConfig';


// eslint-disable-next-line import/no-anonymous-default-export
export default async function(req, res){
    try {
        let {path} = req.body;
        let {userId} = req.body
        await res.revalidate(path)
        let dbInstance = doc(db, `userData/${userId}`)
        let date  = new Date()
        let formattedDate = `${date.getFullYear()}.${AddZero(date.getMonth() + 1)}.${AddZero(date.getDate())}`
        if(path.split('/')[3] === "subs"){
            let response = await updateDoc(dbInstance, {
                subsLastRevalidated: formattedDate
            })
        }
        if(path.split('/')[3] === "calendar"){
            let response = await updateDoc(dbInstance, {
                calendarLastRevalidated: formattedDate
            })
        }
        return res.status(200).json({ revalidated: true })
      } catch (error) {
        return res.status(500).json({error: error.message});
      }   
}