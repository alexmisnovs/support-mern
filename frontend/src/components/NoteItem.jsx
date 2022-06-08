import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
  const { user } = useSelector(state => state.auth);
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaf ? "gray" : "white",
        color: note.isStaf ? "white" : "gray",
      }}
    >
      <h4>Note from {note.isStaff ? <span>Staff</span> : user.name}</h4>
      <p>{note.text}</p>
      <div className="note-date">{new Date(note.createdAt).toLocaleString("en-GB")}</div>
    </div>
  );
};

export default NoteItem;
