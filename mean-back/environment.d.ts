declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_CONN_STRING: string;
        DB_USER_COLLECTION_NAME: string;
        DB_STUDENT_COLLECTION_NAME: string;
        DB_COURSE_COLLECTION_NAME: string;
        DB_ENROLLMENT_COLLECTION_NAME: string;
        DB_NAME: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        ACCESS_SECRET_TOKEN: string;
        ACCESS_SECRET_REFRESH_TOKEN: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}