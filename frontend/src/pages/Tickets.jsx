import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { getTickets, reset } from "../features/tickets/ticketSlice";

import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";

const Tickets = () => {
  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, isSuccess, message, tickets } = useSelector(state => state.ticket);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       dispatch(reset());
  //     }
  //   };
  // }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      Tickets
    </>
  );
};

export default Tickets;
