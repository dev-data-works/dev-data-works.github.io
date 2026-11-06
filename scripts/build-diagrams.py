"""Generate the static SVG architecture diagrams (icon cards) for /work.

Run from the repo root: python3 scripts/build-diagrams.py

Cards: icon on top, name below. Brand icons come from src/data/tool-icons.ts
(same as the stack chips) or src/assets/platforms/*.svg; everything else uses
one consistent line-icon set defined here. Output: src/components/diagrams/*.svg
"""
import re, sys, os

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
W, H = 128, 76          # card size
PX, PY = 150, 112       # column / row pitch
OX, OY = 16, 16         # outer margin
ICON = 22
R = 12                  # card corner radius
BEND = 8                # connector corner radius

# ---------- icon sources -------------------------------------------------
ti = open(os.path.join(ROOT, 'src/data/tool-icons.ts')).read()
brand = {}
for m in re.finditer(r"^  '([a-z0-9-]+)': \{ hex: '([^']*)', (path|img|svg): '([^']*)' \},$", ti, re.M):
    brand[m.group(1)] = (m.group(2), m.group(3), m.group(4))

def platform_svg(name):
    return open(os.path.join(ROOT, f'src/assets/platforms/{name}.svg')).read().strip()

STROKE = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'
LINE = {
    'person': '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',
    'form': '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
    'phone': '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
    'api': '<path d="M8 7 3.5 12 8 17M16 7l4.5 5-4.5 5M13.5 5l-3 14"/>',
    'check': '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.3 2.3 4.2-4.6"/>',
    'chart': '<path d="M4 20h16"/><path d="M7 16v-5M12 16V6M17 16v-8"/>',
    'map': '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
    'layers': '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    'satellite': '<rect x="9.2" y="9.2" width="5.6" height="5.6" rx="1" transform="rotate(45 12 12)"/><path d="m8.6 8.6-2.8-2.8M5.8 5.8 3.5 8.1M5.8 5.8 8.1 3.5M15.4 15.4l2.8 2.8M18.2 18.2l2.3-2.3M18.2 18.2l-2.3 2.3"/><path d="M15.5 3.5a5 5 0 0 1 5 5"/>',
    'clipboard': '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3h6v1.5M8.5 11l2 2 4-4M8.5 17h7"/>',
    'globe': '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.6 3.8 5.4 3.8 8.5s-1.2 5.9-3.8 8.5c-2.6-2.6-3.8-5.4-3.8-8.5S9.4 6.1 12 3.5"/>',
    'sync': '<path d="M19.5 10A7.5 7.5 0 0 0 6 6.5L4.5 8"/><path d="M4.5 4v4h4"/><path d="M4.5 14A7.5 7.5 0 0 0 18 17.5l1.5-1.5"/><path d="M19.5 20v-4h-4"/>',
    'search': '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
    'doc': '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    'sparkle': '<path d="M12 3.5 13.9 10l6.6 2-6.6 2L12 20.5 10.1 14l-6.6-2 6.6-2z"/>',
    'chat': '<path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 2.5Z"/><path d="M8.5 9h7M8.5 12.5h4"/>',
    'database': '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
}
KIND_COLOR = {'person': '#4a7a2a', 'external': '#5d7287'}

def icon_markup(icon, kind, x, y):
    """Return markup for a 22px icon whose top-left is (x, y)."""
    color = KIND_COLOR.get(kind, '#2a6f99')
    if icon.startswith('platform:'):
        svg = platform_svg(icon.split(':', 1)[1])
        return svg.replace('<svg ', f'<svg x="{x}" y="{y}" width="{ICON}" height="{ICON}" ', 1)
    if icon in brand:
        hexv, typ, data = brand[icon]
        if typ == 'path':
            col = '#' + hexv.lstrip('#') if hexv and int(hexv.lstrip('#'), 16) < 0xe6e6e6 else '#0b3558'
            return f'<svg x="{x}" y="{y}" width="{ICON}" height="{ICON}" viewBox="0 0 24 24"><path fill="{col}" d="{data}"/></svg>'
        if typ == 'img':
            return f'<image x="{x}" y="{y}" width="{ICON}" height="{ICON}" href="{data}"/>'
        if typ == 'svg':
            return f'<svg x="{x}" y="{y}" width="{ICON}" height="{ICON}" viewBox="0 0 24 24">{data}</svg>'
    return f'<svg x="{x}" y="{y}" width="{ICON}" height="{ICON}" viewBox="0 0 24 24" color="{color}"><g {STROKE}>{LINE[icon]}</g></svg>'

# ---------- diagrams ----------------------------------------------------
# node: (id, kind, label, col, row, icon)   kind: person | app | service | store | external
D = {
    'monitoring': (
        [('p0', 'person', 'Programme\nteam', 0, 0, 'person'), ('s0', 'app', 'Form builder', 1, 0, 'form'),
         ('p1', 'person', 'Field staff', 0, 1, 'person'), ('a1', 'app', 'Offline\nmobile app', 1, 1, 'phone'),
         ('s1', 'service', 'Sync API', 2, 1, 'api'), ('d1', 'store', 'Database', 3, 1, 'postgresql'),
         ('s2', 'service', 'Approvals', 3, 0, 'check'), ('p3', 'person', 'Reviewers', 4, 0, 'person'),
         ('a2', 'app', 'Dashboards,\nreports, AI', 4, 1, 'chart'), ('p2', 'person', 'Managers', 4, 2, 'person'),
         ('e1', 'external', 'Analysis, GIS\nand BI tools', 3, 2, 'layers')],
        [('p0', 's0'), ('s0', 'a1'), ('p1', 'a1'), ('a1', 's1'), ('s1', 'd1'), ('d1', 's2'), ('s2', 'd1'),
         ('p3', 's2'), ('d1', 'a2'), ('a2', 'p2'), ('d1', 'e1')]),
    'early-warning': (
        [('e1', 'external', 'Satellite and\nclimate data', 0, 0, 'satellite'), ('s1', 'service', 'Monthly\nprocessing', 1, 0, 'python'),
         ('d1', 'store', 'GeoNode', 2, 0, 'platform:geonode'), ('e2', 'store', 'Exposure,\neligibility', 3, 0, 'layers'),
         ('p1', 'person', 'Expert\nreviewers', 1, 1, 'person'), ('s2', 'service', 'Review and\nvalidation', 2, 1, 'check'),
         ('a1', 'app', 'Published\ndrought maps', 3, 1, 'map'), ('p2', 'person', 'Decision-\nmakers', 4, 1, 'person'),
         ('s3', 'service', 'Response\nplanning', 4, 2, 'clipboard')],
        [('e1', 's1'), ('s1', 'd1'), ('d1', 's2'), ('p1', 's2'), ('s2', 'a1'), ('e2', 'a1'), ('a1', 'p2'), ('p2', 's3')]),
    'catalogue': (
        [('e1', 'external', 'Partner\ncatalogues', 0, 0, 'globe'), ('s1', 'service', 'Harvester', 1, 0, 'sync'),
         ('s2', 'service', 'CKAN catalogue\n+ Solr search', 2, 0, 'apachesolr'), ('e2', 'external', 'Other systems\nvia API', 3, 0, 'api'),
         ('p1', 'person', 'Users', 0, 1, 'person'), ('s4', 'service', 'Single sign-on\nand roles', 1, 1, 'keycloak'),
         ('a1', 'app', 'Web map, search\nand analysis', 2, 1, 'openlayers'), ('s3', 'service', 'GeoServer\nmap services', 3, 1, 'geoserver'),
         ('d1', 'store', 'PostGIS', 3, 2, 'postgis')],
        [('e1', 's1'), ('s1', 's2'), ('s2', 'e2'), ('p1', 's4'), ('s4', 'a1'), ('a1', 's2'), ('s2', 'a1'),
         ('a1', 's3'), ('s3', 'a1'), ('d1', 's3')]),
    'knowledge': (
        [('p1', 'person', 'Editors', 0, 0, 'person'), ('s1', 'service', 'Headless CMS', 1, 0, 'doc'),
         ('e1', 'external', 'External\ndatabases', 2, 0, 'globe'), ('s3', 'service', 'AI tags and\nsuggestions', 3, 0, 'sparkle'),
         ('s2', 'service', 'Platform API', 2, 1, 'api'), ('d1', 'store', 'Database', 3, 1, 'postgresql'),
         ('p2', 'person', 'Members', 0, 2, 'person'), ('a1', 'app', 'Multilingual\nweb platform', 1, 2, 'globe')],
        [('p1', 's1'), ('s1', 's2', 'vh'), ('e1', 's2'), ('s2', 'd1'), ('d1', 's2'), ('d1', 's3'), ('s3', 'd1'),
         ('p2', 'a1'), ('a1', 's2')]),
    'assistants': (
        [('d0', 'store', 'Your\ndocuments', 0, 0, 'doc'), ('s1', 'service', 'Ingestion\npipeline', 1, 0, 'sync'),
         ('d1', 'store', 'Knowledge\nbases', 2, 0, 'technique-embeddings'), ('p1', 'person', 'Staff and\ncommunities', 0, 1, 'person'),
         ('a1', 'app', 'Chat widget,\napps, messaging', 1, 1, 'chat'), ('s2', 'service', 'Assistant\nservice', 2, 1, 'sparkle'),
         ('e1', 'external', 'Language\nmodel', 3, 1, 'ollama'), ('s3', 'service', 'Evaluation\nand prompts', 2, 2, 'check')],
        [('d0', 's1'), ('s1', 'd1'), ('p1', 'a1'), ('a1', 's2'), ('s2', 'a1'), ('s2', 'd1'), ('d1', 's2'),
         ('s2', 'e1'), ('e1', 's2'), ('s2', 's3')]),
}

def pos(c, r):
    return OX + c * PX, OY + r * PY

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;')

def route(a, b, pref, off):
    ax, ay = pos(a[3], a[4]); bx, by = pos(b[3], b[4])
    acx, acy, bcx, bcy = ax + W / 2, ay + H / 2, bx + W / 2, by + H / 2
    g = 4
    if a[4] == b[4]:
        d = 1 if bcx > acx else -1; y = acy + off
        return f'M{acx + d * W / 2} {y}H{bcx - d * (W / 2 + g)}'
    if a[3] == b[3]:
        d = 1 if bcy > acy else -1; x = acx + off
        return f'M{x} {acy + d * H / 2}V{bcy - d * (H / 2 + g)}'
    dx = 1 if bcx > acx else -1; dy = 1 if bcy > acy else -1
    if pref == 'vh':
        x0, y0 = acx, acy + dy * H / 2; x1, y1 = bcx - dx * (W / 2 + g), bcy
        return f'M{x0} {y0}V{y1 - dy * BEND}Q{x0} {y1} {x0 + dx * BEND} {y1}H{x1}'
    x0, y0 = acx + dx * W / 2, acy; x1, y1 = bcx, bcy - dy * (H / 2 + g)
    return f'M{x0} {y0}H{x1 - dx * BEND}Q{x1} {y0} {x1} {y0 + dy * BEND}V{y1}'

for slug, (nodes, edges) in D.items():
    by = {n[0]: n for n in nodes}
    cols = max(n[3] for n in nodes) + 1; rows = max(n[4] for n in nodes) + 1
    vw = OX * 2 + (cols - 1) * PX + W; vh = OY * 2 + (rows - 1) * PY + H
    key = lambda e: '-'.join(sorted(e[:2]))
    count = {}
    for e in edges: count[key(e)] = count.get(key(e), 0) + 1
    out_edges = []
    for i, e in enumerate(edges):
        off = (-6 if e[0] < e[1] else 6) if count[key(e)] > 1 else 0
        d = route(by[e[0]], by[e[1]], e[2] if len(e) > 2 else 'hv', off)
        out_edges.append(f'<path class="e" style="--i:{i}" pathLength="1" marker-end="url(#{slug}-arrow)" d="{d}"/>')
    out_nodes = []
    for i, (nid, kind, label, c, r, icon) in enumerate(nodes):
        x, y = pos(c, r)
        lines = label.split('\n')
        ty = y + 50 if len(lines) == 1 else y + 45
        text = ''.join(f'<tspan x="{x + W / 2}"{" dy=\"14\"" if j else ""}>{esc(t)}</tspan>' for j, t in enumerate(lines))
        out_nodes.append(
            f'<g class="node node--{kind}" style="--i:{i}">'
            f'<rect class="n" x="{x}" y="{y}" width="{W}" height="{H}" rx="{R}"/>'
            f'{icon_markup(icon, kind, x + (W - ICON) / 2, y + 11)}'
            f'<text class="t" x="{x + W / 2}" y="{ty}">{text}</text></g>')
    svg = (f'<svg viewBox="0 0 {vw} {vh}" width="{vw}" height="{vh}" aria-hidden="true" focusable="false">'
           f'<defs><marker id="{slug}-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
           f'<path class="arrowhead" d="M1.5 1.5 8.5 5l-7 3.5"/></marker></defs>'
           f'<g class="edges">{"".join(out_edges)}</g><g class="nodes">{"".join(out_nodes)}</g></svg>\n')
    open(os.path.join(ROOT, f'src/components/diagrams/{slug}.svg'), 'w').write(svg)
    print(slug, vw, 'x', vh, len(svg), 'bytes')
