import { v4 as uuid_v4 } from "uuid";

export default function videosReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.filter(
          (video) => video.videoId !== action.payload.videoId
        ),
      };

    case "CLEAR_HISTORY":
      return { ...state, history: [] }

    case "ADD_TO_LIKED_VIDEOS":
      return { ...state, likedVideos: [...state.likedVideos, action.payload] };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video.videoId !== action.payload.videoId
        ),
      };

    case "ADD_TO_WATCH_LATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          (video) => video.videoId !== action.payload.videoId
        ),
      };

    case "ADD_TO_PLAYLIST":
      return { ...state, playLists: [...state.playLists, action.payload] };

    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.filter(
          (video) => video.videoId !== action.payload.videoId
        ),
      };

    case "ADD_TO_INNER_PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.map((item) =>
          item.id === action.payload.playListId
            ? { ...item, playlist: [...item.playlist, action.payload.video] }
            : item
        ),
      };

    case "REMOVE_FROM_INNER_PLAYLIST":
      return {
        ...state,
        playLists: state.playLists.map(item => {
          return item.id === action.payload.playListId
          ? { ...item, playlist: item.playlist.filter(innerItem => String(innerItem._id) !== String(action.payload.video._id))}
          : item
        })
      }
      
    case "ADD_NEW_PLAYLIST":
      return { ...state, playLists: [ ...state.playLists, { id: uuid_v4(), name: action.payload, playlist: [] }]};

    case "CLEAR_PLAYLIST":
      return { ...state, playLists: state.playLists.filter(playlist => playlist.id !== action.payload) };

    case "OPEN_MODAL":
      return { ...state, showModal: true }

    case "CLOSE_MODAL":
      return { ...state, showModal: false }

    default:
      return state;
  }
}
