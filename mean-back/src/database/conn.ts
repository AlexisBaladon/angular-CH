import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { 
    users?: mongoDB.Collection,
    students?: mongoDB.Collection,
    courses?: mongoDB.Collection,
    enrollments?: mongoDB.Collection
 } = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const userCollection: mongoDB.Collection = db.collection(process.env.DB_USER_COLLECTION_NAME);
    const studentCollection: mongoDB.Collection = db.collection(process.env.DB_STUDENT_COLLECTION_NAME);
    const courseCollection: mongoDB.Collection = db.collection(process.env.DB_COURSE_COLLECTION_NAME);
    const enrollmentCollection: mongoDB.Collection = db.collection(process.env.DB_ENROLLMENT_COLLECTION_NAME);
    collections.users = userCollection;
    collections.students = studentCollection;
    collections.courses = courseCollection;
    collections.enrollments = enrollmentCollection;
    
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
}
