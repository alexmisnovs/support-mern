import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import NoteItem from "../components/NoteItem";

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(state => state.ticket);
  const { isLoading: notesIsLoading, notes } = useSelector(state => state.note);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/tickets"} />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-GB")}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>{ticket.product}</h3>
        </div>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes:</h2>
      </header>
      {notes.map(note => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
