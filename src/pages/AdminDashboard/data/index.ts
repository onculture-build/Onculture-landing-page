import sportsMedal from "../../../Assets/Images/SportsMedal.svg";
import rocket from "../../../Assets/Images/Rocket.svg";
import pencil from "../../../Assets/Images/Pencil.svg";
import glowingStar from "../../../Assets/Images/GlowingStar.svg";
import speechBalloon from "../../../Assets/Images/SpeechBalloon.svg";
import handshake from "../../../Assets/Images/Handshake.svg";
import excellent from "../../../Assets/icons/StarStruck.svg";
import excellentInactive from "../../../Assets/icons/StarStruckDull.svg";
import goodEmoji from "../../../Assets/icons/BeamingFace.svg";
import goodEmojiInactive from "../../../Assets/icons/BeamingFaceDull.svg";
import smiley from "../../../Assets/icons/SmilingFace.svg";
import smileyInactive from "../../../Assets/icons/SmilingFaceDull.svg";
import BadEmoji from "../../../Assets/icons/SleepyFace.svg";
import BadEmojiInactive from "../../../Assets/icons/SleepyFaceDull.svg";
import TerribleEmoji from "../../../Assets/icons/PoutingFaceActive.svg";
import TerribleEmojiInactive from "../../../Assets/icons/PoutingFaceDull.svg";

export const courses = [
  {
    title: "Harassment in the Workplace",
    tag: "Sexual and Non-sexual",
    // path: "/dashboard/learning/harrassment-in-the-workplace",
    path: "/programs/harrassment-in-the-workplace",
  },
  { title: "Leadership Amp", tag: "Coming Soon", path: "" },
  {
    title: "Culture Clinic",
    tag: "Coming Soon",
    // path: "/dashboard/learning/culture-clinic",
    path: "/programs/culture-clinic",
  },
];

export const courseSummary = [
  {
    title: "Harassment in the Workplace.",
    path: "/dashboard/learning/harrassment-in-the-workplace",
    intro: [
      "A safe and healthy workplace is a productive one.",

      "A lack of awareness and silence around workplace harassment has significantly impacted employee mental health and well-being, leading to reduced productivity and retention rates.",

      "How do you create a safe and healthy workplace?",

      "This is where OnCulture comes in.",
    ],
    subs: [
      {
        title: "In this interactive course, you will learn to:",
        items: [
          "Identify sexual and non-sexual types of harassment in the workplace.",
          "Prevent workplace harassment.",
          "Develop comprehensive responsive measures around workplace harassment.",
        ],
      },
      {
        title: "Through relatable:",
        items: [
          "Videos.",
          "Real-life scenarios.",
          "Case studies.",
          "Interactive quizzes.",
        ],
      },
      {
        title: "What you will stand to gain:",
        items: [
          "A toxic-free company.",
          "Employee behaviors that buttress company values.",
          "A happier and more productive workforce.",
        ],
      },
    ],
  },

  {
    title: "Culture Clinic",
    path: "/dashboard/learning/culture-clinic",
    intro: [
      " Companies with aligned, positive cultures improve work lives, retain the best people, and generally perform better.",

      "  Imagine a workforce with similar values and behaviors, focused on the same business goals.",

      "This is where OnCulture comes in.",
    ],
    subs: [
      {
        title: "In this interactive course, you will learn to:",
        items: [
          "Reinforce the company’s purpose and mission.",
          "Identify Value Stars among employees. ",
          "Influence culturally-aligned behaviours of teams.",
          "Strengthen connections between employees as they learn together. ",
        ],
      },
      {
        title: "Through relatable:",
        items: [
          "Videos.",
          "Real-life scenarios.",
          "Case studies.",
          "Interactive quizzes.",
        ],
      },
      {
        title: "What you will stand to gain:",
        items: [
          "Better (designed) workplace culture.",
          "Diverse, yet clearer interpretation of the company’s culture.",
          "A workforce of Culture Champions.",
          "Stronger team collaboration and connections.",
          "A culture-fit layer to your existing onboarding process.",
        ],
      },
    ],
  },
];

export const Templates = [
  {
    icon: rocket,
    title: "Team Sum Up",
    slug: "team-sum-up",
    tag: "Productivity",
    activate: "teamSumUpActivation",
  },
  {
    icon: handshake,
    title: "Peer 1:1",
    slug: "peer",
    tag: "Engagements",
    activate: "peerActivation",
  },
  {
    icon: speechBalloon,
    title: "Fireside Chats/Spark",
    slug: "fireside-chats",
    tag: "Engagements",
    activate: "fireSideActivation",
  },
  {
    icon: pencil,
    title: "Anonymous Complaint and suggestion box",
    slug: "complaints-suggestion",
    tag: "Engagements",
    activate: "complaintActivation",
  },
  {
    icon: glowingStar,
    title: "Shout-outs (with company value)",
    slug: "shout-outs",
    tag: "Motivation",
    activate: "shoutOutsActivation",
  },

  {
    icon: sportsMedal,
    title: "Value star votes",
    slug: "value-star-votes",
    tag: "Motivation",
    activate: "valueStarActivation",
  },
];

export const sumupData = [
  {
    name: "Aldulraham Immanuel",
    role: "Product manager1",
    past: "Have a design session with Ibukun for Onculture... ",
    plan: "Have a design session with Ibukun for Onculture... ",
    modalData: {
      past: {
        title: "What have you achived since your last sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      plan: {
        title: "What do you plan to do before the next sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Blockers: {
        title: "Any restrictions?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Support: {
        title:
          "What support do you need on what you are working on and from whom?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
    },
  },
  {
    name: "Aldulraham Immanuel",
    role: "Product manager2",
    past: "Have a design session with Ibukun for Onculture... ",
    plan: "Have a design session with Ibukun for Onculture... ",
    modalData: {
      past: {
        title: "What have you achived since your last sum-up?2",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      plan: {
        title: "What do you plan to do before the next sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Blockers: {
        title: "Any restrictions?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Support: {
        title:
          "What support do you need on what you are working on and from whom?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
    },
  },
  {
    name: "Aldulraham Immanuel",
    role: "Product manager3",
    past: "Have a design session with Ibukun for Onculture... ",
    plan: "Have a design session with Ibukun for Onculture... ",
    modalData: {
      past: {
        title: "What have you achived since your last sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      plan: {
        title: "What do you plan to do before the next sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Blockers: {
        title: "Any restrictions?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Support: {
        title:
          "What support do you need on what you are working on and from whom?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
    },
  },
  {
    name: "Aldulraham Immanuel",
    role: "Product manage5",
    past: "Have a design session with Ibukun for Onculture... ",
    plan: "Have a design session with Ibukun for Onculture... ",
    modalData: {
      past: {
        title: "What have you achived since your last sum-up?2",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      plan: {
        title: "What do you plan to do before the next sum-up?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Blockers: {
        title: "Any restrictions?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
      Support: {
        title:
          "What support do you need on what you are working on and from whom?",
        list: [
          "Worked on the Landing page screens",
          "Push notifications features",
          "Growth team meeting",
          "attended to some other design needs",
          "strategy meeting",
        ],
      },
    },
  },
];

export const MOODCHECKERS = Object.freeze({
  TERRIBLE: {
    id: ":rage: Terrible",
    active: TerribleEmoji,
    inactive: TerribleEmojiInactive,
    text: "Terrible",
  },
  BAD: {
    id: ":sleepy: Bad",
    active: BadEmoji,
    inactive: BadEmojiInactive,
    text: "Bad",
  },
  OKAY: {
    id: ":slightly_smiling_face: Okay",
    active: smiley,
    inactive: smileyInactive,
    text: "Okay",
  },
  GOOD: {
    id: ":grin: Good",
    active: goodEmoji,
    inactive: goodEmojiInactive,
    text: "Good",
  },
  EXCELLENT: {
    id: ":star-struck: Excellent",
    active: excellent,
    inactive: excellentInactive,
    text: "Excellent",
  },
});
