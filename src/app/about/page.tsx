import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — WaxIdiotical",
  description: "Wax Idiotical was founded in 2008 as a team to compete in the 48 Hour Film Project.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <header className="mb-14 border-b border-border pb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-accent">
          About
        </p>
        <h1 className="font-display text-6xl leading-none tracking-widest text-foreground md:text-8xl">
          Wax Idiotical
        </h1>
      </header>

      <div className="max-w-2xl space-y-8 font-body text-base leading-relaxed text-foreground/80">
        <p>
          Wax Idiotical was founded in 2008 as a filmmaking team built around one purpose: competing in the 48 Hour Film Project. The concept is simple and brutal — write, shoot, edit, and deliver a complete short film in 48 hours. The genre, a required prop, a character, and a line of dialogue are all assigned at the start of the weekend. Everything else is up to you.
        </p>
        <p>
          What started as a scrappy group of friends with a camera has grown into one of the winningest teams in 48 Hour Film Project history. Over the years, Wax Idiotical has earned 8 Best Film wins along with awards for Best Direction, Best Screenplay, Best Actress, and Best Actor — competing in Boston, Providence, New Haven, Portland, and New Hampshire.
        </p>
        <p>
          In 2016, the team's work was selected to screen at the Cannes Film Festival as part of the 48 Hour Film Project's international showcase — one of the highest honors in the competition's global circuit.
        </p>
        <p>
          Beyond the 48 Hour Film Project, Wax Idiotical has expanded into theater, producing promotional montages for theatrical productions across New England.
        </p>
        <p>
          We're still making things. We're still doing it in a hurry.
        </p>
      </div>
    </div>
  );
}
