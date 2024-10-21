import ProtectedRoute from '../../components/ProtectedRoute';

export default function Games() {
  return (
    <ProtectedRoute>
      <h1>Games Directory</h1>
      {/* Render your games here */}
    </ProtectedRoute>
  );
}
