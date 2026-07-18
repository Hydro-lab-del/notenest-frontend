import Masonry from "react-masonry-css";
import { Search } from 'lucide-react';
import NoteCard from '../Note/NoteCard';
import { useContext, useEffect, useMemo } from "react";
import { NoteContext } from "../../Context/NoteContext";
import EmptyTrashInline from "../EmptyTrashInLine";

const NotesGrid = ({ view }) => {

    const {
        notes,
        loading,
        hasMore,
        lastNoteElementRef,
        searchQuery,
        setSearchQuery,
        handleEmptyTrash,
        setView,
    } = useContext(NoteContext);

    useEffect(() => {
        setView(view); // Tell context we are now in "favorites" or "trash"
    }, [view, setView]);




    const displayNotes = useMemo(() => {
        return [...notes].sort((a, b) => {
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
        })
    }
        , [notes]);



    const breakpointColumn = {
        default: 4,
        1280: 3,
        960: 2,
        500: 1
    };

    return (
        <div className='flex-1 min-h-screen overflow-y-auto p-6 md:p-10 custom-scrollbar scroll-smooth'>

            <div className='max-w-400 mx-auto '>
                {view === "trash" && notes.length > 0 && (
                    <div className="flex items-center justify-between bg-amber-50/60 border border-amber-100 rounded-xl px-4 py-3 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-amber-500 text-sm">⚠️</span>
                            <p className="text-xs font-medium text-amber-800">
                                Want to clear space? You can permanently wipe everything out right now.
                            </p>
                        </div>
                        <EmptyTrashInline onEmpty={handleEmptyTrash} />
                    </div>
                )}
                <Masonry
                    breakpointCols={breakpointColumn}
                    className='my-mansory-grid'
                    columnClassName='my-mansory-grid_column'
                >
                    {displayNotes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}

                        />
                    ))}
                </Masonry>




                {/* Empty State */}
                {notes.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Search className="size-12 text-gray-200 mb-4 animate-bounce" />
                        <p className="text-gray-500 font-medium">No notes found</p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-2 text-blue-500 text-sm hover:underline"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

                {/* Infinite Scroll Observer Trigger */}
                <div ref={lastNoteElementRef} className="h-20 w-full flex items-center justify-center">
                    {loading && <p className="text-gray-400 text-sm">Loading more notes...</p>}
                    {!hasMore && notes.length > 0 && (
                        <p className="text-gray-400 italic font-light text-sm">You've reached the end of your nest 🏁</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesGrid;