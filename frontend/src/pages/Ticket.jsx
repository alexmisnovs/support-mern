import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset, createNote } from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import NoteItem from "../components/NoteItem";

// Modal styles
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(state => state.ticket);
  const { isLoading: notesIsLoading, notes } = useSelector(state => state.note);
  const dispatch = useDispatch();

  // local state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
        dispatch(notesReset());
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
  // Modal functions
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onNoteSubmit = e => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    console.log("Submitted");
    closeModal();
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
        {notes.length > 0 ? <h2>Replies:</h2> : <h2>No replies yet</h2>}
      </header>
      {ticket.status !== "closed" ? (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Reply
        </button>
      ) : (
        ""
      )}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Reply"
      >
        <h2>Add a reply</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Add your reply here"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
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
