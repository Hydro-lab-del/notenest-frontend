
import { useState, useRef, useEffect, useContext } from 'react';
import { NoteContext } from '../../Context/NoteContext';
import {
    Plus,
    X,
    CheckSquare,
    Type,
    Pin,
    Palette,
    Check,
    Clock,
    Calendar
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';

const NoteModal = ({ isOpen, onClose }) => {

    const { handleSaveNote, editingNote } = useContext(NoteContext);

    const [title, setTitle] = useState(editingNote?.title || "");
    const [content, setContent] = useState(editingNote?.content || '');
    const [type, setType] = useState(editingNote?.type || "NOTE");
    const [isPinned, setIsPinned] = useState(editingNote?.isPinned || false);
    const [items, setItems] = useState(editingNote?.items || []);
    const [bgColor, setBgColor] = useState(editingNote?.bgColor || 'bg-white');
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    const [reminderTime, setReminderTime] = useState(editingNote?.reminderTime || null);
    const [reminderRepeat, setReminderRepeat] = useState(editingNote?.reminderRepeat || 'NONE');
    const [showReminderPicker, setShowReminderPicker] = useState(false);

    const bgColorPickerRef = useRef(null);
    const reminderPickerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTitle(editingNote?.title || "");
            setContent(editingNote?.content || "");
            setType(editingNote?.type || "NOTE");
            setIsPinned(editingNote?.isPinned || false);
            setItems(editingNote?.items || []);
            setBgColor(editingNote?.bgColor || 'bg-white');
            setReminderTime(editingNote?.reminderTime || null);
            setReminderRepeat(editingNote?.reminderRepeat || 'NONE');
        }
    }, [isOpen, editingNote]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgColorPickerRef.current && !bgColorPickerRef.current.contains(event.target)) {
                setShowBgColorPicker(false);
            }
            if (reminderPickerRef.current && !reminderPickerRef.current.contains(event.target)) {
                setShowReminderPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getLaterToday = () => {
        const d = new Date();
        d.setHours(d.getHours() + 3);
        return d;
    };

    const getTomorrowMorning = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        d.setHours(9, 0, 0, 0);
        return d;
    };

    const getNextWeek = () => {
        const d = new Date();
        const day = d.getDay();
        const diff = (day === 0 ? 1 : 8 - day);
        d.setDate(d.getDate() + diff);
        d.setHours(9, 0, 0, 0);
        return d;
    };

    const toLocalISOString = (date) => {
        const tzoffset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
        return localISOTime;
    };

    const formatReminder = (timeStr, repeat) => {
        if (!timeStr) return "";
        const date = new Date(timeStr);
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const dateStr = date.toLocaleDateString(undefined, options);
        const repeatLabel = repeat && repeat !== 'NONE' ? ` (${repeat.toLowerCase()})` : '';
        return `📅 ${dateStr}${repeatLabel}`;
    };

    const AddItems = () => {
        setItems([...items, { text: '', completed: false }]);
    }

    const updateItems = (index, text) => {
        const newItems = [...items];
        newItems[index].text = text;
        setItems(newItems);
    }

    const removeItems = (index) => {
        setItems(items.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSaveNote({
            ...editingNote,
            title: title,
            content: type === 'TODO' ? '' : content,
            items: type === 'TODO' ? items : [],
            type: type,
            isPinned: isPinned,
            bgColor: bgColor,
            reminderTime: reminderTime,
            reminderRepeat: reminderRepeat,
        });
        onClose();
    };




    // Static map so Tailwind includes all bg classes at build time (prevents purging)
    const bgColorMap = {
        'bg-white': 'bg-white',
        'bg-red-50': 'bg-red-50',
        'bg-blue-50': 'bg-blue-50',
        'bg-green-50': 'bg-green-50',
        'bg-yellow-50': 'bg-yellow-50',
        'bg-purple-50': 'bg-purple-50',
        'bg-pink-50': 'bg-pink-50',
    };
    const resolvedBg = bgColorMap[bgColor] ?? 'bg-white';

    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/20 backdrop-blur-md '>

            <div className={`w-full max-w-lg rounded-xl shadow-2xl p-6 transition-colors duration-300 max-h-[95vh] overflow-y-auto ${resolvedBg}`}>

                <div className='flex items-center justify-between pt-4 pb-4 mb-4 '>
                    <div>
                        <h2 className='text-xl font-semibold'>
                            {editingNote ? "Edit Note" : "Create New Note"}
                        </h2>
                    </div>

                    <div>
                        <button
                            onClick={onClose}
                            className=" bg-red-600 rounded-full p-1"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='flex items-start flex-col  '>
                    <div className='w-full mb-4'>
                        <label className='text-sm uppercase font-semibold text-gray-400 mb-1'>TITLE</label>
                        <input
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full  border border-gray-200 p-2 rounded placeholder-gray-300 placeholder:text-xl placeholder:font-bold focus:ring-0 outline-none focus:border-gray-300 focus:shadow-xs'
                            placeholder='Note title...' />
                    </div>

                    <div className='w-full mb-4'>
                        <label className='uppercase text-gray-400 mb-1 font-semibold text-sm'>
                            {type === "TODO" ? "List Items" : " CONTENT"}
                        </label>

                        {type === "TODO" ?
                            (
                                <div className='relative flex flex-col max-h-70 '>
                                    <div className='space-y-3 overflow-y-auto custom-scrollbar flex-1 px-2 py-2'>
                                        {items.map((item, idx) => (
                                            <div className='w-full  flex items-center gap-2 group' key={idx}>
                                                <div className='size-1 bg-black rounded-full' />
                                                <input
                                                    type="text"
                                                    value={item.text}
                                                    onChange={(e) => { updateItems(idx, e.target.value) }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            AddItems();
                                                        }
                                                    }}
                                                    placeholder='Item text...'
                                                    className='text-gray-700 w-full placeholder-gray-300 border-none outline-none focus:ring-0 ' />

                                                <button
                                                    type='button'
                                                    onClick={() => { removeItems(idx) }}
                                                    className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all'
                                                >
                                                    <X className='size-3.5 ' />
                                                </button>
                                            </div>

                                        ))}
                                    </div>
                                    <div className='sticky bottom-0 bg-transparent mt-1 '>
                                        <button
                                            type='button'
                                            onClick={() => AddItems()}
                                            className=' w-full  py-2 flex items-center bg-gray-50 justify-center text-sm font-bold text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-all'>
                                            <Plus className='size-4' />
                                            Add Item
                                        </button>
                                    </div>
                                </div>

                            ) : (
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Start typing..."
                                />
                            )}

                    </div>

                    {reminderTime && (
                        <div className="flex items-center gap-2 px-3 py-1.5 mb-4 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100 self-start transition-all hover:bg-purple-100/80">
                            <span>{formatReminder(reminderTime, reminderRepeat)}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setReminderTime(null);
                                    setReminderRepeat('NONE');
                                }}
                                className="text-purple-400 hover:text-purple-700 rounded-full hover:bg-purple-200 p-0.5 transition-colors"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    )}

                    <div className='flex flex-wrap items-center  gap-4 w-full'>
                        <div className='flex items-center justify-center gap-2 bg-gray-50 p-1 rounded-xl' >
                            <button
                                onClick={() => { setType("NOTE") }}
                                className={`p-2 rounded-lg   transition-all  duration-300
                                    ${type === "NOTE"
                                        ? "bg-white shadow-sm  text-blue-600"
                                        : "text-gray-400 hover:text-gray-900"} `}
                                type="button">
                                <Type className='size-5 ' />
                            </button>

                            <button
                                onClick={() => { setType("TODO") }}
                                className={`p-2 rounded-lg  transition-all  duration-300
                                    ${type === "TODO"
                                        ? "bg-white shadow-sm  text-blue-600"
                                        : "text-gray-400 hover:text-gray-900"} `}
                                type="button">
                                <CheckSquare className="size-5 " />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-gray-400 border transition-all
                                ${isPinned
                                    ? "bg-yellow-500/10 border-yellow-200 text-yellow-700"
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                            type="button"
                        >
                            <Pin className={`size-4 ${isPinned
                                ? "fill-current" : ''}
                            `} />

                            <span className='text-sm font-medium'>Pin Note</span>
                        </button>

                        <div className='relative' ref={bgColorPickerRef}>
                            <button
                                type="button"
                                onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                                className={`p-2 rounded-xl border transition-all ${showBgColorPicker
                                    ? 'bg-gray-100 border-gray-300 text-gray-700'
                                    : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                                title="Note Color"
                            >
                                <Palette className="size-5" />
                            </button>
                            {showBgColorPicker && (
                                <div
                                    className='absolute bottom-full left-0 
                                mb-3 p-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-wrap w-35 sm:w-auto sm:flex-nowrap gap-1.5 z-20'>
                                    {[
                                        {
                                            class: 'bg-white',
                                            name: 'Default'
                                        },
                                        {
                                            class: 'bg-red-50',
                                            name: 'Red'
                                        },
                                        {
                                            class: 'bg-blue-50',
                                            name: 'Blue'
                                        },
                                        {
                                            class: 'bg-green-50',
                                            name: 'Green'
                                        },
                                        {
                                            class: 'bg-yellow-50',
                                            name: 'Yellow'
                                        },
                                        {
                                            class: 'bg-purple-50',
                                            name: 'Purple'
                                        },
                                        {
                                            class: 'bg-pink-50',
                                            name: 'Pink'
                                        },
                                    ].map(color => (
                                        <button
                                            type="button"
                                            key={color.class}
                                            onClick={() => {
                                                setBgColor(color.class)
                                                setShowBgColorPicker(false)
                                            }}
                                            className={`size-6 rounded-full border transition-transform hover:scale-110 
                                            ${color.class} ${bgColor === color.class
                                                    ? "ring-2 ring-blue-500 ring-offset-2 border-transparent"
                                                    : "border-gray-200"
                                                }`}
                                            title={color.name}
                                        />


                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='relative' ref={reminderPickerRef}>
                            <button
                                type="button"
                                onClick={() => setShowReminderPicker(!showReminderPicker)}
                                className={`p-2 rounded-xl border transition-all ${showReminderPicker
                                    ? 'bg-gray-100 border-gray-300 text-gray-700'
                                    : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                                title="Reminder"
                            >
                                <Clock className="size-5" />
                            </button>
                            {showReminderPicker && (
                                <div className="absolute bottom-full left-0 mb-3 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 z-20 flex flex-col gap-3 text-left">
                                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                                        <Clock className="size-4 text-purple-600" />
                                        Set Reminder
                                    </h4>
                                    
                                    <div className="flex flex-col gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReminderTime(getLaterToday());
                                                setShowReminderPicker(false);
                                            }}
                                            className="text-xs text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-700 transition-colors"
                                        >
                                            Later Today (+3h)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReminderTime(getTomorrowMorning());
                                                setShowReminderPicker(false);
                                            }}
                                            className="text-xs text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-700 transition-colors"
                                        >
                                            Tomorrow Morning (9:00 AM)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReminderTime(getNextWeek());
                                                setShowReminderPicker(false);
                                            }}
                                            className="text-xs text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-700 transition-colors"
                                        >
                                            Next Week (Mon 9:00 AM)
                                        </button>
                                    </div>
                                    
                                    <div className="border-t border-gray-100 my-1" />
                                    
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-semibold text-gray-400 uppercase">Custom Date/Time</label>
                                        <input
                                            type="datetime-local"
                                            value={reminderTime ? toLocalISOString(new Date(reminderTime)) : ""}
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    setReminderTime(new Date(e.target.value));
                                                }
                                            }}
                                            className="w-full text-xs border border-gray-200 rounded-lg p-2 outline-none focus:border-purple-300"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-semibold text-gray-400 uppercase">Repeat</label>
                                        <select
                                            value={reminderRepeat}
                                            onChange={(e) => setReminderRepeat(e.target.value)}
                                            className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white outline-none focus:border-purple-300"
                                        >
                                            <option value="NONE">Does not repeat</option>
                                            <option value="DAILY">Daily</option>
                                            <option value="WEEKLY">Weekly</option>
                                            <option value="MONTHLY">Monthly</option>
                                        </select>
                                    </div>

                                    {reminderTime && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReminderTime(null);
                                                setReminderRepeat('NONE');
                                                setShowReminderPicker(false);
                                            }}
                                            className="mt-1 w-full py-1.5 text-center text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                        >
                                            Clear Reminder
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <Check className="w-5 h-5" />
                            {editingNote ? 'Update Note' : 'Save Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteModal
