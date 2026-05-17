import { useState } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '@/providers/trpc';
import { useAuth } from '@/hooks/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Eye, Share2, Plus } from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [editingArticle, setEditingArticle] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [socialConfig, setSocialConfig] = useState({
    facebook: { pageAccessToken: '', pageId: '' },
    instagram: { accessToken: '', igBusinessId: '' },
    linkedin: { accessToken: '', personUrn: '' },
  });

  // Redirect non-admin users
  if (!authLoading && (!user || user.role !== 'admin')) {
    navigate('/');
    return null;
  }

  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.article.listAll.useQuery();

  const createMutation = trpc.article.create.useMutation({
    onSuccess: () => {
      utils.article.listAll.invalidate();
      setFormOpen(false);
      resetForm();
    },
  });

  const updateMutation = trpc.article.update.useMutation({
    onSuccess: () => {
      utils.article.listAll.invalidate();
      setFormOpen(false);
      setEditingArticle(null);
      resetForm();
    },
  });

  const deleteMutation = trpc.article.delete.useMutation({
    onSuccess: () => utils.article.listAll.invalidate(),
  });

  const togglePublishMutation = trpc.article.togglePublish.useMutation({
    onSuccess: () => utils.article.listAll.invalidate(),
  });

  const publishFacebookMutation = trpc.social.publishFacebook.useMutation();
  const publishInstagramMutation = trpc.social.publishInstagram.useMutation();
  const publishLinkedInMutation = trpc.social.publishLinkedIn.useMutation();

  const [form, setForm] = useState({
    slug: '',
    title: '',
    category: 'ERGONOMIA',
    excerpt: '',
    coverImage: '',
    content: '',
    readTime: '',
    published: false,
  });

  function resetForm() {
    setForm({
      slug: '',
      title: '',
      category: 'ERGONOMIA',
      excerpt: '',
      coverImage: '',
      content: '',
      readTime: '',
      published: false,
    });
  }

  function openEdit(article: NonNullable<typeof articles>[0]) {
    setEditingArticle(article.id);
    setForm({
      slug: article.slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt || '',
      coverImage: article.coverImage || '',
      content: article.content,
      readTime: article.readTime || '',
      published: article.published,
    });
    setFormOpen(true);
  }

  function handleSubmit() {
    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle, ...form });
    } else {
      createMutation.mutate(form);
    }
  }

  async function handleSocialPublish(articleId: number, platform: 'facebook' | 'instagram' | 'linkedin') {
    try {
      if (platform === 'facebook') {
        await publishFacebookMutation.mutateAsync({
          articleId,
          ...socialConfig.facebook,
        });
      } else if (platform === 'instagram') {
        await publishInstagramMutation.mutateAsync({
          articleId,
          ...socialConfig.instagram,
        });
      } else {
        await publishLinkedInMutation.mutateAsync({
          articleId,
          ...socialConfig.linkedin,
        });
      }
      alert('Pubblicato con successo!');
    } catch (err: unknown) {
      alert('Errore: ' + (err instanceof Error ? err.message : 'Unknown'));
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#0099CC] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '64px' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: '#E5E5E5' }}>
        <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-6">
          <img src="/logo.jpg" alt="Poltrona Ufficio" className="h-9" />
          <div className="flex items-center gap-4">
            <span className="font-heading text-sm" style={{ color: '#6B7280' }}>
              Admin: {user?.name}
            </span>
            <Button
              variant="outline"
              className="font-heading text-xs"
              onClick={() => navigate('/')}
            >
              Vai al Blog
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Tabs defaultValue="articles">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Articoli</TabsTrigger>
            <TabsTrigger value="social">Social Config</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-heading font-bold text-2xl" style={{ color: '#000000' }}>
                Gestione Articoli
              </h1>
              <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="font-heading text-sm gap-2"
                    style={{ backgroundColor: '#0099CC' }}
                    onClick={() => { setEditingArticle(null); resetForm(); }}
                  >
                    <Plus size={16} /> Nuovo Articolo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-heading">
                      {editingArticle ? 'Modifica Articolo' : 'Nuovo Articolo'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                          Titolo
                        </label>
                        <Input
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          placeholder="Titolo articolo"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                          Slug
                        </label>
                        <Input
                          value={form.slug}
                          onChange={(e) => setForm({ ...form, slug: e.target.value })}
                          placeholder="titolo-articolo"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                          Categoria
                        </label>
                        <Select
                          value={form.category}
                          onValueChange={(v) => setForm({ ...form, category: v })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ERGONOMIA">ERGONOMIA</SelectItem>
                            <SelectItem value="DESIGN">DESIGN</SelectItem>
                            <SelectItem value="GUIDE">GUIDE</SelectItem>
                            <SelectItem value="NOVIT\u00C0">NOVIT&Agrave;</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                          Tempo di lettura
                        </label>
                        <Input
                          value={form.readTime}
                          onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                          placeholder="8 min"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                        Immagine copertina
                      </label>
                      <Input
                        value={form.coverImage}
                        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        placeholder="/featured-1.jpg"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                        Estratto
                      </label>
                      <Textarea
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        placeholder="Breve descrizione..."
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="font-heading text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                        Contenuto (HTML)
                      </label>
                      <Textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        placeholder="<p>Contenuto HTML...</p>"
                        className="mt-1 font-mono text-sm"
                        rows={10}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                        id="published"
                      />
                      <label htmlFor="published" className="font-heading text-sm">
                        Pubblicato
                      </label>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleSubmit}
                        disabled={createMutation.isPending || updateMutation.isPending}
                        style={{ backgroundColor: '#0099CC' }}
                      >
                        {editingArticle ? 'Aggiorna' : 'Crea'}
                      </Button>
                      <Button variant="outline" onClick={() => setFormOpen(false)}>
                        Annulla
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Articles Table */}
            <div className="border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-heading">Titolo</TableHead>
                    <TableHead className="font-heading">Categoria</TableHead>
                    <TableHead className="font-heading">Stato</TableHead>
                    <TableHead className="font-heading">Data</TableHead>
                    <TableHead className="font-heading text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles?.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>
                        <span
                          className="font-heading text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'rgba(0,153,204,0.1)', color: '#0099CC' }}
                        >
                          {article.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => togglePublishMutation.mutate({
                            id: article.id,
                            published: !article.published,
                          })}
                          className="font-heading text-xs px-3 py-1 rounded-full transition-colors"
                          style={{
                            backgroundColor: article.published ? 'rgba(0,128,0,0.1)' : 'rgba(0,0,0,0.05)',
                            color: article.published ? '#008000' : '#9CA3AF',
                          }}
                        >
                          {article.published ? 'Pubblicato' : 'Bozza'}
                        </button>
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: '#6B7280' }}>
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString('it-IT') : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`/#/articolo/${article.slug}`, '_blank')}
                          >
                            <Eye size={16} style={{ color: '#0099CC' }} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEdit(article)}>
                            <Pencil size={16} style={{ color: '#6B7280' }} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (confirm('Eliminare l\'articolo?')) {
                                deleteMutation.mutate({ id: article.id });
                              }
                            }}
                          >
                            <Trash2 size={16} style={{ color: '#EF4444' }} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSocialPublish(article.id, 'facebook')}
                          >
                            <Share2 size={16} style={{ color: '#1877F2' }} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Social Config Tab */}
          <TabsContent value="social">
            <h1 className="font-heading font-bold text-2xl mb-6" style={{ color: '#000000' }}>
              Configurazione Social Media
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Facebook */}
              <div className="p-6 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#1877F2' }}>
                  Facebook
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Page Access Token</label>
                    <Input
                      value={socialConfig.facebook.pageAccessToken}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        facebook: { ...socialConfig.facebook, pageAccessToken: e.target.value },
                      })}
                      placeholder="EAAB..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Page ID</label>
                    <Input
                      value={socialConfig.facebook.pageId}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        facebook: { ...socialConfig.facebook, pageId: e.target.value },
                      })}
                      placeholder="123456789"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="p-6 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#E4405F' }}>
                  Instagram
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Access Token</label>
                    <Input
                      value={socialConfig.instagram.accessToken}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        instagram: { ...socialConfig.instagram, accessToken: e.target.value },
                      })}
                      placeholder="EAAB..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Business Account ID</label>
                    <Input
                      value={socialConfig.instagram.igBusinessId}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        instagram: { ...socialConfig.instagram, igBusinessId: e.target.value },
                      })}
                      placeholder="178414..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-6 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0A66C2' }}>
                  LinkedIn
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Access Token</label>
                    <Input
                      value={socialConfig.linkedin.accessToken}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        linkedin: { ...socialConfig.linkedin, accessToken: e.target.value },
                      })}
                      placeholder="AQV8..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs uppercase tracking-wider" style={{ color: '#6B7280' }}>Person URN</label>
                    <Input
                      value={socialConfig.linkedin.personUrn}
                      onChange={(e) => setSocialConfig({
                        ...socialConfig,
                        linkedin: { ...socialConfig.linkedin, personUrn: e.target.value },
                      })}
                      placeholder="urn:li:person:..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
