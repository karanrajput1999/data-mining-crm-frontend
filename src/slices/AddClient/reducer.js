import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getClients,
  createClient,
  removeClient,
  updateClient,
  getClientUsers,
} from "./thunk";

export const initialState = {
  clients: [],
  filteredClients: [], // centers that gets filtered after searching
  alreadyRegisteredError: null,
  error: "",
  clientUsers: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    searchClients(state, action) {
      const inputValue = action.payload.toLowerCase();

      if (inputValue === "") {
        state.filteredClients = [];
      } else {
        state.filteredClients = state.clients.filter((client) => {
          return Object.values(client).some((clientVal) => {
            return String(clientVal).toLowerCase().includes(inputValue);
          });
        });
      }
    },

    updateClientUserOnStatusUpdate(state, action) {
      const updatedUser = action.payload;
      state.clientUsers = state.clientUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    },
    updateClientUserOnUserAdd(state, action) {
      const newUsers = action.payload;
      state.clientUsers = [...state.clientUsers, ...newUsers];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.clients = action.payload?.data.clients;

        state.error = "";
      }
    });
    builder.addCase(getClientUsers.fulfilled, (state, action) => {
      console.log("CLIENT payload ->", action?.payload.data);
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.clientUsers = action.payload?.data;
        state.error = "";
      }
    });

    builder.addCase(createClient.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.clients = [...state.clients, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Client has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateClient.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedClientId = action.payload.data.updatedClient.id;
        state.clients = state.clients.map((client) => {
          if (client.id == updatedClientId) {
            client = action.payload.data.updatedClient;
            return client;
          } else {
            return client;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Client details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeClient.fulfilled, (state, action) => {
      const deletedClientId = action.payload.deletedClient.id;
      state.clients = state.clients.filter(
        (client) => client.id !== deletedClientId
      );
      state.error = "";
      toast.error("Client has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export const {
  searchClients,
  updateClientUserOnStatusUpdate,
  updateClientUserOnUserAdd,
} = clientSlice.actions;
export default clientSlice.reducer;
