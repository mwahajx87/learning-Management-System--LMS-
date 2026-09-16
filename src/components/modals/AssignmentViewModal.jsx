import React from 'react';
import { X, Calendar, Link2, ExternalLink, FileEdit } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const AssignmentViewModal = () => {
  const { selectedAssignment, setSelectedAssignment, setEditingAssignment } = useApp();

  if (!selectedAssignment) return null;

  return (
    <div
      id="assignment-view-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedAssignment(null);
      }}
    >
      <div
        id="assignment-info-modal-card"
        className="border bg-[#0d0f13] w-full max-w-[620px] rounded-2xl shadow-2xl overflow-hidden my-6 animate-scale-in"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b">
          <h2 className="text-base sm:text-lg font-bold tracking-normal">
            Assignment Information
          </h2>
          <button
            id="close-assignment-modal-btn"
            onClick={() => setSelectedAssignment(null)}
            className=" transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[70dvh] sm:max-h-[80vh] overflow-y-auto">
          {/* Top Details Card */}
          <div className="border rounded-xl p-4 sm:p-5 space-y-4">
            <div>
              <div className="text-xs font-normal">
                Title
              </div>
              <div className="text-base font-bold mt-1 leading-snug">
                {selectedAssignment.title}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="text-xs font-normal">
                  Due Date
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-sm font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedAssignment.dueDateFull || selectedAssignment.dueDate}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-normal">
                  Status
                </div>
                <div className="mt-1.5">
                  <StatusBadge status={selectedAssignment.status} />
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-normal">
                Reference Links
              </div>
              <div className="mt-1.5 space-y-2">
                {selectedAssignment.referenceLinks && selectedAssignment.referenceLinks.length > 0 ? (
                  selectedAssignment.referenceLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg px-4 py-3 flex items-center gap-2.5"
                    >
                      <Link2 className="w-4 h-4 shrink-0" />
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium transition-colors truncate"
                      >
                        {link}
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg border text-xs">
                    No reference links attached
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs font-normal">
                Description
              </div>
              <div className="mt-1.5 border rounded-lg p-4 text-sm font-normal leading-relaxed whitespace-pre-line">
                {selectedAssignment.description || 'No description provided.'}
              </div>
            </div>
          </div>

          {/* Submission Details Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-base font-semibold">
              <FileEdit className="w-4 h-4" />
              <span>Submission Details</span>
            </div>

            {selectedAssignment.submittedOn ? (
              <div className="border rounded-xl p-5 space-y-4">
                <div>
                  <div className="text-xs font-normal">
                    Submitted On
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-sm font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedAssignment.submittedOn}</span>
                  </div>
                </div>

                {selectedAssignment.submissionLink && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-normal">
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Submission Link</span>
                    </div>
                    <div className="mt-1.5 border rounded-lg px-4 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Link2 className="w-4 h-4 shrink-0" />
                        <a
                          href={selectedAssignment.submissionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium hover:underline truncate"
                        >
                          {selectedAssignment.submissionLink}
                        </a>
                      </div>
                      <a
                        href={selectedAssignment.submissionLink}
                        target="_blank"
                        rel="noreferrer"
                        className=" transition-colors shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {selectedAssignment.submissionNotes && (
                  <div>
                    <div className="text-xs font-normal">
                      Submission Notes
                    </div>
                    <div className="mt-1.5 border rounded-lg p-4 text-sm font-normal whitespace-pre-line font-mono leading-relaxed">
                      {selectedAssignment.submissionNotes}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border rounded-xl p-5 text-xs flex items-center justify-between">
                <span>Not submitted yet.</span>
                {!selectedAssignment.submissionsClosed && (
                  <button
                    onClick={() => {
                      const asg = selectedAssignment;
                      setSelectedAssignment(null);
                      setEditingAssignment(asg);
                    }}
                    className="px-3.5 py-1.5 font-medium text-xs rounded-lg transition-colors"
                  >
                    Submit Assignment Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-4 sm:px-6 py-3.5 sm:py-4 border-t">
          <button
            id="close-assignment-modal-footer-btn"
            onClick={() => setSelectedAssignment(null)}
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
