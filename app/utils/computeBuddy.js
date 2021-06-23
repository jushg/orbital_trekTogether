import * as Match from "./match";

// get all users
// filter out my current buddies (filter ppl in `pass` or `like` too??? [refer to last 3 comments])
// compare them with me, putting their score in a dict <uid,score>
// sort(userComparator) which uses dict.score

// instead of filtering them out completely, should we give:
// more weightage for people who have liked me????
// less weightage for people whom i have passed???

let scores = new Map();

// calculate compatibility score compared to me
const computeScore = (buddyData, currData) => {
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
  // Max score = 100 ?
  const ageWeightage = 25;
  const levelWeightage = 20;
  const placeWeightage = 10;
  const dateWeightage = 45;
  return ageSimilarity * ageWeightage + levelSimilarity * levelWeightage
    + placeSimilarity * placeWeightage + dateSimilarity * dateWeightage;
}

const userComparator = (u1, u2) => { return scores.get(u2.id) - scores.get(u1.id); }

const processPotentialBuddies = async (uid) => {
  const currData = await Match.getUserData(uid);
  try {
    console.log("2. getting all users...")
    // an array of documents (not data yet!)
    let temp = await Match.getAllUsers();

    console.log(`4. potentialBuddies pre-filter= ${temp.length}`);
    let potentialBuddies = temp.filter(doc => doc.id !== uid
        && doc.data().isProfileCompleted
        && !currData.buddies.includes(doc.id)
        && !currData.like.includes(doc.id)
        && !currData.pass.includes(doc.id)
    )
    console.log(`5. potentialBuddies post-filter= ${potentialBuddies.length}`);

    potentialBuddies.forEach(doc => {
      scores.set(doc.id, computeScore(doc.data(), currData));
    })

    console.log("begin sorting...")
    potentialBuddies.sort(userComparator)
    console.log("finish sorting.")

    return potentialBuddies;
  } catch (err) {
    console.error("compute/processPotentialBuddies: " + err);
  }
}

function shuffleArray(array, from, to) {
  for (let i = to - 1; i > from; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const getAllPotentialBuddies = async (user) => {
  console.log("1. getAllPotentialBuddies of " + user.displayName)
  try {
    let potentialBuddies = await processPotentialBuddies(user.uid);
    // partition of 10 and shuffle
    console.log("begin shuffling...")
    let index = 0;
    while (index < potentialBuddies.length) {
      shuffleArray(potentialBuddies, index, Math.min(index + 10, potentialBuddies.length));
      index += 10;
    }
    console.log("finish shuffling.")
    return potentialBuddies;
  } catch (err) {
    console.log("compute/getAllPotentialBuddies: " + err);
  }
}