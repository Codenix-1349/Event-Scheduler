import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Calendar, MapPin, Type, AlignLeft, Send, AlertCircle, CheckCircle } from "lucide-react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "General",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FR015 & FR016: POST /api/events with token in headers
      await axios.post("http://localhost:3000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center animate-bounce">
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-success">Event Created Successfully!</h2>
          <p className="opacity-70 mt-2">Redirecting you to the home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="card bg-base-100 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-content/5">
        <div className="bg-primary h-3 w-full"></div>
        <div className="card-body p-8 md:p-12">
          <header className="mb-10 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="bg-primary p-4 rounded-2xl w-fit mx-auto md:mx-0 shadow-lg shadow-primary/20">
                <Send className="w-8 h-8 text-primary-content" />
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tighter">POST NEW EVENT.</h2>
                <p className="font-medium opacity-50">Share your vision with the community.</p>
              </div>
            </div>
            <div className="divider opacity-5 mt-8"></div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="alert alert-error rounded-2xl shadow-lg shadow-error/10">
                <AlertCircle />
                <span className="font-bold">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-black tracking-tight text-lg flex gap-2 items-center">
                    <Type className="w-5 h-5 opacity-40" /> WHAT'S IT CALLED?
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="The Ultimate Workshop"
                  className="input input-bordered input-lg focus:input-primary rounded-2xl font-bold tracking-tight bg-base-200/50"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-black tracking-tight text-lg flex gap-2 items-center">
                    <AlignLeft className="w-5 h-5 opacity-40" /> TELL US MORE
                  </span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered textarea-lg h-40 focus:textarea-primary rounded-2xl font-medium bg-base-200/50 leading-relaxed"
                  placeholder="What makes this event special?"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-black tracking-tight text-lg flex gap-2 items-center">
                    <Calendar className="w-5 h-5 opacity-40" /> WHEN?
                  </span>
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  className="input input-bordered input-lg focus:input-primary rounded-2xl font-bold bg-base-200/50"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-black tracking-tight text-lg flex gap-2 items-center">
                    <MapPin className="w-5 h-5 opacity-40" /> WHERE?
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="A sleek venue or link"
                  className="input input-bordered input-lg focus:input-primary rounded-2xl font-bold bg-base-200/50"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-black tracking-tight text-lg uppercase">Category</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {["General", "Social", "Learning", "Sports", "Tech", "Other"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`btn btn-md rounded-xl font-bold px-6 border-none ${formData.category === cat ? "btn-primary shadow-lg shadow-primary/20" : "bg-base-200 text-base-content/60 hover:bg-base-300"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-control mt-12">
              <button
                type="submit"
                className={`btn btn-primary btn-lg rounded-2xl shadow-2xl shadow-primary/30 font-black tracking-tight text-xl h-16 ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Launch Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
