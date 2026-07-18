import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import toast from 'react-hot-toast';
import api from '../utils/api';
import { AuthContext } from "../Context/AuthContext.js";
import { NoteContext } from "./NoteContext.js";
import { NotificationContext } from "./NotificationContext.js";

const NoteProvider = ({ children }) => {

    const { accessToken } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext);

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const [view, setView] = useState('all');

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);


    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceSearch(searchQuery);
        }, 400);
        return () => {
            clearTimeout(handle)
        }
    }, [searchQuery])

    const fetchNotes = useCallback(async (pageNum, query, view = "all") => {
        // ALLOW the fetch if it's page 1 (even if hasMore is false)
        if (loadingRef.current || !accessToken) return;
        if (pageNum > 1 && !hasMoreRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            let url = '/api/v1/notes';

            const response = await api.get(url, {
                params: {
                    page: pageNum,
                    limit: 12,
                    search: query,
                    view: view
                },
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const { notes: newNotes, totalPages } = response.data.data;
            const normalizedNotes = newNotes.map(note => ({
                ...note,
                bgColor: note.bgColor || 'bg-white'
            }))
            setNotes(prev => (pageNum === 1 ? normalizedNotes : [...prev, ...normalizedNotes]));

            const nextHasMore = pageNum < totalPages;
            hasMoreRef.current = nextHasMore;
            setHasMore(nextHasMore);

        } catch (error) {
            if (error.response?.status === 404) {
                setNotes([]);
                hasMoreRef.current = false;
                setHasMore(false);
            } else {
                toast.error("Error fetching notes");
            }
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        setPage(1);
        hasMoreRef.current = true;
        setHasMore(true);
        // When view or search changes, we reset notes so the screen clears immediately
        setNotes([]);
    }, [debounceSearch, view]);

    useEffect(() => {
        // Only fetch if we have an accessToken
        if (accessToken) {
            fetchNotes(page, debounceSearch, view);
        }
    }, [page, debounceSearch, view, fetchNotes, accessToken]);


    const handleToggleTodo = async (noteId, itemIndex) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => {
                if (note._id === noteId) {
                    const updatedItems = [...note.items];
                    updatedItems[itemIndex].completed = !updatedItems[itemIndex].completed;
                    return { ...note, items: updatedItems };
                }
                return note;
            })
        );
        try {
            await api.patch(`/api/v1/notes/toggle-todo/${noteId}/${itemIndex}`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } })

            toast.success("item status updated");
        } catch (error) {
            console.error("Failed to toggle todo:", error);
            toast.error("Could not sync with server");

        }
    }
    //--------- handleTogglePin ----
    const handleTogglePin = async (noteId) => {
        const noteToToggle = notes.find((note) => note._id === noteId);
        const title = noteToToggle?.title || "Untitled Note";
        const wasPinned = noteToToggle?.isPinned;

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
            )
        );

        try {
            await api.patch(`/api/v1/notes/pin/${noteId}`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } })

            toast.success("Note status updated");
            addNotification({
                type: 'INFO',
                title: wasPinned ? 'Note Unpinned' : 'Note Pinned',
                message: `“${title}” was ${wasPinned ? 'unpinned' : 'pinned'}`
            });
        } catch (error) {
            console.error("Failed to toggle Pin:", error);
            toast.error("Could not sync with server");

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
                )
            );
        }
    };
    //--------- handleToggleIsArchived ----
    const handleToggleIsArchived = async (noteId) => {
        const noteToToggle = notes.find((note) => note._id === noteId);
        const title = noteToToggle?.title || "Untitled Note";
        const wasArchived = noteToToggle?.isArchived;

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === noteId ? { ...note, isArchived: !note.isArchived } : note
            )
        );

        try {
            await api.patch(`/api/v1/notes/favorite/${noteId}`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } });

            // Success
            addNotification({
                type: 'INFO',
                title: wasArchived ? 'Note Unarchived' : 'Note Archived',
                message: `“${title}” was ${wasArchived ? 'removed from' : 'added to'} archive`
            });
        } catch (error) {
            console.error("Failed :", error);
            toast.error("Could not sync with server");

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === noteId ? { ...note, isArchived: !note.isArchived } : note
                )
            );
        }
    };

    //--------- handleDelete ----
    const handleDelete = async (noteId) => {
        // 1. Find and store the specific note being deleted in case we need to restore it
        const noteToRestore = notes.find((note) => note._id === noteId);
        if (!noteToRestore) return;

        const title = noteToRestore.title || "Untitled Note";

        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));

        try {
            if (view === 'trash') {
                await api.delete(`/api/v1/notes/delete-permanent/${noteId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                toast.success("Note permanently deleted");
                addNotification({
                    type: 'SUCCESS',
                    title: 'Note Deleted Permanently',
                    message: `“${title}” was permanently deleted`
                });
            } else {
                await api.patch(`/api/v1/notes/trash/${noteId}`, null, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                toast.success("Note moved to trash");
                addNotification({
                    type: 'WARNING',
                    title: 'Note Moved to Trash',
                    message: `“${title}” was moved to trash`
                });
            }
        } catch (error) {
            console.error("Failed to delete note:", error);
            toast.error("Could not sync with server");

            setNotes((prevNotes) => {

                if (prevNotes.some((note) => note._id === noteId)) return prevNotes;
                return [...prevNotes, noteToRestore];
            });
        }
    };

    const handleRestore = async (noteId) => {
        const noteToRollback = notes.find((note) => note._id === noteId);
        if (!noteToRollback) return;

        const title = noteToRollback.title || "Untitled Note";

        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId))
        try {
            await api.put(`/api/v1/notes/restore/${noteId}`,
                null,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }

            )
            toast.success("Note restored successfully");
            addNotification({
                type: 'SUCCESS',
                title: 'Note Restored',
                message: `“${title}” was restored to notes`
            });
        } catch (error) {
            console.error("Failed to restore note:", error);
            toast.error("Could not sync with server");

            setNotes((prevNotes) => {
                if (prevNotes.some((note) => note._id === noteId)) return prevNotes;
                return [...prevNotes, noteToRollback];
            });
        }
    }

    const handleSetReminder = async (noteId, reminderTime, reminderRepeat) => {
        try {
            const response = await api.patch(`/api/v1/notes/reminder/${noteId}`,
                { reminderTime, reminderRepeat },
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }
            );

            const updatedNote = response.data.data;
            setNotes((prevNotes) => prevNotes.map((note) => note._id === noteId ? { ...note, ...updatedNote } : note));
            
            if (editingNote && editingNote._id === noteId) {
                setEditingNote(prev => prev ? { ...prev, ...updatedNote } : null);
            }

            toast.success(reminderTime ? "Reminder set successfully" : "Reminder removed");
        } catch (error) {
            console.error("Failed to set reminder:", error);
            toast.error(error.response?.data?.message || "Could not set reminder");
        }
    };

    const handleSaveNote = async (savedNote) => {
        const noteId = savedNote._id || (editingNote ? editingNote._id : null)


        try {
            if (noteId) {

                // axios here patch put

                const response = await api.patch(`/api/v1/notes/${noteId}`,
                    { ...savedNote, bgColor: savedNote.bgColor || 'bg-white' },
                    {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    }
                );

                const updatedNote = response.data.data.updatedNote;

                setNotes((prevNotes) => prevNotes.map((note) => note._id === noteId ? updatedNote : note))

                toast.success("Note updated");
                addNotification({
                    type: 'INFO',
                    title: 'Note Updated',
                    message: `“${updatedNote.title || 'Untitled'}” was updated`
                });

            } else {


                const response = await api.post('/api/v1/notes/',
                    { ...savedNote, bgColor: savedNote.bgColor || 'bg-white' },
                    {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    }
                );

                const note = response.data.data.note;
                setNotes(prevNotes => [note, ...prevNotes]);

                toast.success("Note saved");
                addNotification({
                    type: 'SUCCESS',
                    title: 'Note Created',
                    message: `“${note.title || 'Untitled'}” was created`
                });
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setEditingNote(null);
            setIsModalOpen(false);
        }
    };
    
    const handleEmptyTrash = async () => {
        const fallBackNotes = [...notes];

        // 1. Add a temporary "isWiping" property to all trashed notes in state
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.isTrashed ? { ...note, isWiping: true } : note
            )
        );

        // 2. Wait 300ms for the CSS exit transitions to finish playing on screen
        await new Promise((resolve) => setTimeout(resolve, 300));

        // 3. Now clear them out of the UI completely
        setNotes((prevNotes) => prevNotes.filter((note) => !note.isTrashed));

        try {
            await api.delete('/api/v1/notes/trash/empty', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("Trash emptied successfully");
            addNotification({
                type: 'SUCCESS',
                title: 'Trash Emptied',
                message: 'All notes in trash were permanently deleted'
            });
        } catch (error) {
            console.error("Failed to empty trash:", error);
            setNotes(fallBackNotes); // Graceful rollback
            toast.error("Failed to sync with server.");
        }
    };

    const handleEditNote = useCallback((note) => {
        if (view === 'trash') {
            toast.error("Please restore the note first");

        } else {

            setEditingNote(note);
            setIsModalOpen(true);
        }
    }, [view]);

    const openNoteModal = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    //observer
    const observer = useRef();

    const lastNoteElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && notes.length > 0) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, notes.length]);




    return (
        <NoteContext.Provider
            value={{
                notes,
                setNotes,
                loading,
                hasMore,
                searchQuery,
                setSearchQuery,
                handleToggleTodo,
                handleTogglePin,
                handleToggleIsArchived,
                handleDelete,
                handleRestore,
                lastNoteElementRef,
                handleSaveNote,
                handleSetReminder,
                isModalOpen,
                setIsModalOpen,
                editingNote,
                setEditingNote,
                handleEditNote,
                handleEmptyTrash,
                openNoteModal,
                fetchNotes,
                view,
                setView
            }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider
