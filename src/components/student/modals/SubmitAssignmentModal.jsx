import React, { useState, useEffect } from 'react';
import { X, Upload, Github, Globe, FileText } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { useStudent } from '../../../context/StudentContext';

export const SubmitAssignmentModal = () => {
  const { editingAssignment, setEditingAssignment, handleAssignmentSubmit } = useStudent();
  const { showToast } = useApp();

  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingAssignment) {
      setLiveUrl(editingAssignment.submissionLink || '');
      setNotes(editingAssignment.submissionNotes || '');
      if (editingAssignment.submissionNotes && editingAssignment.submissionNotes.includes('https://github.com')) {
        const match = editingAssignment.submissionNotes.match(/https:\/\/github\.com[^\s]+/);
        if (match) setGithubUrl(match[0]);
      } else {
        setGithubUrl('');
      }
    }
  }, [editingAssignment]);

  if (!editingAssignment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!liveUrl && !githubUrl) {
      showToast('Please provide either a Live URL or a GitHub Repository URL.');
      return;
    }

    const compiledNotes = githubUrl
      ? `Github Repo:-\n${githubUrl}\n\n${notes}`
      : notes;

    handleAssignmentSubmit(editingAssignment.id, {
      link: liveUrl || githubUrl,
      notes: compiledNotes.trim()
    });
  };

  return (
    <div
      id="submit-assignment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setEditingAssignment(null);
      }}
    >
      <div
        id="submit-assignment-modal-card"
        className="border bg-[#0d0f13] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold tracking-tight">
              Submit Assignment
            </h2>
            <p className="text-xs truncate max-w-[60vw] sm:max-w-sm mt-0.5">
              {editingAssignment.title}
            </p>
          </div>
          <button
            id="close-submit-modal-btn"
            onClick={() => setEditingAssignment(null)}
            className=" p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[70dvh] sm:max-h-none">
          <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              Live Deployment URL (Vercel / Netlify / Firebase)
            </label>
            <div className="relative">
                <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                id="submission-live-url-input"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://your-project.vercel.app"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              GitHub Repository URL
            </label>
            <div className="relative">
                <Github className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                id="submission-github-url-input"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
              Submission Notes / Remarks
            </label>
            <div className="relative">
              <textarea
                rows={3}
                id="submission-notes-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or credentials for the examiner..."
                className="w-full p-3 border rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setEditingAssignment(null)}
              className="px-4 py-2 border text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-assignment-confirm-btn"
              className="px-5 border py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Confirm Submission</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
