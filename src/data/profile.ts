interface ProfilePlans {
  study: { subject: string; start: string; status: "planned" };
  learning: { course: string; status: "in progress" };
  interests: string;
  internship: { title: string; period: string; locationPreference: string; focus: string };
}

export const profilePlans: ProfilePlans = {
  study: { subject: "Computer Science (Informatik)", start: "Autumn 2027", status: "planned" },
  learning: { course: "CS50 Web", status: "in progress" },
  interests: "Software architecture and distributed systems",
  internship: {
    title: "Full-time software development internship",
    period: "mid-April to August/September 2027",
    locationPreference: "Upper Austria",
    focus: "backend and systems work",
  },
};

export const internshipStatement = `Seeking a ${profilePlans.internship.title.toLowerCase()} from ${profilePlans.internship.period}, preferably in ${profilePlans.internship.locationPreference}, with a focus on ${profilePlans.internship.focus}.`;
