# Platform logo sources

Logos are shown in their official colours, unmodified except for SVGO
minification (`svgo@3.3.2`, preset-default, dimensions removed, ids prefixed
`pl-<name>__` so they cannot collide on a page). They are listed as technologies
the team works with; no partnership or endorsement is implied. Retrieved
2026-11-06.

| File | Source | Notes |
| --- | --- | --- |
| `ckan.svg` | `github.com/ckan/ckan.org` → `ckanorg/static/img/logo_ckan.svg` (the logo used on ckan.org) | CKAN is a project of the Open Knowledge Foundation. Logo includes the wordmark. |
| `dhis2.svg` | `github.com/dhis2/dhis2-identity` → `web/Logo/Default/dhis2-logo-rgb-positive.svg` | DHIS2 Identity Guidelines: use the main (positive) logo by default; do not recolour. Logo includes the wordmark. |
| `geonode.svg` | `github.com/GeoNode/geonode` → `docs/src/theme/img/geonode-logo-blue.svg` | Icon only; the name is shown as text next to it. |
| `odk.svg` | `github.com/getodk/central-frontend` → `packages/web-forms/src/assets/images/odk-logo.svg` | The logo forms the letters ODK (wordmark). The docs-site version embeds a raster image and was not used. |
| `superset.svg` | `github.com/apache/superset` → `superset-frontend/src/assets/branding/superset-logo-horiz.svg` | Apache Superset and its logo are trademarks of the Apache Software Foundation; shown unmodified to name the technology. Logo includes the wordmark. |
| `openfn.svg` | `github.com/OpenFn/docs` → `static/img/logo.svg` | Icon only ("Fn"); the name is shown as text next to it. |

To add a logo: take it from the project's official brand source, check its
usage terms, minify with the same SVGO settings, add a row here, and set
`logo` (and `wordmark` when the logo contains the name) in `src/data/content.ts`.
If the terms are unclear, leave `logo` unset: the name is shown as text.
