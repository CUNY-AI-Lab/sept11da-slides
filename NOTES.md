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

**What RRCHNM is doing right now** — say this here, plainly, while their names
are on the screen. They have an active plan: Title II accessibility compliance,
and flattening the site for long-term sustainability. That work is underway.

**Where tonight's work came from.** This started in conversation with Anke, and
I've discussed it with Katie Donia, an alumna of the GC's Master's degree in
Data Analysis and Visualization who also works in Public Events. What I'm
showing you is not a rival plan. We want to offer what we have to RRCHNM, to
integrate into the preservation work they are already doing.

Say this early and mean it. Nothing later in the deck should sound like a
critique of the people maintaining the Archive.

---

## Slide 3 — "Final challenging tasks"

Brier and Brown's 2011 article. Steve is sitting right here — acknowledge that.

Three of the four are engineering problems and two of those got solved, because
somebody funded them. The one that didn't get funded is metadata, and it's the
one that decides whether anyone can find anything.

The interface: yes, it was redesigned. In 2011. It is a 2011 interface.

---

## Between slides 3 and 4 — the turn (no slide)

**This is the hinge of the talk. Say it with nothing on the screen.**

The four tasks Brier and Brown named in 2011 are still the right list. What
none of them could have anticipated is that it would become possible for a
machine to *read* the archive.

The handwriting. The voicemails. The photographs. All of it, readable.

That changes which of the remaining tasks are hard — not by making the Archive
more valuable, but by moving the cost of reading it from unaffordable to an
afternoon of GPU time in the New Media Lab. Metadata was the task that never got
funded because it was the task that could not be automated. That is no longer
true.

Then advance to Data.

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

## Slides 4–6 — Data / Processing / Output

Keep this fast. It is evidence that the pipeline is real, not the point of the
talk.

**Slide 5 (Processing) carries the local-model argument.** Three words are on
the slide; here is what each one means.

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

## Slide 7 — Recovery, Review, and Remediation

Just the list on screen. Everything below is yours to say.

Tiers 0 through 3 are recovery, review and remediation: getting dead formats
open again, deciding what personal information can be published, checking
whether the machine got it right, and building metadata. Tier 4 is none of
those — it is what becomes possible once the first four are done, which is why
it sits below the rule.

**On Tier 0.** Flash pieces, dead formats, files no current browser will open.
Material that had effectively left the Archive while still sitting on the disk.
123 Flash objects are already back.

---

## Slide 8 — Tier 1, Review: Personally identifiable information

Title and the triage screens only. All of this is spoken.

Machine reading makes an archive searchable. It also makes it searchable for
things a depositor in 2002 never imagined being findable.

For example:

- The depositor ticked *No* to consent
- A minor who is directly reachable
- An address or phone number spoken aloud in a recording
- A full name and school written on a card
- Contact details buried in a scanned document

The counts are on the screen beside you if anyone asks: 157 where consent was
refused, 168 minors who are directly reachable, 117 recordings with an address
or phone number spoken aloud, and roughly 19,600 items in the queue overall.
Most of it resolves through about ten bulk rules applied to categories, not
thousands of separate judgements.

---

## Slide 9 — Tier 2, Quality review (Is the machine right?)

Title and the dashboard only.

An accuracy figure means nothing until enough has been checked. A hundred and
fifty of a source is a defensible slice; ten is an anecdote. The dashboard is
showing you almost entirely zeros, and that is the honest state of it.

**The sentence to land:** the model's original output is never overwritten — a
corrected transcript is stored *beside* it, with who corrected it and when. That
is the provenance point from slide 2, answered.

Say this here rather than on slide 10, since the dashboard is what makes it
concrete.

---

## Slide 10 — Tier 2 continued, the review interface

Deliberately carries the same title as slide 9. Slide 9 counts the checking;
this one shows the tool that does it. Same tier, same heading, so it reads as a
continuation rather than a new topic.

**The sentence that used to be on the slide:** every item comes up beside what
the model said about it. A reviewer judges the match, fixes the text if it is
wrong, and the model's original output is kept either way.

Press space three times. Each press names a kind of artifact and swaps the
screenshot: handwriting, then photographs, then audio. Same interface each time.

Click any screenshot to zoom it full-screen if someone asks for detail.

---

## Slide 11 — Tier 3, Metadata Enhancement

On the slide: now that every item has text, writing (or inferring) metadata
for discoverability and accessibility becomes far easier. That is the whole
point. The stage shows zero tags across seventy thousand items.

Eighteen fields and twenty-four usable dates, if anyone asks for the rest.

---

## Slide 12 — Tier 4, New opportunities for interpretation

Five rows on the slide. Move briskly — these are illustrations of what becomes
possible, not results. Nobody has run any of them yet. Say so.

**01 · Text analysis.** Naming the event over time is the obvious first pass:
"September 11" vs "9/11" vs "the attacks" vs "the towers" vs "Ground Zero" —
when does the shorthand consolidate? Diachronic naming is the standard move in
memory studies. What is unusual is the corpus: this is one of very few bodies of
dated, ordinary, non-journalistic language about the event, written by people
who were not being edited.

**02 · Mapping contributions.** About 20,000 hometowns. Map them, ring them by
distance from Lower Manhattan, then ask the real question: does what people
write vary by how far they travelled? A visitor from Nebraska and one from
Jersey City are doing different things by standing in that room.

**03 · Absence.** With an index you can finally count what isn't here:
backlash, Sikh and Arab American experience, the murder of Balbir Singh Sodhi,
dissent, conspiracy, the wars that followed. Until now nobody could responsibly
say the Archive under-represents anything, because nobody could count. A claim
about silence in an archive should be a measurement, not a hunch. This is the
one to dwell on if there is time.

**04 · Languages.** Detected across 51 million characters. There is a
Chinatown oral history collection in here and an Italian-language Flash
newscast. An English-only reading hides whoever else is in there — it is the
difference between an archive of New York and an archive of English-speaking
New York.

**05 · And more.** What is behind the catch-all, if anyone asks:

- **Children's drawings.** A sketch flag is recorded per page and the pilot rate
  implies several thousand. Towers, planes, flags, hearts — how children drew
  something most of them only saw on television.
- **The archived web as a link graph.** 3,369 site captures, 55,825 members.
  Extract the hyperlinks and the shape of an early-2000s web neighbourhood comes
  back: who linked to whom, and what has since disappeared from the other end of
  those links.
- **Iraq and the FDNY.** Still unwritten.

---

## Closing — the rule, spoken not shown

There is no longer a slide for this. It is how you finish.

Every visual must walk back to the artifact. If a chart says 6,761 cards in
April 2003, clicking it gets you those cards, and clicking a card gets you the
scan beside the transcript beside who corrected it.

A visualization that cannot be walked back to the object is an assertion. The
whole point of indexing a plural archive is that its claims stay auditable by
the person reading them.

**And the plurality argument**, if it has not already come up: multiplicity you
can't search is functionally a singular. The institutional narrative didn't
defeat the plural archive — it just had better retrieval. Search isn't a
technical postscript to preservation; it's where an archive either keeps its
promise of plurality or quietly stops keeping it.

Then stop and hand back to the panel.

---

## Things to check before you go on

- [ ] Iraq / FDNY now lives only under "And more" in the notes — write it up if you want to speak to it
- [ ] Start year for Trinh, Heppler and Scott — the chart currently guesses 2025
- [ ] Jim Safley's bar now runs 2002–present (24 years), per the staff list —
      he was Project Associate and Archive Specialist at CHNM from 2002. Your
      earlier note said twenty-one years, counting from 2005. Which do you want?
- [ ] Fritz Umbach is drawn on the "both" split with Tom Scheinfeldt. He was at
      John Jay (CUNY) rather than ASHP — say if that should read differently.
- [ ] Confirm the exact citation for the Brier & Brown 2011 article if anyone asks
