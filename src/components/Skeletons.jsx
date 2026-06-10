import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const skBase = { borderRadius: 12 }

export function AboutSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={100} height={28} borderRadius={50} />
        <Skeleton width={240} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={320} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ padding: 24, marginBottom: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
            <Skeleton width={120} height={22} {...skBase} />
            <Skeleton count={4} style={{ marginTop: 12, height: 14 }} {...skBase} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
                <Skeleton width={70} height={12} {...skBase} />
                <Skeleton width={100} height={16} style={{ marginTop: 6 }} {...skBase} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ padding: 24, marginBottom: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
            <Skeleton width={140} height={22} {...skBase} />
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <Skeleton circle width={14} height={14} />
                <div style={{ flex: 1 }}>
                  <Skeleton width="60%" height={15} {...skBase} />
                  <Skeleton width="40%" height={13} style={{ marginTop: 4 }} {...skBase} />
                  <Skeleton width="50%" height={12} style={{ marginTop: 4 }} {...skBase} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: 20, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
                <Skeleton width={48} height={32} {...skBase} style={{ margin: '0 auto' }} />
                <Skeleton width={60} height={14} style={{ marginTop: 8 }} {...skBase} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={100} height={28} borderRadius={50} />
        <Skeleton width={200} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={300} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        {[1, 2, 3, 4].map(i => <Skeleton key={i} width={100} height={36} borderRadius={50} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
            <Skeleton height={180} {...skBase} style={{ borderRadius: 0 }} />
            <div style={{ padding: 16 }}>
              <Skeleton width="80%" height={18} {...skBase} />
              <Skeleton count={3} style={{ marginTop: 8, height: 13 }} {...skBase} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {[1, 2, 3].map(j => <Skeleton key={j} width={60} height={24} borderRadius={50} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SkillsSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={80} height={28} borderRadius={50} />
        <Skeleton width={200} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={280} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
        {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} width={120} height={38} borderRadius={50} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton width={120} height={16} {...skBase} />
              <Skeleton width={40} height={16} {...skBase} />
            </div>
            <Skeleton height={8} borderRadius={50} style={{ marginTop: 10 }} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ExperienceSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={100} height={28} borderRadius={50} />
        <Skeleton width={300} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={250} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--border)', transform: 'translateX(-50%)' }} />
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', paddingBottom: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)', zIndex: 1 }}>
              <Skeleton circle width={36} height={36} />
            </div>
            <div style={{ width: 'calc(50% - 36px)', padding: 20, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
              <Skeleton width={100} height={16} borderRadius={50} />
              <Skeleton width="80%" height={18} style={{ marginTop: 8 }} {...skBase} />
              <Skeleton width="50%" height={14} style={{ marginTop: 4 }} {...skBase} />
              <Skeleton width="60%" height={12} style={{ marginTop: 4 }} {...skBase} />
              <Skeleton count={2} style={{ marginTop: 8, height: 13 }} {...skBase} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TerminalSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={120} height={28} borderRadius={50} />
        <Skeleton width={280} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={320} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          {[1, 2, 3].map(i => <Skeleton key={i} circle width={12} height={12} />)}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Skeleton width={160} height={14} {...skBase} />
          </div>
        </div>
        <div style={{ height: 420, padding: '16px 20px' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Skeleton width={16} height={16} {...skBase} />
              <Skeleton width={60} height={14} {...skBase} />
              <Skeleton width={200 + i * 30} height={14} {...skBase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSkeleton() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Skeleton width={120} height={28} borderRadius={50} />
        <Skeleton width={320} height={36} style={{ marginTop: 12 }} {...skBase} />
        <Skeleton width={280} height={18} style={{ marginTop: 8 }} {...skBase} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>
        <div>
          <div style={{ padding: 24, marginBottom: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
            <Skeleton width={160} height={20} {...skBase} />
            <Skeleton count={3} style={{ marginTop: 8, height: 14 }} {...skBase} />
          </div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ padding: '14px 16px', marginBottom: 8, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Skeleton circle width={42} height={42} />
                <div>
                  <Skeleton width={60} height={12} {...skBase} />
                  <Skeleton width={120} height={15} style={{ marginTop: 4 }} {...skBase} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)' }}>
          <Skeleton width={160} height={22} {...skBase} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
            <div><Skeleton width={60} height={13} {...skBase} /><Skeleton height={40} style={{ marginTop: 6 }} {...skBase} /></div>
            <div><Skeleton width={80} height={13} {...skBase} /><Skeleton height={40} style={{ marginTop: 6 }} {...skBase} /></div>
          </div>
          <div style={{ marginTop: 16 }}><Skeleton width={100} height={13} {...skBase} /><Skeleton height={40} style={{ marginTop: 6 }} {...skBase} /></div>
          <div style={{ marginTop: 16 }}><Skeleton width={60} height={13} {...skBase} /><Skeleton height={120} style={{ marginTop: 6 }} {...skBase} /></div>
          <Skeleton height={44} borderRadius={50} style={{ marginTop: 24 }} />
        </div>
      </div>
    </section>
  )
}
