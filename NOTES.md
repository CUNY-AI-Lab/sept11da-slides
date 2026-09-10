# Speaker notes — The Afterlives of the September 11 Digital Archive

CUNY Graduate Center · Elebash Recital Hall · September 10, 2026

Notes only. Nothing here is on a slide. Slide numbers match the deck.

---

## Slide 1 — Title

Locate yourself. You are the odd one out on this panel: you didn't build this.
You learned from it, and it shaped the approach your team took when you built
the CUNY Distance Learning Archive, which documented the impact of COVID-19
across CUNY.

As director of ASHP you knew the lore, but only started working on this a few
weeks ago, in conversation with Anke.

---

## Slide 2 — Who kept it alive (the timeline)

**This is the slide that carries the stewardship argument. Say it, don't show it.**

The people who kept this archive running are not on this stage. That's why the
chart is the second thing you show.

**The question worth naming out loud:** *who is ultimately responsible over this
timescale?*

Honestly? For most of the last twenty years, the answer is: whoever happened to
still be there. Jim Safley has been on this project since 2005 — twenty-one
years. Sheila Brennan ran it for a decade. That is not an institutional
stewardship model. That's people not letting go of something.

It worked. It is not a plan.

**And it's measurable.** When you went to find out who had maintained this
archive, the archive couldn't tell you. You had to email someone. Provenance is
the kind of thing an archive should be able to answer about itself, and this one
can't.

**On the two eras.** Point at the chart. ASHP and CHNM collected it together —
that's the era in which the thing came into existence, 150,000 items from
ordinary people. After 2005 the stewardship is CHNM, then RRCHNM: the
preservation, the migration, the hosting, and the fundraising to pay for all
three. Different work, different era, both real.

**On funding.** Very different landscape now, both inside institutions and
outside them, from twenty-five years ago. Jessica Otis is carrying that now.

---

## Slide 3 — "Final challenging tasks"

Brier and Brown's 2011 article. Steve is sitting right here — acknowledge that.

Three of the four are engineering problems and two of those got solved, because
somebody funded them. The one that didn't get funded is metadata, and it's the
one that decides whether anyone can find anything.

The interface: yes, it was redesigned. In 2011. It is a 2011 interface.

---

## Slide 4 — It became possible for a machine to read the archive

The thing nobody in 2011 could have anticipated. Only the headline is on the
slide; the rest is yours to say.

The handwriting. The voicemails. The photographs. All of it, readable by a
machine. That changes *which* of the remaining tasks are hard — not by making
the archive more valuable, but by moving the cost of reading it from
"unaffordable" to an afternoon of GPU time in the New Media Lab.

**Say what it bought us: discoverability and accessibility.** The two tasks
Brier and Brown left open — metadata and the interface — both come down to
this, and accessibility comes along with them for free. Text that a machine can
read is text a visitor can search, and text a screen reader can speak.
Handwriting that was an image is now a string. A voicemail that was a waveform
is now a transcript. Nothing about the holdings changed; what changed is that they can
be found and they can be heard.

**And this is not only our interest.** RRCHNM is working on bringing the
Archive into compliance with the ADA Title II web accessibility rule — a legal
obligation for a public institution, not a nice-to-have. Alt text, transcripts
and captions at this scale were previously an unfunded mandate. Machine reading
is what makes the compliance work tractable, and the compliance work is what
makes the discoverability work fundable. Same labor, two arguments.

---

## Slides 5–7 — What we pulled / what read it / what came back

Keep this fast. It is evidence that the pipeline is real, not the point of the
talk.

**Slide 6 carries the local-processing argument.** Three words are on the
slide; here is what each one means.

**Privacy.** The Archive is full of people's names, home addresses, phone
numbers and voices. Because the models run on our own hardware, none of that
was uploaded to an outside company. Using a commercial API would have meant
sending 150 gigabytes of other people's personal material to a vendor.

**Reproducibility.** Open-weights models can be kept and run again. If someone
asks in five years how a particular transcript was produced, we can re-run the
same model at the same version and show them. A commercial service can change
its model underneath you, or shut down.

**Cost.** Machine reading used to be the expensive part of a project this size.
It isn't any more. The cost has moved to human review — checking the output,
handling personal information, and improving the metadata. That is what the
four tiers later in the deck are asking for.

The PDF accessibility tool is the CUNY AI Lab's — say so.

**Where this goes next — say it as a method, not a one-off.** The September 11
Digital Archive is the case study, but the pipeline isn't specific to it. One of
the things we're exploring through the CUNY AI Lab is using exactly this
approach to recover older digital humanities projects: sites built on
infrastructure nobody maintains any more, content locked in formats nothing
reads, holdings with no metadata and no one left who remembers the schema. The
field has twenty-five years of those. Reading them back has always been the
part nobody could afford. That's the part that just got cheap.

**For Tom** (say this to him directly, not to the room): your blog posts on
using LLMs for digital scholarship were a breath of fresh air. Your team was
doing the same thing and you were one of the first DH practitioners to
articulate it.

---

## Slides 8–11 — The work that is left

Tiers 0 through 3 are review and remediation: recovering dead formats, deciding
what personal information can be published, checking whether the machine got it
right, and building metadata. Tier 4 is not review — it is what becomes possible
once the first four are done. The rail on slide 8 sets that apart deliberately.

**Tier 1 (personal information)** lists examples rather than counts on purpose.
The counts exist and are on the screenshot beside it if anyone asks: 157 where
consent was refused, 168 minors who are directly reachable, 117 recordings with
an address or phone number spoken aloud, and about 19,600 items in the queue
overall.

**Tier 3 (metadata)** is where to slow down. Everything above it was
engineering. This one is scholarship. Eighteen fields, twenty-four usable dates,
zero tags across seventy thousand items.

---

## Slide 12 — The review interface

This is what we actually built, and it comes after the tiers so the audience
already knows what the work consists of.

Press space three times. Each press names a kind of artifact and swaps the
screenshot: handwriting, then photographs, then audio. Same interface each time.

The thing to say: the model's original output is never overwritten. A corrected
transcript is stored beside it, with who corrected it and when — so the archive
can finally say where its own text came from. That is the provenance point from
slide 2, answered.

Click any screenshot to zoom it full-screen if someone asks for detail.

---

## Slide 13 — Multiplicity you can't search

This is the ask. None of it is publishable yet; a machine read it, and human
judgement is what stands between that and anything a visitor should see.

**Tier 3 (metadata)** is where to slow down. Everything above it was
engineering. This one is scholarship.

**On plurality — this was a slide, now it is yours to say.** Deliver it as
written; it is the argument of the talk:

> Multiplicity you can't search is functionally a singular.
>
> The institutional narrative didn't defeat the plural archive. It just had
> better retrieval.
>
> Search is where an archive keeps its promise of plurality — or quietly stops
> keeping it.

Say it off the metadata tier, with nothing on the screen competing with it.
Connects directly to Lisa's critique — don't soften it.

---

## Slides 14–21 — Tier 4, the seven lenses

Move briskly. These are illustrations of what becomes *askable*, not results.
Nobody has run any of them yet. Say so.

The one to dwell on if time allows is **absence**: until now nobody could
responsibly claim the archive under-represents anything, because nobody could
count. That's a methodological point, not a political one, and it lands with
this audience.

**Slide 21 — Iraq / FDNY: still a placeholder. Fill it or cut it.**

---

## Slide 22 — Every visual walks back to the artifact

The rule. A visualization that can't be walked back to the object is an
assertion. Say the 6,761-cards example concretely.

---

## Slide 23 — To their plan, not instead of it

Say publicly and unambiguously: RRCHNM has an active plan — Title II
accessibility compliance, and flattening the site for long-term sustainability.
Ours is offered *to* it, not instead of it. We are seeking funding to do this
work with them.

---

## Slide 24 — Thank you

---

## Things to check before you go on

- [ ] Fill or cut the Iraq / FDNY lens (slide 21)
- [ ] Start year for Trinh, Heppler and Scott — the chart currently guesses 2025
- [ ] Jim Safley's bar now runs 2002–present (24 years), per the staff list —
      he was Project Associate and Archive Specialist at CHNM from 2002. Your
      earlier note said twenty-one years, counting from 2005. Which do you want?
- [ ] Fritz Umbach is drawn on the "both" split with Tom Scheinfeldt. He was at
      John Jay (CUNY) rather than ASHP — say if that should read differently.
- [ ] Confirm the exact citation for the Brier & Brown 2011 article if anyone asks
