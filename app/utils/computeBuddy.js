import * as Match from "./match";

let currID, currData;
try {
  currID = Match.currUser;
  currData = Match.getCurrentUserData();
} catch (e) {
  console.log(e);
}

// get all users
// filter out my current buddies (filter ppl in `pass` or `like` too??? [refer to last 3 comments])
// compare them with me, putting their score in a dict <uid,score>
// sort(userComparator) which uses dict.score

// instead of filtering them out completely, should we give:
// more weightage for people who have liked me????
// less weightage for people whom i have passed???

let scores = new Map();

// calculate compatibility score compared to me
const computeScore = (doc) => {
  const buddyData = doc.data();
  let ageSimilarity, levelSimilarity, placeSimilarity, dateSimilarity;  // min 0, max 1

  const ageGap = Math.abs(currData.age - buddyData.age);
  if (ageGap <= 3) ageSimilarity = 1;
  else if (ageGap <= 7) ageSimilarity = 0.5;
  else ageSimilarity = 0;

  if (currData.level - buddyData.level === 0) levelSimilarity = 1;
  else if (currData.level - buddyData.level === 1) levelSimilarity = 0.5;
  else levelSimilarity = 0;

  placeSimilarity = 0.5;

  dateSimilarity = 0;
  for (let i = 0; i < 7; i++) {
    if (currData.date[i] && buddyData.date[i]) dateSimilarity++;
  }
  dateSimilarity /= 7;

  return formula(ageSimilarity, levelSimilarity, placeSimilarity, dateSimilarity);

  // analyze past matches? Keep an array oldMatches[] for this purpose
  // ...
}

const formula = (ageSimilarity, levelSimilarity, placeSimilarity, dateSimilarity) => {
  // Max score = 1 ?
  const ageWeightage = 0.25;
  const levelWeightage = 0.2;
  const placeWeightage = 0.1;
  const dateWeightage = 0.45;
  return ageSimilarity * ageWeightage + levelSimilarity * levelWeightage
    + placeSimilarity * placeWeightage + dateSimilarity * dateWeightage;
}

const userComparator = (u1, u2) => { return scores.get(u1.id) - scores.get(u2.id); }

// an array of documents (not data yet!)
console.log("getting all users...")
let potentialBuddies = Match.getAllUsers()
  .docs
  .filter(doc => doc.id !== currID
    && !currData.buddies.includes(doc.id)
    && !currData.like.includes(doc.id)
    && !currData.pass.includes(doc.id)
  )
  .forEach(doc => {
    scores.set(doc.id, computeScore(doc));
    // console.log(`computed score for ${doc.id}`);
  })
  .sort(userComparator)
  // .map(doc => doc.data());
console.log("finish sorting.")

function shuffleArray(array, from, to) {
  for (let i = to - 1; i > from; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const getAllPotentialBuddies = () => {
  // partition of 10 and shuffle
  console.log("begin shuffling...")
  let index = 0;
  while (index < potentialBuddies.length) {
    shuffleArray(potentialBuddies, index, Math.min(index + 10, potentialBuddies.length));
    index += 10;
  }
  console.log("finish shuffling.")
  return potentialBuddies;
}