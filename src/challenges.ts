export enum ChallengeType {
  DAY = "DAY",
  NIGHT = "NIGHT",
}

export const CHALLENGES = [
  {
    id: 1,
    title: "Beerpong against world",
    challengeText:
      "Let's play beerpong. Our vict... our main man is going to play beerpong against the whole crew.",
    type: ChallengeType.DAY,
    punishmentText: "",
  },
  {
    id: 2,
    title: "Live Tinder",
    challengeText:
      "So what's live tinder, you ask? Well, you will get white tee and your tonights goal will be to get as much instagram accounts from girls as you can on your tee. To not be punished you have to get atleast 30 accounts.",
    type: ChallengeType.NIGHT,
    punishmentText: "",
  },
  {
    id: 3,
    title: "Let's flex a lil' bit",
    challengeText:
      "Your main goal in this challenge tonight is to make 15 pushups as soon as you enter club.",
    type: ChallengeType.NIGHT,
    punishmentText: "",
  },
  {
    id: 4,
    title: "Desparate guy",
    challengeText:
      "You are desparete guy on the street and you can't live without empty bottle, napkins and condoms. What should you do? Well there's a lot of lovely people on the street, whom can help you.",
    type: ChallengeType.DAY,
    punishmentText: "",
  },
  {
    id: 5,
    title: "Broke guy",
    challengeText:
      "You are broke and don't have any money on you. How will you live through day? By dancing obviously. Make money on the street by dancing.",
    type: ChallengeType.DAY,
    punishmentText: "",
  },
];
