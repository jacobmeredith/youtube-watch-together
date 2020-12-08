export const messagesInitialState = {
  messages: []
}

export default function reducer(state: any = messagesInitialState, action: { type: string|undefined, payload: any }) {
  switch(action.type) {
    case 'MESSAGES_UPDATE': {
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}
