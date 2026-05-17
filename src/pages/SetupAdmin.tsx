import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '@/providers/trpc';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function SetupAdmin() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const utils = trpc.useUtils();

  const becomeAdmin = trpc.auth.becomeAdmin.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      alert('Sei ora admin! Verrai reindirizzato al pannello admin.');
      setTimeout(() => navigate('/admin'), 1000);
    },
    onError: (err) => {
      alert('Errore: ' + err.message);
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#0099CC] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  if (user.role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
          <Shield size={48} className="mx-auto mb-4" style={{ color: '#008000' }} />
          <h1 className="font-heading font-bold text-2xl mb-2">Sei gi&agrave; admin!</h1>
          <p className="font-body mb-6" style={{ color: '#6B7280' }}>
            Il tuo account ha gi&agrave; privilegi amministrativi.
          </p>
          <Button onClick={() => navigate('/admin')} style={{ backgroundColor: '#0099CC' }}>
            Vai al Pannello Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-8 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
        <Shield size={48} className="mx-auto mb-4" style={{ color: '#0099CC' }} />
        <h1 className="font-heading font-bold text-2xl mb-2">Setup Admin</h1>
        <p className="font-body mb-2" style={{ color: '#6B7280' }}>
          Ciao <strong>{user.name}</strong>!
        </p>
        <p className="font-body mb-6" style={{ color: '#6B7280' }}>
          Il tuo account attualmente ha ruolo <strong>&quot;user&quot;</strong>. 
          Clicca il pulsante qui sotto per diventare <strong>admin</strong> e accedere al pannello di gestione.
        </p>
        <Button
          onClick={() => becomeAdmin.mutate()}
          disabled={becomeAdmin.isPending}
          className="w-full"
          style={{ backgroundColor: '#008000' }}
        >
          {becomeAdmin.isPending ? 'Attendere...' : 'Diventa Admin'}
        </Button>
      </div>
    </div>
  );
}
