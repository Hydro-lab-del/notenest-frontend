import { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NoteContext } from '../Context/NoteContext';
import { NotificationContext } from '../Context/NotificationContext';
import {
  User,
  Mail,
  Calendar,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Trash2,
  Palette,
  FileText,
  Heart,
  CheckSquare,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import Avatar from '../Components/Avatar';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { notes } = useContext(NoteContext);
  const { addNotification } = useContext(NotificationContext);

  // States for interactive parts
  const [activeTab, setActiveTab] = useState('details'); // details, preferences, security


  // States for change password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Stats computation
  const stats = useMemo(() => {
    const total = notes.length;
    const favorites = notes.filter((n) => n.isArchived).length; // isArchived is used for favorites
    const pinned = notes.filter((n) => n.isPinned).length;
    const todos = notes.filter((n) => n.type === 'TODO');
    const totalTodos = todos.reduce((acc, t) => acc + (t.items?.length || 0), 0);
    const completedTodos = todos.reduce(
      (acc, t) => acc + (t.items?.filter((i) => i.completed).length || 0),
      0
    );

    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return {
      total,
      favorites,
      pinned,
      todoNotesCount: todos.length,
      completionRate,
      completedTodos,
      totalTodos
    };
  }, [notes]);



  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setChangingPassword(true);
    // Simulate API call
    setTimeout(() => {
      setChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password updated successfully!');
      addNotification({
        type: 'SECURITY',
        title: 'Password Updated',
        message: 'Your account password has been changed successfully'
      });
    }, 1500);
  };





  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans transition-all duration-300">
      {/* Top Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-500/10 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
          {/* Avatar Container */}
          
          <Avatar/>

          {/* User Details */}
          <div className="text-center md:text-left space-y-2 mt-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{user?.name || 'Nest User'}</h1>
              {user?.isEmailVerified ? (
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="size-3.5" /> Verified Account
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-400/30 text-amber-300 px-2.5 py-0.5 rounded-full">
                  <ShieldAlert className="size-3.5" /> Unverified
                </span>
              )}
            </div>

            <p className="text-white/80 font-medium text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
              <Mail className="size-4 text-indigo-200" /> {user?.email || 'user@example.com'}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-white/60 pt-2">
              <Calendar className="size-3.5" />
              <span>Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'June 2026'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side: Stats and Tabs Navigation */}
        <div className="lg:col-span-1 space-y-6">

          {/* Quick Stats Overview */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-500" /> Stats Overview
            </h3>

            <div className="space-y-4">
              {/* Stat Item */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100/60 text-blue-600 rounded-lg">
                    <FileText className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Total Notes</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.total}</span>
              </div>

              {/* Stat Item */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100/60 text-red-600 rounded-lg">
                    <Heart className="size-4 fill-red-500/20" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Favorites</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.favorites}</span>
              </div>

              {/* Stat Item */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100/60 text-purple-600 rounded-lg">
                    <CheckSquare className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">To-do Completion</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{stats.completionRate}%</span>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {stats.completedTodos}/{stats.totalTodos} tasks
                  </p>
                </div>
              </div>
            </div>

            {/* Todo completion visual progress bar */}
            {stats.totalTodos > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-50">
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                  <span>Task Tracker</span>
                  <span>{stats.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.completionRate}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-2.5 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('details')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl font-semibold text-sm transition-all
                ${activeTab === 'details'
                  ? 'bg-blue-50 text-blue-600 shadow-xs'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <User className="size-4.5" />
                <span>Account Info</span>
              </div>
              <ChevronRight className={`size-4 transition-transform ${activeTab === 'details' ? 'translate-x-0.5' : ''}`} />
            </button>



            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl font-semibold text-sm transition-all
                ${activeTab === 'security'
                  ? 'bg-blue-50 text-blue-600 shadow-xs'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <Lock className="size-4.5" />
                <span>Security Settings</span>
              </div>
              <ChevronRight className={`size-4 transition-transform ${activeTab === 'security' ? 'translate-x-0.5' : ''}`} />
            </button>
          </div>

        </div>

        {/* Right Side: Tab Panel Content */}
        <div className="lg:col-span-2">

          {/* Account Details Tab */}
          {activeTab === 'details' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Account Information</h2>
                <p className="text-sm text-gray-500">Your profile details and registered information.</p>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase">Username</span>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-700">
                    {user?.name || 'Nest User'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase">Email Address</span>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-700">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase">Account ID</span>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl font-mono text-xs text-gray-500 break-all select-all">
                    {user?.id || user?._id || 'Unavailable'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase">Email Status</span>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded-xl font-semibold text-gray-700">
                    {user?.isEmailVerified ? (
                      <>
                        <ShieldCheck className="size-5 text-emerald-500" />
                        <span className="text-emerald-700 text-sm">Verified Email Inbox</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="size-5 text-amber-500 animate-bounce" />
                        <span className="text-amber-700 text-sm">Pending Verification</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 border border-blue-100/50 p-4 rounded-2xl text-blue-700 text-xs leading-relaxed mt-4">
                <Info className="size-4.5 shrink-0 text-blue-500 mt-0.5" />
                <p>
                  Avatars are generated dynamically based on your username.
                </p>
              </div>
            </div>
          )}



          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Security Settings</h2>
                <p className="text-sm text-gray-500">Manage password configurations and access credentials.</p>
              </div>

              <div className="h-px bg-gray-100" />

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-blue-100 outline-none text-sm placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Minimum 8 characters"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-blue-100 outline-none text-sm placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-type new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-blue-100 outline-none text-sm placeholder-gray-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="mt-2 px-6 py-2.5 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Lock className="size-4" />
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;
