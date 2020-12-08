export const messagesInitialState = {
  messages: []
}

export default function reducer(state: any = messagesInitialState, action: { type: string|undefined, payload: any }) {
  switch(action.type) {
    case 'MESSAGES_UPDATE': {
      if (!action.payload.add) return state;
      return {
        ...state,
        messages: [...state.messages, action.payload.message]
      };
    }
    default: {
      return state;
    }
  }
}
