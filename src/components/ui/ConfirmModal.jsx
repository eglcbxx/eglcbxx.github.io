import Modal from './Modal';

/**
 * A confirmation dialog built on top of Modal.
 *
 * @param {boolean}  open
 * @param {function} onCancel
 * @param {function} onConfirm
 * @param {string}   title
 * @param {string}   message
 * @param {string}   [confirmLabel='Delete']
 * @param {boolean}  [loading=false]
 */
export default function ConfirmModal({
  open,
  onCancel,
  onConfirm,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Delete',
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onCancel} className="confirm-modal">
      <h3>{title}</h3>
      {message && <p className="small" style={{ margin: '12px 0 24px' }}>{message}</p>}
      <div className="confirm-modal-actions">
        <button className="btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          className="btn-danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? <span className="btn-loading">{confirmLabel}…</span> : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
