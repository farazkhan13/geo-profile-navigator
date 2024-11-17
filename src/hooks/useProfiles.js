import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProfiles } from "../store/profile.slice";
import axios from "axios";

function useProfiles() {
  const { loading, profiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profiles.length) return

    dispatch(setLoading(true));
    axios.get('https://dummyjson.com/users')
      .then(response => {
        dispatch(setProfiles(response.data.users));
      })
      .catch(error => {
        dispatch(setProfiles([]));
        console.error('Error fetching profiles:', error);
      })
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return {
    loading, profiles
  }
}

export default useProfiles