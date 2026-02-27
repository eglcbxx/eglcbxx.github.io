/**
 * A small icon-only button with accessible label.
 *
 * @param {function}         onClick
 * @param {React.ReactNode}  icon     – inline SVG or element
 * @param {string}           label    – aria-label for screen readers
 * @param {string}           [variant] – 'default' | 'danger'
 * @param {boolean}          [disabled]
 */
export default function IconButton({
  onClick,
  icon,
  label,
  variant = 'default',
  disabled = false,
}) {
  return (
    <button
      className={`icon-btn icon-btn--${variant}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
