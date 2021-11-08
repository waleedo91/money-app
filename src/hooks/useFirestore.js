import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  loading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        document: null,
        loading: true,
        error: null,
        success: null,
      };
    case "ADDED_DOC":
      return {
        loading: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "LOADING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOC", payload: addedDoc });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {};

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
