import React, { useState } from "react";
import Alert from "../components/Alert";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { categories } from "../data/CategoriesData";
import Loader from "../components/Loader";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getAllFoodItems, saveFood } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";

const AddFood = () => {
  const [foodItemState, setFoodItemState] = useState({
    title: "",
    calories: "",
    category: "",
    price: "",
  });
  const { title, calories, category, price } = foodItemState;
  // eslint-disable-next-line no-unused-vars
  const [{foodItems}, dispatch] = useStateValue();

  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState("");
  const [progress, setProgress] = useState("");

  alert &&
    setTimeout(() => {
      setAlert(false);
    }, 4000);

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const imageUniqueName = new Date().getTime() + "-" + imageFile.name;
    const storageRef = ref(storage, `images/${imageUniqueName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.trunc(uploadProgress));
      },
      (error) => {
        setAlert(true);
        setAlertStatus("error");
        setMsg("Error while uploading! Try again 😟");
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setImageAsset(getDownloadURL);
          setIsLoading(false);
          setAlert(true);
          setAlertStatus("success");
          setMsg("Image uploaded successfully😃!");
        });
      }
    );
  };
  const handleDeleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset("");
      setIsLoading(false);
      setAlert(true);
      setAlertStatus("success");
      setMsg("Image deleted successfully😃!");
    });
  };

  const handleAddFood = (e) => {
    e.preventDefault();

    try {
      if (!title) {
        setMsg("Title is required!");
        setAlertStatus("error");
        setAlert(true);
      } else if (!category) {
        setMsg("Select a category!");
        setAlertStatus("error");
        setAlert(true);
      } else if (!calories) {
        setMsg("Calories is required!");
        setAlertStatus("error");
        setAlert(true);
      } else if (!price) {
        setMsg("Price is required!");
        setAlertStatus("error");
        setAlert(true);
      } else if (!imageAsset) {
        setMsg("Food image is required!");
        setAlertStatus("error");
        setAlert(true);
      } else {
        const data = Object.assign(
          {
            id: `${new Date().getTime()}`,
            imageURL: imageAsset,
            qty: 1,
          },
          foodItemState
        );
        saveFood(data);
        setIsLoading(false);
        setAlert(true);
        setAlertStatus("success");
        setMsg("Food added successfully in database😃");

        setFoodItemState({ title: "", category: "", price: "", calories: "" });
        setImageAsset("");
      }
    } catch (error) {
      setAlert(true);
      setAlertStatus("error");
      setMsg("Error while saving data! Try again 😟");
      setIsLoading(false);
    }
    fetchData();
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <>
      <div
        className={`fixed left-[50%] top-[4.7rem] ${
          alert
            ? "translate-x-[-50%] -translate-y-0"
            : "translate-x-[30rem] -translate-y-8"
        } transition-all ease-linear duration-300`}
      >
        {alert && <Alert alertStatus={alertStatus} msg={msg} />}
      </div>

      <div className="w-full flex items-center justify-center">
        <form
          className="w-[90%] md:w-[70%] border gap-4 border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center"
          onSubmit={handleAddFood}
        >
          <TextInput
            onChange={(e) => {
              setFoodItemState({ ...foodItemState, title: e.target.value });
            }}
            placeholder="Food Title"
            type="text"
            value={title}
            icon={<MdFastfood className="text-xl" />}
          />
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineCategory />
            <select
              className="bg-transparent border-0 outline-0 w-full cursor-pointer"
              onChange={(e) => {
                setFoodItemState({
                  ...foodItemState,
                  category: e.target.value,
                });
              }}
            >
              <option>
                Select a Category
              </option>
              {categories.map((category) => {
                const { id, name, urlParamName } = category;
                return (
                  <option key={id} value={urlParamName}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <TextInput
              onChange={(e) => {
                setFoodItemState({
                  ...foodItemState,
                  calories: e.target.value,
                });
              }}
              placeholder="Calories"
              type="text"
              value={calories}
              icon={<MdFoodBank className="text-xl" />}
            />
            <TextInput
              onChange={(e) => {
                setFoodItemState({ ...foodItemState, price: e.target.value });
              }}
              placeholder="Price"
              type="number"
              min="0"
              step=".01"
              value={price}
              icon={<MdAttachMoney className="text-xl" />}
            />
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-150 md:h-225 cursor-pointer rounded-lg">
            {isLoading ? (
              <div>
                <Loader />
                {!imageAsset && (
                  <div
                    className={`text-center mt-3 ${
                      progress < 60 ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    {progress}%
                  </div>
                )}
              </div>
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label
                      htmlFor="upload"
                      className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <MdCloudUpload className="text-gray-500 text-3xl" />
                      <p>Click Here to Upload</p>
                      <input
                        id="upload"
                        type="file"
                        className="w-0 h-0"
                        onChange={handleUploadImage}
                        value={imageAsset}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img
                        src={imageAsset}
                        alt="uploaded-img"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        title="Delete Image"
                        className="absolute bottom-2 md:bottom-2 sm:bottom-0 left-[2rem] sm:left-[3.5rem] md:left-[5rem] p-1 md:p-3 rounded-full bg-orange-500 cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={handleDeleteImage}
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <Button btnText="Add Food" type="submit" />
        </form>
      </div>
    </>
  );
};

export default AddFood;
