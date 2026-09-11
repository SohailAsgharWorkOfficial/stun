export function formatPKR(amount) {
  return `Rs. ${Number(amount || 0).toLocaleString('en-PK')} PKR`;
}

export function formatFirestoreDate(timestamp) {
  if (!timestamp) return '—';
  if (timestamp.toDate) {
    return timestamp.toDate().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
  return new Date(timestamp).toLocaleDateString('en-GB');
}