#!/usr/bin/env python3
"""Quantitative visual comparison: reference mockup vs our screenshot."""
import sys, numpy as np
from PIL import Image, ImageFilter

def load(p, size=None):
    im = Image.open(p).convert('RGB')
    if size: im = im.resize(size, Image.LANCZOS)
    return im

def neon_palette(im, topn=10):
    """Dominant saturated (neon) colors."""
    a = np.asarray(im).reshape(-1,3).astype(np.float32)
    mx, mn = a.max(1), a.min(1)
    sat = np.where(mx>0, (mx-mn)/np.maximum(mx,1), 0)
    val = mx/255
    mask = (sat>0.45) & (val>0.5)          # saturated & bright = neon
    sel = a[mask]
    if len(sel)==0: return []
    q = (sel//24*24)
    uniq, cnt = np.unique(q, axis=0, return_counts=True)
    order = np.argsort(-cnt)[:topn]
    return [(tuple(uniq[i].astype(int)), int(cnt[i])) for i in order]

def proj_corr(a, b):
    """Correlation of edge-energy projections (rows & cols)."""
    ea = np.asarray(a.convert('L').filter(ImageFilter.FIND_EDGES), dtype=np.float32)
    eb = np.asarray(b.convert('L').filter(ImageFilter.FIND_EDGES), dtype=np.float32)
    def norm(x):
        x = x - x.mean(); 
        return x/np.maximum(x.std(),1e-6)
    def cc(u,v):
        return float((norm(u)*norm(v)).mean())
    return cc(ea.mean(1), eb.mean(1)), cc(ea.mean(0), eb.mean(0))

def grid_score(a, b, n=8):
    """Per-cell brightness similarity map."""
    ga = np.asarray(a.convert('L'), dtype=np.float32)
    gb = np.asarray(b.convert('L'), dtype=np.float32)
    H,W = ga.shape; hs, ws = H//n, W//n
    A = ga[:n*hs,:n*ws].reshape(n,hs,n,ws).transpose(0,2,1,3).mean((2,3))
    B = gb[:n*hs,:n*ws].reshape(n,hs,n,ws).transpose(0,2,1,3).mean((2,3))
    diff = np.abs(A-B)/255
    return diff

def hue_distance(c1, c2):
    import colorsys
    h1,__,_ = colorsys.rgb_to_hsv(*[x/255 for x in c1])
    h2,__,_ = colorsys.rgb_to_hsv(*[x/255 for x in c2])
    d = abs(h1-h2); return min(d,1-d)

if __name__=='__main__':
    ref_p, our_p = sys.argv[1], sys.argv[2]
    ref = load(ref_p); W,H = ref.size
    our_full = load(our_p)
    our = load(our_p, (W,H))
    print(f'ref size: {ref.size}  ours: {our_full.size} -> resized {our.size} for compare')

    pr, pc = proj_corr(ref, our)
    print(f'projection correlation: rows={pr:.3f} cols={pc:.3f}  -> structural {(pr+pc)/2*100:.0f}%')

    d = grid_score(ref, our, 10)
    sim = 1 - d.mean()
    print(f'10x10 grid brightness similarity: {sim*100:.0f}%')
    worst = np.dstack(np.unravel_index(np.argsort(-d, axis=None)[:8], d.shape))[0]
    print('worst cells (row,col from top-left):', [tuple(x) for x in worst])

    pr_pal, our_pal = neon_palette(ref), neon_palette(our)
    print('\nref neon palette :', [f'#{r:02x}{g:02x}{b:02x}' for (r,g,b),_ in pr_pal[:8]])
    print('our  neon palette:', [f'#{r:02x}{g:02x}{b:02x}' for (r,g,b),_ in our_pal[:8]])
    # palette match: % of ref neon hues present in ours (within 20deg)
    matched = 0
    for (rc,_),(_,_ ) in [(x,(0,0)) for x in pr_pal[:8]]:
        if any(hue_distance(rc, oc) < 20/360 for oc,_ in our_pal[:14]): matched += 1
    print(f'neon hue coverage: {matched}/{min(8,len(pr_pal))}')
