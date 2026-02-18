import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";

const EventCard = ({ event }) => (
  <div className="card bg-base-100 shadow-sm hover:shadow-2xl transition-all duration-300 border border-base-content/5 group overflow-hidden">
    <div className="h-40 bg-primary/5 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-500"></div>
      <Calendar className="w-16 h-16 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
      <div className="absolute top-4 left-4">
        <div className="badge badge-primary font-bold shadow-sm">{event.category}</div>
      </div>
    </div>
    <div className="card-body p-6">
      <h2 className="card-title text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
        {event.title}
      </h2>
      <p className="text-sm opacity-60 line-clamp-2 leading-relaxed">
        {event.description}
      </p>
      
      <div className="space-y-3 mt-6 pt-4 border-t border-base-content/5">
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="p-2 bg-base-200 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <span>{new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="p-2 bg-base-200 rounded-lg group-hover:bg-primary/10 transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      <div className="card-actions justify-end mt-6">
        <Link to={`/events/${event.id}`} className="btn btn-ghost btn-sm font-bold flex gap-1 group-hover:bg-primary group-hover:text-primary-content transition-all rounded-lg">
          View Event <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events");
        const eventsData = response.data.results || [];
        const sortedEvents = eventsData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (err) {
        setError("Failed to load events. Is the API running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-xl font-bold tracking-tight opacity-50">Curating the best events for you...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden bg-primary p-8 md:p-20 text-primary-content shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="80" cy="20" r="40" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="badge badge-outline border-primary-content/30 text-primary-content/80 mb-6 px-4 py-3 font-medium">
             ✨ Discover your next adventure
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Everything<br />is happening.
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-80 mb-10 max-w-lg leading-relaxed">
            The most curated local events, workshops, and community gatherings in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/create-event" className="btn btn-neutral btn-lg rounded-2xl px-8 shadow-xl">
              Post an Event
            </Link>
            <button 
              onClick={() => document.getElementById('how_it_works_modal').showModal()}
              className="btn btn-ghost btn-lg text-primary-content hover:bg-white/10 rounded-2xl"
            >
              Learn how it works
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Modal */}
      <dialog id="how_it_works_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-8 md:p-12 border border-base-content/5 shadow-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-8 top-8">✕</button>
          </form>
          <h3 className="text-4xl font-black tracking-tighter mb-8">HOW IT WORKS.</h3>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-black text-primary">1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Secure Your Account</h4>
                <p className="opacity-60">Create an account or sign in to access creator features. We use token-based auth to keep your session live.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-black text-primary">2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Create + Share</h4>
                <p className="opacity-60">Use the "Post an Event" form to share workshops, meetups, or parties. Every event is saved to our local database.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-black text-primary">3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Connect Local</h4>
                <p className="opacity-60">Browse the lineup, see details, and manage your events. Everything is synced in real-time with the local API.</p>
              </div>
            </div>

            <div className="bg-base-200 p-6 rounded-3xl border border-base-content/5 mt-8">
              <h5 className="font-bold flex gap-2 items-center mb-2">
                <AlertCircle className="w-4 h-4 text-warning" /> Dev Tip
              </h5>
              <p className="text-sm opacity-60">
                Ensure your <strong>Events API</strong> is running on <code>localhost:3000</code>. Without the API, registration and event loading will not work!
              </p>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tighter">THE LINEUP.</h2>
            <p className="font-medium opacity-50">Explore {events.length} upcoming events</p>
          </div>
          <div className="hidden md:flex gap-2">
            <select className="select select-bordered rounded-xl select-sm font-bold">
              <option>All Categories</option>
              <option>Tech</option>
              <option>Social</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="alert alert-error rounded-2xl shadow-lg shadow-error/10">
            <AlertCircle />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {events.length === 0 && !error ? (
          <div className="text-center py-24 bg-base-100 rounded-[2rem] border-2 border-dashed border-base-content/10">
            <div className="bg-primary/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-primary opacity-40" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">The stage is quiet.</h3>
            <p className="opacity-50 font-medium mt-2">No upcoming events found. Why not lead the way?</p>
            <Link to="/create-event" className="btn btn-primary btn-md rounded-xl mt-8 px-8">Create First Event</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add PlusCircle and AlertCircle to imports
import { PlusCircle, AlertCircle } from "lucide-react";

export default Home;
