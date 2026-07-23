# Résumé source

`resume.tex` is the LaTeX source for the résumé shown at `/resume` (served from
`public/resume.pdf`). Computer Modern fonts, one page.

## Rebuild

```bash
tectonic resume/resume.tex          # writes resume/resume.pdf
cp resume/resume.pdf public/resume.pdf
```

(Any pdfLaTeX engine works; `tectonic` is used here.)

`resume.original.pdf` is the previous compiled résumé, kept as a reference/backup.
