"use client";

import React, { useState, useEffect } from "react";
import Notelitem from "./components/NoteItem";

interface Note {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      localStorage.removeItem("notes");
    }
  }, [notes]);

  useEffect(() => {
    const trimmedTitle = title.trim().toLowerCase();
    if (!trimmedTitle) {
      setIsDuplicate(false);
      return;
    }
    const duplicateExists = notes.some(
      (note) => note.title.trim().toLowerCase() === trimmedTitle && note.id !== editingId
    );
    setIsDuplicate(duplicateExists);
  }, [title, notes, editingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingId) {
      setNotes(
        notes.map((note) =>
          note.id === editingId ? { ...note, title, description } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        description,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setDescription("");
    setIsDuplicate(false);
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setIsDuplicate(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 tracking-tight mb-3">
            Note Application
          </h1>
          <p className="text-indigo-200 text-base font-medium">
            Organize your thoughts and manage your notes efficiently
          </p>
        </header>

        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-indigo-500/30 p-8 sm:p-10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingId ? "Update Note" : "Create New Note"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-indigo-200 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white text-sm transition-all font-medium placeholder-slate-500"
              />
              {isDuplicate && (
                <p className="text-amber-400 text-xs mt-2 font-semibold">
                  Warning: A note with this title already exists.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-indigo-200 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your note description here..."
                rows={4}
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white text-sm transition-all resize-y font-medium placeholder-slate-500"
              />
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/30"
              >
                {editingId ? "Update Note" : "Add Note"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-800 hover:bg-slate-700 text-indigo-200 font-bold text-sm py-3.5 px-8 rounded-2xl transition-all border border-indigo-500/30"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">
            All Notes ({notes.length})
          </h2>
          {notes.length > 0 && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white text-sm w-full sm:w-72 font-medium placeholder-slate-500 shadow-sm"
            />
          )}
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-indigo-500/20 p-16 text-center shadow-xl">
            <p className="text-slate-400 font-medium text-base">No notes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredNotes.map((note) => (
              <Notelitem
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}