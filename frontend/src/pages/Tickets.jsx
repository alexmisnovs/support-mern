import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { getTickets, reset } from "../features/tickets/ticketSlice";

import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { isLoading, isError, isSuccess, message, tickets } = useSelector(state => state.ticket);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
        </div>
        {tickets.map(ticket => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
