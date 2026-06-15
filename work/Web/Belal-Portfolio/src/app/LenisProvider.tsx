'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // #region agent log
    fetch('http://127.0.0.1:7747/ingest/becd3696-df5b-456c-8c33-414d20522762',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'68a060'},body:JSON.stringify({sessionId:'68a060',location:'app/LenisProvider.tsx:mount',message:'LenisProvider mounted',data:{mounted:true},timestamp:Date.now(),hypothesisId:'H1',runId:'post-fix'})}).catch(()=>{});
    // #endregion
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
