# Images

Every image on the site is referenced from the content files in `src/content/`. Until a file
is added, a branded placeholder with a [label] is shown in its place.

To add one: drop the file in this folder (JPG or WebP, around 2000 px on the long side), then
set `src` on the matching entry, for example in `src/content/projects.ts`:

    cover: { src: "/images/work/crentive-rebrand.jpg", alt: "crentive 3D logo signage" },

Suggested layout:

    images/
      hero/blue-cloth.jpg          home hero (heroMedia in site.ts)
      about/                        team photos, behind-the-work trio
      work/<project-slug>/          cover + gallery per project
      services/<service-slug>/      the three offering images per service
      shop/<product-slug>/          product photos

next/image converts and resizes them automatically (AVIF/WebP, lazy-loaded).
