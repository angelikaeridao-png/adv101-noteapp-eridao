import React from "react";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function Notelitem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-orange-200/80 rounded-3xl p-6 shadow-lg shadow-orange-500/5 hover:border-orange-300 transition-all flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-extrabold text-orange-950 mb-2">{note.title}</h3>
        <p className="text-slate-600 text-sm whitespace-pre-wrap mb-6 leading-relaxed">{note.description}</p>
      </div>
      <div className="flex items-center space-x-3 pt-4 border-t border-orange-100">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors border border-orange-200/60"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors border border-rose-200/60"
        >
          Delete
        </button>
      </div>
    </div>
  );
}