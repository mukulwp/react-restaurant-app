import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

//Saving new food
export const saveFood = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${new Date().getTime()}`), data, {
    merge: true,
  });
};

//getAll food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
};
