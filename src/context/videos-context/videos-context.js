import { useContext, createContext, useReducer } from "react";
import videosReducer from "./videos-reducer";

export const VideosContext = createContext();

export function useVideos() {
  return useContext(VideosContext);
}

const initialState = {
  history: [],
  likedVideos: [],
  playLists: [],
  watchLater: [],
  showModal: false,
};

export function VideosProvider({ children }) {
  const [state, dispatch] = useReducer(videosReducer, initialState);

  return (
    <VideosContext.Provider value={{ state, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
}
