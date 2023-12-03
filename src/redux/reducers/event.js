import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
  error: null,
  event: null,
  allEvents: [],
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all events of a shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // delete event of a shop
  deleteEventRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
    state.events = state.events.filter(
      (event) => event._id !== action.payload.deletedEvent._id
    );
  },
  deleteEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  // get all events
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAllEventsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
    state.success = false;
  },
});
