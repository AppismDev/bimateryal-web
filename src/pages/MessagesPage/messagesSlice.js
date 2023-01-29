import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { sendMessage } from "./messagesAPI"

const initialState = {
    messages: [],
    loading: false,
}

// export const fetchMessagesAsync = createAsyncThunk(
//     'messages/fetchMessagesAsync',
//     async (userId) => {
//         const response = await fetchMessages(userId)
//         return response
//     }
// )

export const sendMessageAsync = createAsyncThunk(
    'messages/sendMessageAsync',
    async (message) => {
        console.log("message is sent", message)
        const response = await sendMessage(message)
        console.log("message is sent ", response ? "successfully" : "unsuccessfully");
        return response
    }
)



export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },

        setMessages: (state, action) => {
            state.messages = action.payload
        }
    },
    extraReducers: {
        [sendMessageAsync.pending]: (state, action) => {
            state.loading = true
        },

        [sendMessageAsync.fulfilled]: (state, action) => {
            state.loading = false
            state.messages.push(action.payload)
        }


    }

})

export const { addMessage } = messagesSlice.actions


export const selectMessages = (state) => state.messages.messages

export default messagesSlice.reducer
