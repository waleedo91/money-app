import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocs(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch data");
      }
    );

    // unsub on unmount
    return () => unsub();
  }, [collection]);

  return { docs, error };
};
