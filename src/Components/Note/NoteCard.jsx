import { memo, useState, useContext } from "react";
import { formatDistanceToNow, differenceInDays } from 'date-fns';
import NoteMenuPanel from '../Note/NoteMenuPanel';
import DOMPurify from 'dompurify';

import {
  Pin,
  Edit,
  MoreVertical,
  Trash2,
  CheckSquare,
  FileText,
  HeartPlus,
  RotateCcw,
  Clock
} from 'lucide-react';


import { NoteContext } from "../../Context/NoteContext";

const NoteCard = memo(({ note }) => {

  const { handleToggleTodo, handleTogglePin, handleDelete, handleRestore, handleEditNote, handleToggleIsArchived, view } = useContext(NoteContext);

  const [showMenu, setShowMenu] = useState(false);

  const isTodo = note.type === 'TODO';
  const isPinned = note.isPinned;
  const isArchived = note.isArchived;

  const getIcon = () => {
    switch (note.type) {
      case 'TODO': return <CheckSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };



  const bgColorMap = {
    'bg-white': 'bg-white',
    'bg-red-50': 'bg-red-50',
    'bg-blue-50': 'bg-blue-50',
    'bg-green-50': 'bg-green-50',
    'bg-yellow-50': 'bg-yellow-50',
    'bg-purple-50': 'bg-purple-50',
    'bg-pink-50': 'bg-pink-50',
  };
  const cardBg = bgColorMap[note.bgColor] ?? (isPinned ? 'bg-yellow-50' : 'bg-white');

  return (
    <div
      className={`group p-6 rounded-2xl mb-6 border transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 inner-shadow 
      ${cardBg} 
      ${isPinned ? 'bg-yellow-100 border-yellow-200 shadow-yellow-100/50' : 'border-gray-100 hover:border-gray-200'}`
      }>

      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-2'>
          {/* Dynamic Pin Tag */}
          {isPinned && (
            <span className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-yellow-700 bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-200'>
              <Pin className='size-3 fill-current' /> Pinned
            </span>
          )}
          <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200'>
            {note.type}
          </span>


          {view !== 'trash' && (

            <button
              onClick={() => { handleToggleIsArchived(note._id) }}
              className={`p-1.5 rounded-lg transition-colors
               ${isArchived
                  ? "text-amber-300 hover:text-gray-400 "
                  : "text-gray-400 hover:text-amber-300"
                }`}
            >
              <HeartPlus
                className={`size-4 transition-colors
                ${isArchived
                    ? "fill-amber-300 hover:fill-transparent"
                    : "fill-transparent hover:fill-amber-300"
                  }`}
              />

            </button>
          )}



        </div>

        <div className='relative'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className='text-gray-400 p-1.5 hover:bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <MoreVertical className='size-4' />
          </button>

          {showMenu && (
            <NoteMenuPanel
              width="w-36"
              onClose={() => setShowMenu(false)}
              position="absolute top-full right-0 mt-1"
            >
              <button
                onClick={() => { handleTogglePin(note._id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Pin className="size-3.5" /> {note.isPinned ? 'Unpin' : 'Pin'}
              </button>

              <button
                onClick={() => { handleEditNote(note); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Edit className="size-3.5" /> Edit
              </button>

              <div className="h-px bg-gray-100 my-1" /> {/* Small divider */}

              {view === 'trash' ?
                (
                  <div className="flex items-center justify-center mx-1">

                    <button
                      onClick={() => { handleDelete(note._id); setShowMenu(false); }}
                      className="w-full flex items-center gap-2 px-1  py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </button>

                    <button
                      onClick={() => { handleRestore(note._id); setShowMenu(false); }}
                      className="w-full flex items-center gap-2 px-1 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      <RotateCcw className="size-3.5" /> Restore
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { handleDelete(note._id); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3  py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                )
              }
            </NoteMenuPanel>
          )}
        </div>
      </div>

      {/* DYNAMIC HEADING */}
      <h3 className={`text-[1.05rem] font-bold mb-2 leading-snug
        ${isPinned ? 'text-yellow-900'
          : 'text-gray-900'}`}>
        {note.title}
      </h3>

      {/* DYNAMIC CONTENT (TODO vs PROSE) */}
      {isTodo ? (
        <div className='space-y-2 mb-4'>
          {note.items?.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleTodo(note._id, index)}
                className='peer size-4 rounded border border-gray-300 bg-white cursor-pointer accent-blue-600'
              />
              <span
                onClick={() => handleToggleTodo(note._id, index)}
                className={`text-sm cursor-pointer select-none
               ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          <div
            className="text-gray-500 text-sm leading-relaxed mb-4 prose-content "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(note.content || '', {
                ALLOWED_TAGS: [
                  'p', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'a',
                  'span', 'u', 'blockquote', 'mark'],
                ALLOWED_ATTR: ['style', 'href', 'target', 'class']
              })
            }}
          />
        </div>
      )}

      {/* Reminder Chip */}
      {note.reminderTime && (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 mb-3 text-[11px] font-semibold rounded-full border w-fit
          ${(() => {
            const rTime = new Date(note.reminderTime);
            const now = new Date();
            if (note.reminderNotified || note.reminderTriggered) {
              return 'bg-gray-50 text-gray-500 border-gray-200';
            } else if (rTime < now) {
              return 'bg-red-50 text-red-700 border-red-100';
            } else {
              return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            }
          })()}
        `}>
          <Clock className="size-3" />
          <span>
            {(() => {
              const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
              const dateStr = new Date(note.reminderTime).toLocaleDateString(undefined, options);
              const repeatLabel = note.reminderRepeat && note.reminderRepeat !== 'NONE' 
                ? ` (${note.reminderRepeat.toLowerCase()})` 
                : '';
              return `${dateStr}${repeatLabel}`;
            })()}
          </span>
        </div>
      )}

      {/* FOOTER */}
      <div className='flex items-center justify-between border-t border-black/5 mt-auto pt-4 '>
        <span className='text-[11px] font-medium text-gray-400'>
          {formatDistanceToNow(new Date(note.updatedAt || note.createdAt), { addSuffix: true })}
        </span>

        {view === 'trash' && note.deletedAt && (
            <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              {Math.max(0, 30 - differenceInDays(new Date(), new Date(note.deletedAt)))} days left
            </span>
        )}

        <div className={`p-1.5 rounded-lg flex items-center justify-between
          ${isPinned ? 'text-yellow-700 bg-yellow-200/50'
            : ' bg-gray-50 text-gray-400'}`}>

          {

            getIcon()
          }
        </div>
      </div>


      
    </div>
  );
});


export default NoteCard;



