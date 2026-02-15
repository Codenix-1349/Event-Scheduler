import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, ArrowLeft, Loader2, Megaphone, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // FR010: Fetch single event (GET /api/events/:id)
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Event not found or failed to load.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/");
    } catch (err) {
      alert("Failed to delete event.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-error mb-4">{error}</h2>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="btn btn-ghost btn-sm mb-10 flex gap-2 items-center w-fit hover:bg-base-300 rounded-xl font-bold px-4">
        <ArrowLeft className="w-4 h-4" /> BACK TO LINEUP
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="relative aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden bg-primary/5 flex items-center justify-center border border-base-content/5 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <Megaphone className="w-32 h-32 text-primary opacity-20 animate-pulse" />
            <div className="absolute top-8 left-8">
              <div className="badge badge-primary badge-lg px-6 py-4 font-black shadow-xl">
                {event.category}
              </div>
            </div>
          </div>

          <article className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-base-content">
              {event.title.toUpperCase()}.
            </h1>
            <div className="divider opacity-5"></div>
            <p className="text-xl md:text-2xl leading-relaxed font-medium opacity-70 whitespace-pre-wrap max-w-3xl">
              {event.description}
            </p>
          </article>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="card bg-base-100 shadow-2xl rounded-[2.5rem] border border-base-content/5 sticky top-28 overflow-hidden">
            <div className="bg-primary h-2 w-full"></div>
            <div className="card-body p-8 md:p-10">
              <h3 className="text-xl font-black tracking-tighter mb-8 opacity-40 uppercase">Logistics</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-30 mb-1">Date + Time</p>
                    <p className="text-lg font-bold leading-tight">
                      {new Date(event.date).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-30 mb-1">Pin Location</p>
                    <p className="text-lg font-bold leading-tight">{event.location}</p>
                  </div>
                </div>
              </div>

              {isAuthenticated && (
                <div className="mt-12 pt-8 border-t border-base-content/5 flex flex-col gap-4">
                  <button onClick={handleDelete} className="btn btn-ghost hover:btn-error rounded-2xl font-black tracking-tight text-sm flex gap-2 w-full transition-all">
                    <Trash2 className="w-4 h-4" /> DELETE THIS EVENT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
