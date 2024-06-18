import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import CalendarDataService from "../services/calendar.service"

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      CalendarDataService.createEvent(payload)
      return [...state, payload];
    case "update":
      CalendarDataService.updateEvent(payload)
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      CalendarDataService.deleteEvent(payload.id)
      return state.filter((evt) => evt.id !== payload.id);
    case "load": 
      return payload
    default:
      throw new Error();
  }
}
// function initEvents() {
//   return CalendarDataService.getEvents()
//     .then(res => {
//       return res.data
//     })
//     .catch(e => {console.log(e)});
// }

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [demos, setDemos] = useState([])
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    // initEvents
  );

  // Load Events
  useEffect(() => {
    CalendarDataService.getEvents()
      .then(res => {
        dispatchCalEvent({
          type: "load",
          payload: res.data
        })
      })
  }, [])

  // Get events with labels checked
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.demo.title)
    );
  }, [savedEvents, labels]);

  // Load demos
  useEffect(() => {
    CalendarDataService.getAvailableDemos("")
    .then(res => {
      setDemos(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  // }, [savedEvents]);

  // Create labels
  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.demo.title))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  // NEED TO UPDATE
  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        demos
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
