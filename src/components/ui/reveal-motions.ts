/**
 * Entrance choreographies for `<Reveal>`.
 *
 * Each name describes the content it was built for, not a generic direction —
 * pick the one whose subject matches rather than the one whose easing reads
 * best on its own.
 *
 * `perTarget` decides whether a set moves together off one trigger or each
 * element waits for its own. Items sitting side by side should arrive as a
 * single gesture; a stack taller than the viewport must not, or the last one
 * finishes its entrance long before anybody has scrolled to it.
 */

export type RevealMotion = "stamp" | "deal" | "unfurl" | "develop";

type Choreography = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  /** One ScrollTrigger per element instead of one for the whole set. */
  perTarget?: boolean;
};

/**
 * Milestone cards fan out of a stack, so the tilt is read off the index: the
 * middle card lands straight and the outer two lean away from it. Works for
 * any count, even and odd alike.
 */
const dealTilt = (index: number, _target: Element, targets: Element[]) =>
  (index - (targets.length - 1) / 2) * 10;

export const MOTIONS: Record<RevealMotion, Choreography> = {
  /**
   * Section headings. Presses in out of focus and overshoots slightly large,
   * like a stamp meeting paper — the blur is what stops it reading as yet
   * another fade-up.
   */
  stamp: {
    from: { autoAlpha: 0, y: 28, scale: 1.14, filter: "blur(14px)" },
    to: {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
    },
    // Usually one heading per `Reveal`, where this changes nothing. It matters
    // where a single `Reveal` collects headings from a shared section: those
    // are a screen apart and must not all fire on the first one.
    perTarget: true,
  },

  /**
   * Milestone cards, dealt onto the table: they arrive fanned and straighten
   * as they land. `transformOrigin` sits below the card so the rotation pivots
   * around the dealer's hand rather than the card's own middle.
   */
  deal: {
    from: {
      autoAlpha: 0,
      y: 90,
      scale: 0.92,
      rotate: dealTilt,
      transformOrigin: "50% 140%",
    },
    to: {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.8,
      ease: "back.out(1.4)",
      stagger: 0.12,
    },
  },

  /**
   * Sponsor bands. The ribbon unrolls from its centre line outwards, which the
   * two gold rules already running the full width make legible. `clipPath`
   * rather than `scaleX` so the logos inside are not squashed on the way in.
   */
  unfurl: {
    from: { autoAlpha: 0, clipPath: "inset(0 50% 0 50%)" },
    to: {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0%)",
      duration: 1.1,
      ease: "power4.out",
    },
    perTarget: true,
  },

  /**
   * Speaker portraits, coming up like a photograph in the tray: colour arrives
   * as the card settles. Deliberately flat — an earlier 3D tilt here skewed the
   * full-width carousel into a trapezoid, and no rotation survives contact with
   * a box that wide.
   *
   * `saturate` alone, no blur: this runs on every card of every copy the
   * carousel keeps for its loop, and blurring that many portraits at once is
   * what turns a phone's entrance into a stutter.
   */
  develop: {
    from: { autoAlpha: 0, y: 36, scale: 0.94, filter: "saturate(0.2)" },
    to: {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      filter: "saturate(1)",
      duration: 0.85,
      ease: "power3.out",
    },
    perTarget: true,
  },
};
