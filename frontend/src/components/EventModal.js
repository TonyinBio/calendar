import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

import Select from "react-select";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from '@mui/material/TextField';

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
	const {
		setShowEventModal,
		daySelected,
		dispatchCalEvent,
		selectedEvent,
		demos,
	} = useContext(GlobalContext);

	const [demoId, setDemoId] = useState(
		selectedEvent ? selectedEvent.demoId : ""
	);
	const [checkout, setCheckout] = useState(
		selectedEvent ? selectedEvent.checkout : daySelected
	);
	const [checkin, setCheckin] = useState(
		selectedEvent ? selectedEvent.checkin : daySelected.add(3, "day")
	);
	const [presenters, setPresenters] = useState(
		selectedEvent ? selectedEvent.presenters : ""
	);
	// const [selectedLabel, setSelectedLabel] = useState(
	//   selectedEvent
	//     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
	//     : labelsClasses[0]
	// );

  const timePickerProps = {
    required: true
  }

	function handleSubmit(e) {
		e.preventDefault();
		const calendarEvent = {
			// TODO: Might need to include demo bc when dispatchCalEvent, not saving the demo attr
			demoId,
			checkout,
			checkin,
			presenters,
			color: "indigo", // TODO: Add color logic
			...(selectedEvent && { id: selectedEvent.id }),
		};
		if (selectedEvent) {
			dispatchCalEvent({ type: "update", payload: calendarEvent });
		} else {
			dispatchCalEvent({ type: "push", payload: calendarEvent });
		}

		setShowEventModal(false);
	}
	return (
		<div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
			<form className="bg-white rounded-lg shadow-2xl w-1/4">
				<header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
					<span className="material-icons-outlined text-gray-400">
						drag_handle
					</span>
					<div>
						{selectedEvent && (
							<span
								onClick={() => {
									dispatchCalEvent({
										type: "delete",
										payload: selectedEvent,
									});
									setShowEventModal(false);
								}}
								className="material-icons-outlined text-gray-400 cursor-pointer"
							>
								delete
							</span>
						)}
						{/* TODO: Create auto closing of event modal */}
						<button onClick={() => setShowEventModal(false)}>
							<span className="material-icons-outlined text-gray-400">
								close
							</span>
						</button>
					</div>
				</header>
				<div className="p-3">
					<div className="grid grid-cols-1/5 items-end gap-y-7">
						<div></div>
						<input
							type="text"
							name="presenters"
							placeholder="Enter Presenters"
							value={presenters}
							required
							className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
							onChange={(e) => setPresenters(e.target.value)}
						/>
						<span className="material-icons-outlined text-gray-400">
							schedule
						</span>
						<p>{daySelected.format("dddd, MMMM DD")}</p>
						<span className="material-icons-outlined text-gray-400">
							segment
						</span>
						{/* <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            /> */}
						<Select
							options={demos.map((demo) => ({
								label: demo.title,
								value: demo.id,
							}))}
							onChange={(option) => setDemoId(option.value)}
              className="z-10"
              classNamePrefix="focus:outline-none focus:ring-0 focus:border-blue-500"
						/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								renderInput={(timePickerProps) => <TextField {...timePickerProps} />}
								label="Checkout"
								value={checkout}
								onChange={(checkoutDate) => {
									setCheckout(checkoutDate);
								}}
                className="col-span-2"
							/>
						</LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								renderInput={(timePickerProps) => <TextField {...timePickerProps} />}
								label="Checkin"
								value={checkin}
								onChange={(checkinDate) => {
									setCheckin(checkinDate);
								}}
                className="col-span-2"
							/>
						</LocalizationProvider>
            
						{/* <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div> */}
					</div>
				</div>
				<footer className="flex justify-end border-t p-3 mt-5">
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
					>
						Save
					</button>
				</footer>
			</form>
		</div>
	);
}
