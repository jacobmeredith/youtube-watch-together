export const initialState = {
  id: '',
  video: '',
  results: {
    next: '',
    videos: []
  },
  time: 0,
  state: 'onPlay'
}

export default function reducer(state: any = initialState, action: { type: string|undefined, payload: any }) {
  switch(action.type) {
    case 'ROOM_UPDATE': {
      return {
        ...state,
        id: action.payload
      }
    }
    case 'ROOM_VIDEO_UPDATE': {
      if(!action.payload.add) return state;
      return {
        ...state,
        video: action.payload.video
      }
    }
    case 'ROOM_STATE_UPDATE': {
      return {
        ...state,
        time: action.payload.time,
        state: action.payload.state
      }
    }
    case 'ROOM_RESULTS_UPDATE': {
      if (!action.payload) {
        return {
          ...state,
          results: {
            next: '',
            videos: []
          }
        }
      }

      return {
        ...state,
        results: {
          next: action.payload.response.data.nextPageToken,
          videos: action.payload.type === 'get' 
            ? action.payload.response.data.items
            : [...state.results.videos, ...action.payload.response.data.items]
        }
      }
    }
    default: {
      return state;
    }
  }
}
