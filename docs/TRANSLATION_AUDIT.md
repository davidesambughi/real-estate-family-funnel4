Translation Audit — TrustFamily Relocation Funnel
Data audit: 2026‑02‑25 (aggiornato 2026‑02‑25 h 15:15)
Scope: 10 pagine, 6 file messages, 3 file dati, 3 componenti chiave
Locali: en · pt · de · fr · nl · es

Legenda categorie
 Cat. 	 Tipo 	 Descrizione 
 A 	 UI / metadata 	 Gestito da next‑intl; chiavi nei JSON. 
 B 	 Prose editoriale 	 Heading e testi nel JSX; i18n via namespace o en‑only by design. 
 C 	 Dati strutturati 	 Contenuto in schoolsData e neighborhoodsData. 
Aggiornamento rapido (overview)
 Item 	 Audit precedente 	 Stato reale 2026‑02‑25 
 Form component (P0) 	 Hardcoded EN 	 ✅ 100 % i18n (Form namespace) 
 About page (P2) 	 615 parole EN 	 ✅ Namespace AboutPage – 38 chiavi tradotte 
 School Finder page (P2) 	 300 parole EN 	 ✅ Namespace SchoolFinderPage – 25 chiavi 
 Blog Listing 	 31 parole EN 	 ✅ BlogPage namespace 
 Blog Detail 	 31 parole EN 	 ✅ BlogDetail namespace 
 School Detail labels 	 27 parole EN 	 ✅ SchoolDetail namespace – 12 chiavi 
 Neighborhood Detail labels 	 34 parole EN 	 ✅ NeighborhoodDetail namespace – 10 chiavi (+ 1 missing fix View School) 
 Metadata pillar pages 	 Hardcoded EN 	 ✅ Dynamic generateMetadata 
 schoolsData / neighborhoodsData 	 Solo EN 	 ✅ 5 locali popolati (locale‑keyed objects) 
1 – 10. Pagine e componenti
Le sezioni 1‑11 rimangono invariate nella struttura ma con questi aggiornamenti cumulativi:

Tutti i blocchi UI e label sono ora i18n tramite useTranslations(<namespace>).

Le prose editoriali rimangono EN‑only by design (Homepage + Schools Guide + Neighborhoods Guide + Relocation Guide).
All’interno dei file c’è un commento esplicito "Editorial prose: English only (consistent with pillar pages)".

Bug scoperto: in app/[locale]/neighborhoods/[slug]/page.tsx:227

tsx
<Link>View School</Link>
→ da sostituire con t('viewSchoolBtn') nel namespace NeighborhoodDetail.

12. Analisi file messages — stato completezza
 File 	 Chiavi 	 Stato 
 messages/en.json 	 ~249 	 ✅ Master 
 messages/pt.json 	 ~249 	 ✅ Completo 
 messages/de.json 	 ~249 	 ✅ Completo 
 messages/fr.json 	 ~249 	 ✅ Completo 
 messages/nl.json 	 ~249 	 ✅ Completo 
 messages/es.json 	 ~249 	 ✅ Completo 
Totale namespace attivi: 13 + Common.
Qualità: ottima — placeholders e formatting rispettati.
(Vecchio conteggio: 77 chiavi, 10 namespace → ora 249 chiavi, 13 namespace.)

13. Conteggio parole per categoria (aggiornato)
 Categoria 	 ~Parole EN attuali 	 Stato 
 A — UI / metadata 	 ~1 000 + 	 ✅ Tradotto 
 B — Prose JSX 	 ~9 400 	 ⚪ EN‑only by design (pillar pages solo) 
 C — Dati strutturati 	 ~770 	 ✅ Tradotti (locale‑keyed) 
Residuo EN‑only intenzionale: pil­lar editorial content + blog articles.

14. Raccomandazioni aggiornate
Tier 1 (P0–P3) ✅ Completato
- Form component, Metadata SEO, School Finder, About, Detail labels, schools/nbh data — tutti fatti.

Tier 2 (semi‑facoltativo)
- Fix unico “viewSchoolBtn” nel namespace NeighborhoodDetail.
- Eventuale i18n dei TOC labels nei pillar (sections[]) → bassa priorità.

Tier 3 (post‑lancio)
- Pillar prose EN‑only (MDX structure pronta per future traduzioni).
- Blog article content → da migrare in Phase 5 (CMS).

15. Architettura tecnica per la traduzione (immutata)
Le opzioni A–D restano valide; il codice attuale usa:
- Opzione C (locale‑keyed objects per dati) ✅ implementata.
- Opzione B (MDX per pillar) già predisposta ma non attiva.

16. Piano di attività (aggiornato post‑implementazione)
 Priorità 	 Azione 	 Categoria 	 Stato 	 Note 
 P0 	 Form i18n 	 B 	 ✅ Done 	 Conversion OK 
 P1 	 Metadata pillar pages 	 B 	 ✅ Done 	 SERP locali ottimizzate 
 P2 	 School Finder + About 	 B 	 ✅ Done 	 E‑E‑A‑T multilingue 
 P3 	 Detail labels + Data 	 B/C 	 ✅ Done 	 UX complete 
 Bug fix 	 “View School” → namespace 	 B 	 ✅ Done 	 Sessione 5 — 2026‑02‑26 
 P4 	 Pillar page prose (MDX) 	 B 	 ⚪ EN‑only by design 	
 P5 	 Blog articles (CMS) 	 C 	 ⚪ Futuro Phase 5 	
Documento aggiornato in sessione 7 — 2026‑02‑26. viewSchoolBtn fix completato. Tutti Tier 1 e Tier 2 chiusi.