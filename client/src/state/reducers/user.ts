export const initialState = {
  name: ''
}

export default function reducer(state: any = initialState, action: { type: string|undefined, payload: any }) {
  switch(action.type) {
    case 'USER_NAME_UPDATE': {
      return {
        ...state,
        name: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
