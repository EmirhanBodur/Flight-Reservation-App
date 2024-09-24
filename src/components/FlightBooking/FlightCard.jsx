import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Modal, Box, Typography, Button } from "@mui/material";
import deltaPhoto from "../../assets/delta.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FlightCard = ({ flight, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccessOpen = () => setSuccessOpen(true);
  const handleSuccessClose = () => setSuccessOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/flights/delete", {
        data: { flightId: flight._id },
      });
      onDelete(flight._id);
      handleClose();
      handleSuccessOpen();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4 w-2/4 h-48 mx-auto relative">
      <button
        onClick={handleOpen}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
      >
        <FaTrash size={20} className="text-red-500 mb-5" />
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            You won't be able to revert this action!
          </Typography>
          <div className="mt-4 flex justify-end space-x-4">
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, delete it!
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={successOpen} onClose={handleSuccessClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" color="green">
            Flight deleted successfully!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSuccessClose}
            className="mt-4"
          >
            Close
          </Button>
        </Box>
      </Modal>

      <div className="flex items-center space-x-4">
        <img src={deltaPhoto} alt="Airline Logo" className="w-20 h-20" />
        <div>
          <p className="text-lg font-semibold">
            {new Date(flight.departureTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            –{" "}
            {new Date(flight.arrivalTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p className="text-sm text-gray-500">{flight.airline}</p>
        </div>
      </div>

      <div className="text-center">
        <div className="flex space-x-8 justify-center">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">{flight.route}</p>
            <a href="#" className="text-blue-500 text-sm">
              Flight Details
            </a>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Nonstop</p>
            <p className="text-sm text-gray-500">{flight.flightNumber}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">
              {flight.departureAirport} to {flight.arrivalAirport}
            </p>
            <p className="text-sm text-gray-500 mt-1">{flight.flightName}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="text-center border border-gray-300 rounded-md p-4">
          <p className="text-lg font-bold">$156</p>
          <p className="text-sm text-gray-500">Main</p>
        </div>
        <div className="text-center border border-gray-300 rounded-md p-4">
          <p className="text-lg font-bold">$204</p>
          <p className="text-sm text-gray-500">Comfort+</p>
        </div>
        <div className="text-center border border-gray-300 rounded-md p-4">
          <p className="text-lg font-bold">$386</p>
          <p className="text-sm text-gray-500">Delta One</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
