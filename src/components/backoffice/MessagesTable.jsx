import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Modal from '../ui/Modal';
import ConfirmModal from '../ui/ConfirmModal';
import IconButton from '../ui/IconButton';

/* ── Inline SVG icons ── */
const EyeIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

/**
 * Table listing contact_form with Read + Delete actions.
 *
 * @param {Array}    messages    – rows from contact_form
 * @param {boolean}  loading     – initial data loading
 * @param {function} onRefresh   – callback to re-fetch data from parent
 */
export default function MessagesTable({ messages, loading, onRefresh }) {
  /* ── local state for modals ── */
  const [readMsg, setReadMsg] = useState(null);       // message shown in read modal
  const [deleteTarget, setDeleteTarget] = useState(null); // message pending deletion
  const [deleting, setDeleting] = useState(false);

  /* ── Delete handler ── */
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await supabase
      .from('contact_form')
      .delete()
      .eq('id', deleteTarget.id);
    setDeleting(false);

    if (error) {
      alert('Failed to delete message: ' + error.message);
      return;
    }

    /* Close modals and refresh */
    setDeleteTarget(null);
    setReadMsg(null);
    onRefresh();
  }

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="backoffice-empty">
        <span className="btn-loading">Loading messages…</span>
      </div>
    );
  }

  /* ── Empty state ── */
  if (!messages || messages.length === 0) {
    return (
      <div className="backoffice-empty">
        <p>📭 No messages yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Messages table ── */}
      <div className="backoffice-table-wrap">
        <table className="backoffice-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="small" style={{ whiteSpace: 'nowrap' }}>
                  {new Date(msg.created_at).toLocaleDateString()}
                </td>
                <td className="actions-cell">
                  <IconButton
                    icon={EyeIcon}
                    label="Read message"
                    onClick={() => setReadMsg(msg)}
                  />
                  <IconButton
                    icon={TrashIcon}
                    label="Delete message"
                    variant="danger"
                    onClick={() => setDeleteTarget(msg)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Read modal ── */}
      <Modal open={!!readMsg} onClose={() => setReadMsg(null)}>
        {readMsg && (
          <>
            <button
              className="modal-close"
              aria-label="Close modal"
              onClick={() => setReadMsg(null)}
            >
              ×
            </button>
            <h3 style={{ marginBottom: 16 }}>Message Details</h3>

            <div className="read-modal-field">
              <strong>Name</strong>
              <p>{readMsg.name}</p>
            </div>
            <div className="read-modal-field">
              <strong>Email</strong>
              <p>
                <a href={`mailto:${readMsg.email}`}>{readMsg.email}</a>
              </p>
            </div>
            <div className="read-modal-field">
              <strong>Message</strong>
              <div className="read-modal-message">{readMsg.message}</div>
            </div>
            <div className="read-modal-field">
              <strong>Received</strong>
              <p className="small" style={{ color: 'var(--muted)' }}>
                {new Date(readMsg.created_at).toLocaleString()}
              </p>
            </div>

            <div className="read-modal-actions">
              <button className="btn-secondary" onClick={() => setReadMsg(null)}>
                Close
              </button>
              <button
                className="btn-danger"
                onClick={() => setDeleteTarget(readMsg)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </Modal>

      {/* ── Delete confirmation modal ── */}
      <ConfirmModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete message?"
        message={
          deleteTarget
            ? `This will permanently delete the message from "${deleteTarget.name}" (${deleteTarget.email}). This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  );
}
