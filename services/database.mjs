import fsPromises from 'fs/promises'

/*
CS5356 TODO 2a. Data Model

Fill in the methods below that will create,
read, update, and delete data.

All the data will be stored in ./db.json so you can view
what your data looks like locally.
*/

export const openDb = async () => {
  // CS5356 TODO 2a Set the initial structure of your database here
  // @type {dbObject}
  let dbObject = {
    // Fill in collections
    classCodes: [],
    questions: {}
  }

  // Don't edit below this line.
  try {
    const text = await fsPromises.readFile('./db.json')
    return JSON.parse(text)
  } catch (err) {
    await saveData(dbObject)
    return dbObject
  }
}

export const getQuestions = async (classCode) => {
  const dbObject = await openDb()

  // Fill in below
  return dbObject.questions[classCode] || [];
};

export const getClassCodes = async (username) => {
  const dbObject = await openDb()

  // Fill in below
  return dbObject.classCodes.filter(classCode => classCode.owner === username)
}

export const createQuestionForClassCode = async (classCode, question) => {
  const dbObject = await openDb()

  // Fill in below
  const q = {
    id: Date.now().toString(), // Ensuring each question has a unique ID
    createdAt: Date.now(),
    ...question
  };
  if (!dbObject.classCodes.some(cc => cc.id === classCode)) {
      //console.log("Class code not found:", classCode);
      return null;
  }
  if (!dbObject.questions[classCode]) {
      dbObject.questions[classCode] = [];
  }
  
  dbObject.questions[classCode].push(q);
  await saveData(dbObject);
  console.log("Question added:", q);
  return q;
};

export const createClassCode = async ({id, owner}) => {
  const dbObject = await openDb()
  // Fill in below
  const newClassCode = {
    id: id,
    createdAt: Date.now(),
    owner: owner
  }
  dbObject.classCodes.push(newClassCode)

  await saveData(dbObject)
  return newClassCode
};

export const deleteClassCode = async (classCode) => {
  const dbObject = await openDb() 
  const initialLength = dbObject.classCodes.length; 
  dbObject.classCodes = dbObject.classCodes.filter(cc => cc.id!== classCode);
  if (initialLength!== dbObject.classCodes.length) {
      await saveData(dbObject);
  }
}

export const deleteQuestion = async (questionId) => {
  const dbObject = await openDb()

  // Fill in below
  let exist = false;
  Object.keys(dbObject.questions).forEach(classCode => {
      const initialLength = dbObject.questions[classCode].length;
      dbObject.questions[classCode] = dbObject.questions[classCode].filter(q => q.id !== questionId);
      if (dbObject.questions[classCode].length !== initialLength) {
          exist = true;
      }
  });
  if (exist) {
      await saveData(dbObject);
  }
}

// -------------------------------
// Do not edit the functions below
const saveData = async (dbObject) => {
  await fsPromises.writeFile('./db.json', JSON.stringify(dbObject))
}

export const clear = async () => {
  try {
    await fsPromises.rm('./db.json')
  } catch(err) {} // ignore error if file doesnt exist
};